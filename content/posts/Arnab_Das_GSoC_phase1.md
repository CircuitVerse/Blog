---
title: 'CircuitVerse VueJS Simulator | GSoC@2023 | Phase-1 Report'
date: 2023-07-10T00:13:11+05:30
draft: false
author: Arnab Das
type: post
---

![GSoC@CircuitVerse](/images/Arnab_GSoC23/cover.png)

This blog post is to summarize the work done in the First Phase of **Google Summer of Code @ 2023** for the project **Development and integration of Vue.js simulator**.

### [Work Repository 🖥](https://github.com/CircuitVerse/cv-frontend-vue)

> **[_CircuitVerse Simulator with VueJS -_](https://summerofcode.withgoogle.com/programs/2023/projects/eg17qD6w)
> While carrying forward the goals from last year's project, this project focuses on finishing up the development of Vue.js circuit simulator while boosting its performance, stability, and scalability by transitioning the JavaScript codebase to TypeScript. This project encompasses integrating the simulator with the main repository, carrying out new API endpoint creation and integration, introducing new features, and enhancing user experience.**

## Phase 1 - Milestones Achieved

---

### I. Integrating the simulator with the main repository

Previous year, the simulator was decoupled from the main repository and was being developed as an independent repository. This year the simulator is being integrated with the main repository as git submodule. With this, a static build of the vue simulator will be served from the main repository and users will be able to use the simulator from [circuitverse.org](https://circuitverse.org) website.

Also, we added the proxy in the simulator dev server so when the project is being developed using `vite dev` developers can use the api endpoints from the main repository hosted locally or remotely.

### II. Creation of new API endpoints in `api/v1` format for simulator

As our target is to be able to operate the simulator independently without any dependency on the main repository, new api endpoints were created for the simulator. this included creation of the following api endpoints:

- `GET /api/v1/projects/:id/check_edit_access` - To check if the signed-in user has edit access to the project
- `GET /api/v1/projects/:id/circuit_data` - Return the circuit data as a json object if user has view access to the project
- `PATCH /api/v1/projects/update_circuit` - Update the circuit data of the project if user has edit access to the project
- `POST /api/v1/projects` - To create a new project with circuit data
- `POST /api/v1/simulator/post_issue` - To post an issue to Slack channel using Slack hooks
- `POST /api/v1/simulator/verilogcv` - To convert the verilog code to circuitverse simulator compatible json object

### III. Implementation of JWT for the [circuitverse.org](https://circuitverse.org) website & the vue simulator

JWT was implemented for the [circuitverse.org](https://circuitverse.org) website and the vue simulator. This was done to make the simulator independent of the main repository and to make it more secure. The JWT token is generated from the main repository and is stored in the browser cookie as secure and httpOnly cookie. Depending on whether the user selected the `remember me` option, the cookie is saved either as session based or with bi-weekly expiry. The JWT token is then used to authenticate the user for the simulator api requests.

### IV. Implementation of the new api endpoints in the vue simulator

With the creation of the new api endpoints and jwt setup it was time to implement the api endpoints in the vue simulator. The following structure was followed for the implementation:

![Simulator API flow](/images/Arnab_GSoC23/simulator_flow.png)

#### - fixing bugs in the simulator

- While implementing the api endpoints in the simulator, we came across multiple bugs related to the tabs, circuit data generation for save, switching of circuit, deletion of circuit, creation of new circuits etc. All these issues occurred due to the development of the simulator without loading data from the api endpoints.
- Previously DOM manipulation was used to handle the loading, switching, deletion & creation of circuits in the scopes but with the implementation in vueJs, we moved all the tab related data to pinia store and manipulated the data in store to perform the switching, deletion, creation of circuits. This drastically reduced the usage of DOM manipulation and made the simulator more stable.
- Similarly the bugs regarding circuit creation and deletion were fixed by creation of new independent components for those functions and using the store to manipulate the data.

### V. Implementation of the new features in the vue simulator

#### - replacing all confirm() alert() prompt() with custom vue components

Previously the simulator used the default browser confirm(), alert() & prompt() for the confirmation of deletion of circuits, renaming of circuits, saving of circuits etc. This was replaced with custom vue components to make the simulator more user-friendly.

![Alert](/images/Arnab_GSoC23/alert.png)
![Confirm](/images/Arnab_GSoC23/confirm.png)
![Prompt](/images/Arnab_GSoC23/prompt.png)

#### - update project details from simulator after creation of new project

Previously when a new project was created the user was redirected to the project details edit page to update the project details. But to make the simulator independent of the main repository, it was necessary to allow users to update project details from the simulator itself which also made the user experience better.

This was achieved with a dialog box to update the project details from the simulator.

##### - creation of wysiwyg editor for project description

At the time of implementing the update project details dialog box, there was no pre-setup `wysiwyg` editor available which was compatible with our project. So a custom `wysiwyg` editor using the [tiptap](https://www.tiptap.dev/) library was created as a vue component.

![Update Project Details](/images/Arnab_GSoC23/update_project_details.png)

#### - Implementation of Import and Export of circuits as `.cv` files

With the introduction of the import and export of circuits as `.cv` files, users will be able to import and export their circuits as `.cv` files. This will allow users to share their circuits with other users and also allow users to import circuits from other users. Also, this would help the users to keep a local backup of their circuits.

![import_export](/images/Arnab_GSoC23/import_export.gif)

<!-- ![Import](/images/Arnab_GSoC23/import.png)
![Export](/images/Arnab_GSoC23/export.png) -->

### VI. UI updates in the vue simulator

#### - New UI for user menu

The user menu was updated to make it more user-friendly and to reduce the complexity of implementing new features.

<!-- ![user menu long](/images/Arnab_GSoC23/user_menu_long.png)
![user menu](/images/Arnab_GSoC23/user_menu2.png) -->

![user menu](/images/Arnab_GSoC23/user_menu.gif)

#### - New UI for navbar buttons

The navbar buttons were updated to reduce the complexity and DOM manipulation but most importantly to make the navbar for mobile devices more user-friendly.

<!-- The desktop navbar look is identical as old ones
![navbar](/images/Arnab_GSoC23/navbar.png)

the mobile navbar is now converted into a drawer which can be opened by clicking on the hamburger icon on the top left corner of the navbar.
![navbar mobile](/images/Arnab_GSoC23/navbar_mobile.png) -->

![navbar](/images/Arnab_GSoC23/navbar.gif)

### VII. Implementation of the new components for the vue simulator

##### - Quick menu

![quick menu](/images/Arnab_GSoC23/quick_menu.gif)

##### - Verilog editor

![verilog editor](/images/Arnab_GSoC23/verilog_editor.gif)

##### - Report issue

![report issue](/images/Arnab_GSoC23/report_issue.gif)

##### - custom shortcut fix

Fix custom shortcut to work on load, reduce DOM manipulation and use vue interpolation.

## Links to Pull Requests

- `week 1` [Simulator integration with main repository](https://github.com/CircuitVerse/CircuitVerse/pull/3774)
- `week 2` [New API endpoints creation](https://github.com/CircuitVerse/CircuitVerse/pull/3862)
- `week 2` [JWT implementation for simulator](https://github.com/CircuitVerse/CircuitVerse/pull/3797)
- `week 3 & 4` [Implementation of new api endpoints in simulator](https://github.com/CircuitVerse/cv-frontend-vue/pull/170)
- `week 4` [Implementation of new features in simulator](https://github.com/CircuitVerse/cv-frontend-vue/pull/171)
- `week 5 & 6` [QuickMenu](https://github.com/CircuitVerse/cv-frontend-vue/pull/175)
- `week 5 & 6` [VerilogEditor](https://github.com/CircuitVerse/cv-frontend-vue/pull/173)
- `week 5 & 6` [ReportIssue](https://github.com/CircuitVerse/cv-frontend-vue/pull/174)
- `week 5 & 6` [CustomShortcutFix](https://github.com/CircuitVerse/cv-frontend-vue/pull/172)
- `week 5 & 6` [User Menu revamp](https://github.com/CircuitVerse/cv-frontend-vue/pull/176)
- `week 5 & 6` [Navbar revamp](https://github.com/CircuitVerse/cv-frontend-vue/pull/177)

## Future Works

---

- Implementation of embedded simulator view
- Dragging of panels in the simulator
- Conversion of all the remaining components to vue components
- Removal of jquery from the simulator
- Conversion to typescript
- i18n support for whole simulator in three languages (english, hindi, bengali)
- Stabilizing the simulator
- Clearing the codebase and improve the file structure

## Learning

---

- Developed proficiency in navigating and understanding large codebases.
- Acquired in-depth knowledge of git submodules and subtrees.
- Gained expertise in build tools such as esbuild, webpack, and vite through implementation in a Vue simulator project.
- Advanced Docker and docker-compose skills for creating development environments, managing production builds, and understanding CI/CD pipelines.
- Learned proxying requests in development settings.
- Expanded experience in Ruby on Rails for API creation and test-driven development.
- Studied JWT & OAuth implementation principles.
- Understood feature flags usage in large projects for rolling out new features.
- Delved into Vue.js functionality for large-scale projects, including pinia store, vue router, and vuetify.
- Gained experience with the tiptap library for wysiwyg editor creation.
- Deepened knowledge of Typescript integration with Vue.js.
- Improved debugging skills through extensive bug fixing.

## Conclusion

---

Over the past few weeks, I've had an incredible journey contributing to CircuitVerse. The community has been supportive and motivating, and I had the freedom to meticulously plan and execute my tasks, all under the helpful guidance of my mentors. I've learned a lot about the inner workings of a large-scale project, and I've gained a lot of confidence in my abilities as a developer.

I would like to thank my mentors,
[Devjit Choudhury](https://github.com/devartstar) and [Vedant Jain](https://github.com/vedant-jain03) for always being there to help me out and guiding me throughout the project.
