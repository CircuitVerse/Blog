---
title: "Client-Side Verilog Synthesis for CircuitVerse | GSoC 2026 | Phase 1 Report"
date: 2026-07-06T00:00:00+05:30
draft: false
author: Priyank Verma
tags: ["GSoC 2026", "CircuitVerse", "Vue", "Simulator", "Verilog", "WebAssembly", "Synthesis"]
type: post
---

![GSoC x CircuitVerse](/images/Priyank_Verma/gsoc_x_circuitverse.webp)

> **TL;DR:** Over the first six weeks of GSoC 2026, we brought **client-side Verilog synthesis** to CircuitVerse, users can now write Verilog and have it compiled into a working circuit entirely in the browser, no server needed. The pipeline runs **YoWASP Yosys** (WebAssembly) inside a **Web Worker**, with a **VFS guard** for output validation, a **human-readable error parser**, a **timeout guard** to catch runaway compilations, and **worker lifecycle management** to keep memory in check.


---

## 1. Where this project fits

CircuitVerse is used by hundreds of thousands of students and educators to design and simulate digital circuits visually. But when it comes to Verilog, the platform had a gap. There was no way to write Verilog code and see the resulting circuit on the canvas without depending on an external server.

**Client-Side Verilog Synthesis** fills that gap. The idea is to move the Verilog synthesis engine from the server to the browser using WebAssembly, so the **Tauri desktop app** can compile circuits fully offline with zero latency. No server, no internet -- just write Verilog and hit synthesize.

---

## 2. Community bonding recap (May)

