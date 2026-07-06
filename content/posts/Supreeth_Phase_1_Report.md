---
title: "CircuitVerse Vue Simulator Integration | GSoC 2026 | Phase 1 Report"
date: 2026-07-06T00:00:00Z
draft: false
author: Supreeth C
tags: ["GSoC 2026", "CircuitVerse", "VueSim", "Authentication", "OAuth", "Tauri"]
type: post
---

![gsoc26_phase_1](/images/supreeth_gsoc26/gsoc26.png)

This blog is about my work in the first phase of Google Summer of Code 2026 with CircuitVerse. 

### Project Description

CircuitVerse has been running its legacy simulator for years while a full **Vue.js rewrite (VueSim)** sat nearly finished but unreleased, held back by a long tail of small bugs and an authentication flow that didn't play well with the rest of the platform. My project is to close that gap: stabilize VueSim so it can actually ship, and make sure users can log in cleanly and securely wherever they run CircuitVerse, in the browser or through the native **Tauri** desktop app.

Phase 1 was about the essential work of bug-hunting and getting authentication right, since neither of those can be retrofitted cheaply once a rewrite goes live.


### Community bonding recap (May)

Community bonding period doubled as a **Mergathon**, an internal CircuitVerse event to clear out the backlog of stale and duplicate PRs/issues across the org's four repositories: the main app, the Vue simulator, the interactive book, and the mobile app. I paired up with a friend and we spent the week clearing out old PRs, which turned out to be a great way to get familiar with the codebase before writing a single line of my own feature work. We led the leaderboard for most of the week and ultimately finished second, a small miss, but the repos were meaningfully cleaner, which was the actual goal.

By the time coding officially began, I already had a working mental map of the codebase, which paid off immediately once bug-hunting started.


### Phase 1 Sprint Log

#### Sprint 1 (25–31 May): Bug-hunting in VueSim

Week one was pure QA: finding and fixing the bugs standing between VueSim and a public release. I raised around eight PRs against the Vue simulator over the following weeks, the more notable ones being:

- A **`JSON.stringify`** footgun where some data was being stored as a stringified string instead of a proper object, which broke downstream parsing.
- **Web fonts** failing to load because they weren't being copied into the public directory during the build, a build-pipeline bug that took real digging to trace, and was ultimately fixed by correcting the simulator's path in the build command.

Weeks 2 and 3 were lighter on code since they overlapped with semester-end exams, work I front-loaded and caught up on around the exam schedule with my mentors' support.

#### Sprint 2 (11-19 June): Rethinking authentication

The most significant change of this stretch was moving VueSim's login away from a **custom modal** to CircuitVerse's existing **Rails Devise** login form. Google and GitHub OAuth need a real browser context to complete their redirect flow, something a custom modal can't provide. Routing through the existing Devise form meant reusing infrastructure that was already battle-tested, then simply picking up the session cookie once the user authenticated.

This is also where I went down a rabbit hole on what "logging out" actually means for a JWT-based session: a JWT is stateless, so deleting a client-side cookie doesn't revoke the token itself. A real logout needs to pair a short-lived access token with a server-side-revocable refresh token; otherwise a copied token stays valid until it expires regardless of what the browser does.

#### Sprint 3 (20-28 June): Tauri auth and PKCE

With web auth settled, I moved to authentication for the **Tauri desktop app**, a materially harder problem since there's no cookie and no client secret to lean on safely. I evaluated two variants of the **OAuth Authorization Code + PKCE** flow: one using a loopback localhost server to catch the redirect, the other using a custom URI scheme (`circuitverse://callback`). Both need the desktop app to open a browser for login and exchange an auth code for a token afterward; they differ only in how that code gets handed back to the app.

Getting PKCE right meant understanding exactly what it protects against: an intercepted authorization code. The app generates a `code_verifier`, sends only its hash (`code_challenge`) up front, and later proves possession of the original secret when exchanging the code for a token. I also mapped out how `state`, `nonce`, and PKCE each guard a different failure mode (CSRF, ID-token replay, and code interception respectively), since they're often mentioned together but solve distinct problems.

