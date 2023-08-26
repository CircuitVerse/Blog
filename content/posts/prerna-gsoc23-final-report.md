---
title: "Simulator Stability Improvements: GSoC'23 Final Report"
date: 2023-08-25T16:52:28+05:30
draft: false
author: Prerna Sharma
type: post
---

![Cover Image](/images/prerna_gsoc23/final_report_cover.png)

This blog post is going to be a report of all the features implemented, goals accomplished, and future plans in the [Simulator Stability Improvements Project](https://github.com/CircuitVerse/CircuitVerse/wiki/GSoC%2723-Project-List#project-3---simulator-stability-improvements) as a part of GSoC'2023 at [CircuitVerse](https://circuitverse.org).

### About My Project

My project is focused on enhancing the stability and reliability of simulation environments. It aims to address common issues such as crashes, slow performance, and unexpected behavior that can disrupt the simulation experience for complex circuits.

#### Project Goals and Implementation

- **Fix Data integrity issues**: Our goal in this was to identify and fix the data integrity issues that are causing data corruption for users.
- **Implement a debug interface on the simulator**: This goal is divided into four sub-goals:
Implementing a method for the circuit to recover from errors when the erroneous component is removed,
Implementing a method to recognize the presently selected component on the canvas and modify that component's attributes, If the 'Simulation Stack Exceeded' error occurs, Implementing a means of identifying components that are being abnormally added to the simulation stack numerous times, and Introducing some useful functions that can simplify the process of debugging the circuit.
- **Implement a safe recovery from simulator crashes**:  A safe recovery flow that ideally lets the user restore a previous non-erroneous state of the circuit.
- **Make a better system for high impedance (X) values**: In the already implemented system for high-impedance values, there were some shortcomings that we needed to rectify.

##### Data integrity issues

**Demo**

{{< video src="/images/prerna_gsoc23/heapStructure.mp4" type="video/mp4" preload="auto" >}}

![Moving a component messed up the connected wires](/images/prerna_gsoc23/moving-components.gif)

|   Pull Requests                                                                                     |
| --------------------------------------------------------------------------------------------------------- |
| [Change the implementation of the priority queue to use a heap data structure](https://github.com/CircuitVerse/CircuitVerse/pull/3916)                      |
| [Moving a component messed up the connected wires](https://github.com/CircuitVerse/CircuitVerse/pull/3928)                      |

##### Debug interface on the simulator

**Demo**

{{< video src="/images/prerna_gsoc23/statemachine.mp4" type="video/mp4" preload="auto" >}}

|   Pull Requests                                                                                     |
| --------------------------------------------------------------------------------------------------------- |
| [Implemented state machine for simulator](https://github.com/CircuitVerse/CircuitVerse/pull/3781)                      |
| [Added helpful functions for debugging of circuits](https://github.com/CircuitVerse/CircuitVerse/pull/3870)  |

##### Safe recovery from simulator crashes

Previously, when the simulator crashes, all the circuit data gets lost. This can be quite frustrating, especially when a user has spent a significant amount of time creating a complex circuit. Losing all that work can be disheartening. To address this issue, I worked on implementing a solution for simulator crash recovery.
Added an autosave function which autosave the current circuit data. So, whenever a simulator crash occurs, the autosave function stores the data of the last stable state. When the user reloads the page, a message will appear on the canvas, "We have detected an unexpected simulator crash. Don't worry, we have recovered your project. Access them using Project->Recover". So, The user can then go to "Project->Recover Project" and restore the circuit. This safe recovery flow allows the user to retrieve a previous non-erroneous state of the circuit.

By implementing this simulator crash recovery mechanism, users can avoid losing their work and have the ability to restore their circuits after an unexpected crash.

**Demo**

{{< video src="/images/prerna_gsoc23/simulator_crash_recovery.mp4" type="video/mp4" preload="auto" >}}

|   Pull Requests                                                                                     |
| --------------------------------------------------------------------------------------------------------- |
| [Implemented safe recovery from simulator crash](https://github.com/CircuitVerse/CircuitVerse/pull/3767)                      |

##### Better system for high impedance(X) values

In the CircuitVerse simulator, there are two circuit elements, Tristate and Controlled Inverter, that exhibit high impedance behavior. Previously, the Controlled Inverter is broken, and the Tristate has some issues.

In this task, I attempted to fix the issues with both of these circuit elements. First, I addressed the functionality of the Controlled Inverter and also fixed the incorrect test associated with it.I focused on identifying and resolving issues related to the Tristate element. There are several open Tristate-related issues in the primary code base repository, and I attempted to address all of them.

**Demo**

![Better System for High Impedance Values](/images/prerna_gsoc23/highimpedance.gif)

|   Pull Requests                                                                                     |
| --------------------------------------------------------------------------------------------------------- |
| [Better system for high impedence values](https://github.com/CircuitVerse/CircuitVerse/pull/3858)                        |

### Learnings

- Gained an understanding of the optimal approaches for code composition.
- Addressing data integrity issues, recovery mechanisms, and error propagation deepened my understanding of error-handling strategies.
- Gained a deep understanding of simulation environments, debugging tools, and techniques to enhance the stability of complex systems.

### What’s Next

I have attempted to resolve the data integrity issues I encountered. However, if there are any circuit reports in the future on the Slack channel containing data integrity issues, they will still be addressed. Therefore, please continue to report any issues you come across on the simulator.

### Blog posts

I've created comprehensive blog posts for each phase of GSoC, aiming for them to be both engaging and informative.

| Blog Posts                                                                                      |
| ----------------------------------------------------------------------------------------------- |
| [Coding Period Week 1 + 2](https://dev.to/prerna0202/coding-period-gsoc23-week-1-2-51dp)        |
| [Coding Period Week 3 + 4 + 5](https://dev.to/prerna0202/coding-period-gsoc23-week-3-4-5-388b)   |
| [GSoC'23 Phase 1 Report](https://blog.circuitverse.org/posts/prerna-sharma_gsoc23_phase1_report)|
| [Coding Period Week 7 + 8](https://dev.to/prerna0202/coding-period-gsoc23-week-78-2jch)         |
| [Coding Period Week 9 + 10](https://dev.to/prerna0202/coding-period-gsoc23-week-9-10-106m)      |
| [Coding Period Week 11 + 12](https://dev.to/prerna0202/coding-period-gsoc23-week-9-10-106m)     |

### Conclusion

I am extremely happy that my project has been successfully completed. However, a few pull requests have yet to be merged. Nevertheless, I have discussed all of the pull request codes with my mentors, and they are nearly accurate. The issue at hand is that these changes will directly impact the stability of the simulator. Consequently, they can only be merged following a thorough review. Whenever these reviews take place, if any alterations are necessary, I will address them. Also, I would like to express gratitude to my mentors, Pulkit Gupta, Ruturaj Mohite, Pranay Simejia, and Satvik Ramaprasad, for their invaluable feedback on my progress and unwavering support.
