---
title: "CircuitVerse Vue Simulator: Final Report (GSoC 2024)"
date: 2024-08-26T02:00:00+05:30
author: Niladri Adhikary
type: post
---

![gsoc-cover](/images/niladri-cover.png)

This blog post is the final report for the **CircuitVerse Vue Simulator** project, which was part of **Google Summer of Code 2024**. The project aimed to complete the new Vue-based simulator for CircuitVerse, a digital logic simulator.

## Table of Contents

{{< toc >}}

### Project Goals -

---

1. Fixing existing bugs and Completing the implementation of simulator components
2. Designing and implementing a better UI/UX for the mobile version
3. TypeScript Transition, jQuery Elimination, Transferring all DOM manipulations
4. Developing a comprehensive test suite for the Vue simulator
5. Moving the CSS styles and Finishing refactoring the codebase
6. Integrating stability improvements and addressing any performance issues
7. Merging updates and bug fixes from the main CircuitVerse repository

---

### 🔹 Fixing existing bugs and Completing the implementation of simulator components 🔀

Fixing existing bugs and completing the implementation of remaining simulator components was the primary goal of the Task.

This included conversion of the following components:

1. `Layout Elements Panel`
3. `TestBench Panel`
4. `TestBench Creator`
5. `TestBench Validator`
6. `Alert Message Box`

![image](/images/niladri_GSoC24/testbench2.avif)

Some Bug fixes that were done:

1. Fixed mini map rendering issue
2. Fixed Timming Diagram Buttons not working

### 🔹 Designing and implementing a better UI/UX for the mobile version 📱

The mobile version of the vue simulator was not implemented. The goal was to make the simulator responsive and mobile-friendly.

Mobile components that were implemented:

1. `Circuit Elements Mobile Panel`
2. `Properties Mobile Panel`
3. `Timing Diagram Mobile Panel`
4. `Quick Buttons Mobile Panel`
5. `Verilog Editor Mobile Panel`
6. `Mobile Sidebar` and `User Menu`

![image](/images/niladri_GSoC24/mobile-view1.png)

![image](/images/niladri_GSoC24/mobile-view2.png)

![image](/images/niladri_GSoC24/mobile-view3.png)

Some features that were implemented:

1. Touch support for mobile
2. Pinch to zoom
3. Multiple Selection Button
4. Copy & Paste Button

### 🔹 TypeScript Transition, jQuery Elimination, Transferring all DOM manipulations 🛠

The goal was to convert the existing codebase to TypeScript and eliminate jQuery from the codebase. Also, all DOM manipulations were to be transferred to Vue.

The following components were converted to TypeScript:

1. `Project.ts`
2. `Utils.ts`
3. `Testbench.ts`
4. `OpenOffline.vue`
5. `plotArea.ts`
6. `TimingDiagramPanel.vue`
7. `app.ts`
8. `arrayHelper.ts`
9. `backgroundArea.ts`
10. `data.ts`
11. `moduleSetup.ts`
12. `sequential.ts`
13. `verilogHelpers.ts`
14. `Circuit.ts`
15. `eventQueue.ts`
16. `quinMcCluskey.ts`
17. `customThemeAbstraction.ts`
18. `applyTheme.vue`
19. `layoutMode.ts`
20. `layoutNode.ts`
21. `layoutBuffer.ts`

Also all the DOM manipulations were transferred to respective Vue components eliminating jQuery.

### 🔹 Developing a comprehensive test suite for the Vue simulator 🧪

The goal was to develop a comprehensive test suite for the Vue simulator.

Implemented Test cases for the Vue simulator using

- `Vitest`
- `JsDOM`
- `@vue/test-utils`

Implementation of test cases:

Created a testing environment using Vitest and JsDOM, configured in the **vite.config.ts** file.

![image](/images/niladri_GSoC24/testing1.avif)

Wrote all the test cases under the **/spec** folder using Vitest and mounted the components them using **@vue/test-utils**.

![image](/images/niladri_GSoC24/testing2.png)

![image](/images/niladri_GSoC24/testing3.avif)

Created a **/testdata** folder under the spec folder for storing the testing data

Created a **/circuits** folder to keep all the circuits elements data

After implementing all this we can finally run our test cases using **npm run test** cmd

![image](/images/niladri_GSoC24/testing4.avif)

### 🔹 Moving the CSS styles and Finishing refactoring the codebase 🎨

The goal was to move the Global CSS styles to the Vue components Scoped CSS and finish refactoring the codebase.

The following Global CSS styles were moved to the Vue components:

