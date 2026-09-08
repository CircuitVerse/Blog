---
title: "CircuitVerse Vue Simulator Integration | GSoC 2026 | Final Report"
date: 2026-08-22T00:00:00+05:30
draft: false
author: Supreeth C
tags: ["GSoC 2026", "CircuitVerse", "Vue Simulator", "Authentication", "OAuth", "Tauri"]
type: post
---

![gsoc26_phase_2](/images/supreeth_gsoc26/gsoc26.png)

**Hey everyone,**

Welcome to the final report for **"Vue Simulator Integration"**, our project for **Google Summer of Code 2026** with **CircuitVerse**. I'm [Supreeth C](https://www.linkedin.com/in/supreeth-c-shinichi/), online as [ShinichiShi](https://github.com/ShinichiShi).

---

> **TL;DR** - We spent the summer getting CircuitVerse's Vue.js rewrite of its simulator, from "nearly finished but unreleased" to genuinely ready for the people who use CircuitVerse every day. Phase 1 was bug-hunting and getting web authentication right. Phase 2 ran community bug bashes on Vue simulator, and spent the final weeks in debugging Vue simulator's behavior on some of the largest circuits the CircuitVerse community has ever built.

## About the Vue Simulator

CircuitVerse's legacy simulator has served the platform for years, powering everything from single logic gates to full CPUs, mostly for educational use. The simulator's Vue rewrite replaces years of jQuery-driven DOM manipulation with a modern, maintainable frontend. It's the same simulation model users already trust, rebuilt on infrastructure that's actually sustainable to develop on going forward. Our job this summer was to make sure there are no bugs anywhere in the browser, and in the native Tauri desktop app.

## Fixes & Enhancements Made

Here's what changes for end users as Vue simulator moves toward replacing the legacy simulator:

- **One consistent login everywhere.** Login on the main site and inside Vue simulator now goes through the same Rails Devise flow, so Google and GitHub sign-in work identically and reliably in both places, no more custom modals breaking OAuth's redirect requirements.
- **Verified against real, large-scale circuits.** Vue simulator has been tested against genuinely massive community circuits: a 32,000-component self-modifying CPU, a 16-bit computer that runs games, multi-floor elevator controllers, and more, not just toy examples.
- **A steady stream of parity and bug fixes**, many surfaced by the community itself: circuit preview rendering, `.cv` file saving, profile pictures in the menu bar, locale dropdown consistency, dead routes cleaned up, missing translations restored, custom shortcut keys that now actually persist, and an expired third-party API key that was silently breaking image uploads.

## Phase 1: A Quick Recap

Phase 1 kicked off with a community **Mergathon**, clearing out stale PRs and issues across CircuitVerse's repos, which doubled as a crash course in the codebase before real work began. From there, the focus was pure bug-hunting in Vue simulator (serialization bugs, missing build assets, broken previews) and a rework of web authentication to route through CircuitVerse's existing Rails Devise login, since custom modals don't play well with how Google and GitHub OAuth need to redirect. We also went deep on what a Tauri desktop login would need (OAuth Authorization Code + PKCE), before deliberately pausing that work to avoid hand-rolling a flow that established patterns already solve well. Full details are in the [Phase 1 Report](https://blog.circuitverse.org/posts/supreeth_phase_1_report/).

## Phase 2: Week-by-Week

**Week 8 - Laying the OAuth/OIDC foundation**:  We made the call to stop patching the old JWT-based auth and instead adopt Doorkeeper, turning CircuitVerse into a proper OAuth 2.0 and OpenID Connect provider, the same "Login with Google"-style pattern, just running on our own stack. This groundwork wasn't just for Vue simulator, it's what the web, desktop, and future mobile app will all build logins on top of.

**Week 9 - Opening Vue simulator up to the community:** We invited CircuitVerse community volunteers to actively try to break Vue simulator, and the bug reports came flooding in. We fixed the majority of them: missing translations, shortcut keys that wouldn't stick, and an image upload feature quietly broken by an expired API key. This week also meant properly learning how Vue handles component state under the hood, which explained why some settings kept mysteriously resetting.

