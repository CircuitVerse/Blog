---
title: "CircuitVerse Platform Improvements: Final Report"
date: 2020-08-28T16:16:00+05:30
draft: false
author: Aayush Gupta ([aayush-05](https://github.com/aayush-05))
---

This is the final Blog Report summarizing the work done during Google Summer of Code 2020.
Here, are the more detailed Phase 1 and Phase 2 Reports:
* [CircuitVerse Platform Improvements: Phase 1 Report](https://cvblog.netlify.app/posts/aayush_phase_1_report/)
* [CircuitVerse Platform Improvements: Phase 2 Report](https://cvblog.netlify.app/posts/aayush_phase_2_report/)

## Mentors
* [Satvik Ramaprasad](https://github.com/satu0king)
* [Nitin Singhal](https://github.com/nitin10s)
* [Aboobaker MK](https://github.com/tachyons)

## Project Objectives
* Crafting UI designs and Redeveloping all CircuitVerse's web application frontend screens.
* To Refactor complete Frontend codebase written in Embedded Ruby and JavaScript setting up custom design and code standards, writing system tests and improving code quality.
* Make the platform GDPR compliant to be officially launched in EU regions providing users with complete transparency and control over their data and activity.

## Pull Requests made
* [Fix footer responsiveness for all displays](https://github.com/CircuitVerse/CircuitVerse/pull/1391)
* [Finalise UI for About/Contribute/Teachers Page](https://github.com/CircuitVerse/CircuitVerse/pull/1443)
* [New Navbar](https://github.com/CircuitVerse/CircuitVerse/pull/1451)
* [Finalise Edit Group Name page](https://github.com/CircuitVerse/CircuitVerse/pull/1456)
* [Finalise New Group page](https://github.com/CircuitVerse/CircuitVerse/pull/1461)
* [Finalise Groups Page 2.0](https://github.com/CircuitVerse/CircuitVerse/pull/1485)
* [Finalise Group Details page](https://github.com/CircuitVerse/CircuitVerse/pull/1478)
* [Finalise project details page](https://github.com/CircuitVerse/CircuitVerse/pull/1495)
* [Finalise search page - Project section | Search by Tag](https://github.com/CircuitVerse/CircuitVerse/pull/1497)
* [Finalise Edit Profile page](https://github.com/CircuitVerse/CircuitVerse/pull/1501)
* [Finalise New Project | Edit Project pages](https://github.com/CircuitVerse/CircuitVerse/pull/1504)
* [Finalise New Assignment | Edit Assignment pages](https://github.com/CircuitVerse/CircuitVerse/pull/1505)
* [Finalise Editor Picks page](https://github.com/CircuitVerse/CircuitVerse/pull/1506)
* [Finalise Examples page](https://github.com/CircuitVerse/CircuitVerse/pull/1507)
* [Finalise Comments Section ](https://github.com/CircuitVerse/CircuitVerse/pull/1511)
* [Finalise Assignments Page | Add Project submission description](https://github.com/CircuitVerse/CircuitVerse/pull/1514)
* [Finalise user profile page](https://github.com/CircuitVerse/CircuitVerse/pull/1522)
* [Finalise home page](https://github.com/CircuitVerse/CircuitVerse/pull/1524)
* [Implemented Backend for Multiple Mentors functionality in a Group](https://github.com/CircuitVerse/CircuitVerse/pull/1559)
* [Finalise User Search page](https://github.com/CircuitVerse/CircuitVerse/pull/1580)
* [Code cleanup for Groups](https://github.com/CircuitVerse/CircuitVerse/pull/1597)
* [New Mailer](https://github.com/CircuitVerse/CircuitVerse/pull/1600)
* [Authentication System Revamp - Login/Register setup moved to Popups (On Hold)](https://github.com/CircuitVerse/CircuitVerse/pull/1602)
* [Code Cleanup for Projects](https://github.com/CircuitVerse/CircuitVerse/pull/1611)
* [Authentication Revamp | User Delete Functionality](https://github.com/CircuitVerse/CircuitVerse/pull/1617)
* [Add GDPR check confirmation](https://github.com/CircuitVerse/CircuitVerse/pull/1625)

## Blog posts written
To dive even deeper; have a look at the weekly blogs I had been writing describing the work in progress:
* [How I got selected as a GSoC student?](https://medium.com/@aayush05/how-i-got-selected-as-a-gsoc-student-b5ab076446b)
* [Trying my first hand at designing…](https://medium.com/@aayush05/trying-my-first-hand-at-designing-d94859f8d3f3)
* [Not everytime things go as planned](https://medium.com/@aayush05/not-everytime-things-go-as-planned-35bcb4452c5)
* [Look back on the Community Bonding period](https://medium.com/@aayush05/look-back-on-the-community-bonding-period-e4bd69f9d218)
* [Back on Track; let’s pace up](https://medium.com/@aayush05/back-on-track-lets-pace-up-fe42fe085d76)
* [Leaving no element UnStyled](https://medium.com/@aayush05/leaving-no-element-unstyled-c7b65a1ebd29)
* [Wrapping up for First Evaluations](https://medium.com/@aayush05/wrapping-up-for-first-evaluations-62873c5a0c5f)
* [Review Time](https://medium.com/@aayush05/review-time-6212b11b8f3c)
* [Finale: The Beginning](https://medium.com/@aayush05/finale-the-beginning-9f1287889d92)
* [Finale: Sailing through the midway](https://medium.com/@aayush05/finale-sailing-through-the-midway-6352c64ca47f)

## Work Done
### Phase 1
#### Designing User Interface
Google Summer of Code started off with me trying my hands for the first time on designing User Interfaces/Experiences. With guidance from my mentor Nitin, I designed some screens for the CircuitVerse platform. Learnt a lot about consistency, ease of access; finally having some screens promoted to the final prototype which afterwards got developed and merged to master.

#### Revamping CircuitVerse Platform
After the UI designs got approved and finalised, I moved on to convert them up into code. This was a huge task, redesigning the complete platform would mean touching upon every single screen the user (or even the admin) would ever see on the platform. Started off with some static screens to understand how the flow should be; slowly and steadily moved on to get each and every screen on the platform redeveloped.

#### Design Guide
Documentation plays a key role and helps new contributors or community members to easily guide through and keep everything in sync with the thought process the platform has been laid out. A design guide would help other contributors to maintain consistency when designing new UI for new features. Or even it would help other CircuitVerse applications to have a similar design language keeping everything sync.

### Phase 2
#### Refactoring Frontend Codebase
With big projects, along with creating code one major factor that comes is how maintainable that code is. With so many contributors pushing their code snippets, it is essential to set up some code standards keeping the code cleanup and understandable for new contributors joining in the community.
Therefore, along with the revamp I refactored the frontend codebase creating some custom standards for how new code should be added to keep everything clean, easy to understand and guide through.
This involved breaking the screens into components and using those or variations of those components through the platform. It even helps to keep the platform consistent when moving between screens.

#### Multiple mentors functionality for a Group
This has been the most requested feature on my Project. With university classes moving online; there was a need to support multiple mentors for a single group. This helps multiple Professors or Teaching Assistants keep in charge of members and assignments in a group. With guidance from Satvik, I developed this by introducing a new relation in the database schema, mentorship much similar to the Project Collaborations already in place on the platform.

#### New Mailer
With new User Interface, there comes a need to develop new mailer to keep everything the user receives in similar design language which eases out the effort of understanding new information again.
I developed the new Mailer in accordance with the revamped UI and Design Guide; keeping everything fully responsiveness across all devices (crucial for mail templates). As a bonus, the Custom Mail Admin interface has also been redesigned similar to new UI providing admins with some good User Interface too.

### Phase 3
#### Popup Authentication system (Put on Hold)
Popups help enhancing the overall User Experience on the platform avoiding the various redirects and information loss happen while using the traditional full screens forms. To improve the User Experience on the CircuitVerse platform, I developed a new Authentication system working on top of [devise](https://github.com/heartcombo/devise) working with in place popups and avoiding those extra redirects.
*The popup system has been put on hold as of now due to some security concerns and compatibility issues with how devise handles required logins.*

#### Making the platform GDPR
Security is a huge concern while processing User data. To make the CircuitVerse platform completely transparent and give users back the control over their data; the platform has been made GDPR compliant. This also helps to officially launch the platform in EU regions. As a bonus, I also fixed one major security bug exposing direct access to Projects database from the deployed server routes.
Now, as a part of GDPR compliance, User is asked for an Approval check before he could use that platform. Apart from this, users now have the ability to Delete their accounts completely or Export their data on the platform (*not developed yet*).

## Experience
It has been an amazing experience working with the CircuitVerse community. I can't tell how much I have learnt in these past two months, ranging altogether from UI Design principles, weaving enriching platform UI experiences to how a web application serving millions of users run at its backend.
Kudos to all my mentors (specially Aboobacker) for keeping up with all the pings and doubts I had throughout the journey, helping me whenever I was stuck.
Looking forward to contribute even more to CircuitVerse and the whole Open-source community.