- `UX.css`
- `main.stylesheet.css`

### 🔹 Integrating stability improvements and addressing any performance issues 🚀

The goal was to integrate stability improvements and address any performance issues.

Some of the stability improvements that were done:

1. Added helpful functions for debugging of circuit
2. Moving a component mess up the connected wires
3. Implemented state machine for simulator
4. Change the implementation of the priority queue to use a heap data structure

### 🔹 Merging updates and bug fixes from the main CircuitVerse repository 🔄

The goal was to merge updates and bug fixes from the main CircuitVerse repository.

- Advance Options for embed view implemented

The embedded view of CircuitVerse circuits can be used to display circuits in an iframe on other websites.

![image](/images/niladri_GSoC24/embed1.avif)

By clicking the Embed button on the bottom right, a dialog box can be opened, allowing the user to create a customised embed view for the circuit.

- Since decoupling of the new vue simulator some updates and bug fixes were made in the main simulator that were merged to the new Vue simulator.

### 🔹 Future Work 📅

- Finishing up the typescript integration.
- Creating the desktop application.

### 🔹 Pull Requests 📥

**Some of the major PRs that were created during the project period:**

- [Advance options for embed view](https://github.com/CircuitVerse/cv-frontend-vue/pull/312)
- [Timing Diagram increase decrease buttons](https://github.com/CircuitVerse/cv-frontend-vue/pull/313)
- [Implemented LayoutElements Panel vue component](https://github.com/CircuitVerse/cv-frontend-vue/pull/317)
- [TestBench (Creator, Panel, Validator, DialogBox) Vue Component Implemented](https://github.com/CircuitVerse/cv-frontend-vue/pull/323)
- [Mobile view Implementation for vue simulator](https://github.com/CircuitVerse/cv-frontend-vue/pull/361)
- [Global styles moved to component scoped styles](https://github.com/CircuitVerse/cv-frontend-vue/pull/365)
- [Testcases for vue simulator [Vitest]](https://github.com/CircuitVerse/cv-frontend-vue/pull/364)
- [ts + vue integration and jquery removal in layout files](https://github.com/CircuitVerse/cv-frontend-vue/pull/341)
- [ts integration, jquery migration to vue's reactives for plotArea and Timing Diagram panel](https://github.com/CircuitVerse/cv-frontend-vue/pull/329)
- [Added helpful functions for debugging of circuit](https://github.com/CircuitVerse/cv-frontend-vue/pull/366)
- [Moving a component mess up the connected wires](https://github.com/CircuitVerse/cv-frontend-vue/pull/367)
- [Implemented state machine for simulator](https://github.com/CircuitVerse/cv-frontend-vue/pull/368)
- [Change the implementation of the priority queue to use a heap data structure](https://github.com/CircuitVerse/cv-frontend-vue/pull/369)

### 🔹 blogs 📝

[**Phase 1 blog GSoC@24 Niladri Adhikary**](https://blog.circuitverse.org/posts/niladri_phase_1_report/)

- `week 0` - [GSoC@24 - Community Bonding](https://dev.to/niladri_adhikary_f11402dc/gsoc24circuitverse-week-0-community-bonding-1pni)
- `week 1 & 2` - [GSoC@24 - week 1&2 blog](https://dev.to/niladri_adhikary_f11402dc/gsoc24circuitverse-week-1-2-37gj)
- `week 3 & 4` - [GSoC@24 - week 3&4 blog](https://dev.to/niladri_adhikary_f11402dc/gsoc24circuitverse-week-3-4-21fg)
- `week 5 & 6` - [GSoC@24 - week 5&6 blog](https://dev.to/niladri_adhikary_f11402dc/gsoc24circuitverse-week-5-6-44hd)
- `week 7 & 8` - [GSoC@24 - week 7&8 blog](https://dev.to/niladri_adhikary_f11402dc/gsoc24circuitverse-week-7-8-33ig)
- `week 9 & 10` - [GSoC@24 - week 9&10 blog](https://dev.to/niladri_adhikary_f11402dc/gsoc24circuitverse-week-9-10-45me)
- `week 11 & 12` - [GSoC@24 - week 11&12 blog](https://dev.to/niladri_adhikary_f11402dc/gsoc24circuitverse-week-11-12-2p4h)

### 🔹 Conclusion ✅

The project was successfully completed and all the goals were achieved. The new Vue simulator is now ready to be integrated into the main CircuitVerse repository. The project was a great learning experience and I would like to thank my mentors for their guidance and support throughout the project. I would also like to thank Google for giving me this opportunity to work on such an amazing project.
