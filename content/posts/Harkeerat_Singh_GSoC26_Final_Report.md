---
title: "Structured Format for Saved Circuit Data | GSoC 2026 | Final Report"
date: 2026-09-01T12:24:00+05:30
author: Harkeerat Singh
image: "/images/Harkeerat_Singh/cover_image.png"
tags: ["GSoC 2026", "Vue.js", "TypeScript", "JSON Schema", "Ajv", "Serialization", "Canonicalization", "Algorithms", "Graph Theory", "ELK.js"]
draft: false
type: post
---

Hello everyone, I'm [Harkeerat Singh](https://www.linkedin.com/in/harkeerat-singh-cse/) ([Harkeerat24](https://github.com/Harkeerat24)), and this is my final project report for **Google Summer of Code 2026** with [CircuitVerse](https://circuitverse.org/) for the project **Structured Format for Saved Circuit Data**.

> **TL;DR:** Over this GSoC, I built and hardened a new **Canonical v1** project format for CircuitVerse. It can deterministically export projects, rebuild them through a typed import pipeline, preserve real-world circuit topology and project state, automatically generate layouts with **ELK.js** when layout data is missing, and validate incoming files using **JSON Schema + Ajv**. The pipeline was also tested against all **12 Editor's Picks** projects.

---

## Project Overview

The project started with a simple problem: **two logically identical circuits could produce different saved data depending on the order in which they were built or stored.**

That makes saved circuit data difficult to compare, hash, validate, migrate, or safely use as a stable format for future tools.

The goal was to introduce a structured canonical representation where the circuit's logical structure has a deterministic identity, while still preserving the information needed to reconstruct the complete CircuitVerse project.

### Final Canonical v1 Scope

Canonical v1 now forms an end-to-end pipeline around:

- deterministic **project export and hashing**
- complete **multi-circuit and nested subcircuit** support
- canonical **import and round-trip verification**
- preservation of **routing, project state, annotations and visual metadata**
- strict **TypeScript data contracts**
- real-world **Editor's Picks integration tests**
- automatic layout generation using **ELK.js**
- **JSON Schema** and runtime validation using **Ajv**

---

## Deterministic Canonical Export

The export pipeline turns a live CircuitVerse project into a stable Canonical v1 representation step by step:

### Export Flow

1. **`canonicaliseProject()`** collects all circuit scopes and builds the SubCircuit dependency graph.
2. **`khansAlgorithm()`** orders those scopes child-first. If a dependency cycle exists, export stops.
3. Each scope is passed to **`canonicaliseScope()`**, which runs the scope-level canonical pipeline:
   - `indexNodes()` maps live simulator nodes to stable indices.
   - `discoverNets()` uses **Union-Find** to group electrically connected nodes into nets.
   - `buildComponentDrafts()` reads component ports, properties and default state.
   - `buildStructuralComponentData()` prepares the structure used for hashing and sorting.
   - `canonicalSort()` uses **1-WL structural fingerprints** to sort non-interface components while preserving the Input/Output interface order.
   - `assignComponentIds()` assigns stable component IDs.
   - `attachComponentPorts()` and `buildCanonicalNets()` attach component ports and assign stable net IDs.
   - `buildLayout()` stores routing, intermediate nodes, port positions and annotations, while `buildVisual()` stores canvas state.
   - `buildCanonicalComponents()` creates the final component representation.
4. **`sha256()`** creates the structural hash for that scope. Child scope hashes are then used when hashing SubCircuit components, so their identity depends on the child circuit itself rather than a temporary scope ID.
5. Back in **`canonicaliseProject()`**, the ordered scopes are placed into the final circuits map, the scope hashes form the project hash, `buildProjectMetadata()` adds the project name, clock, focused circuit and tab order, and the final **`CanonicalProject`** is returned.

![Deterministic canonical export architecture](/images/Harkeerat_Singh/final_canonicalisation_flow.svg)

---

## Canonical Import and Round-Trip Verification

The import side follows the reverse path: validate the Canonical project, rebuild its scopes and wiring, then canonicalise it again to make sure the reconstructed project still has the same identity.

### Import Flow

