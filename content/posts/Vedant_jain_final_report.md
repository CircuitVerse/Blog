---
title: "CircuitVerse Platform Improvement: Final Report (GSoC 2022)"
date: 2022-09-11T09:25:55+05:30
draft: false
author: Vedant Jain
type: post
---

![gsoc22_final_phase](/images/vedant_gsoc22/final_phase/final_phase.png)

This blog is about the work we have done and goals we have accomplished in the GSoC'22.

Let's Dive in...

### Project Description
---
CircuitVerse is a Digital Logic Simulator on web. It is an educational tool for students interested in electronics to simulate and make circuits on their browser.

This project aimed to improve the main platform by integrating new features. So intially the project consist of 6 features but after mentor discussion we have added more features into the project context.

### Project goals
---
The features we have successfully implemented:
- gitlab authentication integration
- sso integration
- support multiple mentors for groups
- improve embed feature
- assignment restriction
- noticed integration (Notification Page)
- notification api(Mobile-app).
- suggested tags for project.
- circuitVerse contest.

### Feature: gitlab authentication integration
---
This feature enables user to authenticate using thier gitlab account in CircuitVerse. For achieving this, I used `omniauth-gitlab` gem. Initially, I faced issues because of the old version of omniauth gem in CircuitVerse, so I first update the gem along with it's dependencies and configurations. After omniauth update, gitlab authentication works smoothly. I also updated the documentation to integration application for config.