**Week 10 - A timing bug and a security scare**: Half the week went into chasing a bug where a large CPU circuit's internal counter simply refused to count in Vue simulator. The other half went into wiring up Doorkeeper for the Tauri desktop app, where we discovered something more serious: PKCE, a security check meant to stop stolen login codes from being usable, had a missing piece in the database and was silently letting everything through. We confirmed it, then closed the gap. The desktop authentication PR that builds on this is still open and under review as the coding period wraps up.

**Week 11 - Meet STRING32000.** With the finish line in sight, we turned to stress-testing Vue simulator against genuinely huge, community-built circuits. The headline one was STRING32000, a 32,000-component, self-modifying 32-bit CPU. Keyboard presses were reaching the circuit but never actually being read by it, a subtle bug that took real digging just to characterize correctly.

**Week 12 - Still chasing it.** We ruled out several strong leads on the STRING32000 keyboard bug one by one, and fixed a real (if secondary) issue along the way where the simulator was needlessly resetting its entire internal state every clock tick. The core bug is still open as the coding period wraps up. In parallel, we verified Vue simulator against several other large, unrelated circuits (an elevator controller, a 16-bit computer, a CPU microprocessor, static RAM), all of which passed cleanly, which helps narrow down where the remaining issue actually lives.

**Week 13-14** Finally the delay issue was figured out. The root cause for this was in the `load.js` file, the `data.propagationDelay` is the delay value the circuit's author saved for that element and this line : `obj.propagationDelay = data.propagationDelay || obj.propagationDelay` makes 0 as false in JavaScript. Therefore an element deliberately saved with propagationDelay: 0 was silently promoted to the class default (10) on every load. Legacy sim's loader file already guarded against this by adding the condition but this fix was not migrated to Vue simulator too. This was identified and PR has been raised for it. 

## Future Work

Additional work which needs to be covered post GSoC period:

- **Finish and merge the Tauri Desktop App authentication flow**: The Doorkeeper-based OAuth/OIDC provider work and the PKCE fix are done, and the desktop authentication PR is open but not yet merged. What remains post-GSoC is getting that PR reviewed and merged, then completing and hardening the end-to-end Authorization Code + PKCE login flow inside the Tauri desktop app.
- **A dedicated embedded build of Vue simulator**, kept lightweight for seamless integration into external pages and applications.
- **Further bug-fixes in Vue simulator**: Most of the critical bugs were fixed during this GSoC period, if there are any bugs then they need to be fixed.


## Pull Requests

**Phase 1**

