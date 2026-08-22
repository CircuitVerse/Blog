---
title: "Enterprise & Institutional Organizations: GSoC 2026 Final Report"
date: 2026-08-21T00:00:00+05:30
draft: false
author: Naman Chhabra
tags: ["GSoC 2026", "CircuitVerse", "Backend", "Rails", "Organizations"]
type: post
---

![Enterprise and Institutional Organizations GSoC 2026 final report banner](/images/naman_gsoc_2026/banner.jpg)

**Hey everyone 👋**

Welcome to my final blog for **Google Summer of Code 2026** with **CircuitVerse**. For anyone new to it: CircuitVerse is a digital circuit simulation platform where circuits can be designed and simulated through a graphical interface. You can build anything from a single logic gate up to a complete CPU, though the software is aimed primarily at educational use.

This summer I worked on **Project 6: Enterprise & Institutional Organization Features**. In short: schools and colleges use CircuitVerse heavily, but the platform had no concept of an *institution*. Groups, mentors, and students all existed as loose pieces. My project introduces **Organizations** as a proper container for all of it, with roles, permissions, invitations, and a dashboard to manage everything.

## [Work Repository 🖥](https://github.com/CircuitVerse/CircuitVerse)

> **[Enterprise & Institutional Organization Features](https://summerofcode.withgoogle.com/programs/2026/projects/BEUG5iMM/)**
> Introduce Organizations end-to-end on CircuitVerse: a database foundation, a three-tier role system (Org Admin / Mentor / Member), Pundit-backed authorization, a full dashboard (Overview, Members, Settings), email-based member invitations, and organization-scoped groups and assignments, all rolled out safely behind a feature flag.

---

## Project Goals & Accomplishments

---

1. Figma UI/UX mockups for the complete Organizations experience
2. Core database schema: organizations table, organization_members table, and organization_id on groups for classroom nesting
3. Organization and OrganizationMember models, logo attachments, link validation, and a role enum
4. OrganizationsController and OrganizationMembersController
5. Pundit authorization policies for organizations and their members
6. Organizations index page with navbar access
7. Organization creation page and form
8. Organization dashboard with Overview / Members / Settings tabs
9. Members page with role filter, sorting, and pagination
10. Role management: change roles, remove members, leave an organization, and sole-admin protection
11. Email-based member invitations (backend + UI)
12. Organization-aware invitation emails
13. Nested group URLs under organizations
14. Assignments scoped under organization group URLs
15. Organization switcher in the dashboard header
16. Form and index UI refinements, browser-tab breadcrumbs, full i18n for all new copy
17. Everything behind the `:organizations` feature flag for a safe rollout

---

## 1. Designing It First 🎨

The project started with Figma mockups rather than code ([#7358](https://github.com/CircuitVerse/CircuitVerse/issues/7358)). I sketched the index page, the creation form, and the dashboard, and iterated on them with my mentors during community bonding before touching the schema. The shipped UI evolved past those early designs, but having a visual target made the first PRs much easier to scope.

---

## 2. The Foundation: Schema, Models & Authorization 🏗️

---
**Deliverable:** Under the hood, an organization is a real database entity with members, roles, and rules about who can do what. This section is the invisible 40% of the project that everything else stands on.

---

The data layer came together across a series of scoped issues: the core `organizations` table ([#7370](https://github.com/CircuitVerse/CircuitVerse/pull/7370)), the `organization_members` join table ([#7391](https://github.com/CircuitVerse/CircuitVerse/pull/7391)), and an `organization_id` column on groups so a classroom can nest inside its institution ([#7370](https://github.com/CircuitVerse/CircuitVerse/pull/7370)).

On top of that sit the two models ([#7451](https://github.com/CircuitVerse/CircuitVerse/pull/7451)). `Organization` has an attached logo (validated client-side for type and size before upload), a description, a location field ([#7563](https://github.com/CircuitVerse/CircuitVerse/pull/7563)), and up to five validated external links. `OrganizationMember` carries the role system as a plain Rails enum:

![Organization role enum](/images/naman_gsoc_2026/Organization_role_enum.png)

### Roles at a glance

| Capability | Org Admin | Mentor | Member |
| --- | :---: | :---: | :---: |
| Manage org  | ✅ | ❌ | ❌ |
| Add / remove org members | ✅ | ❌ | ❌ |
| Create new groups (classrooms) | ✅ | ✅ | ❌ |
| Manage / delete all groups | ✅ | ❌ | ❌ |
| Manage / delete assigned groups | ✅ | Owned only | ❌ |
| View dashboard | ✅ | ✅ | ✅ |
| Leave org | ✅* | ✅ | ✅ |

<small>*An admin can only leave if another admin remains, and if they are not the primary mentor of any group in the organization.</small>

The controllers ([#7457](https://github.com/CircuitVerse/CircuitVerse/pull/7457)) handle the CRUD and member management, and **Pundit policies** ([#7493](https://github.com/CircuitVerse/CircuitVerse/pull/7493)) decide who gets to do what. Authorization was where most of the careful thinking happened. A mentor must not be able to remove another member. A student must never reach admin actions. And the last remaining admin cannot demote or remove themselves, because that would leave the organization permanently unmanageable. The sole-admin protection is enforced server-side on update, destroy, and leave.

One design decision I like here: unauthorized access to an organization returns a **404, not a 403**. If you're not supposed to see an org, the app behaves as if it doesn't exist at all, which avoids leaking which private organizations are on the platform. Actions inside the members controller return an honest 403 instead, since at that point you already know the org exists.

Halfway through the summer, a large Pundit refactor landed on `master` (policy normalization plus a `verify_authorized` safety net).

---

## 3. Organization Pages: Index, Creation & the Dashboard 🖥️

---
**Deliverable:** Organizations are reachable straight from the navbar. You can browse the ones you belong to, create a new one with a proper form, and land on a dashboard with three tabs (Overview, Members, and Settings) that always tells you where you are.

---

With the foundation in place, the pages came next. The **index page** ([#7744](https://github.com/CircuitVerse/CircuitVerse/pull/7744)) lists your organizations as cards (with logos and a member count that caps at "1000+" rather than printing silly numbers) and is linked from the navbar. The **creation page** ([#7739](https://github.com/CircuitVerse/CircuitVerse/pull/7739)) hosts the organization form: name, description, location, external links you can add and remove dynamically, and a logo uploader with a live preview.

The **dashboard** ([#7701](https://github.com/CircuitVerse/CircuitVerse/pull/7701)) is built from ViewComponents. A shell component renders the tab navigation, with the form and social-links pieces as their own components. The **Overview** tab shows the organization's groups. The **Settings** tab ([#7747](https://github.com/CircuitVerse/CircuitVerse/pull/7747)) holds the edit form plus a Danger Zone: deleting an organization requires typing its name to confirm, and any groups inside it become standalone groups instead of vanishing.

A small touch I ended up liking a lot: the browser tab title updates as you move around, so a tab reads `Organizations / ABC Delhi - Members` and you can tell your tabs apart at a glance.

{{< video src="/videos/naman_gsoc_2026/org-creation-dashboard.mp4" type="video/mp4" preload="auto" >}}

---

## 4. Members & Role Management 👥

---
**Deliverable:** The Members tab is mission control for an organization's people. Admins can change roles, and remove members. Every destructive action sits behind a confirmation, and every rule is enforced on the server.

---

The members page ([#7771](https://github.com/CircuitVerse/CircuitVerse/pull/7771)) lists everyone with their role, filtering by role, sorting (by name by default, which was a review suggestion I agreed with, or by role or join date), and paginates for large institutions. Role changes and removals go through confirmation dialogs, and the same Pundit policies from the foundation section back every action. Members who aren't admins get a "Leave organization" action instead, with the sole-admin case blocked so an org can't orphan itself.

{{< video src="/videos/naman_gsoc_2026/members-management.mp4" type="video/mp4" preload="auto" >}}

---

## 5. Email-Based Member Invitations ✉️

---
**Deliverable:** Adding people is now just typing their emails and picking a role. Existing CircuitVerse users are added instantly. Everyone else gets an invitation email and joins automatically, with the right role, the moment they sign up.

---

This was the biggest single piece of the summer ([#7799](https://github.com/CircuitVerse/CircuitVerse/pull/7799)), and it shipped as two stacked PRs: a backend PR (models, migrations, controller, mailer) and a UI PR on top.

The original plan was an invite-token / shareable-link system, and an early version of it existed. After discussing it with my mentors, I ripped it out and rebuilt the flow around **email invitations**, the same way CircuitVerse Groups already work. Consistency won: users already understand the Groups flow, and reviewers can compare the two implementations side by side.

### How it works

Organizations reuse the existing `PendingInvitation` model instead of adding a new one. I extended it so an invitation belongs to *either* a group *or* an organization, and added a `role` column so the intended role survives sign-up:

```ruby
belongs_to :group, optional: true
belongs_to :organization, optional: true
```

The create action normalizes and validates the submitted emails, drops anyone who's already a member (and the current user), then either adds each person immediately or leaves them a pending invitation.

When an invited person signs up, a callback on `User` consumes their pending invitations inside a transaction and turns each one into the right membership: a group membership (plus the parent organization) for group invites, or an organization membership carrying the stored role for org invites.

### Why a `role` column? A lesson from Groups

While studying the Groups code, I found something interesting: Groups tracks mentorship with a boolean, but only applies it to users who *already exist*. Invite a brand-new email as a mentor in a Group, and they sign up as a plain member, because the pending invitation never stored the mentor flag and the intent is silently lost. My mentor asked why I wasn't just replicating the Groups approach, and this was the answer: organizations have three roles (a boolean can't represent them), and I wanted the invited role to actually survive sign-up. Storing the role on the invitation solves both.

### Hardening it

Review feedback (automated and human) pushed the implementation further, and every round made it better:

- **Canonical emails.** Every address is stripped and lowercased before any lookup or write, so `John@X.com` can't sneak past the existing-member check as a duplicate of `john@x.com`.
- **Race safety.** A unique index on `(organization_id, email)` plus `create_or_find_by!` means two simultaneous invites of the same address can't create duplicate rows or send duplicate emails.
- **Role precedence.** On sign-up I use `find_or_initialize_by` and set the role explicitly, so a direct org invitation's role applies even if a membership already exists from a group invite processed first.
- **A restored behavior.** My first refactor accidentally dropped the line that adds group invitees to their group's parent organization. Review caught it; I restored it, matching the original behavior exactly.
- **Graceful failures.** The create action rescues validation errors and redirects with an alert instead of blowing up with a 500.

### The UI and the mailer

The invite modal uses a **Select2** tag input: type emails, and space, comma, or Enter turns each one into a removable tag, with a role dropdown alongside. Two things bit me here. Select2 inside a Bootstrap modal needs `dropdownParent` pointed at the modal or the input becomes unclickable, and this codebase imports Stimulus as `'stimulus'` (not `'@hotwired/stimulus'`), which cost me an hour of a controller silently never connecting.

The invitation email itself had a real bug waiting: `PendingInvitationMailer` was written for groups only, so an organization invitation crashed it on a nil group. I made the mailer and its template organization-aware. Org invitees now get a proper "you've been added to *Organization Name*, sign up to access it" email, and group emails are untouched.

{{< video src="/videos/naman_gsoc_2026/invite-flow.mp4" type="video/mp4" preload="auto" >}}

---

## 6. Organization-Scoped Groups & Assignments 🗂️

---
**Deliverable:** Groups and assignments that belong to an organization now live under it, in structure and in URL. An institution's mentor navigates organization → group → assignment along one clean path.

---

An organization isn't much use if its classrooms float free. I nested group URLs under their parent organization ([#7756](https://github.com/CircuitVerse/CircuitVerse/pull/7756)) and then scoped assignments under those organization group URLs ([#7768](https://github.com/CircuitVerse/CircuitVerse/pull/7768)). The hierarchy shapes authorization naturally too, since access flows down from the org.

This area also produced the summer's most satisfying bug fix ([#7742](https://github.com/CircuitVerse/CircuitVerse/pull/7742)): org admins couldn't open groups inside their own organization. Chasing that one down was a good lesson in how routing scope and policy scope have to agree with each other.

{{< video src="/videos/naman_gsoc_2026/scoped-groups.mp4" type="video/mp4" preload="auto" >}}

---

## 7. Switcher & Polish 🔀

---
**Deliverable:** Belong to more than one organization? A switcher in the dashboard header hops between them. Around it, a round of UI refinements makes the whole feature feel finished rather than bolted on.

---

The **organization switcher** ([#7786](https://github.com/CircuitVerse/CircuitVerse/pull/7786)) sits in the dashboard header and lists the organizations you belong to; it stays out of the way when you only have one. The final stretch was a refinement pass ([#7785](https://github.com/CircuitVerse/CircuitVerse/pull/7785)): cleaner form and index styling, better empty states, and consistent i18n across every new string.

{{< video src="/videos/naman_gsoc_2026/switcher.mp4" type="video/mp4" preload="auto" >}}

---

## Pull Requests

**Some of the most important pull requests of the project. For the full set, see [all my CircuitVerse PRs](https://github.com/CircuitVerse/CircuitVerse/pulls?q=is%3Apr+author%3Anaman79820).**

| PR | What | Status |
|----|------|--------|
| [#7370](https://github.com/CircuitVerse/CircuitVerse/pull/7370) | Add `organizations` table | Merged |
| [#7391](https://github.com/CircuitVerse/CircuitVerse/pull/7391) | Add `organization_members` table | Merged |
| [#7451](https://github.com/CircuitVerse/CircuitVerse/pull/7451) | Organization & OrganizationMember models | Merged |
| [#7493](https://github.com/CircuitVerse/CircuitVerse/pull/7493) | Pundit RBAC policies + tests | Merged |
| [#7457](https://github.com/CircuitVerse/CircuitVerse/pull/7457) | Organization & member controllers | Merged |
| [#7563](https://github.com/CircuitVerse/CircuitVerse/pull/7563) | Add `location` field | Merged |
| [#7701](https://github.com/CircuitVerse/CircuitVerse/pull/7701) | Organization Dashboard UI | Merged |
| [#7747](https://github.com/CircuitVerse/CircuitVerse/pull/7747) | Organization Settings (Edit) page | Merged |
| [#7756](https://github.com/CircuitVerse/CircuitVerse/pull/7756) | Scope group routes to organizations | Merged |
| [#7768](https://github.com/CircuitVerse/CircuitVerse/pull/7768) | Scope assignments under org group URLs | Merged |
| [#7771](https://github.com/CircuitVerse/CircuitVerse/pull/7771) | Members management & invitation UI | Merged |
| [#7785](https://github.com/CircuitVerse/CircuitVerse/pull/7785) | Organization form and index UI refinements | Merged |
| [#7799](https://github.com/CircuitVerse/CircuitVerse/pull/7799) | Email-based member invitations (backend) | Merged |
| [#7744](https://github.com/CircuitVerse/CircuitVerse/pull/7744) | Organizations index page with navbar access | Merged |
| [#7739](https://github.com/CircuitVerse/CircuitVerse/pull/7739) | Organization creation page | Merged |
| [#7742](https://github.com/CircuitVerse/CircuitVerse/pull/7742) | Fix: org admins could not open their own org groups | Merged |
| [#7786](https://github.com/CircuitVerse/CircuitVerse/pull/7786) | Organization switcher | Merged |

---

## Learning 📚

Coming into this summer I could write Rails. Coming out of it, I understand it.

**The Rails foundation, properly this time.** Building a feature this size meant working through nearly every layer of the framework rather than the handful I was comfortable with. Migrations, models and associations, validations, callbacks, enums, controllers, strong parameters, policies, ViewComponents, Stimulus controllers, mailers, i18n, feature flags, and the test suite around all of it. Things I had used before without really understanding, like `has_many :through` or `after_commit` callbacks, became tools I now reach for deliberately because I know what they do and when they bite.

**Databases and query craft.** A lot of my growth was below the model layer. I learned how to design a schema that holds up (a role-carrying join table, uniqueness enforced in both the model and the database so duplicates are impossible even under a race), and how to write queries that do not fall apart at scale. Sorting, filtering, and paginating members taught me to think in terms of what SQL my Active Record actually produces, and to reach for `pluck` and `exists?` where loading full objects would be wasteful.

**Indexing, caching, and optimization.** Adding a unique compound index to make invitation creation race-safe was the moment indexes stopped being an abstraction. I learned why concurrent index builds matter on a live table, why foreign keys are added without validating existing rows, and how counter caches and eager loading avoid the N+1 queries that quietly make a page slow. The `strong_migrations` gem blocked me repeatedly, and every single time it was right to.

**Reading a large codebase.** Perhaps the most useful skill of all. Almost every good decision I made started with reading how CircuitVerse already solved a similar problem. The invitation flow is the clearest example: instead of inventing something, I traced how Groups handle invitations end to end, found where their approach fell short, and built on it. Knowing a codebase deeply is what lets you extend it without fighting it.

**Working the way a team works.** Small, stacked, reviewable pull requests. Design decisions discussed before the code is written. Review feedback treated as free senior-engineer attention rather than criticism. Security asked about first on a multi-tenant feature, not last. These habits shaped the project more than any single technical choice.

---

## Weekly Blogs

| Week | Blog Link |
| ---- | --------- |
| Week 1 | [Read](https://medium.com/@naman79820/coding-period-week-1-%EF%B8%8F-51c6b4a33001) |
| Week 2 | [Read](https://medium.com/@naman79820/coding-period-week-2-1f3c6f6476f4) |
| Week 3 | [Read](https://medium.com/@naman79820/coding-period-week-3-23e177eb3913) |
| Week 4 | [Read](https://medium.com/@naman79820/coding-period-week-4-3a758d2a7d1f) |
| Week 5 | [Read](https://medium.com/@naman79820/coding-period-week-5-891892d4606a) |
| Week 6 | [Read](https://medium.com/@naman79820/midterm-blog-dashboard-ui-and-a-surprise-called-subgroups-coding-period-week-6-7-%EF%B8%8F-99e7cd052e43) |
| Week 7 | *Mid-term report*  [Read](https://blog.circuitverse.org/posts/naman_phase_1_report/) |
| Week 8 | [Read](https://medium.com/@naman79820/a-mistake-i-own-and-slowing-down-a-bit-coding-period-week-8-%EF%B8%8F-9fe2d94640ec) |
| Week 9 | [Read](https://medium.com/@naman79820/grinding-on-views-planning-sso-and-standing-up-for-something-coding-period-week-9-99ded6f348a5) |
| Week 10 | [Read](https://medium.com/@naman79820/slugs-become-uuids-and-views-cross-the-halfway-mark-coding-period-week-10-ce3a804b6b18) |
| Week 11 | [Read](https://medium.com/@naman79820/daily-meets-two-hour-tangents-and-a-tshirt-that-finally-arrived-coding-period-week-11-aceb11e9e227) |
| Week 12 | *This blog itself* |

---

## Experience 🙏

- **Mentors:** [Vedant Jain](https://github.com/vedant-jain03), [Yashika Jotwani](https://github.com/yashikajotwani12), [Pratham More](https://github.com/PRATHAM2002-DS)
- **Org Admin:** [Vedant Jain](https://github.com/vedant-jain03), [Aboobacker MK](https://github.com/tachyons)
- **Contributor:** [Naman Chhabra](https://github.com/naman79820)

Working on CircuitVerse this summer was the most rewarding stretch of building I've done. Organizations touched almost every layer of the app, from migrations to Pundit policies to Stimulus controllers, and getting to carry a feature that size from a Figma mockup all the way to production taught me more than any course could have.

Thank you to my mentors for the reviews, the discussions, and the patience with my questions, and the whole CircuitVerse community for making it easy to keep showing up. Every round of feedback made the feature better, and me too.

Here's to institutions finding a proper home on CircuitVerse, and to everything that gets built on top of it next.

Thanks for reading! 🎉

---
