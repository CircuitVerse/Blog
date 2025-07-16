---
title: "Migrate to View Components & Improve Search Experience: GSoC 2025 Phase 1 Report"
date: 2025-07-16
draft: false
author: Harsh Bhadu
tags:
  ["GSoC 2025", "CircuitVerse", "Frontend", "Rails", "ViewComponent", "UI/UX"]
type: post
---

> **TL;DR** – In the first six weeks of GSoC 2025, we completed the migration of core UI elements to **ViewComponents**, fully revamped key UIs (Header, Search Bar, Project, User, and Contribute Cards) and Search Page, built RTL support end‑to‑end, and laid the foundation for a comprehensive **Landing Page Revamp**. All major ViewComponent PRs have been merged; several UI revamp PRs are open for final review. Many thanks to mentors **[Vedant Jain](https://github.com/vedant-jain03)** & **[Aman Asrani](https://github.com/Asrani-Aman)**, and org admin **[Aboobacker MK](https://github.com/tachyons)** for their guidance.

## Project scope

| Track                       | Deliverable                                                | Status at mid‑term                  |
| --------------------------- | ---------------------------------------------------------- | ----------------------------------- |
| **ViewComponent Migration** | Search Bar, Project Card, User Card, Contribute Card, etc. | **Merged Core View Components**     |
| **Search Experience**       | N + 1 query fixes, UI revamp, sorting & filtering          | **Merged (UI)**                     |
| **UI Improvements**         | Header UI, Search Bar UI, Project Card UI                  | **Merged Many UI Elements**         |
| **UX Enhancements**         | Email Verification Flow, Turbo Drive, etc.                 | **Target in 2nd Phase**             |
| **RTL Language Support**    | Global RTL support on core pages                           | **RTL support merged on few pages** |

---

## Community‑bonding highlights (May – early Jun)

During the community bonding period, we laid a strong foundation for the project. After initial sync-ups with my mentors, we structured a clear roadmap using GitHub Projects to track our progress. To ensure efficient work and avoid duplicating efforts, I coordinated with fellow contributor **[Aditya Singh](https://github.com/salmoneatenbybear)** on tasks related to locale-switching and fixing N+1 queries.

---

## Weekly progress log

| Block (Dates)               | Focus                                          | Key Contributions                                                                                                                                                                                                                                                                                                                                             |
| --------------------------- | ---------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **9 – 15 Jun (Week 1)**     | ViewComponent setup & Header migration         | This week, I initiated the project by migrating the primary Header and Notification partials into dedicated ViewComponents. A key part of this effort was integrating Right-to-Left (RTL) language support into the new header structure. To facilitate a smoother review process, I decomposed the large header pull request into smaller, more focused PRs. |
| **16 – 22 Jun (Week 2)**    | Core Card migrations & search discovery        | The focus shifted to core content elements, with the Project Card and User Card being successfully migrated to ViewComponents. I also completed migrations for the Contribute Card and site-wide Pagination. During this process, I identified a useful, undocumented feature for filtering projects by tags directly through URL patterns.                   |
| **23 – 29 Jun (Week 3)**    | PR decomposition & Search Bar componentization | To better manage the ongoing header work, I split the task into two distinct pull requests: one for the Search Bar migration and another for the Header UI revamp. The Search Bar was successfully extracted into its own reusable ViewComponent, and the main Header UI was updated to align with the new Figma designs.                                     |
| **30 Jun – 6 Jul (Week 4)** | Feedback resolution & multiple PR merges       | This was a week of consolidation. I dedicated time to addressing feedback and resolving all open comments on the Contribute Card pull request, which led to the successful merge of the Contribute, Project, and User Card migration PRs.                                                                                                                     |
| **7 – 13 Jul (Week 5)**     | UI revamps merged & Home Page drafting         | Significant progress was made on the UI front. The Project Card and Search Bar UI revamps were finalized and merged into the main branch. I opened a new pull request for the User Card revamp, which is close to being resolved, and also began drafting a PR for the Home Page revamp, starting with the hero section.                                      |
| **14 – 15 Jul (Week 6)**    | Landing Page PR & User Card wrap‑up            | In the final week of Phase 1, I created the official pull request for the Landing Page (Home) revamp, ensuring it included comprehensive RTL support from the start. Additionally, I resolved all remaining comments on the User Card revamp PR, preparing it for its final merge.                                                                            |

---

## UI Revamps

#### Search Bar

{{< video src="/videos/Harsh_Bhadu_GSoC_2025/search-bar.mov" controls=true preload=true >}}

#### Project Card

![Project Card UI](/images/Harsh_Bhadu_GSoC_2025/project-card.png)

#### User Card

![User Card UI](/images/Harsh_Bhadu_GSoC_2025/user-card.png)

#### Landing Page

{{< video src="/videos/Harsh_Bhadu_GSoC_2025/landing-page.mov" controls=true preload=true >}}

---

## Lessons & reflections

The first phase of the project offered several key insights. I learned that building a modular UI with ViewComponents significantly accelerates both development and testing cycles. Breaking down large pull requests into smaller, more focused pieces proved crucial in reducing friction during code reviews and getting feedback faster. Furthermore, integrating RTL support from the beginning helped prevent significant rework and ensured our layouts were consistently bidirectional. Regular sync-ups with my mentors were invaluable for aligning on priorities and identifying potential blind spots early in the process.

---

## Phase 2 targets

Looking ahead to Phase 2, the focus will be on several key areas. We plan to complete the migration of remaining UI elements, such as the Team Section and Text Editor, to ViewComponents. A major goal is to enhance the Search Page by adding sorting and filtering capabilities and resolving underlying N+1 query problems. I will also work on resolving comments on the Landing Page revamp PR to get it merged. Other priorities include improving the email verification flow as part of the user onboarding process and incrementally extending RTL support to all remaining pages.

Together, this groundwork sets us up for an even more impactful second half of GSoC 2025.

---

### Acknowledgements

I extend my sincere gratitude to the entire **CircuitVerse community** for their continuous support and feedback. A special thanks to my mentors, **[Vedant Jain](https://github.com/vedant-jain03)** and **[Aman Asrani](https://github.com/Asrani-Aman)**, for their invaluable guidance, and to our organization admin, **[Aboobacker MK](https://github.com/tachyons)**, for his unwavering support throughout the project.