| PR                                                              | Description                                                                  |
| --------------------------------------------------------------- | ---------------------------------------------------------------------------- |
| [#1082](https://github.com/CircuitVerse/CircuitVerse/pull/1082) | Fix: circuit preview loads full simulator instead of embed version           |
| [#1107](https://github.com/CircuitVerse/CircuitVerse/pull/1107) | Fix: build assets not being fetched properly, causing missing icons and logo |
| [#7519](https://github.com/CircuitVerse/CircuitVerse/pull/7519) | Fix: initial load of Vue simulator throws an error                                  |
| [#7560](https://github.com/CircuitVerse/CircuitVerse/pull/7560) | Fix: remove old `/simulatorvue` routes                                       |
| [#1120](https://github.com/CircuitVerse/CircuitVerse/pull/1120) | Fix: user profile picture not visible in the Vue simulator menu bar                 |
| [#1118](https://github.com/CircuitVerse/CircuitVerse/pull/1118) | Fix: inconsistent UI on the locale/language dropdown                         |

**Phase 2**

| PR                                                                | Description                                                       |
| ------------------------------------------------------------------ | ------------------------------------------------------------------- |
| [#1114](https://github.com/CircuitVerse/cv-frontend-vue/pull/1114) | Addition of web authentication to Vue simulator                          |
| [#7761](https://github.com/CircuitVerse/CircuitVerse/pull/7761)    | Addition of CSRF meta tags to Vue simulator for authentication purposes  |
| [#1134](https://github.com/CircuitVerse/cv-frontend-vue/pull/1134) | Fix: bug in importing/exporting circuits to `.cv`                 |
| [#7789](https://github.com/CircuitVerse/CircuitVerse/pull/7789)    | Use a tempfile for circuit preview generation                     |
| [#1100](https://github.com/CircuitVerse/cv-frontend-vue/pull/1100) | Remove the "preview previous" option                               |
| [#1142](https://github.com/CircuitVerse/cv-frontend-vue/pull/1142) | UX: use a Vue card instead of a plain text field                   |
| [#1145](https://github.com/CircuitVerse/cv-frontend-vue/pull/1145) | Add Bengali locale translation                                     |
| [#1162](https://github.com/CircuitVerse/cv-frontend-vue/pull/1162) | Add translations for the testbench panel                           |
| [#1163](https://github.com/CircuitVerse/cv-frontend-vue/pull/1163) | Fix: extra padding on the text annotation circuit element          |
| [#1164](https://github.com/CircuitVerse/cv-frontend-vue/pull/1164) | Fix: bug in user custom shortcuts                                  |
| [#1181](https://github.com/CircuitVerse/cv-frontend-vue/pull/1181) | Tauri desktop app authentication using Doorkeeper |
| [#1188](https://github.com/CircuitVerse/cv-frontend-vue/pull/1188) | Add a dropdown to the tabs bar for open circuits                   |
| [#1260](https://github.com/CircuitVerse/cv-frontend-vue/pull/1260) | Add conditional check for propagationDelay when it is set for 0      |


## Video

This video shows the fixes made during Phase 1 of this project: {{< youtube _3TTF6MOmTY >}}
This video shows the fixes made during Phase 2 of this project: {{< youtube BvY7DSJTs1E >}}

## Blogs

| Week              | Blog Link                                                                                                                        |
| ----------------- | -------------------------------------------------------------------------------------------------------------------------------- |
| Community Bonding | [Link](https://medium.com/@supreeth2020/the-gsoc-arc-how-i-almost-didnt-show-up-to-my-own-story-8555c0c5ad2a)                    |
| Week 1            | [Link](https://medium.com/@supreeth2020/my-gsoc-journey-begins-a-mergathon-some-bugs-and-one-very-good-tee-962edb92cdd2)         |
| Week 2 & 3        | Had my end-semester exams, so we were unavailable during this period                                                             |
| Week 4            | [Link](https://medium.com/@supreeth2020/week-4-of-gsoc-coding-period-auth-bugs-and-a-jwt-rabbit-hole-b5f905a8b91e)               |
| Week 5            | [Link](https://medium.com/@supreeth2020/week-5-of-gsoc-coding-period-77fef93e16db)                                               |
| Week 6            | [Link](https://medium.com/@supreeth2020/week-6-the-pause-and-pivot-0fcc19873881)                                                 |
| Week 7            | _Mid-term report_ — [Link](https://medium.com/@supreeth2020/week-7-of-gsoc-coding-period-surviving-the-midterm-4bd22e12edea)     |
| Week 8            | [Link](https://medium.com/@supreeth2020/week-8-of-gsoc-coding-period-the-auth-arc-begins-9eadc11be8b0)                           |
| Week 9            | [Link](https://medium.com/@supreeth2020/week-9-of-gsoc-coding-period-the-week-the-bugs-came-in-2aa67d87b8db)                     |
| Week 10           | [Link](https://medium.com/@supreeth2020/week-10-of-gsoc-coding-period-the-doorkeeper-that-wasnt-locking-43e62f6c247b)            |
| Week 11           | [Link](https://medium.com/@supreeth2020/gsoc-coding-period-week-11-the-keys-that-went-nowhere-6b9e634b51e9)                      |
| Week 12           | [Link](https://medium.com/@supreeth2020/week-12-of-gsoc-coding-period-the-case-of-the-keyboard-that-wouldnt-listen-d7bfaf57d04f) |
| Week 13-14          | [Link](https://medium.com/@supreeth2020/week-13-14-of-gsoc-coding-period-when-zero-means-something-2883b62d6e37) |


## Acknowledgements

Thank you to the CircuitVerse community for testing Vue simulator against your own circuits and filing the bug reports that made this project sharper, and to our mentors, **[Nihal Rajpal](https://github.com/Nihal4777)**, **[Arnab Das](https://github.com/Arnabdaz)**, and **[Niladri Adhikary](https://github.com/niladrix719)**, for the reviews, the debugging sessions, and the patience through both phases of this project. Lots of thanks to **[Aboobacker](https://github.com/tachyons)** for his complete coordination and support throughout the GSoC period.

Thanks for reading, and thanks for following along all summer!