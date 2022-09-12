---
title: "Simulator Improvements: GSoC'22 Final Report"
date: 2022-09-11T11:23:35+05:30
draft: false
author: Pulkit Gupta
type: post
---

![Cover Image](/images/pulkitGupta_phase_1_blog/cover_final.png)

This blog is all about my work on the [Simulator Improvement Project](https://github.com/CircuitVerse/CircuitVerse/wiki/GSoC%2722-Project-List#project-4---circuitverse-simulator-improvements) as a part of Google Summer of Code 2022 with [CircuitVerse organization](https://github.com/circuitverse).

### About the Project

[My Project](https://github.com/CircuitVerse/CircuitVerse/wiki/GSoC%2722-Project-List#project-4---circuitverse-simulator-improvements) aims to improve the CircuitVerse simulator. One of the primary goals of the project is to create tests (unit tests) for the simulator which can be run to ensure that no new change breaks the simulator’s behavior.

#### Goals and Implementations

The main goal of the project are:

- **Tests for the simulator**: The goal is to build a test suite on top of the testbench engine which can run to ensure that no new change breaks the simulator’s behavior.
- **Importing and exporting of circuitFiles**: A `.cv` extension file that contains the circuit data that can be exported and imported from / to the simulator.
- **Complete touch and mobile compatibility project**: Making simulator more compatible / responsive with smaller devices.

**All of the above goals were implemented within the GSoC period. Yay! 🎉**

##### Simulator Testing

The major task of the project is to create a test suite for the CircuitVerse simulator which ensures that new changes do not break the current functioning of the simulator. We have to build a test suite using the testbench engine, which provides an abstraction layer to the code.

For creating the test suite, we used JEST testing library. For testing any circuit using testbench, we can pass test data and circuit data to the testbench function (runAll), which runs tests (which do not involve any web browser) and returns a test summary.

**Demo**

![simulator-tests-demo-gif](/images/pulkitGupta_phase_1_blog/simulator-tests-final.gif)

| Related Pull Requests                                                                                               |
| ------------------------------------------------------------------------------------------------------------------- |
| [Tests for Simulator Gates](https://github.com/CircuitVerse/CircuitVerse/pull/3162)                                 |
| [Tests for most frequently used functions while simulating](https://github.com/CircuitVerse/CircuitVerse/pull/3172) |
| [Tests for Simulator decoders and plexers](https://github.com/CircuitVerse/CircuitVerse/pull/3186)                  |
| [Tests for Simulator misc-elements](https://github.com/CircuitVerse/CircuitVerse/pull/3191)                         |
| [Tests for Simulator sequential elements](https://github.com/CircuitVerse/CircuitVerse/pull/3193)                   |
| [Tests for Simulator Combinational Analysis](https://github.com/CircuitVerse/CircuitVerse/pull/3204)                |
| [Tests for Simulator bitConvertor](https://github.com/CircuitVerse/CircuitVerse/pull/3207)                          |
| [Tests for Simulator subCircuits](https://github.com/CircuitVerse/CircuitVerse/pull/3212)                           |
| [Tests for Simulator force-gate](https://github.com/CircuitVerse/CircuitVerse/pull/3221)                            |
| [Tests for complex circuits](https://github.com/CircuitVerse/CircuitVerse/pull/3244)                                |
| [Docs update for simulator testing](https://github.com/CircuitVerse/CircuitVerse/pull/3261)                         |

##### Importing and Exporting of CircuitFiles

Feature to allow the user to export and import the circuit(as a circuitFiles with .cv extension) and save it in the local system.

**Demo**

**Exporting CircuitFiles**

![Export-cv-file-demo-gif](/images/pulkitGupta_phase_1_blog/export.gif)

**Importing CircuitFiles**

![import-cv-file-demo-gif](/images/pulkitGupta_phase_1_blog/import.gif)

| Related Pull Requests                                                                                 |
| ----------------------------------------------------------------------------------------------------- |
| [feat: importing and exporting circuit files](https://github.com/CircuitVerse/CircuitVerse/pull/3222) |

##### Mobile Touch Compatibility

Last GSoC(2021), [Abhisek Zade](https://blog.circuitverse.org/author/abhishek-zade/) made a lot of progress with the touch compatibility on the simulator for small devices, but it has some UI bugs, which needed to be fixed.

Some bugs that have been fixed:

- Added redo option.
- Fixed navbar menu UI.
- Fixed properties dialog UI and some small UI bugs.
- Updated branch code.
- Updated to toggle new Simulator-Ui for devices smaller than `1000px` width.

All bugs have been fixed and all related PRs have been merged into the codebase. Finally, the Simulator is compatible with smaller devices, and now we can simulate circuits from our mobile or tablet 🥳.

**Demo**

![Touch Compatibility Working Gif](/images/pulkitGupta_phase_1_blog/TouchWorking.gif)

| Related Pull Requests                                                                                     |
| --------------------------------------------------------------------------------------------------------- |
| [Mobile Touch Compatibility](https://github.com/CircuitVerse/CircuitVerse/pull/3236)                      |
| [feat: updated logic to toggle mobile view](https://github.com/CircuitVerse/CircuitVerse/pull/3268)       |
| [hotfix: simulator mobile-UI for smaller devices](https://github.com/CircuitVerse/CircuitVerse/pull/3272) |

#### What’s left to do

**Custom prompt dialog box**

It will be a little bit difficult to implement the prompt dialog box feature for now with the [new frontend project](https://github.com/CircuitVerse/cv-frontend-vue) because it is under development, also it will be difficult to figure out where to do the required changes, In simulator/dir or directly to components.
Also, what I proposed, is suitable for the primary codebase, but we need to change our approach to implement the same in a [new frontend project](https://github.com/CircuitVerse/cv-frontend-vue).

#### Future Work

1 . The simulator is now compatible with smaller devices, but it is only available in `landscape` mode. In the future, we can make it compatible with portrait mode and remove the `portrait` lock.

2 . Right now, it will be little bit difficult to implement Custom alert and prompt dialog with [new frontend project](https://github.com/CircuitVerse/cv-frontend-vue) but once it completed then we can implement them.

### Learnings

- Gained a better understanding of the [JEST-testing library](https://jestjs.io/).
- While creating the test suite, I learned more about circuits, fundamentals, and simulator functioning.
- I learned more about UI and UX.
- Acquired knowledge of the best practices to follow while writing code.

### Blog links

I have written blogs regarding each stage of GSoC, hope they will be interesting and insightful.

| Blog Posts                                                                                      |
| ----------------------------------------------------------------------------------------------- |
| [Community bonding period](https://dev.to/pulkit30/community-bonding-period-gsoc22-428o)        |
| [Coding Period Week 1](https://dev.to/pulkit30/coding-period-week-1-gsoc22-c96)                 |
| [Coding Period Week 2 + 3](https://dev.to/pulkit30/coding-period-gsoc22-week-2-3-4dp3)          |
| [Coding Period Week 4 + 5](https://dev.to/pulkit30/coding-period-gsoc22-week-4-5-4l6l)          |
| [Coding Period Week 7 + 8 + 9](https://dev.to/pulkit30/coding-period-gsoc22-week-7-8-9-2836)    |
| [Coding Period Week 10 + 11 + 12](https://dev.to/pulkit30/coding-period-gsoc22-week-10-11-3ep8) |

### Acknowledgments

Thanks to [Aboobacker MK](https://github.com/tachyons), [Ruturaj Mohite](https://github.com/gr455) for providing feedback on my progress and conducting weekly catch-up sessions that kept me involved in the community and helped me in understanding the simulator code, and for code reviews.
