---
title: "CircuitVerse Assignment Enhancement Suite | GSoC 2026 | Final Report"
date: 2026-10-29T21:47:42+05:30
draft: false
author: "Akanksha Trehun"
image: "/images/akanksha-gsoc26/01-the-subgroups-section-before-any-team-exists.jpg"
tags: ["GSoC 2026", "CircuitVerse", "LTI 1.3", "Autograding", "Final Report"]
type: post
---

The time was 11.30pm and the day was 30th of April 2026. I was sitting at my desk with a compiler design assignment open in front of me, pretending to be deeply engrossed in college work. In reality, I hadn't made an ounce of progress since my focus was completely hijacked by my GSoC application tab open on screen. I kept telling myself I’d just check in the morning, but my fingers had a mind of their own on the refresh button. When the page finally updated in my favour, all pretense of studying vanished.

Flash forward to today: I'm writing my final Google Summer of Code 2026 report. Looking back across these past months, the journey has been an intense, incredible blur from tearing apart and rebuilding LTI 1.3 specs from scratch, to navigating PR feedback loops, untangling complex Rails authorization policies, and building an end-to-end autograding engine for digital circuits.

Before diving into the code, here is a bit of context on how I got here.

## About Me

I’m Akanksha Trehun (magic-peach), a Computer Science & Engineering student at St. Joseph Engineering College, Mangalore in India.

My relationship with CircuitVerse actually started back in my 3rd semester during a Digital Principles of Design lab. Our professor projected CircuitVerse onto the screen to demonstrate how logic gates, adders, and flip-flops worked in practice rather than just static textbook diagrams. That 20-minute demo stuck with me.

Fast forward to my 6th semester: when the GSoC 2026 accepted organizations list came out and I saw CircuitVerse, it clicked immediately. I knew this was the right time to apply. Seventh and eighth semesters quickly get swallowed by final-year capstone projects and placement prep, so waiting for a "more convenient" moment meant it would never happen.

I’ll be completely transparent—while I was familiar with git workflows and open-source contributions, the CircuitVerse backend runs on Ruby on Rails. Coming into February, I had zero prior experience with Ruby or Rails. It wasn’t part of my college coursework, and my initial glance at the repository felt overwhelming.

So, I took it one step at a time:

Watched beginner Rails tutorials and read through the CircuitVerse developer docs.

Started small—fixing broken documentation, updating outdated specs, and tackling minor issue scopes.


Balancing proposal writing at 5:45 AM before morning lectures wasn't easy, but seeing everything come together made every early alarm worth it.

## The Project

This summer, I worked on the Assignment Suite & Classroom Workflow Enhancement project under the mentorship of **Anas Khan**, **Aman Asrani**, and **Aboobacker M K** as org admin.

The main goal was to solve key operational bottlenecks for educators using CircuitVerse at scale:

**LTI 1.3 & Canvas Integration:** Upgrading authentication from legacy OAuth 1.0a / LTI 1.1 to LTI 1.3 (OAuth 2.0 / OIDC) so institutions can seamlessly connect Canvas/Moodle with secure grade passback and roster sync.

**Subgroup & Team Management:** Adding nested classroom structures to let instructors divide large course groups into smaller project teams with dedicated submission tracking.

**Autograding & Test Suite Editor:** Building a background execution workflow where instructors can define input/output test cases to automatically grade student circuit submissions.

**Starter Circuit Templates:**  Creating a template library so teachers can distribute pre-wired base circuits attached directly to assignments.

## How It Unfolded

My early contributions started with foundational bug fixes—like scoping AssignmentsController queries to policy scopes and refining invitation rules—which helped me understand CircuitVerse's internal data model inside out.

By March, I drafted a comprehensive proposal complete with an end-to-end proof-of-concept branch demonstrating how LTI 1.3, subgroups, and autograding tied together. After clearing two technical interview rounds including one scheduled right before my compiler design lab exam. I was thrilled to join the 2026 cohort


This post is about what that means for you, whether you teach, study or run a CircuitVerse install, and what you should expect to see and when.

* * *

## Who this is for

