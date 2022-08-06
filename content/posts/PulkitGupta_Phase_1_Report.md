---
title: "Simulator Improvement: GSoC'22 Phase 1 Report"
date: 2022-07-25T13:39:01+05:30
draft: false
author: Pulkit Gupta
type: post
---

![coverImage](/images/pulkitGupta_phase_1_blog/coverImage.png)

This blog is about my work in the first phase of Google Summer of Code 2022 with [CircuitVerse](https://github.com/circuitverse).

### About my Project

[My Project](https://github.com/CircuitVerse/CircuitVerse/wiki/GSoC%2722-Project-List#project-4---circuitverse-simulator-improvements) aims to improve the CircuitVerse simulator and finish some of the pending work in the CircuitVerse desktop app. One of the primary goals of the project is to create tests(unit tests) for the simulator which can be run to ensure that no new change breaks the simulator’s behavior.

### Community Bonding Period @Circuitverse

The CircuitVerse community has been super welcoming since the first day I started contributing.
I was thrilled after being accepted as a GSoC student. We had our first meeting with the organization's core team members and mentors, and also interacted with other fellow contributors. It was a great pleasure to meet all of them. We had a very productive meeting, and our mentors informed us about the GSoC flow and shared their GSoC experiences. Also, I and my mentor scheduled a meeting, to discuss the project flow.

As I was aware with the organization codebase, so I started working on my project during the bonding period and planned to have at least one meeting every week to discuss the progress and future plan of the project with my mentor.

### Coding Period || Phase 1

For me, the initial coding phase went smoothly. Major tasks for the project are:

- Complete touch and mobile compatibility project
- Complete the Desktop app
- Implement import and export of circuitfiles
- Tests for the simulator

First, we decided to start with the Simulator Testing project, followed by importing and exporting circuit files.

#### Simulator Testing

The major task of the project is to create a test suite for the circuitVerse simulator which ensures that new changes do not break the current functioning of the simulator. We have to build a test suite using the testbench engine, which provides an abstraction layer to the code.

For creating the test suite, we used [JEST testing library](https://jestjs.io/).
For testing any circuit using testbench, we can pass test data and circuit data to the testbench function (runAll), which runs tests(which doesnot involve any web browser) and returns a test summary.

**Work Flow**

![Work Flow](/images/pulkitGupta_phase_1_blog/workflow-testing.png)

**Work Sample**

![Simulator Tests Working Gif](/images/pulkitGupta_phase_1_blog/simtesting.gif)

**Pull Requests**

- [Tests for Simulator Gates](https://github.com/CircuitVerse/CircuitVerse/pull/3162)
- [Tests for most frequently used functions while simulating](https://github.com/CircuitVerse/CircuitVerse/pull/3172)
- [Tests for Simulator decoders and plexers](https://github.com/CircuitVerse/CircuitVerse/pull/3186)
- [Tests for Simulator misc-elements](https://github.com/CircuitVerse/CircuitVerse/pull/3191)
- [Tests for Simulator sequential elements](https://github.com/CircuitVerse/CircuitVerse/pull/3193)
- [Tests for Simulator Combinational Analysis](https://github.com/CircuitVerse/CircuitVerse/pull/3204)
- [Tests for Simulator bitConvertor](https://github.com/CircuitVerse/CircuitVerse/pull/3207)
- [Tests for Simulator subCircuits](https://github.com/CircuitVerse/CircuitVerse/pull/3212)
- [Tests for Simulator force-gate](https://github.com/CircuitVerse/CircuitVerse/pull/3221)
- [Tests for complex circuits](https://github.com/CircuitVerse/CircuitVerse/pull/3244)

#### Import & Export of circuitfiles

Task: A `.cv` extension file that contains the circuit data that can be exported and imported from the system to the simulator.

Pull Request

- [PR-3222 (feature): import and export of circuit files](https://github.com/CircuitVerse/CircuitVerse/pull/3222)

#### Mobile Touch Compatibility

Last GSoC, [Abhisek Zade](https://blog.circuitverse.org/author/abhishek-zade/) made a lot of progress with the touch compatibility on the simulator for small devices but it has some UI bugs, which need to be fixed.

Some bugs that have been fixed:

- updated branch code
- added redo option
- fix navbar menu UI
- fix properties dialog UI
  and some small UI bugs

![Touch Compatibility Working Gif](/images/pulkitGupta_phase_1_blog/TouchWorking.gif)

Pull Request

- [Pr-3236: (support): Mobile Touch compatibility](https://github.com/CircuitVerse/CircuitVerse/pull/3236)

### Learning

- Gained a better understanding of the [JEST-testing library](https://jestjs.io/).
- While creating the test suite, I learned more about circuits, fundamentals, and simulator functioning.
- I learned more about UI and UX.
- Acquired knowledge of the best practices to follow while writing code.

### Conclusion

Phase 1 was majorly about simulator testing. Everything was easy to understand and my mentor helped me in every way possible. The community was a great support in the whole process.
