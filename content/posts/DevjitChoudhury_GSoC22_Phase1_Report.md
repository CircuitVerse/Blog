---
title: "VueJS CircuitVerse Simulator | GSoC@2022 | Phase-1 Report"
date: 2022-07-25T23:23:48+05:30
draft: false
author: Devjit Choudhury
type: post
---

![GSoC@CircuitVerse](/images/devjit_choudhury_GSoC'22/coverImage.png)

This blog post is to summarize the work done in the First Phase of **Google Summer of Code @ 2022**.

> **[_New FrontEnd Framework for Simulator -_](https://summerofcode.withgoogle.com/myprojects/details/1IZGKjn2)  
> My project aims to decouple the CircuitVerse Simulator from the backend, remove the use of jQueryUI, and replace DOM mutations using strings and its Internationalization.**

During the **_Community Bonding Period_**, we decided to work on a new [Front-End repository](https://github.com/CircuitVerse/cv-frontend-vue) with [VueJS](https://vuejs.org/) as the FrontEnd Framework and [Vuetify](https://next.vuetifyjs.com/en/) as a replacement for jQueryUI.

## Phase 1 - Milestones Achieved

---

### I. Setting up the project

I started with setting up the Vue project using Vite, installing all the dependencies, and setting up the basic folder structure for the project.
I added ES Lint and Prettier for linting and formatting and added scripts to format the entire codebase on running it.
Also added husky and commitlint for checking my commit messages before pushing my code.
Added aliases for src and components folder.
Having the basic project set up, I pushed the initial code to the repository.

### II. Decoupling Simulator from Backend

Next, I focused on integrating the simulator code from the [CircuitVerse repository](https://github.com/CircuitVerse/CircuitVerse), where I faced some challenges in resolving the bugs to make the core functionalities of the simulator work.

I learned to move a directory from one repository to another, preserving its commit history.
[Link to a very helpful article to implement this.](https://medium.com/@ayushya/move-directory-from-one-repository-to-another-preserving-git-history-d210fa049d4b)

Following it, I removed the unrequired dependencies from the project.
Finally, the Simulator was functional, and I could proceed with breaking it into components.

### III. Internationalization

Did the basic configurations for Internationalization using [Vue-i18n](https://kazupon.github.io/vue-i18n/).

```
src/locales
    |____ en.json (for english translations)
    |____ hi.json (for hindi translations)
    |____ i18n.ts (for configurations)
```

I imported the en.json and hi.json localization files from the previous year's GSoC project of Internationalization.
I did the Localization of the Navbar, Elements Panel, and Properties Panel.

|                                Localization of Elements Panel                                 |                              Localization of Navbar                              |
| :-------------------------------------------------------------------------------------------: | :------------------------------------------------------------------------------: |
| ![Panel Internationalization](/images/devjit_choudhury_GSoC'22/CircuitElementsPanel-i18n.gif) | ![Navbar Internationalization](/images/devjit_choudhury_GSoC'22/navbar_i18n.gif) |

### IV. Panels : Elements Panel & Properties Panel

Replaced the previous Implementation using jQuery accordion with Vuetify Expansion Panel.

Initially, the properties panel was displayed by appending HTML as a string to the DOM, which I replaced with Vue logic. The Panel contains PanelHeader and PanelBody.

There are 3 types of Panel Body -

- Showing Layout Properties
- Showing Project Properties
- Showing Element Properties

|          Linking Cirucit Elements with Properties Panel           |                            Types of Panel Body                            |
| :---------------------------------------------------------------: | :-----------------------------------------------------------------------: |
| ![Properties Panel](/images/devjit_choudhury_GSoC'22/blog-34.gif) | ![Properties Panel](/images/devjit_choudhury_GSoC'22/propertiesPanel.gif) |

The panel body to be displayed is decided upon the last selected element.

### V. Dragging of Panels

Removing jQueryUI dragging functionality and coded the logic myself. But decided it would be beneficial to use a library like [useDraggable | VueUse](https://vueuse.org/core/usedraggable/).

![Panel Dragging](/images/devjit_choudhury_GSoC'22/panelDraging.gif)

### VI. Refactoring Navbar Component

Dividing the Navbar into 3 components

- Logo
- Navbar Links
- User Options

Navbar Folder structure

```
NavbarData.json
UserData.json
Navbar
  |-------> Logo
  |-------> DropDown
  |-------> User (fetch data from : UserData.json)
  |
  |-------> Navbar Links (fetch data from : NavbarData.json)
                |-------> Navbar Link
```

![Navbar - i18n - logic](/images/devjit_choudhury_GSoC'22/navbar_i18n_logic.png)

<center>Linking Navbar data with locale</center>

### VI. TabsBar Component

I created the tabs-bar component. Replaced DOM rendering using strings with Vue Logic. I defined a `cicuit_list state` in `Pinia Store` and updating it on creating or delting a circuit or tab.
Replaced jQueryUI sortable with [VueSortableJS library](https://github.com/SortableJS/vue.draggable.next).

```
circuit_list - Array of Object
circuit_list[i] - { name : circuitName, id : circuitId }
```

Learned to use Pinia store states in external javascript files.
Pinia has [documentation](https://pinia.vuejs.org/core-concepts/outside-component-usage.html) of using states outside component.

## Link to Pull Requests

---

- `Week 1` [Setting up the project and its dependencies](https://github.com/CircuitVerse/cv-frontend-vue/pull/2)
- `Week 1` [Simulator codebase integration](https://github.com/CircuitVerse/cv-frontend-vue/pull/4)
- `Week 2` [feat: circuit element panel component](https://github.com/CircuitVerse/cv-frontend-vue/pull/7)
- `Week 3 & 4` [feat: properties panel component](https://github.com/CircuitVerse/cv-frontend-vue/pull/9)
- `Week 5` [refactor: navbar component](https://github.com/CircuitVerse/cv-frontend-vue/pull/11)
- `Week 6` [feat(wip): tabsbar component](https://github.com/CircuitVerse/cv-frontend-vue/pull/14)

## Future Works

---

- Will Complete the remaining panel and Dialog Boxes.
- Moving the simulation Area to Pinia Store.
- Integrating the Embed feature in the Vue Project.

## Learnings

---

- I researched and learned a lot of new technologies like Vite, MicroFrontends, and various Frameworks.
- Learning more and more features of VueJS like vue-slots, composable, and more logic implementation with every contribution.
- Gaining knowledge of writing proper commit messages and all the good practices of Open Source.
- Setting up a project from scratch and moving the codebase from one technology to another gave me great confidence.

## Conclusion

---

Last few weeks, I had a fantastic time contributing to CircuitVerse Organizing with a great community and very helpful and supportive mentors. I can see my skillset growing each and every week. The best part of working with CircuitVerse is the freedom to plan my tasks and their implementation, and when it is done and merged, it greatly boosts my confidence.

I would like to specially thank [Aboobacker MK](https://github.com/tachyons), [Samiran Konwar](https://github.com/abstrekt) and [Ayan Biswas](https://github.com/ayan-biswas0412) for always being available to help me whenever I get stuck.
