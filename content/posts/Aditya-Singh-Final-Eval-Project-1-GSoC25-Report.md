---
title: "Project 1 Circuit Visibility Boosting & Platform Performance Enhancement : GSoC 2025 Final Report"
date: 2025-08-24T16:41:46+05:30
draft: false
author: Aditya Singh
tags: ["GSoC 2025", "CircuitVerse", "Backend", "Rails", "Performance"]
type: post
---

> **TL;DR** — I took Weekly Contests from a long-running branch to production (with a public Leaderboard), built a feature-flagged **Explore** experience, and made fixes for a pile of **N+1 queries** across heavy pages. Along the way I opened a **group-specific visibility** track and tidied a few rough edges outside my scope. Immense thanks to mentors **[Vaibhav Upreti](https://github.com/VaibhavUpreti)**, **[Yashika Jotwani](https://github.com/yashikajotwani12)**, and org admin **[Aboobacker MK](https://github.com/tachyons)**.

---

## Hello!

I’m **[Aditya Umesh Singh](https://www.linkedin.com/in/adityaumeshsingh/)** also known as **[salmoneatenbybear](https://github.com/salmoneatenbybear)**, a final-year B.Tech (AI) student at NMIMS MPSTME, Mumbai. My background is statistics, ML/DL and a growing love for pragmatic web engineering. This summer I worked on an exciting project under GSoC 2025 for CircuitVerse, the open-source digital logic simulator used by students, hobbyists, and professionals worldwide.

---

## Focus of This Blog

My GSoC 2025 project with CircuitVerse initially named: **Project 1 – Circuit Management & Performance Enhancement**

By the end of my work, I realized that a more suited title should be:  
**“Circuit Visibility Boosting & Platform Performance Enhancement”**

Because as you’ll see in the details below, my contributions were more about making circuits more discoverable, engaging, and accessible to the community.

---

## Goals & What I Shipped

- **Weekly Contests** end-to-end in production (feature-flagged)  
- A public **Leaderboard** for transparent results  
- A new **Explore Page** for discovery (Circuit of the Week, Editor Picks, Recent Circuits, and Browse circuits by popular tags)  
- **Performance improvements** across heavy pages by eliminating N+1 queries  
- Initial **Group-Specific Visibility** capability (WIP)  
- A handful of small clean-ups and fixes outside the core scope that improved code quality

---

## The work I did :

The Weekly Contest feature started with [#5799](https://github.com/CircuitVerse/CircuitVerse/pull/5799). The problem was simple: we didn’t have a safe, end-to-end way to host contests. I implemented submissions, fair voting, automatic winner selection, admin tools, notifications, and deadline handling, released behind a feature flag so we could roll it out gradually. Contests feature was in master but it was not ready for prod, so I cleaned up the architecture in [#5943](https://github.com/CircuitVerse/CircuitVerse/pull/5943) by splitting responsibilities into focused controllers, adopting reusable components, enforcing RESTful routes, and tightening validations and database constraints.

That groundwork made it easy to address bugs like withdrawal after a contest ended, [#5957](https://github.com/CircuitVerse/CircuitVerse/pull/5957) hides the button and blocks the action server-side, while [#5964](https://github.com/CircuitVerse/CircuitVerse/pull/5964) fixed a brittle votes association that threw errors when users were deleted. To make the UI global-ready and calmer, [#5966](https://github.com/CircuitVerse/CircuitVerse/pull/5966) replaced hard-coded English with i18n (including pluralization and RTL safety) and switched the ticking countdown to a clear, server-rendered label. I then simplified the contest test suite in [#5982](https://github.com/CircuitVerse/CircuitVerse/pull/5982) by asserting the actual text users see rather than translation keys. Finally, [#6004](https://github.com/CircuitVerse/CircuitVerse/pull/6004) adds a guarded, admin-only flow to delete completed contests via a confirmation modal, ensuring live contests remain protected.

To make results visible in a better way, [#5975](https://github.com/CircuitVerse/CircuitVerse/pull/5975) introduced a public Contest Leaderboard with ranked submissions, author links, votes, submission times, a winner badge, and a clear “back to contest” path. It’s a straightforward view that rewards participation and closes the loop for entrants.

We needed circuit discovery to have its own home, so [#5977](https://github.com/CircuitVerse/CircuitVerse/pull/5977) launched the feature-flagged Explore page: a single, responsive place for Circuit of the Week, Editor Picks, Recent, and Tags, with cursor-based pagination for the recent circuits page. I followed up by making the tests speak in plain English in [#5983](https://github.com/CircuitVerse/CircuitVerse/pull/5983) so they better reflect real UI. Top Tags then got first-class treatment in [#5987](https://github.com/CircuitVerse/CircuitVerse/pull/5987) where I added dedicated tag pages with cursor based pagination, graceful recovery from malformed cursors, and caching of popular tags to reduce database load. To keep Explore fast, [#5996](https://github.com/CircuitVerse/CircuitVerse/pull/5996) preloaded preview attachments across sections to remove N+1 queries, and [#5995](https://github.com/CircuitVerse/CircuitVerse/pull/5995) improves the quality of the tag surface by excluding symbol-only/numeric tags and introducing deterministic tie-break sorting for a stable order.

Across the app, I focused on eliminating N+1 queries in pages that load a lot of media. [#5910](https://github.com/CircuitVerse/CircuitVerse/pull/5910) preloads profile pictures on user listings; [#5912](https://github.com/CircuitVerse/CircuitVerse/pull/5912) does the same for user profiles by eager-loading both circuit previews and avatars; [#5913](https://github.com/CircuitVerse/CircuitVerse/pull/5913) applies eager loading to the homepage’s featured and project lists; and [#5914](https://github.com/CircuitVerse/CircuitVerse/pull/5914) accelerates group pages by preloading members, users, and their avatars. To verify these improvements aren’t just theoretical, [#5915](https://github.com/CircuitVerse/CircuitVerse/pull/5915) adds the Bullet gem in development and test so any missed eager-loads show up immediately during local runs and CI.

I also began a Group-specific visibility feature in [#5942](https://github.com/CircuitVerse/CircuitVerse/pull/5942) (WIP). The goal is to allow sharing a project only with members of a selected group. The PR introduces a “Group” access type, adds the group\_id association, updates policies and form behavior, and wires up the basic controller flow. It still needs much more work, tighter validation, friendlier error handling, and comprehensive tests before it’s complete.

Finally, a couple of tidy-ups that helped the codebase as a whole. In [#5962](https://github.com/CircuitVerse/CircuitVerse/pull/5962) I removed a duplicate attribute from the API serializer, this was outside my GSoC scope, but worth fixing for consistency. And in [#5886](https://github.com/CircuitVerse/CircuitVerse/pull/5886) I resolved a refactor fallout from another GSoC project by removing obsolete two-argument calls, inlining the logic, and cleaning up tests. It was a small example of cross-project collaboration: if you see a crack forming, seal it. I think that GSoC should be to contribute wherever it helps while obviously covering the scope defined, but scope should never be a ceiling.

---

## PR index

---

### **Contests**

| PR                                                                                                | Status        |
| ------------------------------------------------------------------------------------------------- | ------------- |
| [#5799](https://github.com/CircuitVerse/CircuitVerse/pull/5799) – Weekly Contest Core Feature     | Merged        |
| [#5943](https://github.com/CircuitVerse/CircuitVerse/pull/5943) – Contests Refactor               | Merged        |
| [#5957](https://github.com/CircuitVerse/CircuitVerse/pull/5957) – Fix Withdraw Behaviour          | Merged        |
| [#5964](https://github.com/CircuitVerse/CircuitVerse/pull/5964) – Fix Votes Association Bug       | Merged        |
| [#5966](https://github.com/CircuitVerse/CircuitVerse/pull/5966) – i18n & RTL Support              | Merged        |
| [#5982](https://github.com/CircuitVerse/CircuitVerse/pull/5982) – Contest Specs to Direct English | Merged        |
| [#6004](https://github.com/CircuitVerse/CircuitVerse/pull/6004) – Admin Contest Delete            | Merge pending |

---

### **Leaderboard**

| PR                                                                                    | Status |
| ------------------------------------------------------------------------------------- | ------ |
| [#5975](https://github.com/CircuitVerse/CircuitVerse/pull/5975) – Contest Leaderboard | Merged |

---

### **Explore Page**

| PR                                                                                                 | Status        |
| -------------------------------------------------------------------------------------------------- | ------------- |
| [#5977](https://github.com/CircuitVerse/CircuitVerse/pull/5977) – Explore Page                     | Merged        |
| [#5983](https://github.com/CircuitVerse/CircuitVerse/pull/5983) – Explore Specs to Direct English  | Merged        |
| [#5987](https://github.com/CircuitVerse/CircuitVerse/pull/5987) – Cursor Pagination for Tags       | Merged        |
| [#5996](https://github.com/CircuitVerse/CircuitVerse/pull/5996) – Preload Circuit Previews         | Merged        |
| [#5995](https://github.com/CircuitVerse/CircuitVerse/pull/5995) – Exclude Unwanted Tags + Sort Key | Merge pending |

---

### **N+1 Query Fixes / Performance**

| PR                                                                                                      | Status        |
| ------------------------------------------------------------------------------------------------------- | ------------- |
| [#5910](https://github.com/CircuitVerse/CircuitVerse/pull/5910) – Eager-Load Profile Pictures           | Merge pending |
| [#5912](https://github.com/CircuitVerse/CircuitVerse/pull/5912) – Eager-Load Circuit Previews & Avatars | Merge pending |
| [#5913](https://github.com/CircuitVerse/CircuitVerse/pull/5913) – Eager-Load Homepage Previews          | Merge pending |
| [#5914](https://github.com/CircuitVerse/CircuitVerse/pull/5914) – Eager-Load Group Members & Avatars    | Merge pending |
| [#5915](https://github.com/CircuitVerse/CircuitVerse/pull/5915) – Add Bullet Gem                        | Merge pending |

---

### **Group Features**

| PR                                                                                          | Status     |
| ------------------------------------------------------------------------------------------- | ---------- |
| [#5942](https://github.com/CircuitVerse/CircuitVerse/pull/5942) – Group-Specific Visibility | Open (WIP) |

---

### **Miscellaneous**

| PR                                                                                                              | Status |
| --------------------------------------------------------------------------------------------------------------- | ------ |
| [#5962](https://github.com/CircuitVerse/CircuitVerse/pull/5962) – Remove Duplicate image_preview                | Merged |
| [#5886](https://github.com/CircuitVerse/CircuitVerse/pull/5886) – Remove Obsolete project_image_preview Calls   | Merged |

---

### **Other Contributions (outside GSoC scope)**

| Item                                                                                   | Links / Notes |
| -------------------------------------------------------------------------------------- | ------------- |
| Implement Cursor-Based Pagination                                                      | [#5199](https://github.com/CircuitVerse/CircuitVerse/pull/5199) |
| Percy Visual Regression Testing (CI integration and workflows)                         | [#5266](https://github.com/CircuitVerse/CircuitVerse/pull/5266), [#5547](https://github.com/CircuitVerse/CircuitVerse/pull/5547), [#5552](https://github.com/CircuitVerse/CircuitVerse/pull/5552) |
| Docs migration from Docsify → Docusaurus                    | [#405](https://github.com/CircuitVerse/CircuitVerseDocs/pull/405), [#421](https://github.com/CircuitVerse/CircuitVerseDocs/pull/421), [DEPLOY](https://docs.circuitverse.org/)  |
| Verilog investigation spike                                                            | [#5236 conversation](https://github.com/CircuitVerse/CircuitVerse/issues/5236#issuecomment-2564067639) |
| Fix invalid cursor edge cases                                                          | [#5216](https://github.com/CircuitVerse/CircuitVerse/pull/5216) |
| UI bug fixes                                                                           | [#5183](https://github.com/CircuitVerse/CircuitVerse/pull/5183), [#5263](https://github.com/CircuitVerse/CircuitVerse/pull/5263) |
| CI fix                                                                                 | [#5178](https://github.com/CircuitVerse/CircuitVerse/pull/5178) |
| Bootstrap upgrade to 5.3.3                                                             | [#5135](https://github.com/CircuitVerse/CircuitVerse/pull/5135) |
| Test suite improvements                                                                | [#5237](https://github.com/CircuitVerse/CircuitVerse/pull/5237) |
| Dependency upgrade                                                                     | [#5238](https://github.com/CircuitVerse/CircuitVerse/pull/5238) |
| Simulator performance audit (Firefox Profiler)                                         | [audit](https://github.com/CircuitVerse/CircuitVerse/issues/5250#issuecomment-2565172626) |
| Testbench scope expansion (discussion)                                                 | [Discussion](https://github.com/CircuitVerse/CircuitVerse/issues/5397) |
| Proposed the idea behind Project 6 of GSoC ’25 @ CV                         | [check idea no. 2](https://github.com/orgs/CircuitVerse/discussions/5388#discussioncomment-12083766) |

---

### **Demos for all the features**

#### 1. Contests + Leaderboard

*Currently in production, live to 25% of users.*

{{< video src="/videos/Aditya_Singh_GSoC_2025/Contests Leaderboard DEMO.webm" controls="true" preload="auto" >}}

---

#### 2. Explore page 

*Currently in production and live to **all** of Circuitverse's 3.2 Lakh + users all over the globe*

{{< video src="/videos/Aditya_Singh_GSoC_2025/Explore Page.webm" controls="true" preload="auto" >}}

---

### **Done? Not yet...**

My journey with CircuitVerse doesn’t end with GSoC. There are several important improvements I’d love to continue working on, especially to make **Weekly Contests** even better.  

I’ve already opened up a few issues and discussions that I believe are crucial next steps:

- **Enhancing Contest Experience** – [#5998](https://github.com/CircuitVerse/CircuitVerse/pull/5998)  
  A discussion around evolving contests into a more engaging, problem-statement-based challenge. This includes improving the UI by adding CircuitVerse-style graphics to contest cards, and exploring broader enhancements to move from the current open-ended format toward a faster, more sophisticated experience.  

- **Preventing Forked Circuit Submissions** – [#6009](https://github.com/CircuitVerse/CircuitVerse/issues/6009)  
  Right now, contests allow forked circuits to be submitted. Since originality is core to the spirit of contests, this behavior needs to be restricted to encourage authentic work.  

- **Admin Customization of Contest Names** – [#6010](https://github.com/CircuitVerse/CircuitVerse/issues/6010)  
  Adding functionality for admins to set custom contest names, making contests more flexible and aligned with specific themes or goals.

- **Finishing the Group Specific Visibility feature** – [#5942](https://github.com/CircuitVerse/CircuitVerse/pull/5942)

---

### **Project Tracking Docs**

| Resource                            | Link                                                                                                                              |
| ----------------------------------- | --------------------------------------------------------------------------------------------------------------------------------- |
| GitHub Projects Page                | [View Board](https://github.com/orgs/CircuitVerse/projects/33/views/1)                                                           |
| Async Status Update Sheet           | [Google Sheet](https://docs.google.com/spreadsheets/d/1VdbK5Dvtkj5Apt7CDU5M2VlmQSH7AbzMe4eNqmiuMkA/edit?usp=sharing)              |
| Meeting Notes (Weekly Mentor Syncs) | [Google Doc](https://docs.google.com/document/d/1TGeTLY8dC36nonSqsrdX-aCP7FFcTIK72IH6SHNv1NM/edit?usp=sharing)                    |

---

### **Weekly Blogs**

| Week              | Blog Link                                                                                                                                 |
| ----------------- | ----------------------------------------------------------------------------------------------------------------------------------------- |
| Community Bonding | [Read](https://medium.com/@salmoneatenbybear/gsoc-2025-circuitverse-community-bonding-period-my-reflections-experiences-6e50914e7ee7)     |
| Week 1            | [Read](https://medium.com/@salmoneatenbybear/gsoc-2025-circuitverse-week-1-chasing-ci-stability-and-contest-completion-4ca7421edb74)       |
| Week 2            | [Read](https://medium.com/@salmoneatenbybear/gsoc-2025-circuitverse-week-2-from-it-runs-to-its-ready-for-everyone-7dd059b2927f)           |
| Week 3            | [Read](https://medium.com/@salmoneatenbybear/gsoc-2025-circuitverse-week-3-when-progress-slows-lessons-surface-8cfb7b6da7c2)               |
| Week 4            | [Read](https://medium.com/@salmoneatenbybear/gsoc-2025-circuitverse-week-4-finding-my-footing-and-stabilizing-the-ship-356ff72203bf)       |
| Week 5            | [Read](https://medium.com/@salmoneatenbybear/gsoc-2025-circuitverse-week-5-closing-the-loop-opening-new-frontiers-7aef91da563a)            |
| Week 6            | [Read](https://medium.com/@salmoneatenbybear/gsoc-2025-circuitverseweek-6-leaderboard-closer-to-merge-bugs-squashed-and-the-production-prep-a04954fbeaaf) |
| Week 7            | [Read](https://blog.circuitverse.org/posts/aditya-singh-phase-1-gsoc25-report/)                                                           |
| Week 8            | [Read](https://medium.com/@salmoneatenbybear/gsoc-2025-circuitverse-week-8-group-specific-visbility-feature-and-contests-refactor-7b0da95d65f8) |
| Week 9            | [Read](https://medium.com/@salmoneatenbybear/gsoc-2025-circuitverse-week-9-contests-refactor-has-started-to-feel-right-565c670fe02a)       |
| Week 10           | [Read](https://medium.com/@salmoneatenbybear/gsoc-2025-circuitverse-week-10-its-time-to-floor-the-accelerator-chat-we-were-soooo-cooked-c8ad356dca32) |
| Week 11           | [Read](https://medium.com/@salmoneatenbybear/gsoc-2025-circuitverse-week-11-circuitverse-is-evolving-ce0d962472df)                         |
| Week 12           | *This blog itself*                                                                                                                        |

---

## Closing Thoughts

This summer with CircuitVerse has been nothing short of transformative.  
The most important lessons I learned were how to balance **product value, performance, and long-term maintainability**.  

The journey doesn’t stop here, there’s still plenty to refine and build, and I’m excited to continue contributing to CircuitVerse beyond GSoC.  

To everyone who reviewed PRs, tested features, or shared feedback — **thank you**.  
Open source thrives on collaboration, and I’m grateful to have been part of such a supportive community.  

Here’s to stronger circuit visibility, faster performance, and a brighter future for CircuitVerse.

---
