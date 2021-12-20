---
title: "Internationalization (I18n) | Final Report | GSoC'2021"
author: "Pavan Joshi"
date: 2021-08-20T12:08:12+05:30
draft: false
type: post
url: '/posts/2021/i18n-final-report'
---

![i18n-gsoc-cover](/images/i18n_final_cover.png)

This blog report summarizes the work, I executed during the 10 weeks of **_Google Summer of Code 2021_**. GSoC'2021 Coding Period was started on June 7, and officially ended on August 16.

### My Project Details 📋

> **_[Internationalization](https://summerofcode.withgoogle.com/projects/#6365426910494720) mainly aims at creating I18n architecture for the CircuitVerse platforms to localize or translate them into multiple languages._**

During GSoC, I aimed to create an I18n infrastructure such that CircuitVerse platforms can be internationalized into global languages. And the platforms can be emerged as the ***Global Platforms***.

I also aimed to create an ***I18n architecture*** for ***5 major technologies*** used on different CircuitVerse platforms. They are:-

* Ruby on Rails (CircuitVerse Main Platform)
* JavaScript (CircuitVerse Simulator)
* Jekyll (CircuitVerse Interactive Book)
* Flutter (CircuitVerse Mobile App)
* DocsifyJs (CircuitVerse Docs)

&nbsp;

### Final Report

During the first five weeks of the GSoC coding period (Phase One), I did work in the major portions of the Rails codebase. Phase two was majorly dedicated to working on **Simulator**, **Mobile App** and **DocsifyJS** as well.

More Details about my work in Phase one can be found here:
[I18n Phase One Report](https://blog.circuitverse.org/posts/2021/i18n-phase-one-report/)

&nbsp;

### Phase Two :-

&nbsp;

### Simulator

We cannot use Rails I18n in webpacker served JavaScript modules directly. A Wikipedia library **banana-i18n** is used to localize JavaScript-based product.

In order to localized Simulator I divided it into different sections ⬇️

* Simulator Configuration Modules and features such as Verilog, CombinationalAnalysisalong, SubCircuits etc along with third-party npm packages.
* Simulator Circuit Element Modules

  1. Circuit Element Modules
  2. Sequential Element and TestBench Modules
  3. Project Data, Hotkey Binders, themers etc

&nbsp;

#### Week 6: Begin with Localizing Simulator Configuration Modules

In total, there were 36 configuration modules written in JavaScript, which I had to check and localize without breaking any code.

Following tasks were achieved during this week ⏬

* I18n in Simulator controls interface in **UX.js**
* I18n in Simulator Guide in **tutorials.js**
* I18n in Simulator functionalities such as Verilog, SubCircuits, CombinationalAnalysis etc.
* Completing I18n and testing in all the remaining 36 configuration Modules and functionalities.

&nbsp;

#### Week 7: Localizing Simulator Circuit Element Modules 

I started working with circuit element modules, hotkey binders, themers, testbench and sequential circuit element modules.

Following tasks were achieved during this week ⏬

* I18n in 67 different JavaScript modules which belong to circuit elements, sequential circuit elements, testbench, mutable properties of circuit elements etc
* I18n in Themers and Hotkey Binders, Project Data configurations etc
* Documentation

I finished working on the Simulator which required **800+ lines** of code changes. 🎉

&nbsp;

### Mobile App

Despite some of the benefits of Flutter, such as rapid Mobile-App development. Flutter was quite in discussion for its uneasiness for internationalization (I18n).

Previously provided configuration of I18n used a complex approach to feed translations in the app, and needs to be upgraded to a cleaner workflow.

The Mobile App interface in Flutter is made of several built-in widgets and custom widgets

* Built-in widgets provided Flutter API for Rapid App Development.
* Custom Widgets created by Developers for specific purposes.

&nbsp;

#### Week 8: Upgrade I18n Workflow and Begin Working with Mobile App

Following tasks were achieved during this week ⏬

* Upgrade I18n workflow with the more appropriate one.
* Localization of built-in widgets using flutter_localizations package(package supports 80 different locales)
* Localize Custom Widgets(UI of Flutter) using Intl package.

&nbsp;

#### Week 9: Continue Localizing Custom Widgets

Following tasks were achieved during this week ⏬

* Create a Language Switcher using the **locale provider package**.
* Continue localization in Custom Widgets.
* Localize interpolated strings using concept of **companion messages**.
* Fix unit tests for all the Custom Widgets.
* Documentation

I finished working on the Mobile App which required **2400+ lines** of code changes. 🎉

&nbsp;

#### Week 10: I18n Architecture in DocsifyJS and Final Enhancements

Following tasks were achieved during this week ⏬

* I18n in DocsifyJS via a designing mechanism for loading sidebar, navbar, and markdown dynamically into the Page.
* Language Switcher for DocsifyJS.
* Fixes in Rspec tests and enhancing Language switcher for Rails and Simulator capable of handling scenarios such as -

  1. Language switching when the user is not logged in(session-based).
  2. Language switching when the user is logged in.
  3. Taking care that, Language switching through switcher and User Form does not conflict with each other.

&nbsp;

### Implementation

* [I18n in CircuitVerse Main Platform (3000 lines of code)](https://github.com/CircuitVerse/CircuitVerse/pull/2397)
* [I18n in CircuitVerse Simulator (1100 lins of code)](https://github.com/CircuitVerse/CircuitVerse/pull/2368)
* [I18n in CircuitVerse Mobile App (2500 lines of code)](https://github.com/CircuitVerse/mobile-app/pull/126)
* [I18n in CircuitVerse Docs (excluding markdown content - 100+ lines of code)](https://github.com/CircuitVerse/CircuitVerseDocs/pull/307)

&nbsp;

### Major MileStones Achieved 

* Complete Infrastructure for Internationalization of Rails Platform.
* Complete Infrastructure for Internationalization of Simulator Platform.
* Complete Infrastructure for Internationalization of Mobile-App.
* Complete Infrastructure for Internationalization of CircuitVerse-Docs.

I felt amazing after completing my work on the different technologies and codebases during this journey! 🥳

&nbsp;

### Future Scope

I believe that I18n is not a time-bounded project and has a scope of continuous enhancements.

Some of the major enhancements which can be done are as follows -

* Translation System for translation management. [Example](https://hosted.weblate.org/projects/f-droid/#languages)
* Localization of CircuitVerse API to generate a localized JSON response
* Localization of Model Data

&nbsp;

### Final Thoughts

Firstly, I would like to thank the CircuitVerse community for giving me this amazing opportunity. 

Special thanks to [Aboobacker MK](https://github.com/tachyons), my mentor. I got opportunity to work under his guidance, during my initial contributions to the community and in GSoC'2021 as well.

I had a great enhancement in my coding skills from reviews I got from mentors and during GSoC'2021 journey. cheers! 🎉

_*Signing off*_

> Thankyou