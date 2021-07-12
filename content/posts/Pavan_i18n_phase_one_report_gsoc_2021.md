---
title: "Internationalization (I18n) | Phase 1 Report | GSoC'2021"
author: "Pavan Joshi"
date: 2021-07-10T14:26:18+05:30
draft: false
type: post
url: '/posts/2021/i18n-phase-one-report'
---

![i18n-gsoc-cover](/images/i18n_gsoc_cover.png)

This blog report summarizes my work which was done during the first phase of **_Google Summer of Code 2021_** coding period. First phase of GSoC'2021 was started from June 7 and officially end on July 12.

 ### My Project Details 📋

> **_[Internationalization](https://summerofcode.withgoogle.com/projects/#6365426910494720) mainly aims at creating I18n architecture for the CircuitVerse platforms in order to localize or translate them into multiple languages._**

My aim during GSoC is to create I18n infrastructure so that CircuitVerse platforms can be internationalized into global languages and platforms can be emerged as a ***Global Platform***.

During GSoC my aim is to create ***I18n architecture*** for ***5 major technologies*** used in different CircuitVerse platforms.

* Ruby on Rails (CircuitVerse Main Platform)
* JavaScript (CircuitVerse Simulator)
* Jekyll (CircuitVerse Interactive Book)
* Flutter (CircuitVerse Mobile App)
* DocsifyJs (CircuitVerse Docs)

&nbsp;
 
### Phase1 Report :-
 
&nbsp;

#### Week 1: Turning Coffee into Code (☕ - 💻)

In this week, I started setting up fresh repositories for ***Rails codebase*** along with ***linters*** and my favourite extension ```RuboCop``` for Rails.

Following tasks were achieved during this week ⏬ :-

* Adding locale to CircuitVerse API endpoint.
* Update JSON Schema and validate RSpec tests to adapt new changes.
* Generate array of locale codes following ISO 639-1 standards (130+ locales).
* Advancement in Current I18n setup in Rails.
* Localize Teachers and Simulator module (partially).
 
&nbsp;

#### Week 2: Begin with Localizing CircuitVerse Modules

In my 2nd week, I started preparing for a bunch of localization rules so that consistency in I18n is maintained throughout the codebase by me as well as by future contributors.

For this task, I had to take proper overview of the codebase and design module specific rules for running quality I18n processes throughout the module.

Following tasks were achieved during this week ⏬ :-

* Preparing localization Rules.
* i18n-js : First I18n architecture for Simulator (Depends on Ruby).
* Localization of CV Modules - Views (10 modules localized).
 
&nbsp;

#### Week 3: Continue working with CircuitVerse Modules

In this week, I worked on localization process of CV modules and other aspects of project.

Following tasks were achieved during this week ⏬ :-
 
* i18n-js : Second I18n architecture for Simulator (Depends on Rails I18n Mapping).
* Localization of CV Modules - Views (13 modules localized).
* Localize string oriented gems commentator, activity notifications, mailers, paginators etc.

&nbsp;

#### Week 4: Working on Library, Documentation and Modules

4th week consisted of working on major aspects such as library, documentation and modules of project. 

Following tasks were achieved during this week ⏬ :-

* banana-i18n : backend independent I18n architecture for Simulator (Finalized and Merged).
* Official documentation written on CircuitVerse wiki pages.
* Localization in controllers and form attributes (All accomplished).

&nbsp;
 
#### Week 5: Starting work on Simulator and Mobile App
 
In my final week, I started working on simulator and mobile app. 

Following tasks were achieved during this week ⏬ :-

* Localize ```CombinationalAnalysis.js```.
* Design Language Switcher and I18n test Suite for Rails.
* Start of initial work in Mobile App.

&nbsp;
 
### Implementation

* [Research based documentation for I18n](https://gist.github.com/pavanjoshi914)
* [Curated list for all I18n Pull Requests](https://github.com/CircuitVerse/CircuitVerse/issues/2288)
* [Documentation](https://github.com/CircuitVerse/CircuitVerse/wiki/Internationalization-%28I18n%29)
* [Module specific I18n Rules](https://github.com/CircuitVerse/CircuitVerse/wiki/I18n-Localization-Rules-%28Rails%29)
 
&nbsp;
 
### Additional Information
 
All the commitments I have made for phase-1 of the coding period had been achieved. Instead of CircuitVerse Docs, I have started my work with Mobile App parallely and I18n for Docs will be done in the ending weeks as it becomes ready for I18n.
 
&nbsp;
 
### Blog Posts
 
I have also created my own blog covering my GSoC journey as well as my preparation during pre-GSoC, in order that future GSoC aspirants also get benefitted from it .
 
Kindly check! [Blog](https://pavanjoshi914.github.io/Blog/)
 
&nbsp;
 
### Final Thoughts 
 
I would like to thank the CircuitVerse community for providing me this amazing opportunity. Open Source contributions at CircuitVerse helped me a lot in enhancing my coding skills and soft skills as well.
 
Special thanks to my mentors [Aboobacker MK](https://github.com/tachyons) and [Nitish Aggarwal](https://github.com/Nitish145). It was a great learning experience for me to work with them during phase one. Looking forward for an exciting phase two!
 
> Thankyou
 