---
title: "GSoC 2021 | Interactive Book Integration | Phase 1 Report"
date: 2021-07-08T22:45:30+05:30
draft: false
author: "Manjot Singh Sidhu"
type: post
url: "/posts/2021/interactive-book-integration-phase-1/"
---
![GSoC 2021](/images/2021/interactive-book-integration-phase1/gsoc_cover_2.png)
Image credit: Abhishek Zade

This blog post covers my journey with **Google Summer of Code 2021** at CircuitVerse during **Phase 1**. This Phase starts from **7<sup>nth</sup> June** and ends on **16<sup>nth</sup> July**. I must say that Open-Source projects are adventurous and unique in its own ways. My project Interactive Book Integration in Mobile App gave me immense confidence and adventure of this 1<sup>st</sup> Phase has been reached and I am proud to say that we have done much more than we were aiming as per the project plan.

## About Interactive Book
The aim of this project is to create an online interactive guide for digital logic design. The primary goal is to develop an open sourcebook with quality content that teaches digital logic design. It will enable students to learn digital design by interacting with circuits, truth table, and other interactive elements as they proceed through the book. The professors and students all over the world can read and contribute to the same.

## About Mobile App
CircuitVerse for mobile is a cross platform application built in flutter using CircuitVerse API. It has several features like:
1. Create/Add Assignments
2. Create/Join/Manage Groups
3. Grade Assignments
4. Fork/Star/View Featured Projects made by the community


## Interactive Book Integration
CircuitVerse's Interactive Book is a very helpful learning resource for everyone and expanding it to CircuitVerse's Mobile App will make it a real Mobile friendly learning platform for the community. Interactive Book Integration for Mobile App attempts to connect the ecosystem of CircuitVerse to all the platforms like iOS and Android.

## Phase 1 Report
Taking inputs and POCs from the discussions we had with the team of CircuitVerse, we wanted to keep Interactive Book a centralized repository to host the content and we planned to implement APIs that will allow the content to be integrated in other cross-platforms (in this case Flutter for Android and iOS). Here are the links for the discussion:
1. https://github.com/CircuitVerse/mobile-app/issues/25
2. https://github.com/CircuitVerse/mobile-app/pull/44

### Mobile App Designs for Interactive Book

In the 1st week, I along with mentors had a lot of enhancements over the Material UI/UX Design for Interactive Book and we finalized a great design which is now implemented in Mobile App. 📱

Here are the commits involved in implementing these designs: [5 Commits](https://github.com/CircuitVerse/mobile-app/compare/ff163cd...c1414a1)

![Interactive Book Home](/images/2021/interactive-book-integration-phase1/ss1.png)
![Dark Mode](/images/2021/interactive-book-integration-phase1/ss3.png)

### Interactive Book Engine
Interactive Book Engine service is the main processor of the content, it is a Hybrid Parser that makes use of Flutter’s official package called flutter_markdown and html package to parse both Markdown and HTML content. This also includes building Chapters, Sections which had to be represented in the App Drawer for Navigation. Sections and these pages include Chapter Contents and Table of Contents. Implementation of these all requirements were done smoothly and we could see our content live from Interactive Book central repository.

![Chapters](/images/2021/interactive-book-integration-phase1/gsoc_chapters.gif)
![Table of Contents](/images/2021/interactive-book-integration-phase1/gsoc_table_of_contents.gif)

Chapters and Table of Contents

![Markdown Content](/images/2021/interactive-book-integration-phase1/gsoc_md_1.jpg)
![Markdown Content](/images/2021/interactive-book-integration-phase1/gsoc_md_2.jpg)

Markdown Content (CodeBlocks, Simulator Embeds, etc.)

### Conclusion
While we implemented the initial Interactive Book Engine using Test Driven Development (TDD), we have maintained Code Quality through my Phase 1. We have a lot of things already in queue to be implemented in Phase 2. I am pretty much happy with my performance and stability of the Interactive Book Integration. All my contributions are readily available on CircuitVerse’s official GitHub Repository under Mobile App, `ib` branch.
There were total of 41 Commits consisting of 2,912 additions and 226 deletions. Detailed information can be seen at https://github.com/CircuitVerse/mobile-app/compare/ib. 

This sums up my report, in the end I would like to thank CircuitVerse team in this wonderful journey and my parents who supported me in this pandemic situation of COVID-19. Stay safe and stay healthy!

> Thank You