**PR**
- [build(deps): bump omniauth from 1.9.1 to 2.1.0](https://github.com/CircuitVerse/CircuitVerse/pull/3071)
- [feat: gitlab authentication integration](https://github.com/CircuitVerse/CircuitVerse/pull/3154)

### Feature: SSO Integration
---
SSO stands for Single-Sign On. I have used `devise_saml_authenticatable` gem. For the testing I used Okta IDP. I faced issues during integration but as always mentor guided me the way, and I was able to solve it.

**PR**
- [feat: sso integration](https://github.com/CircuitVerse/CircuitVerse/pull/3167)

### Feature: Support Multiple Mentors Support in Group
---
This feature enables group to have multiple mentor. There will be 1 primary mentor(owner), and primary mentor can add mentors, make member a mentor and vise-versa. Mentors can grade, CRUD, and reopen assignments. Ruturaj has already raised a PR for it and had implemented mot of the stuffs, but there is still need to rafactor, cleanup and stimulus JS migration.

- [Documentation](https://docs.circuitverse.org/#/chapter2/2cvforeducators?id=add-group-mentors)

**Owner view:**
![Screenshot from 2022-06-21 21-43-00](https://user-images.githubusercontent.com/76901313/174847736-fa1a2706-7072-41b9-9809-d8892e2b6522.png)

**Mentor View:**
![Screenshot from 2022-06-21 21-43-18](https://user-images.githubusercontent.com/76901313/174847726-b36fb375-88d4-49a9-bb38-3992eda4b112.png)


**PR**
- [Feature: Support multiple mentors for groups](https://github.com/CircuitVerse/CircuitVerse/pull/2096)
- [[documenation] : Support Multiple Mentors](https://github.com/CircuitVerse/CircuitVerseDocs/pull/334)

### Feature: Improve embed feature
---
Initially the embed feature was basic. This feature advance it by providing the customization options. When a user click on embed button, a popup will be displayed with the options to customize your embed.
The customization options:
- Iframe width and height.
- Border width and color.
- Optionally Disable stuff like Clock Enable/Clock-Time, Interval/Zoom, Display Name.
- Change theme.

![embed](/images/vedant_gsoc22/embed_img1.png)

Kartikay already have made a PR with the integration for Iframe width & height, border with & color. I worked on integrating advance options, revamp and cleanup.


**PR**
- [Improve embed feature](https://github.com/CircuitVerse/CircuitVerse/pull/2768)

### Feature: Assignment restriction
---
We already have element restrictions for the assignment i.e., to restrict the group members with the use of elements for the Project. 
But we have got quite a few complaints from professors that CircuitVerse allows cheating easily. For example, users can easily copy/paste any public circuit. They can give collaborators access to their own circuit and copy-paste etc. So it has been requested by professors to disable this feature. This PR enables that feature into CircuitVerse.

![assignment](/images/vedant_gsoc22/assignment_restriction_img1.png)

**PR**
- [feat: assignment restriction](https://github.com/CircuitVerse/CircuitVerse/pull/3091)

### Feature: Improve Notification Page
---
Notifications are very important aspect, we were using `activity_notification` gem before, but it makes the page lacky and the gem is not maintained any more, so we decided to shift to new gem, and we found `noticed` gem for it.

Noticed gem is really very easy to use and had really cool and amazing features. You can learn about the noticed gem [here](https://github.com/excid3/noticed).

We have covered 2 events for notification:
- Notify the author when someone forks the project.
- Notify the author when someone stars the project.

We have implemented a section in the navbar to get quick access to your notification.

![notification_2](/images/vedant_gsoc22/final_phase/notification_2.png)

##### Notification Page

Notification page for a respective user shows all the notification for the user logged in. You can mark a notification as read by clicking to it, or you can click **mark_all_as_read** to mark all notifications as read.

![notification_2](/images/vedant_gsoc22/final_phase/notification_1.png)

##### Challenges
The noticed implementation was comparatively easy, but the major challenge was to migrate the old data under the `activity_notifications` as both gem have different implementation, different schemas and methods. So we finally made a data migration file in which we made a script to migrate the data from `notification` table to `noticed_notification` table.

**PR**
- [feat: noticed integration (Notification Page)](https://github.com/CircuitVerse/CircuitVerse/pull/3243)

> We also reimplemented the web push notification, for which the PR is under review! There are some production issue we are facing, we are trying to solve it!

### Feature: Notification api(Mobile-app)
---
Notification api is used to provide the different endpoints for the Mobile-app. 

##### Endpoints:

- GET `/api/v1/notifications`

To get all the notification for current authorized user.
- PATCH `/api/v1/notifications/mark_as_read/:notification_id`

To mark a particular notification as read.
- PATCH `/api/v1/notifications/mark_all_as_read`

To mark all notifications as read.

**PR**
- [feat: notifications api](https://github.com/CircuitVerse/CircuitVerse/pull/3259)

### Feature: Suggest tags for Project
---
This feature intends to improve tagging feature in projects. This feature helps to suggest tags for the project to the user in the project edit page. The tags are extracted from circuit elements used, project name, description.

##### Progress

![suggested_tags](/images/vedant_gsoc22/final_phase/suggested_tags_preview.png)

- We were able to accomplish this feature to suggest tags from circuit elements and project name. Extracting valid tags from description needs more complex logic as description includes some data which are irrelevant to be suggested as tags for the project.

- We use `slim-select` which is `select2` alternative without jquery dependencies. [Slim-select](https://slimselectjs.com/) is an advanced select dropdown library.

> The PR is still under review and work is under progress.

##### Future Scope

This feature needs more solified logic to increase the accuracy of valid suggested tags.

**PR**
- [[feat] : suggested tags for the circuits based on the circuit data](https://github.com/CircuitVerse/CircuitVerse/pull/3295)

### Feature: CircuitVerse Contest
---
This feature intends to increase user engagements in CircuitVerse. Contest are for all users to showcase there awesome creation using CircuitVerse simulator and get chance to feature there creation in CircuitVerse **Featured Circuits**. Winner of the contest will automatically get featured(after deadline).The winning circuit is shortlisted by the maximum votes gained.

##### More

- Contest duration: 1 month(for now).
- Maximum Winners: 1 per contests(for now).
- Concurrent Contest not allowed.
- Maximum votes per user: 3.
- No limit to the circuit submission(for now).
- Duplicate circuits not allowed.
- User can vote the submission one and the action is not reversible.
- **Users can:**
  - Submit their circuit.
  - Withdraw there submission from contest(action is not reversible).
  - Vote other submission(maximum 3 per contest).
- **Admin can:**
  - Start new contest(other contest must have status: "completed").
  - Close the live contest(manually).
- Contest can be closed manually(admin) and automatically(active jobs scheduler).
- Users will get notified for each new contests.

> The feature is under testing phase.

##### Glimpse of the Contest

- **All Contest Page**

  Route: `/contests`
  ![all_contest_page](/images/vedant_gsoc22/final_phase/all_contest.gif)

- **Contest Page**

  Route: `/contests/:contest_id`
  ![contest_page](/images/vedant_gsoc22/final_phase/contest_page.gif)

- **Project Submission**

  Route: `/contests/:contest_id/new`
  ![project_submission](/images/vedant_gsoc22/final_phase/project_submission.gif)

- **Withdraw Submission**

  ![withdraw_submission](/images/vedant_gsoc22/final_phase/withdraw_submission.gif)

- **Vote Submission**

  ![vote_submission](/images/vedant_gsoc22/final_phase/vote_submission.gif)

- **Completed Contest & Winners**

  ![completed_contest](/images/vedant_gsoc22/final_phase/completed_contest.gif)

**PR**
- [[WIP] feat: weekly contest](https://github.com/CircuitVerse/CircuitVerse/pull/3303)

##### Future Scope
---
- To customize deadline of the contest.
- To have some prizes for the winning circuit author(user).
- Automate the contest creation process.
- Slack and twitter updates for new contest.

### CircuitVerse Main Platform Future Scope

Issue is created for this [here](https://github.com/CircuitVerse/CircuitVerse/issues/3316) and is open for suggetion. Feel free to suggest more features to add up in CircuitVerse Main Platform. Thanks in advance!!!

### Blog posts written
---
- [Community Bonding Period at CircuitVerse — Google Summer of Code 2022](https://dev.to/vedantjain03/community-bonding-period-at-circuitverse-google-summer-of-code-2022-43cd)
- [GSoC 2022 CircuitVerse | Week 1 Report](https://dev.to/vedantjain03/gsoc-2022-circuitverse-week-1-report-4h88)
- [GSoC 2022 CircuitVerse | Week 2 Report](https://dev.to/vedantjain03/gsoc-2022-circuitverse-week-2-report-519a)
- [GSoC 2022 CircuitVerse | Week 3 Report](https://dev.to/vedantjain03/gsoc-2022-circuitverse-week-3-report-4af1)
- [GSoC 2022 CircuitVerse | Week 4 Report](https://dev.to/vedantjain03/gsoc-2022-circuitverse-week-4-report-bl0)
- [GSoC 2022 CircuitVerse | Week 5 and 6 Report](https://dev.to/vedantjain03/gsoc-2022-circuitverse-week-5-and-6-report-2kpp)
- [GSoC 2022 CircuitVerse | Week 7 and 8 Report](https://dev.to/vedantjain03/gsoc-2022-circuitverse-week-7-and-8-report-2a71)
- [GSoC 2022 CircuitVerse | Week 9 and 10 Report](https://dev.to/vedantjain03/gsoc-2022-circuitverse-week-9-and-10-report-3e4p)
- [GSoC 2022 CircuitVerse | Week 11 and 12 Report](https://dev.to/vedantjain03/gsoc-2022-circuitverse-week-11-and-12-report-4n41)

### Experience

- Mentor: Aboobacker MK, Nitin Singhal, Pavan Joshi, Samiran Konwar
- Contributor: Vedant Jain

> I have experienced my best productive, learning phase of my life in GSoC with CircuitVerse. The mentors were so supportive. They helped me in every blocker, appreciate me in my good works and guided me for any failures. My bonding with mentors and other contributors becomes more close. I love contributing in CircuitVerse and will continue contributing in CircuitVerse. I wanted to thank specially Aboobacker, Ruturaj and Nitin for being great mentor. Pavan and Ayan for being so supportive during my starting phase in CircuitVerse. Devjit, Pulkit and Aman for being awesome co-workers and friend.

### Conclusion
---
This project was of 15 weeks(extended). We were able to accomplish most of the task we decided. There are many features coming up in the future projects as well.

Thanks for reading!!!
