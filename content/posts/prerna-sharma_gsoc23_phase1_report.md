---
title: "Simulator Stability Improvements: GSoC'23 Phase 1 Report"
date: 2023-07-08T17:22:49+05:30
draft: false
author: Prerna Sharma
type: post
---

![coverImage](/images/prerna_gsoc23/coverImage.png)

This blog post is about my work during Phase 1 of GSoC'23. My GSoC period has been great so far. In GSoC 2023, CircuitVerse selected four projects, out of which only my project is related to the legacy simulator, and as I have already made most contributions related to simulator issues. This project is quite special to me.

Now let's explore my experience. First, understand my project and its goals, and what we aim to achieve with it.

### About My Project

My Project focuses on enhancing the stability and reliability of simulation environments. It aims to address common issues such as crashes, slow performance, and unexpected behavior that can disrupt the simulation experience for complex circuits.

Speaking of specific tasks, so far, I have worked on the following features:

- **Implementing a safe recovery from simulator crashes.**
- **Providing a way for the circuit to recover from errors if the erroneous component is removed in debug mode.**
- **Exposing helpful functions to facilitate circuit debugging.**
- **Creating a better system for handling high impedance (X) values.**

### Community Bonding Period (May 4, 2023 - May 28, 2023)

During this period, I had my first meeting with all the mentors and fellow contributors. Meeting everyone was a delight, and the meeting turned out to be really fruitful. Our mentors shared the information on the GSoC workflow. I and my mentors also scheduled a meeting to go over the project flow in greater detail.

I began working on my project during the bonding time as already been familiar with the organization's codebase. With each passing day, I grew more enthusiastic about the project, eager to make a significant impact and contribute to its success.

### Coding Period (May 29th - July 10th)

The initial coding phase went smoothly for me. Each task presented valuable learning opportunities, and I implemented the planned features with the guidance and support of my mentors. I began working on the task of simulator crash recovery without discussing with my mentors. However, during our first meeting of the coding period, when I discussed my progress and workflow, we realized that there were two tasks that were somewhat dependent on each other. Therefore, we decided to put the simulator crash recovery task on hold and prioritize completing the task of allowing the circuit to recover from errors when the erroneous component is removed.

Now, let's go through the details of all the tasks in the order I worked on them.

### Way for the circuit to recover from errors if the erroneous component is removed

Currently, The simulator does not handle uncaught exception errors effectively. Whenever an uncaught exception error occurs in the simulator, it freezes it in an undesirable manner. Sometimes, the simulator even displays a completely red scary screen ☠. So, In this task, I worked on handling this problem by implementing a state machine for managing uncaught exception errors.

To handle this, I defined two states, "normal" and "error," in the globalScope. Defining them in the globalScope (The globalScope is a global variable that contains the currently selected circuit, and elements attach themselves to this global scope when created) makes them easily accessible. By default, when the simulator is loaded, it remains in the normal state. As long as there are no uncaught exception errors in the circuit, the simulator stays in the normal state (we can check the current state of the simulator by running 'globalScope.currentState' in the console).

To achieve this functionality, I used a try-catch block inside the play() function. The play() function is the main function that resolves the circuit using event-driven simulation. Whenever there is an update in the circuit, the play() function resolves it. As soon as a component is added that leads to an uncaught exception error in the circuit, the error is caught in the catch block within the play function. As soon as the error is caught, the simulator transitions from the normal state to the error state, and the simulation stops. In the error state, all tabs remain hidden, and the user can only delete or undo components in the circuit. The user cannot add new components until the simulator returns to its normal state.

When the user removes the erroneous component in the circuit, the catch block will not execute in the play function. Instead, it executes the code in the try block. If the try block's code executes successfully, it means there are no errors in the simulator. And If there are no errors in the circuit, the transition of the simulator's state from error to normal occur, and the simulator instantly returns to the normal state. All tabs become visible again, and the simulation starts working normally.
To hide and show tabs, I created two functions. The hide function is called within the catch block, and the visible function is called within the try block.

This way, the simulator will never freeze, and uncaught errors can be handled easily. However, based on a valuable suggestion from one of my mentors, we are planning to enhance this functionality by opening an additional window when the error state is triggered. This window will allow users to resolve the issue by deleting or undoing the erroneous component. Once resolved, the additional window will close, and the main window will display the non-erroneous circuit. This update will undoubtedly enhance the user experience and improve error handling.

 **Work Sample**

{{< video src="/images/prerna_gsoc23/statemachine.mp4" type="video/mp4" preload="auto" >}}

 **Pull Request**