#### Sprint 4 (29 Jun–5 Jul): Review cycles

This sprint was less about new code and more about tightening what already existed. My mentor went through my open PRs in detail, and a good chunk of the week went into responding to review feedback and iterating, a rhythm that's been genuinely useful for catching things I'd otherwise have missed.

I also made a deliberate call to **pause the from-scratch Tauri OAuth implementation**. Partway through wiring up poll codes and token exchange, it became clear I was re-solving a problem that established, well-tested patterns already handle. Rather than push forward and rediscover edge cases the hard way, I'm parking it until after the mid-term evaluation to revisit with an established pattern instead of a hand-rolled one.

Meanwhile, VueSim's web authentication PR is up for review, and once merged, that clears the last major blocker standing between the rewrite and a real release.

### Key Areas of Work

#### VueSim bug fixes

A cluster of independent, release-blocking bugs: a JSON serialization issue, preview of circuits not being visible in the dashboard, saving of circuits in the .cv format, and a build pipeline gap that silently dropped required web fonts. None individually large, but collectively the difference between VueSim being an internal preview and something CircuitVerse can put in front of every user.

#### Web & simulator authentication

Login for both the main app and VueSim now goes through the same **Rails Devise** flow, giving OAuth providers the real browser redirect context they need.

#### Desktop (Tauri) authentication

An in-progress **OAuth Authorization Code + PKCE** flow for the desktop client, currently paused in favor of adopting an established implementation pattern rather than a custom one, with revisiting planned for Phase 2.

### All PR's:

- [fix: circuit preview loads full simulator instead of embed version](https://github.com/CircuitVerse/CircuitVerse/pull/1082)
- [fix: build assets not being fetched properly causing missing icons and logo](https://github.com/CircuitVerse/CircuitVerse/pull/1107)
- [fix: initial load of the vuesim throws an error](https://github.com/CircuitVerse/CircuitVerse/pull/7519)
- [fix: remove old /simulatorvue routes)](https://github.com/CircuitVerse/CircuitVerse/pull/7560)
- [fix: the user profile picture not visible in the vuesim menu bar](https://github.com/CircuitVerse/CircuitVerse/pull/1120)
- [fix: the locale language dropdown has inconsistent ui](https://github.com/CircuitVerse/CircuitVerse/pull/1118)


### Lessons & learnings

- **Small, independent bugs add up to a release.** None of the VueSim fixes were individually dramatic, but together they were the difference between a stalled rewrite and a shippable one.
- **Auth constraints depend entirely on context.** What works for a web login (cookies, modals) breaks down for OAuth redirects, and breaks down again for a desktop app with no client secret to protect. Solving auth generically instead of per-surface would have been a mistake.
- **Knowing when to stop building from scratch is a skill.** Recognizing mid-implementation that I was re-deriving a well-solved problem, and choosing to pause rather than push through, felt like a more useful decision than finishing a custom flow just to say it was done.
- **Review cycles sharpen the work.** Regular PR review with my mentor consistently surfaced cleaner approaches I hadn't considered on my own.
- **Use AI as a research tool, not a substitute for debugging.** I learned to rely on AI for exploring concepts and possible approaches rather than asking it to identify and fix errors outright. Debugging issues myself led to a deeper understanding of the codebase and made the solutions more deliberate and reliable.


### Looking ahead (Phase 2 targets)

- Revisit Tauri desktop authentication using an established OAuth/PKCE library or pattern instead of a hand-rolled flow.
- Continue hardening VueSim against any remaining edge cases found post-release.
- Create a dedicated build for the embedded version of VueSim, keeping it lightweight and tailored for seamless integration into external pages and applications.
- Introduce a comprehensive debugging suite for VueSim, adding tools and features that make circuit debugging, inspection, and issue diagnosis more intuitive and effective.


### Acknowledgements

Thanks to the CircuitVerse community and to my mentor, **[Nihal Rajpal](https://github.com/Nihal4777)**, for the consistent reviews and guidance through this phase. Looking forward to getting VueSim shipped and Tauri auth done right in Phase 2.
