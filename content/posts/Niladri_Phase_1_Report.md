---
title: "CircuitVerse Vue Simulator: Phase 1 Report (GSoC 2024)"
date: 2024-07-25T18:06:50+05:30
author: Niladri Adhikary
type: post
---

![gsoc-cover](/images/niladri-cover.png)

It's been 8 weeks, and We have completed our first phase of GSoC. Throughout this phase, We have been working on the Vue Simulator for CircuitVerse. I learned a lot about Vue.js and TypeScript, and We have made significant progress in the project. We had to extend my phase 1 to 8 weeks due to exams, which gave me the time to complete this phase. During this time I really enjoyed working on the project and learned a lot of new things. I am looking forward to the next phase of the project.

## Project Overview 📋

The main goal of this project is to create a new simulator for CircuitVerse using Vue.js, which will be more interactive and user-friendly. The new simulator will be more efficient and will provide a better user experience. We have been working on this project for the past 8 weeks and We have made significant progress. We have completed the first phase of the project and We am happy with the progress We have made so far.

[GSoC-Project](https://summerofcode.withgoogle.com/programs/2024/projects/ZzPe11H4)

During the past 8 weeks, My primary focus was to convert all the remaining components to vue components, and move all updates and bug fixes from main repository, during the last few weeks We focused on converting all jquery DOM manipulations to vue'reactives and typescipe integration.

## Community Bonding Period 🏙 ~ (May 1 - May 26)

At first, We had a meeting with my project mentors to plan the timeline and discuss some decisions required based on my GSoC proposal. We decided to finish up some small bug fixes and minor updates during the community bonding period itself, some of them are :-

- Advance Options for embed view implemented.
- Fix for Timing Diagram increase decrease buttons.
- A PR for all bug fixes and updates from the main repo. It is a single PR for all the updates that can be directly applied to the Vue simulator without any changes, with different commit for each issue.

#### Advance Options for embed view implemented

The embedded view of CircuitVerse circuits can be used to display circuits in an iframe on other websites.

![image](/images/niladri_GSoC24/embed1.avif)

By clicking the Embed button on the bottom right, a dialog box can be opened, allowing the user to create a customised embed view for the circuit.

![image](/images/niladri_GSoC24/embed2.avif)

As you can see in the Advance option section user gets to decide which properties should be there in the embed view.

The Embed view Advance option was already implemented in the previous year GSoC i.e in GSoC’22 by this PR — Link, now was the time to implement the same in the Vue Simulator. The implementation was a bit different, as we could now use Vue’s reactive nature to make the task easier.

In the embed Component we will get the preference data from the params using the `useRoute` method.

#### Fix for Timing Diagram increase decrease buttons
Previously, the increase and decrease buttons of the timing diagram were not working.

![image](/images/niladri_GSoC24/timing1.avif)

#### A PR for all bug fixes and updates from the main repo
Since decoupling of the new vue simulator some updates and bug fixes were made in the main simulator which needs to be updated in the vue simulator.

It is a single PR for all the updates that can be directly applied to the Vue simulator without any changes, with different commit for each issue.

**References**
- [feat(gsoc'24): Advance options for embed view](https://github.com/CircuitVerse/cv-frontend-vue/pull/312)
- [fix(gsoc'24): Timing Diagram increase decrease buttons](https://github.com/CircuitVerse/cv-frontend-vue/pull/313)
- [fix(gsoc'24): updates and bug fixes from the main simulator](https://github.com/CircuitVerse/cv-frontend-vue/pull/314)

## Coding Period ~ Phase 1 💻

After susscessfully completing the community bonding period, which was quite productive, We started with the coding period, where We did tasks weekly for 8 weeks.

We had lots of meetings and discussions with my mentors, which helped me a lot in understanding the codebase and the project requirements.

#### Week 1 & 2 (May 27 - June 9)

A lot of work has been done on understanding the codebase, creating new Vue components, and eliminating bugs.

The main goal of this task was to achieve:
- Implementation of LayoutElements Panel Vue Component
- Fixed Mini Map not rendering Issue

#### Implementation of LayoutElements Panel Vue Component
Previously, the LayoutElements Panel was in the extra.vue file.

First, We created a new Vue file for the LayoutElements Panel and moved the HTML part inside the `<template> <template/>` tag.

Since the original codebase used vanilla JavaScript for some DOM manipulation, We converted these to Vue's reactive properties.

Additionally, We moved all related styles into the `<style> <style/>` tag.

![image](/images/niladri_GSoC24/layout1.avif)

#### Fixed Mini Map not rendering Issue
Previously the mini map in the simulator was not rendering due to styling issues.

Fixed it! using Changing some CSS properties

![image](/images/niladri_GSoC24/mini1.avif)

**References**
- [feat(gsoc'24): Implemented LayoutElements Panel vue component](https://github.com/CircuitVerse/cv-frontend-vue/pull/317)
- [fix(gsoc'24): mini map rendering fixed](https://github.com/CircuitVerse/cv-frontend-vue/pull/316)

#### Week 3 & 4 (June 10 - June 23)

This 2 weeks We have been focusing on Implementing the remaining components and VUE + TS Integration with removal of JQuery.

Some of the Components that We have Implemented are:

- `TestBench Panel.vue`
- `TestBench Creator.vue`
- `TestBench Validator.vue`
- `Alert MessageBox`

Vue + Typescript Integration for:

- `Project.ts`
- `Utils.ts`
- `Testbench.ts`
- `Open Offline.vue`

Pania Store came really in handy to Implement the state management very nicely, and i quite love its Functionalities

#### Implementation of TestBench Components

![image](/images/niladri_GSoC24/testbench1.avif)

As planned in my proposal We started with implementing the creator component using vuetify and converted all jQuery & DOM manipulations to Vue's reactives and typescript integration.

Previously we were using the creator as a separate window, so this time Creating TestBenchCreator.vue eliminated the need to a extra window and the data transmission was done using pinia to transmit data between Creator and Testbench Panel component.

![image](/images/niladri_GSoC24/testbench2.avif)

Next, the TestbenchPanel that was under the extra.vue file, was converted to Vue's reactives, all UI DOM manipulations that was previously there in the testbench.js was migrated to the component using Vue and Pinia.

Other Testbench components like the testbench validator and some dialog boxes are migrated as well in the same folder.

Also created a Testbench store in the pinia store folder for reactive state management of the test data.

#### Vue + Typescript Integration

Typescript and Vue integrations were done in some files like project.ts, utils.ts, testbench.ts, Open Offline.vue Component initially more integrations will be done in the next weeks

**References**

- [feat(gsoc'24): Utils.js file migrated to Typescript + Vue's reactive](https://github.com/CircuitVerse/cv-frontend-vue/pull/325)
- [feat(gsoc'24): Project file converted to typescript](https://github.com/CircuitVerse/cv-frontend-vue/pull/324)
- [feat(gsoc'24): TestBench (Creator, Panel, Validator, DialogBox) Vue Component Implemented](https://github.com/CircuitVerse/cv-frontend-vue/pull/323)
- [feat(gsoc'24): OpenOffline.vue component jquery to Vue's reactive and ts integration](https://github.com/CircuitVerse/cv-frontend-vue/pull/318)

#### Week 5 & 6 (June 24 - July 7)

Typescript Integration and Migration of JQuery to Vue's reactives was the focus in week 5, and in week 6 I had exams so not much was done just some extensions to week 5 work

#### Some Typescript Integration and Migration of JQuery to Vue's reactives are :-
- `plotArea`
- `Timing Diagram panel`
- `app.ts`
- `arrayHelper.ts`
- `backgroundArea.ts`
- `data.ts`
- `moduleSetup.ts`
- `sequential.ts`
- `verilogHelpers.ts`

#### PlotArea and Timing Diagram Panel

![image](/images/niladri_GSoC24/timing2.avif)

plotArea.js file was converted to typescript which allowed me to created interfaces and types for the plotArea and moved all the DOM manipulation into the vue's reactives under Timing diagram panel component along with all the listeners.

Inside the Timing diagram component typescript was integrated and vue's reactives which were migrated from the plotArea file.

A new pinia store timingDiagramStore was implemented to maintain the data flow for the timing diagram.

### Typescript Integration in smaller files
some smaller files that were previously in javascript have been converted to typescript as the changes were very minimal, We committed them in a single branch only.

**References**

- [feat(gsoc'24): ts integration, jquery migration to vue's reactives for plotArea and Timing Diagram panel](https://github.com/CircuitVerse/cv-frontend-vue/pull/329)
- [feat(gsoc'24): Typescript integration in some small files](https://github.com/CircuitVerse/cv-frontend-vue/pull/330)


#### Week 7 & 8 (July 8 - July 21)

This were the last 2 weeks of the first phase, and We had to extend my phase 1 to 8 weeks due to exams, in these 2 weeks We focused on converting all jquery DOM manipulations to vue'reactives and typescipe integration.

#### Some of the files that were converted are:-

- `Circuit.ts`
- `eventQueue.ts`
- `quinMcCluskey.ts`
- `customThemeAbstraction.ts`
- `applyTheme.vue`
- `layoutMode.ts`
- `layoutNode.ts`
- `layoutBuffer.ts`

and also created a interface for array extension methods.

**References**

- [feat(gsoc'24): circuit file converted to typescript + vue and array interface extension](https://github.com/CircuitVerse/cv-frontend-vue/pull/336)
- [feat(gsoc'24): Typescript Integration in eventQueue file](https://github.com/CircuitVerse/cv-frontend-vue/pull/338)
- [feat(gsoc'24): typescript integration in quinMcCluskey file](https://github.com/CircuitVerse/cv-frontend-vue/pull/339)
- [feat(gsoc'24): typescript integration in ApplyThemes.vue and customThemeAbstraction file](https://github.com/CircuitVerse/cv-frontend-vue/pull/340)
- [feat(gsoc'24): ts + vue integration and jquery removal in layout files](https://github.com/CircuitVerse/cv-frontend-vue/pull/341)

### Future Work

- Mobile View for the simulator
- Integration of test cases for the simulator
- Global stylesheets to scoped stylesheets
- Implementation of last year's stability improvements
- Remaing conversions

### Conclusion

I have learned a lot about Vue.js and TypeScript, and We have made significant progress in the project. Thanks to all my mentors for their guidance and support throughout this phase. I am looking forward to the next phase of the project.