- [Implemented state machine for simulator](https://github.com/CircuitVerse/CircuitVerse/pull/3781)

### Simulator Crash Recovery

Currently, when the simulator crashes, all the circuit data gets lost. This can be quite frustrating, especially when a user has spent a significant amount of time creating a complex circuit. Losing all that work can be disheartening.

To address this issue, I worked on implementing a solution for simulator crash recovery. First, I created an autosave function that stores the current circuit's data in the localStorage. Now, the question arises: how do we trigger the autosave function? To accomplish this, I compare the length of the backups array at 4-second intervals. Whenever there is an update in the circuit, a backup is created. I utilize this to call the autosave function. However, it's not appropriate to regularly autosave at fixed time intervals when the user is only viewing the circuit without making any edits. Autosave should only be triggered when there is an actual update in the circuit. Therefore, every 4 seconds, I compare the length of the backups array. If it has increased since the previous check, I call the autosave function. Otherwise not.

Now, whenever a simulator crash occurs, the autosave function stores the data of the last stable state. When the user reloads the page, a message will appear on the canvas saying, "We have detected an unexpected simulator crash. Don't worry, we have recovered your project. Access them using Project->Recover". So, The user can then go to "Project->Recover Project" and restore the circuit. This safe recovery flow allows the user to retrieve a previous non-erroneous state of the circuit.

By implementing this simulator crash recovery mechanism, users can avoid losing their work and have the ability to restore their circuits after an unexpected crash.

 **Work Sample**

{{< video src="/images/prerna_gsoc23/simulator_crash_recovery.mp4" type="video/mp4" preload="auto" >}}

 **Pull Request**

- [Implemented safe recovery from simulator crash](https://github.com/CircuitVerse/CircuitVerse/pull/3767)

### Better System for High Impedance Values

In the CircuitVerse simulator, there are two circuit elements, Tristate and Controlled Inverter, that exhibit high impedance behavior. Currently, the Controlled Inverter is broken, and the Tristate has some issues.

In this task, I attempted to fix the issues with both of these circuit elements. First, I addressed the functionality of the Controlled Inverter and also fixed the incorrect test associated with it. Currently, when the Controlled Inverter is not enabled, it should set the output to undefined, but it only changes the color of the wire without changing the output value. Additionally, it doesn't function properly when used in a subcircuit. I resolved these issues and made the necessary improvements to ensure the Controlled Inverter functions correctly.

Next, I focused on identifying and resolving issues related to the Tristate element. There are several open Tristate-related issues in the primary code base repository, and I attempted to address them in this task. Let me provide you with an example of one of the issues in detail.

In this issue [#3063](https://github.com/CircuitVerse/CircuitVerse/issues/3063)
The Tristate sets the output to undefined, and the input element repeatedly sets the output to a defined value, it causes the Tristate to repeatedly set the output to undefined, leading to a Simulation Stack Limit Exceeded error. To resolve this, I started storing the previous value of the output. If the previous value of the output is not undefined, only then the Tristate sets the output to undefined and adds it to the simulation stack. This prevents the Tristate from repeatedly setting the output to undefined, adding an unexpectedly large number of times in the simulation stack, avoiding the Simulation Stack Limit Exceeded error.

In this way, I have identified and addressed the issues with the Tristate and Controlled Inverter elements in this task.

**Work Sample**

![Better System for High Impedance Values](/images/prerna_gsoc23/highimpedance.gif)

**Pull Request**

- [Better System for High Impedance Values](https://github.com/CircuitVerse/CircuitVerse/pull/3858)

### Exposing Helpful Functions for Circuit Debugging

In this task, I have created several helpful functions to facilitate circuit debugging, making it easier to debug the reported simulator issues. Let's go through each function one by one.

- **loadCircuit**: This function allows us to use the circuit data that we receive when issues are reported on Slack. The loadCircuit function takes the circuit data as a parameter and draws the circuit on the canvas based on that data. It enables us to view the circuit and identify errors.
  To use this function, run the following method in the console:
   `globalScope.loadCircuit(CIRCUITDATA);`

- **previous**: The previous function allows the user to restore the previous stable state of the circuit. If the simulator crashes while debugging the circuit, we can go back to the previous stable state without reloading the page using the previous function. This function utilizes the autosave functionality that I implemented in the simulator crash recovery task. It retrieves the last stable state circuit data from the autosave in local storage and restores the circuit on the canvas.
  To use this function, run the following method in the console:
   `globalScope.previous();`

- **detectCycle**: Implementing the detectCycle function took me some time, but the result was worth it. The detectCycle function allows us to identify all the nodes in the circuit that form cyclic paths. It highlights those nodes on the simulator. To implement this function, I first created an object by finding all the nodes from the globalScope and storing their connections as values with the nodes as keys. Then, I used the graph data structure to visualize all the connections. Using the graph data structure, I identified all the nodes with single connections and found the pair of nodes that have the same parent element. Since a cyclic path will always have at least one circuit element, we can determine whether that component is making the cyclic path by examining the input and output nodes of the pair. After finding the pair of nodes with the same parent and having a single connection, I used the depth-first search (DFS) algorithm to find all the nodes between them. The function returns an array of nodes that form the cyclic path and highlights them. 
  To use this function, run the following method in the console:
   `globalScope.detectCycle();`

These functions provide valuable assistance in debugging circuit issues, allowing for a more efficient and effective debugging process.

 **Work Sample**

{{< video src="/images/prerna_gsoc23/HelpfulFunctions.mp4" type="video/mp4" preload="auto" >}}

 **Pull Request**

- [Added helpful functions for debugging of circuit](https://github.com/CircuitVerse/CircuitVerse/pull/3870)

### Conclusion

In conclusion, the first phase of my GSoC'23 journey with CircuitVerse has been truly amazing. I have gained valuable knowledge and worked on significant improvements to enhance the stability of the simulator.

I am sincerely grateful for the unwavering support and guidance provided by my mentors throughout this phase. Their expertise has been instrumental in my progress. I eagerly look forward to the remaining tasks, where I will continue to contribute and strive for excellence in my project.
