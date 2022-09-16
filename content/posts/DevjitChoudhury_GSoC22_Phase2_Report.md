---
title: "VueJS CircuitVerse Simulator | GSoC@2022 | Final Report"
date: 2022-09-11T19:17:19+05:30
draft: false
author: Devjit Choudhury
type: post
---

![GSoC@CircuitVerse](/images/devjit_choudhury_GSoC'22/coverImage.png)

This is the final blog post is to summarize the work done for **VueJS CircuitVerse Simulator project** during **Google Summer of Code @ 2022**.

### [Work Repository 🖥](https://github.com/CircuitVerse/cv-frontend-vue)
> **[_New FrontEnd Framework for Simulator -_](https://summerofcode.withgoogle.com/myprojects/details/1IZGKjn2)  
> My project aims to decouple the CircuitVerse Simulator from the backend, remove the use of jQueryUI, and replace DOM mutations using strings and its Internationalization.**

### Project Goals -
---
1. Decoupling Simulator from Backend
2. Internationalization
3. Panels: Elements Panel & Properties Panel Component
4. Navbar and Tabsbar Component
5. DialogBoxes Component
6. Canvas - Pinia Store

> **[_VueJS CircuitVerse Simulator | GSoC@2022 | Phase-1 Report -_](https://blog.circuitverse.org/posts/devjitchoudhury_gsoc22_phase1_report/)  
> I had completed the first 4 Project Goals during First Phase of the program.**

### Dialog Boxes Component
---
The dialog boxes were initially coded using JqueryUI and hence converted to Vuetify Dialog components.

#### I. Combinational Analysis
Combinational Analysis had 3 parts -
- Inputs for combinational Analysis
- Displaying the Logic table using the inputs
- Generate a circuit or Print the table from the Logic Table
![Combinational Analysis](/images/devjit_choudhury_GSoC'22/combinationalAnalysis.gif)

#### II. Hex-Bin-Dec Converter Dialog
To convert between different numerical forms.
![Hex-Bin-Dec Conversion](/images/devjit_choudhury_GSoC'22/hex_bin_dec.gif)

#### III. Save Image Dialog
Provides various image options for the user to export the circuit.
![Save Image](/images/devjit_choudhury_GSoC'22/saveImage.gif)

#### IV. Theme Dialog
Dynamic change of theme on selection and also providing options to apply custom themes.
![Apply Theme](/images/devjit_choudhury_GSoC'22/themes.gif)

#### V. Custom Shortcut Dialog
For better productivity, set up your favorite shortcuts for different options.
![Custom Shortcuts](/images/devjit_choudhury_GSoC'22/customShortcut.gif)

#### VI. Insert Sub-circuit Dialog
Insert one circuit into another as a subcircuit.
![Inserting Subcircuit](/images/devjit_choudhury_GSoC'22/insertSubcircuit.gif)

#### VII. Export Verilog Code Dialog
Create Verilog code for the circuit drawn and save it.
![Export Verilog](/images/devjit_choudhury_GSoC'22/exportVerilog.gif)

#### VIII. Save/Open Project Dialog
Save the project offline and open it anytime later to continue working. It has some small bug with the tabs bar not able to render the new circuit list.
![Open Project](/images/devjit_choudhury_GSoC'22/saveOffline.gif)

### Canvas - Pinia Store
Canvases in CircuitVerse Simulator -
1. BackgroundArea Canvas - base canvas on which the grids are made
2. SimulationArea Canvas - canvas on which the circuit elements are drawn
3. MinimapArea Canvas - canvas showing the minimap of the entire area

Initially, the canvas in the simulator is represented as an object.

First, I had to figure out a way to implement the refactoring without breaking down the simulator since there are a lot of places where canvas objects are used.

Since most of the usage of the canvases is outside the Vue components, I learned [#using a store outside of a component](https://pinia.vuejs.org/core-concepts/outside-component-usage.html). 


## All the Pull Requests
---
- [Setting up the project and its dependencies](https://github.com/CircuitVerse/cv-frontend-vue/pull/2)
- [Simulator codebase integration](https://github.com/CircuitVerse/cv-frontend-vue/pull/4)
- [feat: circuit element panel component](https://github.com/CircuitVerse/cv-frontend-vue/pull/7)
- [feat: properties panel component](https://github.com/CircuitVerse/cv-frontend-vue/pull/9)
- [refactor: navbar component](https://github.com/CircuitVerse/cv-frontend-vue/pull/11)
- [feat: tabsbar component](https://github.com/CircuitVerse/cv-frontend-vue/pull/14)
- [feat: dialog box components](https://github.com/CircuitVerse/cv-frontend-vue/pull/20)
- [feat: move canvas objects to pinia store](https://github.com/CircuitVerse/cv-frontend-vue/pull/25)


> **[_GSoC22 Simulator UI Project -_](https://github.com/orgs/CircuitVerse/projects/12)
> With this I have completed all the proposed task for VueJS Simulator Project. Some essential tasks that were added during the coding period will be done next.**

### Future Works -
---
This project provides a base for the VueJS Simulator. 
Though I checked for bugs and solved them while working on the project but still there might be many that I might have missed.

- The most important task now is to integrate this Vue Project into the Main Repository or finding a way for the simulators in two different repositories to work in sync. 
Have an option to switch between the Simulators in the Navbar fot the users to test it.

- After the completion of the integration - The main focus will be API Integration.
According to me if we import the code from Vue to Main Repository, the calls should work fine, since no changes has been made to those functions. Tesing if the saving online and loading from the server is working needs to be done.
If we plan to mantain seperate Vue repository, finding a way to make those API calls.

- Embed Feature - It is one of the most unique feature of CircuitVerse. 
More research is needed to find a way to implement this.
In the Main repository embed has its own [embed.html.erb]("https://github.com/CircuitVerse/CircuitVerse/blob/master/app/views/simulator/embed.html.erb") file but the implementation are mixed up with the simulator logic, seperated using a global boolean variable `embed`. For now I have set it to false in [globalVariables.ts]("https://github.com/CircuitVerse/cv-frontend-vue/blob/main/src/globalVariables.ts").

- Internationalization of Simulator - I have configured Internationalization using [Vue-i18n]("https://kazupon.github.io/vue-i18n/") but progressive work needs to be done on it. The [locales]("https://github.com/CircuitVerse/cv-frontend-vue/tree/main/src/locales") contains all the translations (en & hi for now, more needs to be added).
Check out Navbar and Circuit Elements Panel Component to get an idea of how its implemented.

- Refactoring of Styles.
For now there is only one [global stylesheet]("https://github.com/CircuitVerse/cv-frontend-vue/blob/main/src/styles/css/main.stylesheet.css") for the entire simulator, wich needs to be refactored to local stylesheets for individual components using scoped styles. There is also a scope of removing SASS using modern CSS features. 

- Few components - Verilog Module, Quick-Button, Testbench(using jQuryUI dialog box), and Timing-Diagram are yet to be converted to Vue.
With the removal of jQuery-UI, there is also a scope of removing the use of jQuery from the project. 


### My GSoC Blogs -
---
- `Week 0` [Community Bonding Period | GSoC'22@CircuitVerse](https://www.devjitchoudhury.com/post/community-bonding-period-gsoc-22-circuitverse)
- `Week 1` [Week 1 Report | GSoC'22@CircuitVerse](https://www.devjitchoudhury.com/post/week-1-report-gsoc-22-circuitverse)
- `Week 2` [Week 2 Report | GSoC'22@CircuitVerse](https://www.devjitchoudhury.com/post/week-2-report-gsoc-22-circuitverse)
- `Week 3 & 4` [Week 3 & 4 Report | GSoC'22@CircuitVerse](https://www.devjitchoudhury.com/post/week-3-4-report-gsoc-22-circuitverse)
- `Week 5 & 6` [Week 5 & 6 Report | GSoC'22@CircuitVerse](https://www.devjitchoudhury.com/post/week-5-6-report-gsoc-22-circuitverse)
- `Week 7 & 8` [Week 7 & 8 Report | GSoC'22@CircuitVerse](https://www.devjitchoudhury.com/post/week-7-8-report-gsoc-22-circuitverse)
- `Week 9 & 10` [Week 9 & 10 Report | GSoC'22@CircuitVerse](https://www.devjitchoudhury.com/post/week-9-10-report-gsoc-22-circuitverse)
- `Week 11 & 12` [Week 11 & 12 Report | GSoC'22@CircuitVerse](https://www.devjitchoudhury.com/post/week-11-12-report-gsoc-22-circuitverse)

### Experience -
---
The last 12 to 14 weeks were the most amazing in my Coding Journey till now.
I learned so many new things from my mentors and online whenever I was stuck. Overcoming the roadblocks filled me with so much confidence. 

Every week was a journey on its own, some were hectic because of my other involvements and tests and some were relaxing and fun, but that's what I loved about this program, the freedom to come up with my ideas in the proposal, planning its action and then implementing it.

I would like to specially thank [Aboobacker MK](https://github.com/tachyons), [Samiran Konwar](https://github.com/abstrekt), [Ayan Biswas](https://github.com/ayan-biswas0412) and [Ruturaj Mohite](https://github.com/gr455) for conducting weekly meets and all my fellow mentees for always being available to help me whenever I got stuck.