My CircuitVerse story actually started back in December 2025, picking up small UI bug fixes to get comfortable with the codebase. By February–March, we had gotten familiar with both the main repo and `cv-frontend-vue`, and started taking on bigger issues. The proposal phase followed, and mentors **[Vivek](https://github.com/092vk)**, **[Harsh](https://github.com/ThatDeparted2061)**, and **[Nihal](https://github.com/Nihal4777)** walked me through the architecture and reviewed our drafts patiently.

The first official community bonding meet on **May 2nd** set the tone for the entire summer. Org admins **[Aboobacker MK](https://github.com/tachyons)** and **[Vedant Jain](https://github.com/vedant-jain03)** made it clear that this journey was meant to be enjoyed, not survived. There was no corporate energy, it felt like a team that genuinely cared about each other.

The **1:1 bonding meet on May 9th** with Harsh, Vivek, and Nihal was warm and friend-like. We discussed how the bonding period should go and planned the road ahead. Then on **May 12th**, we got into the specifics, going through every deliverable, the order of execution, and expectations for each phase. By the end of the bonding period, I had the clarity and confidence to hit the ground running.

---

## 3. Phase 1 sprint log

### Week 1 (2 -- 8 Jun): Setting up the Web Worker pipeline

The first week was about getting the foundation right. We set up `synthesisWorker.js` to run YoWASP Yosys inside a dedicated Web Worker, keeping the heavy WASM computation off the main thread so the UI stays responsive. The worker takes Verilog code as input, writes it to the Yosys virtual filesystem as `input.v`, runs the synthesis command, and reads back `output.json`.

Also wired up `Verilog2CV.js` on the main thread to receive the worker's output and convert it into CircuitVerse circuit components using `yosys2digitaljs`.

Getting the WASM module to load correctly inside a worker context had its own set of challenges. The WASI shim that YoWASP uses routes stderr through `console.log`, which was not expected.

{{< youtube YfINmQvsOXM >}}


- **PR:** [#1111 -- add client-side Verilog synthesis via YoWASP WASM for offline Tauri desktop](https://github.com/CircuitVerse/cv-frontend-vue/pull/1111)

### Week 2 (9 -- 15 Jun): Timeout guard and review feedback

This was a week of both cleanup and a new safety layer. After the core features landed, I went back and simplified the architecture based on mentor feedback. Tightened the logic and then built a **timeout guard** for the synthesis pipeline. Some Verilog inputs can cause Yosys to run indefinitely (or take unreasonably long), locking the worker and leaving the user staring at a spinner. The timeout guard wraps the synthesis call in a `Promise.race` against a configurable timer. If Yosys does not respond within the limit of 30 seconds, the guard rejects with a clean timeout error instead of letting the worker hang forever.

On top of that, added comprehensive test coverage. The synthesis test suite now includes cases for valid Verilog, syntax errors, empty modules, multiple modules, non-object JSON outputs, timeout scenarios, and various invalid VFS responses. All 168 tests pass.

{{< youtube ZqRVkYmPCz4 >}}


- **PR:** [#1105 -- add timeout guard for synthesis pipeline](https://github.com/CircuitVerse/cv-frontend-vue/pull/1105)

### Week 3 (16 -- 22 Jun): VFS validation and the "wrong folder" saga

A frustrating blocker showed up early. The Yosys virtual filesystem was returning data in a format we did not anticipate. Some outputs came back as `Uint8Array` instead of strings, and in some edge cases, the output file was missing entirely (silent synthesis failures).

We built `vfsGuard.js` to sit between the raw Yosys VFS result and the netlist converter. It validates that `output.json` exists, handles both string and binary responses, catches empty outputs, and verifies that the parsed JSON is actually a netlist object and not something like `null` or a raw number.

- **PR:** [#1112 -- VFS output validation](https://github.com/CircuitVerse/cv-frontend-vue/pull/1112)


### Week 4 (23 -- 29 Jun): Error parsing and human-readable messages

With synthesis working for valid Verilog, we turned to the error path. When a student writes broken Verilog, Yosys dumps raw compiler output full of internal token names like `TOK_ENDMODULE` and `TOK_POSEDGE`. These are meaningless to someone learning digital design for the first time.

We built `errorParser.js` to intercept the stderr output from Yosys (captured via console overrides in the worker), scan it for error patterns, and transform them into plain English. For example, instead of seeing `syntax error, unexpected TOK_ENDMODULE, expecting TOK_ID`, a student now sees `Syntax error on line 7: unexpected 'endmodule', expected identifier`.

The parser handles several error categories: missing endmodule statements, unexpected tokens with suggested alternatives, unexpected end-of-file errors, and generic ERROR lines that do not match a known pattern.

{{< youtube VgC4EuRSOts >}}


- **PR:** [#1116 -- Error handling and human-readable messages](https://github.com/CircuitVerse/cv-frontend-vue/pull/1116)


### Week 5 (30 Jun -- 6 Jul): Lifecycle management, review cycles, and midterm prep

Three big things happened this week. First, we tackled **worker lifecycle management**. Every time Yosys runs, its WASM linear memory grows and never shrinks. Over multiple synthesis runs, this accumulates. The only reliable way to reclaim that memory is to terminate the worker entirely and start a fresh one. We built a lifecycle manager that handles graceful teardown after each synthesis run and spawns a clean worker for the next one, keeping memory usage predictable.

Second, I went through multiple rounds of mentor review on the error handling PR. The feedback was thorough and valuable: the console overrides needed to handle multi-argument calls (since `console.log('input.v:3:', 'ERROR: ...')` would otherwise lose the error message), the `printErr` callback needed consistent `String()` wrapping, and the regex in the error parser needed the `^` anchor removed so it could catch error lines even when the WASI shim adds padding or a prefix. Each round of review made the code more robust.

{{< youtube Q35KqhNVfhw >}}


- **PR:** [#1124 -- worker lifecycle management](https://github.com/CircuitVerse/cv-frontend-vue/pull/1124)

---

## 4. Architecture overview

The synthesis pipeline follows a clean separation between the main thread and the worker:

![Workflow](/images/Priyank_Verma/workflow.webp)

**If synthesis fails**, the worker captures stderr lines (via console overrides and printErr callbacks), runs them through `errorParser.js`, and sends back a human-readable error message instead.

---

## 5. What is shipped today

| Deliverable | PR | Status |
|---|---|---|
| Web Worker synthesis pipeline | [#1111](https://github.com/CircuitVerse/cv-frontend-vue/pull/1111) | Merged |
| Timeout guard | [#1105](https://github.com/CircuitVerse/cv-frontend-vue/pull/1105) | Merged |
| VFS output validation (`vfsGuard.js`) | [#1112](https://github.com/CircuitVerse/cv-frontend-vue/pull/1112) | Merged |
| Human-readable error parsing (`errorParser.js`) | [#1116](https://github.com/CircuitVerse/cv-frontend-vue/pull/1116) | Merged |
| Worker lifecycle management | [#1124](https://github.com/CircuitVerse/cv-frontend-vue/pull/1124) | Merged |
| Comprehensive test suite (177 tests) | Included in above PRs | Passing |

---

## 6. What I learnt so far

- **WASM memory is a one-way street.** WebAssembly linear memory grows but never shrinks. There is no garbage collector, no `free()` that hands pages back to the browser. The only way to truly reclaim memory is to terminate the worker and start fresh. This shaped the entire lifecycle architecture.
- **Structured clone is not free.** When you `postMessage` a large object between threads, the browser deep-copies every nested property. Stripping unused metadata before crossing the thread boundary is not a micro-optimization, it measurably reduces transfer time for complex netlists.
- **Defensive parsing pays for itself.** `JSON.parse` succeeding does not mean you have valid data. It can return `null`, a number, or a bare string. Adding a post-parse type check (`typeof !== 'object'`) caught real edge cases from Yosys output that would have silently corrupted the circuit.
- **Regex anchors break in layered environments.** A `^ERROR` regex that works perfectly in isolation fails when the WASI shim prepends whitespace or a prefix to stderr lines. Removing the `^` anchor and matching the pattern anywhere in the line was a one-character fix that took two review cycles to discover.
- **Small PRs move faster than big ones.** Splitting the synthesis work into focused PRs (VFS guard, error parser, timeout, lifecycle) made review manageable and kept momentum. One large "synthesis feature" PR would still be sitting in review.

---

## 7. Looking ahead (Phase 2)

The second half of GSoC will focus on hardening the pipeline, building confidence through testing, and shipping documentation:

- **Tauri build integration:** Trigger a full `npm run tauri build` and verify the `pretauri` hook compiles the Worker automatically, so the desktop app ships with synthesis out of the box.
- **Unit test infrastructure:** Build a `vi.mock()` fake Worker interface that simulates `postMessage` loops, allowing `clientSynthesis.js` to run in Node.js without a real browser context.
- **Full pipeline tests:** Cover progress callbacks, error handling paths, and valid synthesis output structure end-to-end.
- **Parity tests for reference circuits:** Validate 5 circuits (AND gate, D flip-flop, full adder, 4-bit counter, 2:1 mux) using `toMatchObject()` to confirm WASM-to-server topological equivalence.
- **Cypress E2E for web target:** Mock an HTTP 200 Rails response with `isTauri=false` and verify the `fetch()` path never boots the WASM worker.
- **Contributor documentation:** Author `docs/client-side-synthesis.md` covering the Worker boundary, store API, Tauri commands, and contributor instructions.

---

## Acknowledgements

This work reflects the support of the **CircuitVerse community**:

**[Vivek Kumar](https://github.com/092vk)**, **[Harsh Rao](https://github.com/ThatDeparted2061)**, and **[Nihal](https://github.com/Nihal4777)**, my mentors, provided consistent guidance, detailed code reviews, and the kind of patience that makes all the difference. Not once did they make me feel like I was asking a dumb question.

**[Vedant Jain](https://github.com/vedant-jain03)** and **[Aboobacker MK](https://github.com/tachyons)** as org admins set the tone from day one, making it clear this community is about growing together.

Fellow GSoC contributors kept the energy going through weekly syncs and shared learnings.

Onwards and upwards 🚀
