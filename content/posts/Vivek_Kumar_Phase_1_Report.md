---
title: "Enhanced Verilog Support & Stability | Phase 1 | Project Report | GSoC 2025 |"
date: 2025-07-17T03:10:00+05:30
draft: false
author: Vivek Kumar Ray
type: post
---

![GSOC2025_Phase_1](/images/Vivek_Kumar_Gsoc2025/VerilogGSOC2025.png)

Hello Everyone😊,

Welcome to my mid-term blog for Google Summer of Code 2025 for the project **Enhanced Verilog Support & Stability**

### What is the Project about🖥

> **[_Enhanced Verilog Support & Stability:_](https://summerofcode.withgoogle.com/programs/2025/projects/9cZjeC5m)
> The phase-1 of the project is about making the Verilog features of CircuitVerse namely Circuit to Verilog and Verilog to Ciruit stable and take it into production from the current beta or testing phase. Along with documenting and testing the whole Verilog feature.**

I have completed the first phase of the project and following things have been added or implemented :

- Adding the Verilog Modules for Circuit Elements
- Removing bugs from the Verilog Modules
- Yosys Upgradation and Migration
- Revamping the Verilog code editor
- Verilog feature documentation
- Verilog feature audit and testing

### Adding the Verilog Modules for Circuit Elements

Verilog is a hardware description language (HDL) used to model electronic systems, especially digital circuits. It allows designers to describe the structure and behavior of hardware using code. Commonly used in FPGA and ASIC design, Verilog supports simulation, testing, and synthesis of hardware components using software.

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

**How the Circuit to Verilog feature work**
![Circuit to Verilog](/images/Vivek_Kumar_Gsoc2025/CV2Verilog.png)

**Checkout the Below Video for before and after fix**
{{< video src="/videos/Vivek_Gsoc25/VerilogModule.mp4" type="video/mp4" preload="auto" >}}

**In total 7 verilog modules were added, some of them are displayed below : **
![Circuit to Verilog](/images/Vivek_Kumar_Gsoc2025/ALUVerilog.png)
![Circuit to Verilog](/images/Vivek_Kumar_Gsoc2025/adder.png)

##### Problems faced :

- Wrting scalable Verilog Code
- Dynamic Verilog Modules that reflect the bitwidths of element
- UnOrthodox circuit implementation of circuit logic
- Embedded Verilog module logic for some elements
- Verilog for CircuitVerse defined elements

##### Pull Requests

- PR : [JK Flip Flop](https://github.com/CircuitVerse/cv-frontend-vue/pull/591)
- PR : [SR Flip Flop](https://github.com/CircuitVerse/cv-frontend-vue/pull/592)
- PR : [ALU](https://github.com/CircuitVerse/cv-frontend-vue/pull/593)
- PR : [D-Latch](https://github.com/CircuitVerse/cv-frontend-vue/pull/594)
- PR : [Force Gate](https://github.com/CircuitVerse/cv-frontend-vue/pull/609)
- PR : [LSB](https://github.com/CircuitVerse/cv-frontend-vue/pull/621)
- PR : [TestBench Element](https://github.com/CircuitVerse/cv-frontend-vue/pull/611)

### Removing bugs from the Verilog Modules includes:

While most of the Circuit elements do have the verilog module, some of them contains inconsistent logic and bugs. The second week of the project involved identifying these bugs and fixing them. This issue is still open due to large number of bugs, and it was decided by the mentors that I should keep working on the issue for whole GSOC duration and keep removing the bugs. Most of the bugs are minor. Major bugs are mentioned below in deatiled with links of PRs for the solved bugs.

##### Major Bugs in the Verilog Modules

- Wrong and incomplete verilog code for adder
![adder](/images/Vivek_Kumar_Gsoc2025/adder.png)
- Undefined parameters in the Flip Flops
- Missing bitwidth support in some elements
- Inconsistent verilog logic

##### Pull Requests
- PR : [DFF fix](https://github.com/CircuitVerse/cv-frontend-vue/pull/619)
- PR : [TFF fix](https://github.com/CircuitVerse/cv-frontend-vue/pull/620)

### Yosys Upgradation and Migration

Yosysdigitaljs-server created by Marek Materzok is the technology behind the feature that allows users to convert Verilog code
into circuits in the simulator. The Yosys server converts the Verilog constructs like ‘for loop’ into basic
circuit components like Gates and Mux to be implemented in the CircuitVerse Simulator. It takes .v files
and convert them into JSON files of digitalJS format which can be used by Circuitverse to parse the
circuit into simulator.

![Yosys feature](/images/Vivek_Kumar_Gsoc2025/yosys.png)

The Circuitverse Yosys forked repo is behind its parent by some 39 PRs, the parent repo had been migrated from js to ts and even the folder structure has been changed. Updating Yosys has been a priority for a long time and this time the update was finally completed. My mentor Mk Aboobacker helped me a lot in this issue and guided me thoughout this issue. A strategy was planned where I fetched the complete parent and then reapplied the CircuitVerse changes over it. These changes include the server file to receive the request from circuitverse backend, docker file and other configuartion and minor changes from CircuitVerse.

![Verilog to circuit feature](/images/Vivek_Kumar_Gsoc2025/YosysCV.png)

The Yosys repo is now updated, folder structure updated & consistent with its parent and migrated to ts. In the future any changes to its parent can be easily merged with much conflicts between the two.

##### Pull Requests
- PR : [Yosys upgrade](https://github.com/CircuitVerse/yosys2digitaljs-server/pull/6)
- PR : [CI fix](https://github.com/CircuitVerse/yosys2digitaljs-server/pull/7)

### Revamping the Verilog code editor
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

##### Pull Requests
- PR : [Pr](https://github.com/CircuitVerse/cv-frontend-vue/pull/628)
> Some of the PRs have not been made yet, they will be made in the upcoming week

### Verilog feature documentation

As part of this project, one of the primary tasks has been to document the verilog feature in deatil with examples for the CircuitVerse users. I have created detailed documentation for both the Verilog feature with examples for the CircuitVerse users to experiment with it and use them.

A special focus was also given to creating the documentation for the developers of the CircuitVerse so that they can easily setup the Verilog feature in thier local machine and develop it further.

##### Documenting the Verilog Features:

![doc1](/images/Vivek_Kumar_Gsoc2025/doc1.png)
![doc2](/images/Vivek_Kumar_Gsoc2025/doc2.png)
![doc3](/images/Vivek_Kumar_Gsoc2025/doc3.png)

### Verilog feature auditing and testing

One of the bug which was highlighted by one of the users of CircuitVerse was that when verilog code for large ciruits when written in verilog editor, it slows the simulator and in some cases freezes the whole screen and gets stuck. To fix it and find other similar problems auditing and testing of the verilog feature was done. 

I have proposed to write some tests for the verilog feature. Will work on this in future.

##### Following are some of the problems or bugs found:

- Screen Freeze : [issue1](https://github.com/CircuitVerse/CircuitVerse/issues/4063?utm_source=chatgpt.com)
- Contention Error : [issue2](https://github.com/CircuitVerse/CircuitVerse/issues/388)
- Warning for invalid inputs in Flip Flops : [issue3](https://github.com/CircuitVerse/CircuitVerse/pull/5447)
- Export errors : [issue4](https://github.com/CircuitVerse/CircuitVerse/issues/5328)

### Miscellaneous

---

- Revamped the Teacher's Section and made the View component
{{< video src="/videos/Vivek_Gsoc25/teacherPageUI.webm" type="video/mp4" preload="auto" >}}
- Added documentation for the circuit elements that lacked the documentation
- Fixed the LMS button
![LMS button](/images/Vivek_Kumar_Gsoc2025/LMS.png)

## Upcoming Tasks: 

---

- Add the Verilog modules for the new circuit element added by Nihal Rajpal
- Keep fixing the bugs in the verilog modules
- Add the dynamic bitwidth change in verilog module
- Implement the start/stop button in the simulator
- Implement the full-screen view for the boolen-logic table and other windows which currently don't have the resizing feature
- Fix the Yosys issue for large circuits that freeze the screen
- Other minor fix and feature additions in the vue simulator

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

