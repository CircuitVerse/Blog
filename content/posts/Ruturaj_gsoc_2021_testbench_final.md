---
title: "Testbench: GSoC Final Report"
date: 2021-08-15T23:00:15+05:30
draft: false
author: Ruturaj Mohite
type: post
---

This blog post is a report of all my work done on the Testbench Project as a part of GSoC 2021 at [CircuitVerse](https://circuitverse.org)

## About the Project

[CircuitVerse](https://circuitverse.org) is a Digital Logic Simulator on web. It is an educational tool for students interested in electronics to simulate and make circuits on their browser.

My project is to implement a testbench to automatically test circuits against test cases. This will replace the existing testbench element in favor of more robust testbench which runs faster, supports sequential circuits and gives the user greater control over running tests.

## Project Goals and Implementation

The Testbench project had the following goals
 - Build a test creator UI from where user can create tests
 - Build a UI on simulator where the user can use the tests
 - Build a testbench engine which runs the tests
 - Implement storing of the tests
 - Implement automatic testing of assignment submissions

### The Testbench Engine

The engine is the brain of the testbench, control is shifted to the testbench engine when tests are run. The engine uses the simulator engine functions to run the simulation during testing. The engine is independent of clock time. The engine only waits for the inputs propagate, then checks outputs. So no matter what the clock frequency is, the engine can run all the tests in a fraction of a second.

The engine also skips rendering updated circuit states between tests for improved speed.

### The Testbench UI

The UI on simulator is the interface to this engine. The user can attach tests to the circuit and run the tests from this UI. User can choose to walk through the tests manually, one by one, or run all the tests at once and check the results.

![UI on Simulator](/images/2021/testbench-project-final/sim_ui_final.png)

### The Test Creator UI

The UI on simulator is seamlessly integrated with the creator UI. The creator shows up as a pop up when the user wants to attach tests. When the user is done creating a test, the test shows up on the simulator UI.

The creator UI is also used to show the tests results if the user runs all the tests at once.

![Creator UI](/images/2021/testbench-project-final/creator_ui_final.png)

### Storing Tests

The test, once attached to a circuit, is stored with the circuit data. So the test loads automatically when the circuit loads.
This is all the data that a test stores.

 - type: Type of the test - Combinational / Sequential.
 - groups: Array of test group. Each test group consists:
   - n: Number of test cases in the test.
   - inputs: Array of inputs to be given to the test. Each input consists:
     - bitwidth: Bitwidth of the input.
     - label: Labels will be matched with the identifiers on the circuitelements to bind the testbench to.
     - values: Ordered array of values of the input across test casesin the current set.
   - outputs: Array of outputs of the test. Each output consists:
     - bitwidth: Bitwidth of the output.
     - label: Labels will be matched with the identifiers on the circuitelements to bind the testbench to.
     - values: Ordered array of values of the output across testcases in the current set

## Finished Product

![Creator UI](/images/2021/testbench-project-final/tb-final.gif)

## Challenges and Learnings

There were a lot of things I did for the first time, and a lot of things that didn't go as planned.
* Early on in the project, I started working on a backend where the tests would be stored without consulting my mentor. It was later decided to have the tests attached to project circuits, instead of having a backend for tests.

* This was my first time really working on UI and UX. I was really bad at writing css, but with some googling and trial and error, I was able to write it. I am sure it's not the best css, but it works and gets the job done 😬.

* First time using Figma to make design mockups and understanding the tradeoff between UI and UX.

* This was also my first time working with Webpack and asset pipelines. I had to serve the new UI through webpack, and so I had to configure webpack to do so. 

## Acknowledgments

Thanks to the core team at CircuitVerse, [Satvik Ramaprasad](https://github.com/satu0king), [Aboobacker MK](https://github.com/tachyons), [Shivansh Srivastava](https://github.com/Shivansh2407), [Samiran Konwar](https://github.com/abstrekt), [Nitin Singhal](https://github.com/nitin10s) and [Shreya Prasad](https://www.linkedin.com/in/-shreya-prasad/) for providing feedback on my progress and conducting weekly catch-up sessions that kept me involved in the community.

Special thanks to [Satvik Ramaprasad](https://github.com/satu0king) and [Nitin Singhal](https://github.com/nitin10s). For helping me understand the engine code, helping a great deal with UI feedbacks and code reviews.

## The Code

[Phase 1 PR](https://github.com/CircuitVerse/CircuitVerse/pull/2289): Implements a crude creator UI, early version of the engine and input-output validations.

[Phase 2 PR](https://github.com/CircuitVerse/CircuitVerse/pull/2366): Implements a newer UI, themes compatibility, refactored engine (more robust), a bunch of data fixes and integration with webpack.

[Feature Branch](https://github.com/CircuitVerse/CircuitVerse/tree/testbench): Branch with all the code