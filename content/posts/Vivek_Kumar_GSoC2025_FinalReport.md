---
title: "Enhanced Verilog Support & Stability: GSoC 2025 Final Report |Project 5|"
date: 2025-08-31T14:04:00+05:30
author: Vivek Kumar Ray
type: post
---

![gsoc-cover](/images/Vivek_Kumar_Gsoc2025/finalReport.png)

Hello Everyone😊,

Welcome to my final blog for Google Summer of Code 2025 for the project **Enhanced Verilog Support & Stability**

### What is the Project about🖥
---

> **[_Enhanced Verilog Support & Stability:_](https://summerofcode.withgoogle.com/programs/2025/projects/9cZjeC5m)
> The project works on the Verilog feature of CircuitVerse namely Circuit to Verilog and Verilog to Ciruit and its stability. The project works on taking the verilog feature to production, adding verilog modules for the circuit elements and removing bugs in the feature. The project also introduces new features like Verilog terminal, play/pause button to the simulator, improves the UI/UX of the verilog code-editor, updates the yosys repo, fixes bug ,implements full screen view for tools window and documents the verilog feature.**

### New features that have been added and merged include:
- Verilog modules for circuit elements
- Play/Pause button in the simulator
- Improved UI/UX for code-editor
- Verilog terminal
- Resizable & draggable view of tools window
- Yosys Upgradation

---

### Version confusion
CircuitVerse had implemented the versioning system to avoid merging big changes to the simulator directly. This resulted in the formation of V0/, V1/ and SRC/ folders in the vue-simulator. Currently the V0 folder is default source but it can be changed by altering the configuration files. My changes were made and merged into the V1/ folder. In future all these folders will be in sync and users can change between the verisons easily.

### The Verilog feature in CircuitVerse includes
1. Circuit to Verilog - allows users to convert circuit to verilog code
2. Verilog to Circuit - allows users to convert verilog code to circuits

### Adding the Verilog Modules for Circuit Elements

CircuitVerse has the feature of generating Verilog code for the circuit designed in the Simualtor. The moduleVerilog() function is responsible for generating the verilog moduels for the Circuit element. Some of the circuit elements which are mentioned below don't have this module, this causes the calling of missing verilog functions. The goal of the first week was to add the verilog module for all the missing elements. 

##### The Verilog Module for the following Circuit elements were added: 

- SR Flip Flops
- JK Flip Flops
- ALU
- D-Latch
- ForceGate
- LSB 
- MSB
- TestBench element

**Checkout the Below Video for before and after fix**
{{< video src="/videos/Vivek_Gsoc25/VerilogModule.mp4" type="video/mp4" preload="auto" >}}

**In total 7 verilog modules were added, some of them are displayed below : **
![Circuit to Verilog](/images/Vivek_Kumar_Gsoc2025/ALUVerilog.png)
![Circuit to Verilog](/images/Vivek_Kumar_Gsoc2025/adder.png)

### Bugs which were fixed in the Verilog Modules

- Wrong and incomplete verilog code for adder
![adder](/images/Vivek_Kumar_Gsoc2025/adder.png)
- Undefined parameters in the Flip Flops
- Missing bitwidth support in some elements
- Inconsistent verilog logic
- SR flip flop wrong logic

### Yosys Upgradation and Migration

Yosysdigitaljs-server created by Marek Materzok is the technology behind the feature that allows users to convert Verilog code
into circuits in the simulator.

![Yosys feature](/images/Vivek_Kumar_Gsoc2025/yosys.png)

The Circuitverse Yosys forked repo is behind its parent by some 39 PRs, the parent repo had been migrated from js to ts and even the folder structure has been changed.These changes include the server file to receive the request from circuitverse backend, docker file and other configuartion and minor changes from CircuitVerse.

![Verilog to circuit feature](/images/Vivek_Kumar_Gsoc2025/YosysCV.png)

The Yosys repo is now updated, folder structure updated & consistent with its parent and migrated to ts. In the future any changes to its parent can be easily merged with much conflicts between the two.

### Revamping the Verilog code editor and Verilog Terminal

CircuitVerse provides its users the feature of Verilog code editor. Which can be used by the users to write verilog code and then convert them into circuits and further integrate them into their circuits on the simulator.

##### The goal of the Code Editor is to:

- Enable writing and editing Verilog code inside CircuitVerse
- Send code to a backend (powered by Yosys, an open-source synthesis tool)
- and Parse the output and generate a visual circuit automatically

The Code Editor is built using CodeMirror — a powerful and customizable browser-based code editor.

#####  The code Editor has the following features currently:
- Syntax highlighting for Verilog
- Smart indentation
- Line numbering
- Theme customization (Solarized, Monokai, Blackboard, and more)
- Reset editor button

But the UI/UX of the code editor is not particularly encouraging for the users, also there are lots of features that can be added to it to make it better.

![Verilog to circuit feature](/images/Vivek_Kumar_Gsoc2025/updatedCodeEditor.png)

#####  I have implemented the following things, which were proposed:
- Improved indentation between code and line numbering, between numbering and the edge
- CTRL + S shortcut for the save button
- Option to increase the font size
- Displaying error message properly, maybe a whole terminal experience to display the error message
- Dark default theme in Vue-Simulator
- Code completion
- Code folding and bracket matching

### Verilog Terminal
Verilog Terminal their circuits and perform other functions while conserving the resources of the browser. This feature allows users to stop the continuous simulation of their circuits

![Verilog Terminal](/images/Vivek_Kumar_Gsoc2025/verilogTerminal.png)

### Play/Pause Button to the Simulator
The play/pause button stops the whole simulation engine, clock, and any UI updates for the circuit elements. This results in a complete pause of the simulator, which allows the users to build their circuits and perform other functions while conserving the resources of the browser. This feature allows users to stop the continuous simulation of their circuits, first pause the simulation, get their circuits ready, and then simulate it.
This avoids confusion and helps users to perform other types of things like debugging, testbench, timming diagram and other functions in the simulator.

![Play pause button](/images/Vivek_Kumar_Gsoc2025/playPauseButton.png)

### Resizable & draggable view of tools window

reziable 

### Verilog feature documentation

As part of this project, one of the primary tasks has been to document the verilog feature in deatil with examples for the CircuitVerse users. I have created detailed documentation for both the Verilog feature with examples for the CircuitVerse users to experiment with it and use them.

A special focus was also given to creating the documentation for the developers of the CircuitVerse so that they can easily setup the Verilog feature in thier local machine and develop it further.

##### Documenting the Verilog Features:

![doc1](/images/Vivek_Kumar_Gsoc2025/doc1.png)
![doc2](/images/Vivek_Kumar_Gsoc2025/doc2.png)
![doc3](/images/Vivek_Kumar_Gsoc2025/doc3.png)

---
#### Pull Requests
- PR : [Pr](https://github.com/CircuitVerse/cv-frontend-vue/pull/628)


---
## Learning

---

- Learned about VueJs and Simulation engine
- Enhanced my Verilog knowledge and testbench writing skills
- Learned about Yosys and TypeScript Migration
- Learned and applied Object-Oriented coding practices
- Enhanced and expanded my debugging skills
- Learned Docker and networking between containers

## Conclusion

---

My journey so far has been exciting and amazing. Each week I stumble upon things I don't know, and I learn it, exeriment with it and then implement it. It has truly been a developers dream till now. My mentors and CircuitVerse community have been very helpful and inspirational in my little journey. Looking forward to contribute and learn more.

I would like to thank,
[Aboobacker MK](https://github.com/tachyons), [Vedant Jain](https://github.com/vedant-jain03), [Niladri Adhikary](https://github.com/niladrix719), [Josh Varga](https://github.com/JoshVarga), [Aman Asrani](https://github.com/tachyons), and other mentors and circuitverse contributors for helping and mentoring me throught the journey.

