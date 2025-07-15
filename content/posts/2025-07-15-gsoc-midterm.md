---
title: "Project 1 Circuit Management & Performance Enhancement : GSoC 2025 Phase‑1 Report"
date: 2025-07-15T20:42:55+05:30
draft: false
author: Aditya Singh
tags: ["GSoC 2025", "CircuitVerse", "Backend", "Rails", "Performance"]
type: post
---

> **TL;DR** – The first half of Google Summer of Code 2025 focused on developing a production‑ready **Weekly Contest** feature, an all‑new **Leaderboard** for weekly contests, and the groundwork for performance enhancements that will shape the next release cycle.  
> Many thanks to mentors **[Vaibhav Upreti](https://github.com/VaibhavUpreti)**
 & **[Yashika Jotwani](https://github.com/yashikajotwani12)**, and to org admin **[Aboobacker MK](https://github.com/tachyons)** for the steady guidance throughout.

---

## Project scope

Project 1 focuses on four user‑facing improvements:

| Track | Deliverable | Status at mid‑term |
|-------|-------------|--------------------|
| **Engagement** | Weekly Contests core feature | **Merged** (PR [#5799](https://github.com/CircuitVerse/CircuitVerse/pull/5799)) |
| **Engagement** | Public Leaderboard for Weekly Contests | **Open for review** (PR [#5887](https://github.com/CircuitVerse/CircuitVerse/pull/5887)) |
| **Performance** | Eliminate N + 1 queries visible in Sentry | Bullet audit complete, patches queued |

---

## Community‑bonding highlights (May – early Jun)

* Structured the roadmap in GitHub Projects after calls with mentors.  
* Synced with **[Harsh Bhadu](https://github.com/senbo1)** to de‑duplicate Locale‑switching, N+1 fixes, circuit visibility pages work across projects.  
* Completed UI wire‑frames for the forthcoming Explore page.  
* Consensus: move Weekly Contest + Leaderboard to the very front of the schedule.

---

## Weekly progress log

| Block (Dates)           | Focus                      | Key Code Contributions                                                                                                                                                                                                                                                                                                                                                                                    |
| ----------------------- | -------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **(9 – 15 Jun)**        | CI stability & branch hygiene          | • Added custom headless‑Chrome driver in `spec/support/capybara_chrome.rb`, eliminating flaky system specs.<br>• Split the monolithic branch into **PR #5799** (feature) and **#5800** (CI/infra) and performed a clean rebase.<br>• Pinned Selenium + Chrome flags in the GitHub Actions workflow for deterministic CI runs.                                                                             |
| **(16 – 23 Jun)**       | Hardening backend rules                | • Created migration for a concurrent unique index on `(user_id, submission_id, contest_id)`.<br>• Introduced `Contest::CloseService` to wrap contest‑close and winner‑selection in a single transaction.<br>• Fixed guest 500s (`return unless current_user` guard) in `ContestsController#show`.<br>• Extended `ContestPolicy` to block cross‑account submission withdrawals.              |
| **(24 – 30 Jun)**       | Leaderboard v1 & test reliability      | • Opened **PR #5821** with `ContestLeaderboardQuery`, helper‑based medal icons, and an ERB leaderboard view.<br>• Isolated Chrome profiles per spec run; eliminated state bleed between system tests.<br>• Removed legacy RuboCop offenses; set up `act` to run GitHub Actions locally.                                                                                                                   |
| **(30 Jun – 6 Jul)**    | 100 % coverage & merge                 | • Authored three comprehensive end‑to‑end spec files, driving SimpleCov to **100 %** on new code.<br>• Removed all `:nocov:` guards and tightened coverage threshold.<br>• Merged **PR #5799** – Weekly‑Contest feature now in `master` behind Flipper.<br>• Integrated Bullet gem; generated first N + 1 report and fixed top offenders with `includes()` calls.                                         |
| **(7 – 13 Jul)**        | Leaderboard v2 rebuild & perf triage   | • Re‑implemented Leaderboard on a clean branch; opened **PR #5887** against the new contest schema.<br>• Squashed fatal `ArgumentError` in `project_image_preview` (**PR [#5886](https://github.com/CircuitVerse/CircuitVerse/pull/5886)**).<br>• Added RSpec + system specs for Leaderboard; coverage green. |
| **(14 Jul → Mid‑term)** | Evaluation prep | • REST‑style routes & locale files in progress. |


---

### 1. Weekly Contest core (merged)

{{< video src="static/videos/Aditya_Singh_GSoC_2025/weekly_contest_demo.mp4" type="video/mp4" preload="auto" >}}

*Video courtesy of **[Aman Asrani](https://github.com/Asrani-Aman)**, whose earlier groundwork accelerated final delivery.*

* Feature flag via **Flipper** allows gradual rollout.  
* End‑to‑end RSpec + system specs. ( still need to tigthen these up a little before prod release )

### 2. Leaderboard (current milestone & upcoming refactor)

{{< video src="static/videos/Aditya_Singh_GSoC_2025/leaderboard_demo.mp4" type="video/mp4" preload="auto" >}}

#### What is shipped today

- Lists submissions **ranked by total votes**, with earlier timestamps breaking ties.  
- “View Leaderboard” button appears on each contest page for **logged‑in users**.  
- Top three rows get gold / silver / bronze styling plus medal icons for quick visual cues.  
- A query object (`ContestLeaderboardQuery`) keeps SQL isolated and fully unit‑tested.  
- First‑pass English locale keys already remove hard‑coded text from the view.

#### What happens next (mentor feedback items)

| Task | Goal |
|------|------|
| **ViewComponent wrapper** | Co‑locate markup, logic, and styling; enable isolated component tests & previews. |
| **Full I18n sweep** | Move every remaining string into locale files for effortless translation. |
| **Pure REST route** | Shift to `/contests/:id/leaderboard` served by a dedicated `LeaderboardsController#show`. |
| **Caching strategy** | Cache the ranked result per contest to avoid repeat queries under high traffic. |


### 3. Performance instrumentation

* **Bullet** catches N + 1 issues in dev; a background rake task dumps warnings for CI visibility.  
* **Sentry** traces (production) confirm which Bullet warnings occur under real traffic; only those are prioritised for patching.

---

## Lessons & reflections

1. **Green CI first, features second - Every line of Code added is a liability**
2. **Specs pay dividends**
3. **Mentorship matters** – Weekly syncs surface blind spots faster than any static checklist.

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
