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

On the product side we want to help creators organise their work (folder‑based sub‑circuits, group‑level visibility) and help learners discover it (a richer Explore page and regular Weekly Contests with a public leaderboard). On the technical side we need to protect performance by eliminating N + 1 queries, adopting ViewComponents for clearer separation of presentation logic, and enforcing data‑layer guarantees through indices and transactions.  

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
With **Bullet** noisy in dev and **Sentry** revealing real‑world hotspots, I patched a few N + 1 offenders locally, also fixed a runtime error lingering in the codebase.

---

## 4. Weekly Contest in production

{{< video src="/videos/Aditya_Singh_GSoC_2025/weekly_contest_demo.webm" controls="true" preload="auto" >}}

*Feature flag via Flipper lets us roll out safely*

---

## 5. Leaderboard – almost there

{{< video src="/videos/Aditya_Singh_GSoC_2025/leaderboard_demo.webm" controls="true" preload="auto" >}}

#### What is shipped today

- Lists submissions **ranked by total votes**, with earlier timestamps breaking ties.  
- “View Leaderboard” button appears on each contest page for **logged‑in users**.  
- Top three rows get gold / silver / bronze styling plus medal icons for quick visual cues.  
- A query object (ContestLeaderboardQuery) keeps SQL isolated and fully unit‑tested.  
- First‑pass English locale keys already remove hard‑coded text from the view.

#### What happens next (mentor feedback items)

| Task | Goal |
|------|------|
| **ViewComponent wrapper** | Co‑locate markup, logic, and styling; enable isolated component tests & previews. |
| **Full I18n sweep** | Move every remaining string into locale files for effortless translation. |
| **Pure REST route** | Shift to /contests/:id/leaderboard served by a dedicated LeaderboardsController#show. |
| **Caching strategy** | Cache the ranked result per contest to avoid repeat queries under high traffic. |

---

## 6. Performance toolbox

* **Bullet** catches N + 1 issues in dev; a background rake task dumps warnings for CI visibility.  
* **Sentry** traces (production) confirm which Bullet warnings occur under real traffic; only those are prioritised for patching.

---

## Looking ahead (Phase 2 targets)

* **Merge Leaderboard v2** after OA review. 
* **Ship Bullet‑based N + 1 patches** and monitor Sentry for regression.  
* **Contests refactor (PR [#5895](https://github.com/CircuitVerse/CircuitVerse/pull/5895))**  
  * Split into multiple controllers.  
  * Add model‑level validations; remove stubs.  
  * Wrap all views in ViewComponents.  
* **Begin Group‑Specific Visibility** & **Folder‑based Sub‑circuits** foundations.  
* **Explore page** feature once performance fixes stabilise.

---

### Acknowledgements

This progress reflects the collective effort of the **CircuitVerse community**:

* **[Aboobacker MK](https://github.com/tachyons)** – Org admin, roadmap and review catalyst.  
* **[Vaibhav Upreti](https://github.com/VaibhavUpreti) & [Yashika Jotwani](https://github.com/yashikajotwani12)** – Day‑to‑day mentors, code reviews, and architectural guidance.
* **[Vedant Jain](https://github.com/vedant-jain03)** – The person who brought weekly contests to existence.
* **[Aman Asrani](https://github.com/Asrani-Aman)** – Early implementations and demo of Weekly Contest core.
* Fellow GSoC peers who shared insights, testing cycles, and late‑night debugging sessions.

Together the groundwork is set for an even more impactful second half.
