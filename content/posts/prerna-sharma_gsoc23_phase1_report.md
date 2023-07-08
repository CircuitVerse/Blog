---
title: "Simulator Stability Improvements: GSoC'23 Phase 1 Report"
date: 2023-07-08T17:22:49+05:30
draft: false
author: Prerna Sharma
type: post
---

![coverImage](/images/prerna_gsoc23/coverImage.png)

This blog is about my work in the first phase of Google Summer of Code 2023 with [CircuitVerse](https://github.com/circuitverse).

### About My Project

[My Project](https://github.com/CircuitVerse/CircuitVerse/wiki/GSoC%2723-Project-List#project-3---simulator-stability-improvements) focuses on enhancing the stability and reliability of simulation environments. The project aims to address common issues such as crashes, slow performance, and unexpected behavior that can disrupt the simulation experience for complex circuits.

In the first phase, I have worked on the following features:

- Implementing safe recovery from simulator crashes.
- Providing a way for the circuit to recover from errors if the erroneous component is removed in debug mode.
- Exposing helpful functions to facilitate circuit debugging.
- Creating a better system for handling high impedance (X) values.

### Community Bonding Period

The community bonding period was a fantastic way to kickstart my GSoC journey with CircuitVerse.
Since I was already familiar with the codebase for quite some time, about a week before the start of the coding period, I began working on tasks.

During this period, we had meetings with fellow contributors and mentors where we introduced ourselves and had some really insightful discussions about the GSoC work flow. I must admit, during the second meeting with my mentors, I was a bit nervous and ended up rambling a bit. But hey, it happens to the best of us! Overall, the experience was really enjoyable and gave me some valuable insights. It was great to connect with other contributors and mentors.

### Coding Period (May 29th - July 10th)

The initial coding period has been amazing for me. I have had the opportunity of working with supportive mentors who have guided me every step of the way. Although the order of tasks deviated slightly from my original proposal due to interdependencies, we managed the changes seamlessly. Each task provided valuable learning opportunities, and I implemented the planned features with mentor guidance and support.

#### Way for the circuit to recover from errors if the erroneous component is removed

To ensure a good user experience, we have developed a state machine within the simulator that transitions between normal and error states. In the event of an uncaught exception error, the simulator enters the error state, hiding all tabs and only allow user with the option to delete or undo components in the circuit. However, based on a valuable suggestion from one of my mentors, we are planning to enhance this functionality by opening an additonal window when the error state is triggered. This window will allow users to resolve the issue by deleting or undoing the erroneous component and once resolved, the additional window will close, and the main window will display the non-erroneous circuit. This update will undoubtedly enhance the user experience and improve error handling.

**Work Sample**

![State Machine](/images/prerna_gsoc23/statemachine.gif)

**Pull Request**

- [Implemented state machine for simulator](https://github.com/CircuitVerse/CircuitVerse/pull/3781)

#### Simulator Crash Recovery

One of the significant concerns during a simulator crash is the loss of circuit data. To mitigate this, I have implemented an autosave feature that saves the last stable state of the circuit in the local storage. On an interval of 3 seconds, there is a checkBackups() function which checks the backups length (on every updation in the circuit the backup occur), so if it is increased then the autosave() function will call. It will only autosave the circuit data when there is a new updation in a circuit.

Hence, In the event of a simulator crash, users can easily recover their circuit data by reloading the page and navigating to Project -> Recover Project. This ensures that users do not lose their valuable work due to unexpected crashes.

**Work Sample**

![Simulator Crash recovery](/images/prerna_gsoc23/simulator_crash_recovery.gif)

**Pull Request**

- [Implemented safe recovery from simulator crash](https://github.com/CircuitVerse/CircuitVerse/pull/3767)

#### Better System for High Impedance Values

The CircuitVerse simulator includes elements with high impedance condition, such as the Controlled Inverter and Tristate. Currently, Controlled Inverter is broken and Tristate element has some issues. So, I tried to solve them in this task. Firstly, I addressed the issues with the Controlled Inverter and updated its test. Afterward, I identified and resolved the issues related to tristate. These updates will enhance the functionality and accuracy of these components. My mentors are currently reviewing these improvements, and I look forward to their feedback.

**Work Sample**

![Better System for High Impedance Values](/images/prerna_gsoc23/highimpedance.gif)

**Pull Request**

- [Better System for High Impedance Values](https://github.com/CircuitVerse/CircuitVerse/pull/3858)

#### Exposing Helpful Functions for Circuit Debugging

To facilitate efficient circuit debugging, I have implemented several functions. These functions include "load()", which takes the circuit data as a parameter and draws the circuit on the canvas, "next()" and "previous()" to navigate through circuit states. The "previous()" function takes the circuit to the last stable state, and the "detectCycleInCircuit()" function, which detects cycles in a circuit that can lead to the Simulation Stack Exceeded error. While one of the initially proposed functions, "removeBugNodes()," turned out to be unfeasible, I made the necessary adjustments and incorporated valuable suggestions from my mentors.

**Pull Request**

- [Added helpful functions for debugging of circuit](https://github.com/CircuitVerse/CircuitVerse/pull/3870)

### Conclusion

In conclusion, the first phase of my Google Summer of Code 2023 journey with CircuitVerse has been truly amazing. I have gained valuable knowledge and worked on significant improvements to enhance the stability of the simulator.

I am sincerely grateful for the unwavering support and guidance provided by my mentors throughout this phase. Their expertise has been instrumental in my progress. I eagerly look forward to the remaining tasks, where I will continue to contribute and strive for excellence in my project.
