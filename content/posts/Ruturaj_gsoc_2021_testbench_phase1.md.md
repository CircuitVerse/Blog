---
title: "Testbench: Phase 1 Report (GSoC 2021)"
date: 2021-07-10T22:41:35+05:30
draft: false
author: Ruturaj Mohite
type: post
---

This blog is about my work in the first phase of Google Summer of Code 2021 with [CircuitVerse](https://circuitverse.org)

## About the Project

[CircuitVerse](https://circuitverse.org) is a Digital Logic Simulator on web. It is an educational tool for students interested in electronics to simulate and make circuits on their browser.

My project is to implement a testbench to automatically test circuits against test cases. This will replace the existing testbench element in favor of more robust testbench which runs faster, supports sequential circuits and gives the user greater control over running tests.

## Community @ CircuitVerse

The community at CircuitVerse has been super welcoming since the first day I started contributing. I got to meet all the community members and the other GSoC students during the community bonding period. Not just the project mentors, but everyone else in the community has been very helpful especially during the GSoC period. Every week, all the community members and the mentors meet up to discuss the progress of the projects and offer to help with any problem that anyone of us (GSoC students) would be facing.

## Coding | Phase 1 (June 6 - July 12)

The first coding phase went pretty smoothly for me. The order of doing things was significantly different from what I had mentioned in my proposal and quite a few changes were also made to the project plan. But the changes were decided on by me an the mentors pretty early on so everything went very smoothly.

My project proposal consisted of 5 main goals:
 - UI for Test Creator
 - Testbench related data handling
 - Interface for using the testbench
 - Testbench Engine
 - Testbench for assignments (feature)

The first three weeks, I started with the first two goals, ie. Creating the Creator UI and and handling of test data. I decided to make the UI in stages. I made a crude UI - good enough for testing, but not user ready in the first week and started thinking about handling the test data (storage and retrieval). Initially, I thought that we could change the backend of CircuitVerse to also store the test data. But after discussing with my mentor **Satvik Ramaprasad**, we reached at a conclusion that it makes sense for the test to be stored as a property of the circuit.

This is how the UI came out to be
![New Test Creator](/images/tb_new_2.png)

The next few weeks, I was to focus on making the engine for the Testbench. This is the brain of the Testbench. The code that processes the test and runs it on the circuit and returns the result. This required a good knowledge of the working of the simulator on CircuitVerse. Having contributed to the CircuitVerse simulator for well over 7 months, I was familiar with a good amount of code on which the engine of the simulator worked. That knowledge along with a lot of help from Satvik in understanding the code enabled me to finish the engine code in less than 2 weeks (much ahead of time).

The engine this time is completely different from the engine the earlier testbench was based on. It is not limited by the circuit's clock time (hence is much faster) and gives the user much more control on running their tests (since the user can choose to run a single test at a time).

In the final weeks of phase 1, I decided to work on the UI for the testbench itself. I made some mockups on Figma (This was my first time ever making design mockups. Not sure if I did it right 😬). **Satvik** and **Nitin** suggested some changes on the UI and finally a UI and flow was decided upon.

![Figma Designs for the Testbench](/images/tb-figma.png)

Finally, I converted that design into code (some work is left on this), 'connected' the engine to this UI and this was the final result.

![CircuitVerse Testbench](/images/tb-p1.gif)

## Challenges

Although the experience so far has been pretty smooth, there still were some problems I faced in the process.

First, in the second week, I started work on the backend without giving a heads up to my mentor. When I did, it was decided that the data was to be made a property of the circuit. Since then, I have been very regular in giving progress reports to the community members on the Slack channel.

Then there were many first times for me in this project. Especially in the UI parts. I had done very little work on UI before this project and never made UI designs.

Then there were linting issues which I never bothered much about earlier. But when the project is big, it is important to keep the code clean and maintainable. We also discussed on some ESLint rules and why they are useful.

## Conclusion

In conclusion, the phase 1 of GSoC was a blast! A great combination of learning new things and applying existing knowledge. The community (especially the mentors) were a great support in the process.

[Link to phase 1 PR](https://github.com/CircuitVerse/CircuitVerse/pull/2289)