1. **`importCanonical()`** receives the project. In the validation layer, `validateCanonicalJson()` first checks the JSON Schema and project cross-references before import state is modified.
2. **`computeImportOrder()`** uses the same dependency idea to make sure child circuits are reconstructed before parents that use them as SubCircuits.
3. For every circuit, `newCircuit()` creates the scope and **`importSingleScope()`** rebuilds it:
   - `buildComponents()` creates the component instances and restores saved port positions.
   - if layout is missing, `generateElkLayout()` generates it with ELK.js.
   - `applyComponentLayout()` places the components.
   - `buildAnnotations()` restores annotations.
   - `wireComponents()` reconnects simple nets.
   - `restoreDefaultState()` restores saved component state.
   - `restoreIntermediateNodes()` reconstructs routed wires and junctions.
   - `restoreScopeMetadata()` restores the circuit metadata and canvas state.
4. **`verifyRoundTrip()`** canonicalises each reconstructed scope again and compares its hash with the original scope hash.
5. After all scopes are imported, **`canonicaliseProject()`** runs once more and compares the complete project hash with the original Canonical v1 project.
6. Only after a successful import does the pipeline restore the tab order, project name, clock settings and focused circuit, then refresh the simulator UI.

![Canonical import and round-trip verification architecture](/images/Harkeerat_Singh/final_import_flow.svg)

### Simulator Integration

The pipeline is connected to the V1 simulator UI. Canonical projects can be:

- previewed as JSON
- copied
- downloaded as `.cv` files
- imported back into CircuitVerse

The import flow also keeps a backup of the current project so a failed import does not destroy the user's existing canvas.

![Canonical export/import UI](/images/Harkeerat_Singh/week7_export_import_ui.png)

### Canonical Pipeline Demo

{{< youtube hPdCzJOewT8 >}}

---

## Real-World Round-Trip Verification

