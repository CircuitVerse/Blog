---
title: "Enterprise Organizations for CircuitVerse | GSoC 2026 | Phase 1 Report"
date: 2026-07-05T00:00:00Z
draft: false
author: Naman Chhabra
tags: ["GSoC 2026", "CircuitVerse", "Rails", "Organizations", "Backend", "Multi-Tenancy"]
type: post
---

> **TL;DR:** Over the first six weeks of Google Summer of Code 2026 we built the foundation of **Enterprise Organizations** for CircuitVerse: the database and models, a full **role-based access control** layer with Pundit, the controllers, and a complete **Organization Dashboard** with member management and settings. The backend foundation is merged or in review, and the UI is being shipped as a set of small, focused pull requests behind a feature flag.
>
> None of this would have been possible without the patient guidance of my mentors **[Vedant Jain](https://github.com/vedant-jain03)**, **[Yashika Jotwani](https://github.com/yashikajotwani12)**, and **[Pratham More](https://github.com/PRATHAM2002-DS)**.

---

## 1. Where this project fits

CircuitVerse is used by hundreds of thousands of learners and educators, and increasingly by whole institutions. But there was no first-class way for a university, a department, or a team to manage itself on the platform. There was no shared space to organize their members and groups under one roof.

That is what **Enterprise Organizations** sets out to solve. The goal is a scoped, multi-tenant layer where an institution can create an organization, invite members with different roles, and manage its groups, with the groundwork laid for single sign-on and custom branding later. Phase 1 is about building that foundation the right way: a solid data model, airtight authorization, and a clean, low-friction interface.

---

## 2. Community bonding recap (May)

The community bonding period set the rhythm for everything that followed. After results, our first mentor meet kicked off, and we've had one **every Wednesday** since. We used those early calls to talk through the full implementation plan and sequence the work, and jumped into **Figma** to design the organization pages so we had a visual target before writing code. The first **database PRs** went up early too, so the foundation was already in motion by the time the coding period began.

One nice part of the bonding period was CircuitVerse's **Mergathon**, a fun community drive to get everyone active and clear out the backlog of stale, long-forgotten pull requests. I got properly stuck in, mostly closing out old PRs that had been sitting around for ages, and it turned into a great excuse to explore the codebase from top to bottom before starting my own feature. Getting that familiar with the project early paid off for the rest of the phase.

---

## 3. Phase 1 sprint log

### Sprint 1 (25–31 May): Foundation first

Week one was all about the database. We decided early that the smart move was to get the foundation rock solid before building anything on top of it. The PRs for the **`organizations`** and **`organization_members`** tables went up, along with the necessary alterations to the existing `users` and `groups` tables so everything fit together.

These weren't one-and-done PRs. The organization schema went through several rounds of review, back and forth, refinements, and more refinements across the whole week before it finally merged. It was my first merged PR of the coding period. It's "just" a database table on paper, but knowing what it's going to hold up eventually, it hit different.

![Organization database schema](/images/naman_gsoc_2026/DB.png)

- **PR:** [Add organizations table](https://github.com/CircuitVerse/CircuitVerse/pull/7370)
- **PR:** [Add organization_members table](https://github.com/CircuitVerse/CircuitVerse/pull/7391)

### Sprint 2 (1–7 Jun): Wrapping the data layer

The `organization_members` PR came together and wrapped up the database layer cleanly. With the schema in place, the **models** PR went up, and the **policy** and **controller** work was lined up next. I had a dedicated call scheduled with Pratham Bhaiya to go over the authorization direction before writing it, with the plan being to get the policy PR out before the next Wednesday meet, no delays.

A key design decision landed here: a user should never be able to join the same organization twice or hold two roles in it. We enforced this on both layers, with a model validation *and* a matching unique database index, so duplicates are impossible even under a race.

![Organization and OrganizationMember models](/images/naman_gsoc_2026/models.png)

- **PR:** [Organization & OrganizationMember models + associations](https://github.com/CircuitVerse/CircuitVerse/pull/7451)

### Sprint 3 (8–14 Jun): Authorization & RBAC

I had a focused **RBAC call with Pratham Bhaiya** to plan the policy layer, covering how roles and permissions should be structured, before writing a single line. That conversation saved a lot of guesswork. The **policy PR** went up with its accompanying specs, along with the **controllers**, and in the Wednesday meet we talked through which edge cases mattered now versus later. The call was clear: establish the foundation first, handle edge cases after, with no over-engineering before the base is solid.

By the end of this sprint, the entire backend foundation was in place: **both DB PRs merged**, and **models, controllers, and policies** all done and up for review. Each layer shipped with its own **RSpec tests**, so the models, controllers, and policies all came with the coverage to back them up rather than being added as an afterthought. Looking back at week one, where I was just getting a single table merged, to a full tested stack of DB, models, controllers, and policies in three weeks felt like a real chunk of work.

![RBAC policy structure](/images/naman_gsoc_2026/RBAC.png)

![Controller ER diagram](/images/naman_gsoc_2026/Controller_ER_Diagram.png)

- **PR:** [Pundit policies for Organization & Group RBAC + tests](https://github.com/CircuitVerse/CircuitVerse/pull/7493)
- **PR:** [Organization & Member controllers](https://github.com/CircuitVerse/CircuitVerse/pull/7457)

### Sprint 4 (15–21 Jun): Into the frontend

With the backend written and in review, we moved ahead and started on the **views**. Most of the UI came together quickly, but the number of edge cases I had to reason through on my own genuinely surprised me. Building an interface where actions are gated by role, states change based on data, and nothing breaks for a standalone versus an organization-owned resource is a lot more subtle than it looks from the outside. But it came together.

We also added the **`location`** field to organizations end to end: the migration, model validation (max 100 chars), and the UI.

- **PR:** [Add location column + validation](https://github.com/CircuitVerse/CircuitVerse/pull/7563)

### Sprint 5 (22–28 Jun): The dashboard, polished

This sprint the frontend really took shape. We finished the planned views, but the first pass was functional rather than polished. Taking it to the mentor meet, we got solid direction on the design and reworked it, and the **Organization Dashboard PR** went up. It went from "works" to genuinely looking the part, closely matching what the mentors had described.

The dashboard is a single page with tabs for **Groups**, **Members**, and **Settings**, and two features I'm particularly happy with: a **live, debounced member search** with role filtering (no "Apply" button), and a **real-time slug availability check** that previews and validates the organization's URL as you type.

![Organization dashboard](/images/naman_gsoc_2026/dashboard.png)

- **PR:** [Organization Dashboard UI](https://github.com/CircuitVerse/CircuitVerse/pull/7568)

### Sprint 6 (29 Jun–5 Jul): Splitting PRs & member management

Based on mentor feedback this sprint, the large dashboard PR was **split into small, focused, stacked PRs** (one for the dashboard, one for the settings page, one for member management), which made reviews far faster and sharper. We worked through a detailed round of review comments across them, several of them security-related: gating the organization param behind the feature flag on create only (to prevent org-hijacking through the edit form), making the "leave organization" action fail gracefully instead of erroring, and guarding the group authorization against invalid input.

We also built the **Member Management page** with the goal of making it as low-friction as possible: an admin changes a member's role with a **single click** on an inline dropdown, adds members through a clean slide-over, and removes them inline, with no modals for the common actions.

- **PR:** [Organization Settings (Edit) page](https://github.com/CircuitVerse/CircuitVerse/pull/7612)

---

## 4. What the feature looks like

### Database & Models

The feature rests on two tables, `organizations` and `organization_members`, with members joining through a role-carrying join table. Organizations use `FriendlyId` for clean, human-readable URL slugs, and data integrity is guaranteed on two layers (a uniqueness validation plus a unique DB index) so a user can only ever hold one membership, and one role, per organization.

### Authorization & Roles (RBAC)

Every organization has three roles (**Admin**, **Mentor**, and **Member**) modelled cleanly with **Pundit**. A dedicated policy handles organization-scoped groups, so an org admin can manage the groups inside their organization while standalone groups keep their existing rules. Getting the create-versus-update permissions right was the crux here: it's what stops a user from injecting an organization ID to move a group somewhere they don't control.

### Organization Dashboard

The dashboard is the home of an organization. The tabs switch instantly on the client and sync to the URL (`?tab=members`), so a refresh or the back button keeps you on the right tab. Member search and role filtering apply live, and the slug checker gives you instant feedback on your organization's URL before you ever hit save.

{{< video src="/videos/naman_gsoc_2026/Dashboard.mp4" type="video/mp4" preload="auto" >}}

### Member Management & Settings

Managing members is built to be fast: one-click inline role changes, a slide-over for adding members, and inline removal, all protected by policy checks. The Settings page lets admins update everything about their organization (name, description, location, visibility, logo, links) and includes a **Danger Zone** for deletion, guarded by a type-to-confirm modal so nothing is deleted by accident.

### Shipping safely with a feature flag

Because this feature is being built and merged incrementally, every organization-facing action is gated behind the **`:organizations` Flipper flag**. The code can be merged and deployed without any of it being reachable by real users until it's complete and approved, so there's little risk of accidentally rolling out a half-baked feature before it's ready.

---

## 5. Where things stand

| Deliverable | Status |
| --- | --- |
| Organization & Member models, schema | **Merged** |
| Pundit RBAC policies + tests | **Merged** |
| RSpec tests (models, controllers, policies) | **Merged** |
| `location` field | **Merged** |
| Controllers (orgs, members, groups) | **In review** |
| Organization Dashboard UI | **In review** |
| Settings / Edit page | **In review** |
| Member Management page | **In progress** |

---

## 6. Lessons & learnings

- **Foundation before features.** Getting the DB, models, and policies solid before touching UI meant everything built on top of it actually worked. Rushing upward on a shaky base would have cost more later.
- **Talk to your mentor before you write the code.** The RBAC call with Pratham Bhaiya replaced a lot of guesswork with a clear plan. The best design decisions this phase came *before* the first line was written.
- **Small PRs win.** My early PRs were large and hard to review. Splitting them into a clean, stacked sequence made reviews faster and feedback sharper, a lesson I'll carry through Phase 2.
- **Security is the first question, not the last.** On a multi-tenant feature, "who's allowed to do this, and can it be bypassed?" has to come first. Several of my review fixes were exactly this, closing subtle authorization gaps in the edit flows.
- **Multiple review rounds are a good sign.** They mean people care about getting it right.

---

## 7. Looking ahead (Phase 2 targets)

- Get the remaining stacked PRs (dashboard, members, settings) through review and merged.
- Build **serializers and an API** so the feature works on the **mobile app**, not just the web.
- Add **Single Sign-On (SSO)** so institutions can log in through their own identity providers (OIDC / SAML).
- Add **custom branding and subdomain** support for organizations.
- Wire existing groups and classrooms more deeply under organizations, and add an invite/notification **mailer**.

The foundation from Phase 1 sets us up for a much more powerful second half.

---

## Acknowledgements

Huge thanks to the entire **CircuitVerse community** for making this such a rewarding experience. A special thank you to my mentors, **[Vedant Jain](https://github.com/vedant-jain03)**, **[Yashika Jotwani](https://github.com/yashikajotwani12)**, and **[Pratham More](https://github.com/PRATHAM2002-DS)**, for their detailed reviews, the weekly meets, and their patience in walking me through the tricky calls.

This has been one of the most formative stretches of my journey so far, and I'm genuinely excited for what's next. 🚀
