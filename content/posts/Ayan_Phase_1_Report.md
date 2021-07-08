---
title: "LMS Integration: Phase 1 Report (GSoC 2021- Ayan Biswas)"
date: 2021-07-02T21:32:37+05:30
draft: true
author: Ayan Biswas
type: post
---

![GSoC](/images/gsoc_cover.png)

This blog describes my works done for 📚 [LMS Integration](https://summerofcode.withgoogle.com/projects/#6282924346834944) project during Google Summer of Code 2021 🖥.

The overall goal of the project is to make CircuitVerse compatible with as much as LMSs possible.

#### About my Project

Currently CircuitVerse supports it's inbuilt LMS(Learing Management System) where teacher can directly create assignments and students can submit circuits in the form of projects at CircuitVerse, and after evaluations teacher grades them.

Lot of institutions uses their own lms (like Moodle,Canvas etc) for their academic works and which are obviously not compatible with our platform CircuitVerse, our main challenge is to integrate as much as many LMSs with CircuitVerse such that a teacher can use CircuitVerse without leaving their favourite LMSs.

#### Major Goals Achieved in First Phase

Here are the changes that I have done before the first evaluation

* The codebase of CircuitVerse made [LTI (Learning Tools Interoperability)](https://www.imsglobal.org/activity/learning-tools-interoperability) compatible such that any LMS (which supports LTI) can be connected with the assignments of CircuitVerse.

* The **UI developed for generation of the required keys and secrets** to connect an assignment with an external LTI supported LMS (like Moodle/Canvas).

![Assignment Form UI](/images/ayan-biswas-GSoC2021/Ayan_LMS_First_formUI.png)

Group page UI is also changed such that previously generated credentilas can be viewed by teacher in the group page.

![Group page UI](/images/ayan-biswas-GSoC2021/Ayan_LMS_First_GroupUI.png)

After clicking on the **Show LMS Credentials Button** the following modal will open and from here teachers can copy-paste the credentials in their desired Learning Management Systems.

![LMS Credentials Modal](/images/ayan-biswas-GSoC2021/Ayan_LMS_First_lmsmodal.png)

##### Here are some of the related PRs of my work [#2292](https://github.com/CircuitVerse/CircuitVerse/pull/2292) , [#2312](https://github.com/CircuitVerse/CircuitVerse/pull/2312)

All the works related to this project can be found in the branch ```lms-lti``` branch, checkout the code [here](https://github.com/CircuitVerse/CircuitVerse/tree/lms-lti)

#### Future Goals

For the upcoming coding period it is going to be a little bit hectic and as part of the project following are the major goals to accomplish in the next phase of coding

* Completing the **feature of marks syncing between external LMSs (like Moodle/Canvas) and CircuitVerse**

* **Creating the documentation of the setup process of CircuitVerse assignments with various LMSs for teachers** such that they can integrate the assignments of CircuitVerse on their own.

#### Experience

Engaging in the beautiful community like CircuitVerse is an excellent oppurtunity for me, I also want to thank my mentors [Satvik Ramaprasad](https://github.com/satu0king/), [Aboobacker MK](https://github.com/tachyons) and [Shivansh Srivastava](https://github.com/Shivansh2407) for their extreme support for reviewing my code, as well as for continuously giving me the suggestions of various good practice for development in ```Ruby on Rails``` .

#### Read my GSoC Blogs

I have written a few blogs during this period, I will be more than happy if anyone gets benifitted by my blogs, please have a read....

1. [GSoC’21 Week 3+4 Experience @CircuitVerse](https://ayanbiswas184.medium.com/gsoc21-week-3-4-experience-circuitverse-156e8a19988d)

2. [GSoC’21 Week 1+2 Experience @CircuitVerse](https://ayanbiswas184.medium.com/gsoc21-week-1-2-experience-circuitverse-186f0daffe5d)

3. [GSoC’21 Community Bonding Period @CircuitVerse](https://ayanbiswas184.medium.com/gsoc21-community-bonding-period-circuitverse-605131ed5167)

4. [My Journey to Google Summer of Code 21 with CircuitVerse and insights on the Proposal for GSoC](https://ayanbiswas184.medium.com/my-journey-to-google-summer-of-code-21-with-circuitverse-and-insights-on-the-proposal-for-gsoc-7038888d71c8)

Thank you for reading 🎉 Happy coding 🖥
