---
title: "CircuitVerse Platform Improvement: Phase 1 Report (GSoC 2022)"
date: 2022-07-25T09:25:55+05:30
draft: false
author: Vedant Jain
type: post
---

![gsoc22_phase_1](/images/vedant_gsoc22/gsoc_22_phase_1_report.png)

This blog is about my work in the first phase of Google Summer of Code 2022 with CircuitVerse. 

## Project Description
CircuitVerse is a Digital Logic Simulator on web. It is an educational tool for students interested in electronics to simulate and make circuits on their browser.

My project aimed to improve the main platform by integrating new features. So intially my project consist of 6 features but after mentor discussion we have added more features into the project context. 

In the first phase we have covered:
- Gitlab Integration (Week 1)
- SSO Integration(Week 1 & 2)
- Support Multiple Mentors(Week 2 & 3)
- Improve Embed Feature(Week 3 & 4)
- Assignment Restriction PR(Week 5)
- POC for Weekly Contest(Week 5)
- Some minor bugs & documenation(Week 5 & 6)
- Improve Notification Page(Week 6).

### Gitlab Integration

This feature enables user to authenticate using thier gitlab account in CircuitVerse. For achieving this, I used `omniauth-gitlab` gem. Initially, I faced issues because of the old version of omniauth gem in CircuitVerse, so I first update the gem along with it's dependencies and configurations. After omniauth update, gitlab authentication works smoothly. I also updated the documentation to integration application for config.

**PR**
- [build(deps): bump omniauth from 1.9.1 to 2.1.0](https://github.com/CircuitVerse/CircuitVerse/pull/3071)
- [feat: gitlab authentication integration](https://github.com/CircuitVerse/CircuitVerse/pull/3154)

### SSO Integration

SSO stands for Single-Sign On. I have used `devise_saml_authenticatable` gem. For the testing I used Okta IDP. I faced issues during integration but as always mentor guided me the way, and I was able to solve it.

**PR**
- [feat: sso integration](https://github.com/CircuitVerse/CircuitVerse/pull/3167)

### Support Multiple Mentors Support in Group

This feature enables group to have multiple mentor. There will be 1 primary mentor(owner), and primary mentor can add mentors, make member a mentor and vise-versa. Mentors can grade, CRUD, and reopen assignments. Ruturaj has already raised a PR for it and had implemented mot of the stuffs, but there is still need to rafactor, cleanup and stimulus JS migration.

- [Documentation](https://docs.circuitverse.org/#/chapter2/2cvforeducators?id=add-group-mentors)

**Owner view:**
![Screenshot from 2022-06-21 21-43-00](https://user-images.githubusercontent.com/76901313/174847736-fa1a2706-7072-41b9-9809-d8892e2b6522.png)

**Mentor View:**
![Screenshot from 2022-06-21 21-43-18](https://user-images.githubusercontent.com/76901313/174847726-b36fb375-88d4-49a9-bb38-3992eda4b112.png)


**PR**
- [Feature: Support multiple mentors for groups](https://github.com/CircuitVerse/CircuitVerse/pull/2096)
- [[documenation] : Support Multiple Mentors](https://github.com/CircuitVerse/CircuitVerseDocs/pull/334)

### Improve embed feature
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

### Assignment restriction
We already have element restrictions for the assignment i.e., to restrict the group members with the use of elements for the Project. 
But we have got quite a few complaints from professors that CircuitVerse allows cheating easily. For example, users can easily copy/paste any public circuit. They can give collaborators access to their own circuit and copy-paste etc. So it has been requested by professors to disable this feature. This PR enables that feature into CircuitVerse.

![assignment](/images/vedant_gsoc22/assignment_restriction_img1.png)

**PR**
- [feat: assignment restriction](https://github.com/CircuitVerse/CircuitVerse/pull/3091)

### Improve notifications page
Currently, CircuitVerse uses activity_notification gem for the Notifications, but the gem is not maintained any more and the notification page is very lagging. So we decided to replace the gem, and we found noticed gem by chris oliver of Gorails.

- Navbar Notifications
![navbar_notification](/images/vedant_gsoc22/notification_img1.png)

- Notification Page
![notification_page](/images/vedant_gsoc22/notification_img2.png)

**PR**
- [feat: noticed integration (Notification Page)](https://github.com/CircuitVerse/CircuitVerse/pull/3243)

> This is under progress and will complete in first week of Second Phase.

## CircuitVerse Community
I have experienced the best time of my engineering in GSoC with CircuitVerse. The mentors, members and contributors are so supportive. I have learned a lot of things. I can't believe that we are in the middle of the GSoC.

## Conclusion
My project is on the track according to the proposal deliverables. We have got new ideas while working on the current. All over, the first phase was great.

### All Feature PR's:

- [feat: gitlab authentication integration](https://github.com/CircuitVerse/CircuitVerse/pull/3154)
- [feat: sso integration](https://github.com/CircuitVerse/CircuitVerse/pull/3167)
- [Feature: Support multiple mentors for groups](https://github.com/CircuitVerse/CircuitVerse/pull/2096)
- [Improve embed feature](https://github.com/CircuitVerse/CircuitVerse/pull/2768)
- [feat: assignment restriction](https://github.com/CircuitVerse/CircuitVerse/pull/3091)
- [feat: noticed integration (Notification Page)](https://github.com/CircuitVerse/CircuitVerse/pull/3243)
