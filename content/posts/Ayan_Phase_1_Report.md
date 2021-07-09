---
title: "LMS Integration: Phase 1 Report (GSoC 2021- Ayan Biswas)"
date: 2021-07-02T21:32:37+05:30
draft: false
author: Ayan Biswas
type: post
---

![GSoC](/images/gsoc_cover.png)

This blog describes my work done for 📚 [LMS Integration](https://summerofcode.withgoogle.com/projects/#6282924346834944) project during Google Summer of Code 2021 🖥.

The overall goal of the project is to make CircuitVerse compatible with as much as LMSs possible.

#### About my Project

Currently CircuitVerse supports its inbuilt LMS(Learning Management System) where teacher can directly create assignments and students can submit circuits in the form of projects at CircuitVerse, and after evaluations teacher grades them.

Mostly, institutions use their own LMS like Moodle, Canvas etc for their academic work, which are obviously not compatible with our platform CircuitVerse. Our main challenge is to integrate as many LMS' with CircuitVerse so that a teacher can use CircuitVerse without leaving their favorite LMS.

#### Major Goals Achieved in First Phase

Here are the changes that I have done before the first evaluation

* CircuitVerse's code base made [LTI (Learning Tools Interoperability)](https://www.imsglobal.org/activity/learning-tools-interoperability) easily compatible with any LMS (which supports LTI) such that they can be connected with the assignments of CircuitVerse.

* **UI was developed for generation of the required keys and secrets** to connect an assignment with an external LTI supported LMS (like Moodle/Canvas).

![Assignment Form UI](/images/ayan-biswas-GSoC2021/Ayan_LMS_First_formUI.png)

Group page UI is also changed such that previously generated credentials can be viewed by teacher in the group page.

![Group page UI](/images/ayan-biswas-GSoC2021/Ayan_LMS_First_GroupUI.png)

After clicking on the **Show LMS Credentials Button** the following modal will open and from here teachers can copy-paste the credentials in their desired Learning Management Systems.

![LMS Credentials Modal](/images/ayan-biswas-GSoC2021/Ayan_LMS_First_lmsmodal.png)

##### Here are some of the related PRs of my work [#2292](https://github.com/CircuitVerse/CircuitVerse/pull/2292) , [#2312](https://github.com/CircuitVerse/CircuitVerse/pull/2312)

All the work related to this project can be found in the branch ```lms-lti``` branch, checkout the code [here](https://github.com/CircuitVerse/CircuitVerse/tree/lms-lti)

#### Slight changes from the Proposal

In the proposal I have proposed **how to integrate CircuitVerse as an Moodle Plugin**, but later on we thought to integrate CircuitVerse as an LTI tool to the LMSs such that it can be delivered as an extension to a maximum number of LMSs, currently it is already tested in two of the popular LMS like Moodle and Canvas and hoping to test CircuitVerse in more number of LMSs in the upcoming coding phase.

#### Future Goals

For the upcoming coding period it is going to be a little bit hectic and as part of the project following are the major goals to accomplish in the next phase of coding

* Completing the **feature of marks syncing between external LMSs (like Moodle/Canvas) and CircuitVerse**

* **Creating the documentation of the setup process of CircuitVerse assignments with various LMSs for teachers** such that they can integrate the assignments of CircuitVerse on their own.

#### Experience

Engaging in the beautiful community like CircuitVerse is an excellent opportunity for me, I also want to thank my mentors [Satvik Ramaprasad](https://github.com/satu0king/), [Aboobacker MK](https://github.com/tachyons) and [Shivansh Srivastava](https://github.com/Shivansh2407) for their extreme support for reviewing my code, as well as for continuously giving me the suggestions of various good practice for development in ```Ruby on Rails``` .

#### Read my GSoC Blogs

I have written a few blogs during this period, I will be more than happy if anyone gets benefited by my blogs, please have a read....

1. [GSoC’21 Week 3+4 Experience @CircuitVerse](https://ayanbiswas184.medium.com/gsoc21-week-3-4-experience-circuitverse-156e8a19988d)

2. [GSoC’21 Week 1+2 Experience @CircuitVerse](https://ayanbiswas184.medium.com/gsoc21-week-1-2-experience-circuitverse-186f0daffe5d)

3. [GSoC’21 Community Bonding Period @CircuitVerse](https://ayanbiswas184.medium.com/gsoc21-community-bonding-period-circuitverse-605131ed5167)

4. [My Journey to Google Summer of Code 21 with CircuitVerse and insights on the Proposal for GSoC](https://ayanbiswas184.medium.com/my-journey-to-google-summer-of-code-21-with-circuitverse-and-insights-on-the-proposal-for-gsoc-7038888d71c8)

Thank you for reading 🎉 Happy coding 🖥
