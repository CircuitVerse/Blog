---
title: "Project 1 Circuit Management & Performance Enhancement : GSoC 2025 Phase‑1 Report"
date: 2025-07-15T20:42:55+05:30
draft: false
author: Aditya Singh
tags: ["GSoC 2025", "CircuitVerse", "Backend", "Rails", "Performance"]
type: post
---

> **TL;DR** – Over the first six weeks of Google Summer of Code 2025 I finished the **Weekly Contest** feature, rebuilt an accompanying **Leaderboard**, and laid a foundation for systematic performance work inside CircuitVerse.  
> None of this would have been possible without the patient guidance of my mentors **[Vaibhav Upreti](https://github.com/VaibhavUpreti)** and **[Yashika Jotwani](https://github.com/yashikajotwani12)**, and the sharp product sense of org‑admin **[Aboobacker MK](https://github.com/tachyons)**.

---

## 1. Where this project fits

CircuitVerse already serves hundreds of thousands of circuits, yet the growing catalogue can be hard to navigate and the database work behind the scenes is beginning to strain. Project 1 is an attempt to address both fronts at once.  

On the product side we want to help creators organise their work (folder‑based sub‑circuits, group‑level visibility) and help learners discover it (a richer Explore page and regular Weekly Contests with a public leaderboard). On the technical side we need to protect performance by eliminating N + 1 queries.

Weekly Contest and its Leaderboard became the natural first milestone (already popular in the community but still on a long‑lived branch).

---

## 2. Community‑bonding recap (May → early June)

During May we drew up a detailed GitHub Projects board that sequenced every deliverable and explicitly removed overlaps with other GSoC initiatives. Locale‑switching work, for instance, moved to Project 3 so I could concentrate on contest code and performance fixes.

Weekly calls turned design sketches into concrete decisions: the Explore page renamed “Component Lens” to **Topics**, Weekly Contest was promoted to the top of the schedule, and **[Aman Asrani](https://github.com/Asrani-Aman)** (the previous contest contributor & Circuitverse Mentor) kindly walked me through the remaining test gaps. By coding day one I had wire‑frames, test data, etc ready.

---

## 3. Phase‑1 narrative

### Sprint 1 (9 – 15 June) – Fighting flakes before writing features  
The existing end‑to‑end tests failed randomly in CI because headless Chrome shared state between runs. I wrote a custom driver in `spec/support/capybara_chrome.rb`, forced unique user‑data‑dirs, and pinned compatible Selenium flags. With the pipeline finally deterministic I split one huge branch into two coherent PRs: **[#5799](https://github.com/CircuitVerse/CircuitVerse/pull/5799)** for Weekly Contest logic and **[#5800](https://github.com/CircuitVerse/CircuitVerse/pull/5800)** for CI/infra clean‑ups.

### Sprint 2 (16 – 23 June) – Making contests safe to launch  
A concurrent **PostgreSQL unique index** now guarantees one vote per user per submission, and a small `Contest::CloseService` wraps contest‑closure and winner‑selection in a single transaction. I also fixed a guest‑access 500, added a ten‑minute cache to an expensive `COUNT(*)`, and tightened Pundit policies so only authors can withdraw their own entries.

### Sprint 3 (24 – 30 June) – First Leaderboard & deeper tests  
I drafted `ContestLeaderboardQuery`, an ERB view with medal styling, and a suite of unit specs. At the same time I used **act** to run GitHub Actions locally and removed long‑standing RuboCop offences, giving reviewers a cleaner diff.

### Sprint 4 (30 June – 6 July) – Coverage or bust  
Three broad RSpec suites now exercise every state transition of a contest, including feature‑flag isolation and invalid paths. SimpleCov reads **100 %** on new code, letting me delete every `:nocov:` escape hatch. **[#5799](https://github.com/CircuitVerse/CircuitVerse/pull/5799)** merged on 4 July – feature‑flagged.

### Sprint 5 (7 – 13 July) – Rebuilding Leaderboard again
Several code changes after the contest merge made the old Leaderboard hard to rebase, so I rewrote it on a clean branch. **[#5887](https://github.com/CircuitVerse/CircuitVerse/pull/5887)**

### Sprint 6 (14 July → mid‑term) – Performance triage  
With **Bullet** noisy in dev and **Sentry** revealing real‑world hotspots, I patched a few N + 1 offenders locally, also identified and squashed a ArgumentError lingering in the codebase (**PR [#5886](https://github.com/CircuitVerse/CircuitVerse/pull/5886)**).

---

## 4. Weekly Contest in production

{{< video src="/videos/Aditya_Singh_GSoC_2025/weekly_contest_demo.webm" controls="true" preload="auto" >}}

At its heart a Weekly Contest is a seven‑day challenge: an administrator opens a contest, participants submit their favourite circuits, and the community votes for the design they find most elegant or instructive.  
Behind the scenes each contest lives in its own table, with submissions and votes linked through foreign keys. The contest feature has a 3 votes per user rule, the controller guards every step with Pundit policies, and a scheduled job closes the contest on the deadline before selecting a winner atomically based on highest votes. 

From a user’s perspective the workflow is intentionally lightweight. A banner on the dashboard announces the current challenge, a single click copies an existing project into the contest, and progress is visible in real time as vote counts update. By wrapping the entire feature in a Flipper flag we can enable it for a small cohort first, observe behaviour in Sentry, and widen the rollout when we are confident in stability.

---

## 5. Leaderboard – almost there

{{< video src="/videos/Aditya_Singh_GSoC_2025/leaderboard_demo.webm" controls="true" preload="auto" >}}

A contest becomes far more engaging when results are transparent. The Leaderboard page answers that need by publishing a ranked list of all submissions as soon as voting begins. It pulls the final vote tally with a single SQL query, orders ties by the earlier submission timestamp so the result is deterministic, and then adds a touch of celebration: gold, silver, and bronze rows for the podium, complete with medal icons.

---

#### What is shipped today

The leaderboard feature lists all contest submissions ranked primarily by total votes, with ties broken by the earlier submission timestamp. Logged-in users can access the leaderboard directly through a “View Leaderboard” button available on each contest page. To enhance the user experience, the top three submissions are visually distinguished with gold, silver, and bronze styling, along with corresponding medal icons for immediate recognition. The underlying data retrieval is handled by a dedicated ContestLeaderboardQuery object, which encapsulates all SQL logic, ensuring clean separation of concerns and full unit test coverage. Additionally, a first round of localization has been implemented, replacing hard-coded text in the view with English locale keys.

#### What happens next (mentor feedback items)

| Task | Goal |
|------|------|
| **ViewComponent wrapper** | Co‑locate markup, logic, and styling; enable isolated component tests & previews. |
| **Full I18n sweep** | Move every remaining string into locale files for effortless translation. |
| **Pure REST route** | Shift to /contests/:id/leaderboard served by a dedicated LeaderboardsController#show. |
| **Caching strategy** | Cache the ranked result per contest to avoid repeat queries under high traffic. |

---

## 6. Performance toolbox

The Bullet gem is integrated to detect N + 1 query issues during development. It also runs as a background Rake task, which logs warnings to make them visible in continuous integration workflows. In production, **Sentry** traces help identify which of these Bullet warnings actually occur under real user traffic. This allows the team to prioritize and patch only the issues that have a measurable impact in live environments.

---

## Looking ahead (Phase 2 targets)

The upcoming goals include merging **Leaderboard v2**. Next, the plan is to **ship Bullet-based N + 1 patches** and closely monitor **Sentry** for any signs of regression in production. Work on the **Contests refactor** (PR [#5895](https://github.com/CircuitVerse/CircuitVerse/pull/5895)) will continue, which involves splitting logic into multiple controllers, introducing model-level validations while removing test stubs, and wrapping all views using ViewComponents. Foundations will also be laid for **Group-Specific Visibility** and **Folder-based Sub-circuits**, setting the stage for future user experience enhancements in phase 2. Finally, development on the new **Explore page** feature will begin once the system’s performance stabilizes post-fixes.

---

### Acknowledgements

This progress reflects the collective effort of the **CircuitVerse community**:

**[Aboobacker MK](https://github.com/tachyons)** provided overarching support as the org admin, helping steer the roadmap and catalyzing reviews.  
**[Vaibhav Upreti](https://github.com/VaibhavUpreti)** and **[Yashika Jotwani](https://github.com/yashikajotwani12)** offered consistent day-to-day mentorship, covering code reviews and architectural guidance.  
**[Vedant Jain](https://github.com/vedant-jain03)** laid the initial foundation by introducing the concept of weekly contests.  
**[Aman Asrani](https://github.com/Asrani-Aman)** contributed with early implementations and a demo that shaped the core of the Weekly Contest feature.  
Support also came from fellow GSoC peers who shared valuable insights, participated in testing cycles, and collaborated during late-night debugging sessions.

Together, this teamwork has laid a strong foundation for an even more impactful second half of the program.

