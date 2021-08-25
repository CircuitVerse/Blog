---
title: "GSoC 2021 | Interactive Book Integration | Final Report"
date: 2021-08-15T11:45:30+05:30
draft: false
author: "Manjot Singh Sidhu"
type: post
url: "/posts/2021/interactive-book-integration-final-report/"
---

![GSoC 2021 Interactive Book](/images/2021/interactive-book-integration-phase1/Gsoc_cover_ib.jpg)

**Google Summer of Code 2021** is about to end and I am excited to announce that we have successfully completed all milestones of our project titled [**Interactive Book Integration in Mobile**](https://summerofcode.withgoogle.com/projects/#5929763765485568). This whole journey started from May 16<sup>th</sup> as Community Bonding period followed by Coding period from June 7<sup>th</sup>. My blog posts during the coding period are available [here](https://manjotsidhu.com/#blog).

This is my final Google Summer of Code project report that summarises my entire project along with features, future scopes and plans.

## About Interactive Book 📖
The aim of this project is to create an online interactive guide for digital logic design. The primary goal is to develop an open sourcebook with quality content that teaches digital logic design. It will enable students to learn digital design by interacting with circuits, truth tables, and other interactive elements as they proceed through the book. The professors and students all over the world can read and contribute to the same.

## About Mobile App 📱
CircuitVerse for mobile is a cross platform application built in **Flutter** using CircuitVerse API. It has several features like:

- Create/Add Assignments
- Create/Join/Manage Groups
- Grade Assignments
- Fork/Star/View Featured Projects made by the community

## Interactive Book Integration ☀️
CircuitVerse's Interactive Book is a very helpful learning resource for everyone and expanding it to CircuitVerse's Mobile App will make it a real Mobile friendly learning platform for the community. Interactive Book Integration for Mobile App attempts to connect the ecosystem of CircuitVerse to all the platforms like iOS and Android.

## Interactive Book Engine ⚙️
Interactive Book engine is the heart of this project as it includes hybrid parser which parses HTML using dart's `html` package and flutter's `flutter_markdown` with the help of custom builders and syntaxes that are used inside Interactive Book on the web.

This project was focussed on providing almost full compatibility with the web version without any special changes for mobile version. We not only made the engine to render basic markdown content but also added compatibility for special things like Mathjax formulas, Simulator Embeds and Interactions.

### Interactive Book Designs for Mobile App

In the 1st week, we had a lot of enhancements over the **Material UI/UX Design for Interactive Book** and we finalized a great design which is now implemented in Mobile App. 📱

Here are the commits involved in implementing these designs: [5 Commits](https://github.com/CircuitVerse/mobile-app/compare/ff163cd...c1414a1)


![Interactive Book Home](/images/2021/interactive-book-integration-phase1/ss1.png)
![Dark Mode](/images/2021/interactive-book-integration-phase1/ss3.png)

### Markdown Content

Mobile App uses GitHub Flavored Markdown with the support of limited Jekyll and Liquid tags.

![Markdown Content](/images/2021/interactive-book-integration-phase1/gsoc_md_1.jpg)
![Markdown Content](/images/2021/interactive-book-integration-phase1/gsoc_md_2.jpg)

### Hive Database

![Hive](https://raw.githubusercontent.com/hivedb/hive/master/.github/logo_transparent.svg?sanitize=true)

**Hive** is a very lightweight and blazing fast key-value database available for Dart and Flutter. Interactive Book had a lot of pages and fetching them required a lot of time therefore we decided to go ahead with caching using Hive. Interactive Book partially makes use of hive as caching pages was a more tedious job, we added it to our future scopes along replacing Shared Preferences with Hive Database.

### HTML Interactions

By this time our implementation of Interactive Book was not technically "Interactive" as it was missing the key interactions that provide examples and applications of several concepts. These interactions were written in HTML + JS. We implemented it via inApp WebView and injecting tailored JavaScript for functionality!

![Interaction 1](/images/2021/interactive-book-integration-phase1/interaction-1.png) ![Interaction 2](/images/2021/interactive-book-integration-phase1/interaction-2.jpg)


### Pop Quizzes

CircuitVerse has a custom pop quiz system to reinforce learning at the end of a page. This is in the form of a few multi-choice or true/false questions. We initially planned the design and finally integrated in the mobile version of Interactive Book.

![Pop Quiz](/images/2021/interactive-book-integration-phase1/pop-quiz.jpg)

### Mathjax Formulas

Interactive Book uses `jekyll-scholar` to implement Mathjax formulas. They are basically a way to write math formulas using syntaxes like LaTeX and KaTeX. We use a similar package which implements at least the basic implementation of Mathjax called `flutter_math_fork`. It is an experimental package but that is the only one actively maintained and which doesn't uses Webview to render these formulas.


### Enforce Conventional Commits specification

[Conventional Commits](https://www.conventionalcommits.org/en/v1.0.0/) specification provides human and machine readable meaning to commit messages. We started practicing them in the last few weeks and now we decided to move ahead with this specification and enforce the specification in mobile-app repository. We implemented git hooks that actually automatically checks our new commit just before saving it.

## Takeaways

- **Test Driven Development**: Since testing in mobile-app was a tedious job, I learnt test driven development to cover most of our implementations within the coverage of our testing framework.

- **DevOps**: I got knowledge of writing workflows for GitHub Actions and making use of GitHub Apps from the marketplace to run different kinds of checks and automate testing of our services, viewmodels and views.

- **Third Party Packages**: During this journey, I also got opportunity to participate in the development of Dart and Flutter's packages.

- **Open Source Day**: I got a great exposure of reviewing the contributions done during Open Source Days by various new contributors.

- **Organizational Goals**: Talking to mentors and stakeholders of CircuitVerse helped me understand the requirements and take appropriate measures for the community.

## Future Developments

- **Replace Shared Preferences with Hive**: Hive is a very fast database and we should be replacing Shared Preferences with Hive in other parts of the Mobile App.

- **Enhancements to Mathjax**: Basic implementation of Mathjax supports most of the syntaxes but still we need to contribute to Mathjax development to make it better by supporting custom and auto-numbering support to it.

- **Support for SVG 2.0**: The currently used package (`flutter_svg`) of mobile-app isn't fully compatible with the SVG types used in Interactive-Book which leads to missing details in most of SVGs at the time of rendering.

- **Migrate to sound Null Safety**: Since Dart 2.0, this is a much needed move since it enhances the maintainablity and readability of the code.

## Experience

![Interactive Book Metrics](/images/2021/interactive-book-integration-phase1/ib_metrics.jpg)

This was a wonderful journey both with CircuitVerse and Open-Source Software, I really enjoyed working closely with the open-source community and mentors of CircuitVerse. This was a great and productive summer and I can say we have won against COVID-19 by getting this project completed without any problems.

This sums up my report. In the end I would like to thank my parents for their constant support and efforts in shaping our future for a better tomorrow.

Thank You