| If you are: | What changes for you |
|---|---|
| **An instructor** | Assignments launch from your LMS, grades go back to your gradebook, class lists stay in sync, you can split a class into teams, hand every student the same starting circuit and have a circuit graded by tests you write |
| **A student** | You open the assignment from your course without a second login, you start from the circuit your instructor prepared, you see which tests passed, and you can work on one shared circuit with your team |
| **An LMS admin** | You register CircuitVerse as an LTI 1.3 tool using a standard configuration, instead of the older shared-secret setup |
| **A CircuitVerse admin or maintainer** | Every new feature is behind a flag or a setting, so you can merge code without switching anything on |

* * *

## What you can use today, and what is coming

| Feature | Who it helps | Status |
|---|---|---|
| Grade saved in CircuitVerse before it is sent to the LMS (LTI 1.1) | Instructors using LMS grading today | **Merged** ([#7647](https://github.com/CircuitVerse/CircuitVerse/pull/7647)) |
| Foundation for LTI 1.3: platform registration, tool configuration, token checking, resource links, service tokens | LMS admins | **Merged**, switched off by default |
| LTI 1.3 sign-in from the LMS | Everyone | In review ([#7746](https://github.com/CircuitVerse/CircuitVerse/pull/7746)) |
| Deep linking, roster sync, grade passback services | Instructors | In review |
| Autograding with test suites | Instructors, students | In review |
| Subgroups (teams) | Instructors, students | In review |
| Circuit templates | Instructors, students | In review |

* * *

## If you are an instructor

### Open an assignment from your LMS without a second login

LTI is the standard that lets CircuitVerse sit inside Canvas or Moodle. The old version, LTI 1.1, proves a request is genuine. Canvas has deprecated that for new installs. LTI 1.3 uses signed tokens instead, so your LMS admin can register CircuitVerse the normal modern way.

What this means for you: your students click the assignment in the course and land in CircuitVerse already signed in. What it means for safety: a launch is only trusted if three checks pass (a state value, a one-time nonce, and a match to the platform that started the login), and the signature on the token is verified.

We identify people by the LMS's stable `sub` identifier, scoped to the platform, and never by email. An email in a launch is whatever the LMS has on file, and users can often edit it themselves, so matching on it would let someone sign in as somebody else.

```ruby
User.find_or_create_by!(provider: "lti", uid: "#{deployment.id}:#{payload['sub']}")
```

The token validator is built to refuse the known tricks:

```ruby
Lti::JwtValidator.validate!(token, deployment:, nonce:)
encoded_token.verify_signature!(algorithm: "RS256", key: key)
```

### Grades reach the gradebook, and never disagree with CircuitVerse

This one is **live today** for LTI 1.1. Before, CircuitVerse pushed the score to LMS first and saved it second. If the local save failed, the LMS showed a grade that CircuitVerse had never recorded. Now the grade is saved first ([#7647](https://github.com/CircuitVerse/CircuitVerse/pull/7647)). The review also found that a forged request could wipe a teacher's grading session before it was rejected, so stale context is now cleared only after a launch is verified.

*`app/controllers/grades_controller.rb`:*

```ruby
unless @grade.save
  render json: { error: "Grade is invalid" }, status: :bad_request
  return
end
return unless Flipper.enabled?(:lms_integration, current_user) && session[:is_lti]

submit_grade_to_lms(project, assignment, grade)
```

For 1.3, the score push ([#8029](https://github.com/CircuitVerse/CircuitVerse/pull/8029)) sends autograded scores through the LMS's line item. It logs a failure instead of hiding it, and it uses a separate identity per LMS platform, so a student who uses two LMSs never has a score sent to the wrong one.

*`Autograder::AgsPush`:*

```ruby
sub = link && project.author&.lti_sub_for(link.lti_deployment)

Lti::Score.publish(link.lineitem_url, token, user_id: sub, score_given: given, score_maximum: 100)
true
rescue Lti::AccessToken::Error, Lti::Score::Error => e
  Rails.logger.error("Autograder::AgsPush failed for project #{project.id}: #{e.message}")
  false
```

### Pick CircuitVerse content from your course page

Deep linking ([#7772](https://github.com/CircuitVerse/CircuitVerse/pull/7772), [#7777](https://github.com/CircuitVerse/CircuitVerse/pull/7777)) lets you choose one of your circuits or assignments from inside the LMS, and the choice is posted back as a signed message.

### Keep the class list in sync

Today a roster enters CircuitVerse once, at launch. A student who drops the course stays in the group. The new **Sync Roster** button ([#8043](https://github.com/CircuitVerse/CircuitVerse/pull/8043)) fetches the current roster, adds who joined, removes who left and records when it last worked. Only people who came from the LMS are removed. A student you added directly stays. I chose a button over an automatic sync so a flaky LMS shows up as a visible last synced time, not a silent failure.

*`GroupsController#sync_roster`:*

```ruby
token = Lti::AccessToken.fetch(link.lti_deployment, [Lti::Membership::SCOPE], signing_key: Lti::KeyManager.private_key)
members = Lti::Membership.fetch(link.context_memberships_url, token)
ActiveRecord::Base.transaction do
  Lti::RosterImport.call(@group, members, link.lti_deployment)
  Lti::RosterDrop.call(@group, members, link.lti_deployment)
  @group.update!(last_synced_at: Time.current)
end
```

### Write tests and let CircuitVerse grade submissions

You write a test suite in an editor on the assignment page ([#7907](https://github.com/CircuitVerse/CircuitVerse/pull/7907)). Each test case is a named set of input values and expected outputs, and you can mark it **hidden**. When a student submits, a background job runs the circuit and stores a result ([#7942](https://github.com/CircuitVerse/CircuitVerse/pull/7942)). Three settings give you control ([#7926](https://github.com/CircuitVerse/CircuitVerse/pull/7926)):

- **Partial credit:** give a fraction of the score, or all or nothing
- **Maximum attempts:** how many graded runs a student gets
- **Reveal test cases before submission:** whether students see the cases up front

*`AutogradeJob`:*

```ruby
def perform(project_id)
  project = Project.find_by(id: project_id)
  assignment = project&.assignment
  testbench = assignment&.testbench
  return unless testbench

  max = assignment.max_attempts
  return if max && GradingResult.where(project: project).count >= max

  begin
    result = Autograder::Runner.call(project: project, testbench: testbench)
    breakdown = result.groups
    score = (result.score * 100).round(2)
  rescue Autograder::Runner::RunnerError
    breakdown = []
    score = nil
  end

  GradingResult.create!(project: project, suite_snapshot: testbench.data,
                        breakdown: breakdown, score: score)
end
```

The score is turned into the scale your assignment uses (percent or letter), and an LMS-linked assignment is always a percentage, because that is what the gradebook expects ([#7944](https://github.com/CircuitVerse/CircuitVerse/pull/7944)).

*`GradeScaleMapper`:*

```ruby
LETTER_THRESHOLDS = [[90, "A"], [80, "B"], [70, "C"], [60, "D"], [50, "E"]].freeze

def self.call(assignment, fraction)
  return unless mappable?(assignment)

  percent = (fraction * 100).round.clamp(0, 100)
  case scale_for(assignment)
  when "letter" then LETTER_THRESHOLDS.find { |min, _| percent >= min }&.last || "F"
  else percent.to_s
  end
end

def self.scale_for(assignment)
  assignment.lti_integrated? ? "percent" : assignment.grading_scale
end
```

Every result stores a copy of the suite it ran against. If you edit your tests later, grades already given still show the tests they were earned against, so you never see a grade next to a test it was not run on.

### Split a class into teams

Instructors asked for teams, so a group page gets a **Subgroups** section ([#8053](https://github.com/CircuitVerse/CircuitVerse/pull/8053)). You create a team, then choose its members from the parent group's list. Each team gets a progress line such as 2 assignments, 5 submitted, 3 graded ([#8058](https://github.com/CircuitVerse/CircuitVerse/pull/8058)), and you can designate one **team project** that everyone in the team collaborates on ([#8064](https://github.com/CircuitVerse/CircuitVerse/pull/8064)). A REST API covers the same actions ([#8056](https://github.com/CircuitVerse/CircuitVerse/pull/8056)).

A subgroup is just a group with a parent, so everything that already works on groups (assignments, grades, mentors) works on a team. Creating a team does not send the "new group" email, so sorting a class into ten teams does not send ten emails. Teams do not show up in "my groups" next to your real classes.

*`Group`:*

```ruby
scope :top_level, -> { where(parent_group_id: nil) }
validates :name, uniqueness: { scope: :parent_group_id, case_sensitive: false }, if: :subgroup?
```

*Sharing the team project reuses `Collaboration`:*

```ruby
belongs_to :team_project, class_name: "Project", optional: true
validate :team_project_author_must_be_member, if: :team_project_id?

def share_team_project
  group_members.where.not(user_id: team_project.author_id).pluck(:user_id).each do |user_id|
    Collaboration.find_or_create_by!(project_id: team_project_id, user_id: user_id)
  end
end
```

![The subgroups section before any team exists](/images/akanksha-gsoc26/01-the-subgroups-section-before-any-team-exists.jpg)

![Creating a subgroup from the group page](/images/akanksha-gsoc26/02-creating-a-subgroup-from-the-group-page.jpg)

![The subgroups section on a group page](/images/akanksha-gsoc26/03-the-subgroups-section-on-a-group-page.jpg)

![Managing a subgroup's members](/images/akanksha-gsoc26/04-managing-a-subgroup-s-members.jpg)

![Confirming the deletion of a subgroup](/images/akanksha-gsoc26/05-confirming-the-deletion-of-a-subgroup.jpg)

![A subgroup page with a breadcrumb back to the parent group](/images/akanksha-gsoc26/06-a-subgroup-page-with-a-breadcrumb-back-to-the-pare.jpg)

### Give every student the same starting circuit

Templates are circuits you can save, share and use as the base of an assignment (in review, [#8065](https://github.com/CircuitVerse/CircuitVerse/pull/8065) to [#8107](https://github.com/CircuitVerse/CircuitVerse/pull/8107)). The flow:

1. **Save as template** from one of your projects. An assignment project cannot be a template, because it is a student's working copy.
2. Choose who can find it: **private** (only you), **group** (people who share a group with you, plus those groups' mentors) or **public** (everyone).
3. **Browse the gallery**, filtered by tag.
4. When you create an assignment, **pick a base template**. Each student's project starts from a copy when they open the assignment.
5. **Fork** a template to customise it, and see **how many assignments use it**.

![A circuit saved as a template](/images/akanksha-gsoc26/07-a-circuit-saved-as-a-template.jpg)

![Saving an assignment project as a template is refused](/images/akanksha-gsoc26/08-saving-an-assignment-project-as-a-template-is-refu.jpg)

![The template gallery](/images/akanksha-gsoc26/09-the-template-gallery.jpg)

![The gallery filtered by a tag](/images/akanksha-gsoc26/10-the-gallery-filtered-by-a-tag.jpg)

![The template options on the assignment form](/images/akanksha-gsoc26/11-the-template-options-on-the-assignment-form.jpg)

![Choosing a base template when creating an assignment](/images/akanksha-gsoc26/12-choosing-a-base-template-when-creating-an-assignme.jpg)

![The fork button on a template page](/images/akanksha-gsoc26/13-the-fork-button-on-a-template-page.jpg)

![The forked copy as a normal project](/images/akanksha-gsoc26/14-the-forked-copy-as-a-normal-project.jpg)

![Usage counts in the gallery](/images/akanksha-gsoc26/15-usage-counts-in-the-gallery.jpg)

![Usage count on the template page](/images/akanksha-gsoc26/16-usage-count-on-the-template-page.jpg)

A template can also carry its own test suite, and an assignment that uses it gets a copy of the tests, unless you have already written your own ([#8092](https://github.com/CircuitVerse/CircuitVerse/pull/8092)).

Visibility is enforced in one place, so what the gallery lists, what the picker offers and what the server accepts are always the same list. A template you cannot see returns a 404 if you guess its URL:

```ruby
scope :templates_for, lambda { |user|
  return where(is_template: true).template_public if user.nil?

  groups = Group.where(id: GroupMember.where(user_id: user.id).select(:group_id))
                .or(Group.where(primary_mentor_id: user.id)).select(:id)
  peers = GroupMember.where(group_id: groups).select(:user_id)
  mentors = Group.where(id: groups).select(:primary_mentor_id)
  shared = template_group.where(author_id: peers).or(template_group.where(author_id: mentors))
  where(is_template: true).and(template_public.or(by(user.id)).or(shared))
}
```

* * *

## If you are a student

- **You open the assignment from your course and you are signed in.** No second account.
- **You start from your instructor's circuit.** The copy is made when you open the assignment, so you get the template as it stands then. If its author made it private in the meantime, the copy is checked again, so you are never handed a circuit you should not have.
- **You see which tests passed.** A results page shows your score and one row per test case. Hidden tests show only pass or fail: the inputs and expected outputs are not printed, so you cannot write a circuit that satisfies a list instead of solving the problem. If your instructor allows revealing, you see everything.
- **Only people who should see your result can.** The page uses the same access rule as the project itself, which for an assignment means you, your instructor and your collaborators.
- **Teams share one circuit.** If your group is split into teams, everyone in your team collaborates on the team project.

This is how the results page decides what to print. It reads only the saved copy of the suite, so rows always line up with their verdicts:

```ruby
def visible_test_groups(result, reveal_hidden)
  snapshot = result.suite_snapshot["groups"] || []
  result.breakdown.each_with_index.flat_map do |group, i|
    hidden = snapshot.dig(i, "hidden") && !reveal_hidden
    Array(group["cases"]).each_with_index.map do |c, j|
      { "label"   => case_label(group["label"], j),
        "passed"  => c["passed"], "hidden" => hidden,
        "inputs"  => hidden ? nil : pin_values(snapshot.dig(i, "inputs"), j),
        "outputs" => hidden ? nil : pin_values(snapshot.dig(i, "outputs"), j) }
    end
  end
end
```

And this is the check that runs when a template is copied into your project:

```ruby
def template_circuit_data
  return unless circuit_template
  return if circuit_template.project_access_type == "Private" && !template_author_mentors_group?

  circuit_template.project_datum&.data
end
```

* * *

## If you run an LMS or a CircuitVerse install

- **Nothing turns on by itself.** LTI 1.3 endpoints return 404 until an operator enables the `lti_advantage` flag. The launch creates user accounts, so I did not want that live the moment code merged. The autograde settings are also gated by a flag.
- **LTI 1.1 keeps working.** The 1.3 code is built on `ruby-jwt` next to it, and the `ims-lti` dependency stays for the old path.
- **You register CircuitVerse the standard way.** There is a platform registration model (`LtiDeployment`), a JWKS endpoint and a tool configuration document, all merged. The configuration includes Canvas placements, so instructors can find the tool.
- **Autograding needs a simulator service.** The app calls a separate service to run a circuit, because the simulator lives in the browser and Rails cannot run it. You set `SIMULATOR_RUNNER_URL` and `SIMULATOR_RUNNER_TOKEN`. There are no defaults on purpose: a missing URL fails loudly instead of sending student circuits to localhost. **That service is not in this repository yet**, so autograding will not work until it exists.

```bash
SIMULATOR_RUNNER_URL=
SIMULATOR_RUNNER_TOKEN=
```

```ruby
HTTP.timeout(**TIMEOUTS)
    .auth("Bearer #{ENV.fetch('SIMULATOR_RUNNER_TOKEN')}")
    .post(endpoint, json: { circuit: circuit, testbench: testbench.data })
```

* * *

## What to expect

- **Timing.**
  - Expect features to appear gradually, not all at once.
  - Nothing from LTI 1.3 will be visible to instructors until the sign-in pull request ([#7746](https://github.com/CircuitVerse/CircuitVerse/pull/7746)) merges and an operator enables the flag.
- **Things that behave as designed that are new.**
  - A template's visibility is separate from the project's access. A project can be public without being offered as a template.
  - Collaborators cannot save someone else's circuit as a template. Only the author, an admin or a mentor of the author's group can.
  - If you delete a template that an assignment uses, the assignment keeps working and simply loses the link.

* * *

## How it was built, in short

Four habits shaped every feature, and they are the reason I trust the parts that are finished.

1. **Small pull requests.** I built everything in the form of small pull requests in order to make them simple to review and easier to understand at a later date by future contributors
2. **Check access where the data moves.** The biggest review findings were all the same question: someone is about to be given something, so was anyone checking whether they should have it at that moment? That is why a template is checked again at copy time, and why hidden test cases are redacted on the results page and not in the database.
3. **Reuse before inventing.** A test case is a group with `n: 1`, the simulator's own format. A team project reuses `Collaboration`. A subgroup is a `Group` with a parent.

* * *

## Pull requests

**Merged:**

| PR | What it does |
|---|---|
| [#7647](https://github.com/CircuitVerse/CircuitVerse/pull/7647) | Saves a grade locally before pushing it to the LMS |
| [#7654](https://github.com/CircuitVerse/CircuitVerse/pull/7654) | `LtiDeployment` model for platform registrations |
| [#7659](https://github.com/CircuitVerse/CircuitVerse/pull/7659) | JWKS and tool configuration endpoints |
| [#7715](https://github.com/CircuitVerse/CircuitVerse/pull/7715) | `Lti::JwtValidator` for `id_token` verification |
| [#7763](https://github.com/CircuitVerse/CircuitVerse/pull/7763) | `LtiResourceLink` for launch service endpoints |
| [#7764](https://github.com/CircuitVerse/CircuitVerse/pull/7764) | `Lti::AccessToken` for platform service calls |

**In review:**

| Area | PRs |
|---|---|
| LTI 1.3 sign-in and services | [#7746](https://github.com/CircuitVerse/CircuitVerse/pull/7746), [#7765](https://github.com/CircuitVerse/CircuitVerse/pull/7765), [#7767](https://github.com/CircuitVerse/CircuitVerse/pull/7767), [#7772](https://github.com/CircuitVerse/CircuitVerse/pull/7772), [#7777](https://github.com/CircuitVerse/CircuitVerse/pull/7777), [#7779](https://github.com/CircuitVerse/CircuitVerse/pull/7779), [#7781](https://github.com/CircuitVerse/CircuitVerse/pull/7781) |
| Autograding | [#7836](https://github.com/CircuitVerse/CircuitVerse/pull/7836), [#7906](https://github.com/CircuitVerse/CircuitVerse/pull/7906), [#7907](https://github.com/CircuitVerse/CircuitVerse/pull/7907), [#7926](https://github.com/CircuitVerse/CircuitVerse/pull/7926), [#7940](https://github.com/CircuitVerse/CircuitVerse/pull/7940), [#7942](https://github.com/CircuitVerse/CircuitVerse/pull/7942), [#7944](https://github.com/CircuitVerse/CircuitVerse/pull/7944), [#8003](https://github.com/CircuitVerse/CircuitVerse/pull/8003), [#8029](https://github.com/CircuitVerse/CircuitVerse/pull/8029) |
| Subgroups and roster | [#8038](https://github.com/CircuitVerse/CircuitVerse/pull/8038), [#8043](https://github.com/CircuitVerse/CircuitVerse/pull/8043), [#8046](https://github.com/CircuitVerse/CircuitVerse/pull/8046), [#8048](https://github.com/CircuitVerse/CircuitVerse/pull/8048), [#8053](https://github.com/CircuitVerse/CircuitVerse/pull/8053), [#8055](https://github.com/CircuitVerse/CircuitVerse/pull/8055), [#8056](https://github.com/CircuitVerse/CircuitVerse/pull/8056), [#8058](https://github.com/CircuitVerse/CircuitVerse/pull/8058), [#8064](https://github.com/CircuitVerse/CircuitVerse/pull/8064) |
| Templates | [#8065](https://github.com/CircuitVerse/CircuitVerse/pull/8065), [#8068](https://github.com/CircuitVerse/CircuitVerse/pull/8068), [#8069](https://github.com/CircuitVerse/CircuitVerse/pull/8069), [#8070](https://github.com/CircuitVerse/CircuitVerse/pull/8070), [#8084](https://github.com/CircuitVerse/CircuitVerse/pull/8084), [#8092](https://github.com/CircuitVerse/CircuitVerse/pull/8092), [#8100](https://github.com/CircuitVerse/CircuitVerse/pull/8100), [#8102](https://github.com/CircuitVerse/CircuitVerse/pull/8102), [#8107](https://github.com/CircuitVerse/CircuitVerse/pull/8107) |

* * *

## What comes next

1. Get the stack reviewed and merged in order, starting with LTI 1.3 sign-in.
2. Fix the known gaps above, beginning with removing a student from their teams when they leave the parent group.
3. Land the simulator service, so autograding can run for real.
4. A screen for authoring a test suite on a template.
5. A short guide for instructors and LMS admins moving from LTI 1.1 to 1.3.

If you teach with CircuitVerse and want to try any of this, or hit one of the gaps above, open an issue or comment on the pull request. Real classroom feedback is the most useful thing the stack can get now.

* * *

## Acknowledgements

I would like to express my gratitude to my Org Admin **Aboobacker M K and my mentors, Anas Khan** and **Aman Asrani**, for the reviews that shaped this project.

Thank you to the CircuitVerse community and contributors for this wonderful platform.

Thank you to Google Summer of Code for the opportunity to code, learn and become a better developer.