The final pipeline is also tested against all [**12 CircuitVerse Editor's Picks projects**](https://circuitverse.org/explore?section=picks#picks) using local fixtures.

### Verification Flow

For every fixture, the same complete path is tested:

**legacy project → canonical export → canonical import → canonical re-export → comparison**

### Data Covered by the Round Trip

The real-project fixtures verify that Canonical v1 preserves:

- dangling and standalone wires
- fan-out and multi-port net topology
- intermediate routing nodes and component port positions
- project-level **name, clock settings, focused circuit and tab order**
- annotations and canvas state
- subcircuit display metadata

The saved representation preserves the complete project data while keeping the structural hash focused on canonical identity. Routing is represented through unified connections that can point to either a component port or an intermediate routing node.

> **Result:** All **12 Editor's Picks projects pass the complete round-trip tests.** 🎉

![All 12 Editor's Picks round-trip tests passing](/images/Harkeerat_Singh/final_editor_picks_tests.png)

---

## Auto Layout with ELK.js

A valid Canonical v1 project does not have to contain layout data. If layout exists, the importer preserves it exactly. If it is missing, the pipeline can generate a readable layout automatically using [ELK.js](https://github.com/kieler/elkjs).

### Layout Resolution

The layout rule is:

- **layout present** → preserve the saved layout
- **layout missing** → run the ELK.js Auto Layout adapter

### How I Implemented Auto Layout

When layout is missing, the Auto Layout adapter follows a small pipeline of its own:

1. **Build the real component instances** so the adapter can read their actual dimensions, directions and port positions.
2. **Build an ELK graph** from the components and nets. Input components are constrained toward the first layer, Outputs toward the last, and the real port positions are kept fixed.
3. **Represent fan-out nets with a temporary zero-size junction** so ELK can route one source to multiple targets without changing the Canonical v1 format.
4. **Run ELK's layered layout in a worker** using left-to-right placement and orthogonal edge routing.
5. **Convert the ELK result back to CircuitVerse routing**, turn bend/junction points into intermediate nodes, remove duplicates and snap the generated coordinates to the simulator grid.
6. The generated layout is then passed back into the **normal import flow**, just like a saved layout would be.

![ELK.js Auto Layout layout-resolution flow](/images/Harkeerat_Singh/final_elk_architecture.svg)

### Fan-Out Routing

Fan-out needs an additional adapter because ELK works best with simple source-to-target edges while a CircuitVerse net can contain one source connected to several targets.

The Auto Layout adapter therefore uses a **temporary zero-size junction** to preserve one shared branching point during layout. After ELK finishes, that temporary representation is converted back into CircuitVerse's normal intermediate routing nodes and bend points.

Generated coordinates are deduplicated and snapped to the simulator grid, and **the ELK-specific junction never becomes part of Canonical v1 itself**.

![Temporary ELK fan-out junction](/images/Harkeerat_Singh/final_elk_fanout.svg)

---

## JSON Schema and Runtime Validation

The final Canonical v1 pipeline includes a strict runtime validation layer so imported project data is checked before it can affect the simulator. The JSON Schema defines the structure the format accepts, while Ajv and the cross-reference checks make sure that the project is both well-formed and internally consistent.

Together, these checks turn Canonical v1 into a format that the importer can trust instead of simply assuming that incoming JSON is valid.

### Structural Validation

The schema follows **JSON Schema Draft 2020-12** and uses reusable `$ref` definitions with constraints for:

- scope, component and net identifiers
- port names and port references
- component and annotation types
- directions and bit widths
- routing connections and intermediate nodes
- project/circuit metadata
- required fields, numeric limits, enums and extra properties

### Cross-Reference Validation

1. **Ajv schema validation** checks the structure and safely narrows incoming `unknown` data to `CanonicalProject`.
2. **Cross-reference validation** checks the relationships inside the project: circuits, subcircuits, components, nets, layouts, routing nodes and routing endpoints must all point to valid data.

Validation happens **before `importCanonical()` modifies project state**, and errors include useful JSON paths so invalid data is easier to locate.

`layout` remains optional because a schema-valid project without layout can continue into the ELK.js Auto Layout path.

---

## LLM-Generated Circuit Demo

One useful result of Canonical v1 is that a circuit can be described through its **components and nets without depending on canvas coordinates**. Components describe what exists in the circuit, while nets describe which ports are electrically connected.

The same representation gives LLMs a much cleaner target. Instead of asking a model to generate both circuit logic and exact canvas coordinates, it can generate the **Canonical v1 components, nets and SubCircuit relationships** and leave `layout` out. CircuitVerse can validate that JSON, rebuild the logical circuits in dependency order, and let ELK.js place and route them automatically.

For the demo, I used a small hierarchical **2-bit ripple-carry adder with three circuit scopes**. The LLM generated a reusable **`HalfAdder`**, a **`FullAdder`** built from HalfAdder SubCircuit instances, and finally **`TwoBitAdder`** from two FullAdder SubCircuit instances.

**LLM → hierarchical Canonical v1 `.cv` without layout → validation → child-first import → ELK.js Auto Layout → working CircuitVerse project**

{{< youtube umxEPZxJ9mU >}}

---

## Pull Request Summary

| PR | What it delivered | Status |
|----|-------------------|--------|
| [#1093](https://github.com/CircuitVerse/cv-frontend-vue/pull/1093) | Initial deterministic canonical export pipeline | Superseded by #1095 |
| [#1094](https://github.com/CircuitVerse/cv-frontend-vue/pull/1094) | Multi-circuit canonical project support | Superseded by #1095 |
| [#1095](https://github.com/CircuitVerse/cv-frontend-vue/pull/1095) | Deterministic export, subcircuits, Kahn's Algorithm and cycle detection | **Merged** |
| [#1131](https://github.com/CircuitVerse/cv-frontend-vue/pull/1131) | Canonical import pipeline and round-trip verification | **Merged** |
| [#1132](https://github.com/CircuitVerse/cv-frontend-vue/pull/1132) | Export/import UI integration and rollback flow | **Merged** |
| [#1173](https://github.com/CircuitVerse/cv-frontend-vue/pull/1173) | Strict canonical types and pipeline refactor | **Merged** |
| [#1221](https://github.com/CircuitVerse/cv-frontend-vue/pull/1221) | Complete real-world round trips and 12 Editor's Picks tests | **Merged** |
| [#1222](https://github.com/CircuitVerse/cv-frontend-vue/pull/1222) | ELK.js Auto Layout for layout-less canonical projects | **Merged** |
| [#1236](https://github.com/CircuitVerse/cv-frontend-vue/pull/1236) | Canonical v1 JSON Schema | **Merged** |
| [#1242](https://github.com/CircuitVerse/cv-frontend-vue/pull/1242) | Ajv + cross-reference runtime validation | **Merged** |

---

## What I Learnt

A few things from this project will definitely stay with me:

- **Determinism is much stricter than just sorting things.** Comparator rules, graph identity, subcircuit dependencies and tie-breaks all matter when one unstable ordering can change a hash.
- **Real projects are better teachers than happy-path fixtures.** The Editor's Picks tests broke assumptions that looked completely reasonable on smaller circuits.
- **Type safety forces design decisions into the open.** Moving away from loose structures made me define what Canonical v1 actually promises instead of letting implementation details stay vague.
- **A schema validates structure; software still has to validate meaning.** Ajv can prove that an ID has the right format, but cross-reference validation is what proves that the ID points to something real.
- **Mentor reviews changed the architecture, not just the code.** Many of the strongest parts of the final pipeline came from questions raised during review rather than from my first implementation.
- **Stacked PRs are genuinely useful.** They let me keep working on dependent features without turning each review into one giant mixed diff.

---

## Weekly Blogs

I wrote a blog every week, so the complete GSoC journey is documented here:

| Period | Blog |
|--------|------|
| Community Bonding | [From a Student Who Used CircuitVerse to a GSoC Contributor](https://dev.to/harkeerat24/from-a-student-who-used-circuitverse-to-a-gsoc-contributor-my-community-bonding-story-43ie) |
| Week 1 | [Canonicalization, Community & a Win](https://dev.to/harkeerat24/gsoc26-week-1-gkd) |
| Week 2 | [Scaling to Multi-Circuit Support](https://dev.to/harkeerat24/gsoc26-week-2-177) |
| Week 3 | [Subcircuits, Sorting & Demo Day](https://dev.to/harkeerat24/gsoc26-week-3-b1a) |
| Week 4 | [A Slow Week, Big Progress](https://dev.to/harkeerat24/gsoc-2026-week-4-2p33) |
| Week 5 | [Back on Track with Import](https://dev.to/harkeerat24/gsoc-2026-week-5-29hd) |
| Week 6 | [First PR Finally Merged](https://dev.to/harkeerat24/gsoc-2026-week-6-50d) |
| Week 7 | [The Full Pipeline Comes Alive](https://dev.to/harkeerat24/gsoc-2026-week-7-1i84) |
| Week 8 | [Midterms Passed!](https://dev.to/harkeerat24/gsoc-2026-week-8-48cg) |
| Week 9 | [Rethinking Type Safety](https://dev.to/harkeerat24/gsoc-2026-week-9-1ddp) |
| Week 10 | [Stricter Types, PR Merged](https://dev.to/harkeerat24/gsoc-2026-week-10-49io) |
| Week 11 | [Real Circuits Broke My Assumptions](https://dev.to/harkeerat24/gsoc-2026-week-11-2fj) |
| Week 12 | [T-Shirt, Tests & Auto Layout](https://dev.to/harkeerat24/gsoc-2026-week-12-3i5f) |
| Week 13 | [Auto Layout](https://dev.to/harkeerat24/gsoc26week13-auto-layout-mge) |
| Week 14 | [Schema, AJV & the Final Stretch](https://dev.to/harkeerat24/gsoc26week14-schema-ajv-the-final-stretch-7kg) |

---

## Acknowledgements

I'm grateful to my mentors [Aboobacker MK](https://github.com/tachyons), [Josh Varga](https://github.com/JoshVarga) and [Aryann](https://github.com/aryanndwi123) for their reviews, questions, ideas and support throughout the project. Their feedback constantly pushed me to question assumptions, simplify the design and make the final pipeline stronger.

I'm also very thankful to the **CircuitVerse community** for the trust, feedback and support throughout the summer, and to **Google Summer of Code** for giving me the opportunity. I learnt a huge amount from building, testing and refining this project, and I'm genuinely proud of the final result we were able to put together. 🩵
