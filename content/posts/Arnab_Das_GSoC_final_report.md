---
title: 'CircuitVerse VueJS Simulator | GSoC@2023 | Final Report'
date: 2023-09-07T02:18:49+05:30
tags: [GSoC, 2023, Final Report, Arnab Das]
draft: false
author: Arnab Das
type: post
---

![GSoC@CircuitVerse](/images/Arnab_GSoC23/cover.png)

This blog post is to summarize all the work done in **Google Summer of Code @ 2023** for the project **Development and integration of Vue.js simulator**.

## Table of Contents

{{< toc >}}

### [Work Repository 🖥](https://github.com/CircuitVerse/cv-frontend-vue)

> **[_CircuitVerse Simulator with VueJS -_](https://summerofcode.withgoogle.com/programs/2023/projects/eg17qD6w)
> While carrying forward the goals from last year's project, this project focuses on finishing up the development of Vue.js circuit simulator while boosting its performance, stability, and scalability by transitioning the JavaScript codebase to TypeScript. This project encompasses integrating the simulator with the main repository, carrying out new API endpoint creation and integration, introducing new features, and enhancing user experience.**

### Project Goals & Accomplishments -

---

1. Conversion of Components to Vue.js Components
2. Integration of Vue Simulator in the main repository
3. Designing and implementing new API endpoints
4. implementation of JWT for Vue Simulator
5. Integration of new API endpoints
6. Enhancing UI and UX
7. Implementation of new features
8. Performance and Stability
9. Panels Dragging Functionality
10. Implementation of Embed view of the simulator
11. Internationalization of the simulator
12. Removal of jQuery, jQueryUI & integration of TypeScript
13. Refactoring of Styles and Codebase

---

### 🔹 Conversion of Components to Vue.js Components 🔀

As the Goal of the project is creation of a Vue.js based simulator for CircuitVerse, the first step was to convert the existing components to Vue.js components.

This included conversion of the following components:

1. Verilog Editor panel
2. Timing Diagram panel
3. Issue reporting system
4. Layout Element Panel
5. Simulation area canvas & help section
6. QuickButton
7. Custom shortcut
8. TestBench panel
9. Import as cv
10. Export as cv

The components listed were the primary ones transitioned to Vue.js from scratch. Additionally, numerous other partially-converted components were fully transformed into Vue components, optimizing their functionality by fully harnessing Vue's capabilities.

### 🔹 Integration of Vue Simulator in the main repository ⚙️

The most important Goal of this project was to integrate the new Vue.js based simulator with the main repository hence making it available to the public on [circuitverse.org](https://circuitverse.org) while keeping the new simulator backward compatible for the old circuits.

##### Integration of codebase

For the integration we leveraged the power of [git submodules](https://git-scm.com/book/en/v2/Git-Tools-Submodules). This allowed us to use the Vue simulator with static build files in production environment and with dev server in development environment.

##### accessing the new simulator

While the new simulator aims to replace the old one, it hasn't been fully tested yet. To bridge this, we've introduced a feature flag, allowing users to toggle between the two versions and aiding in gathering feedback from beta testers.

one can achieve this form `Dashboard > Edit details > Enable new simulator` just by checking ✅ the checkbox.

{{< video src="/videos/Arnab_GSoC23/integration.mp4" controls="true" preload="auto" >}}

### 🔹 Designing and implementing new API endpoints 🌐

The project's goal is to evolve the simulator into a standalone application, and eventually, a desktop version. To support this vision and its functionalities, new API endpoints were essential. The following API flow was designed for this purpose:

![API Flow](/images/Arnab_GSoC23/simulator_flow.png)

The API endpoints were designed to support the following functionalities:

- `GET /api/v1/projects/:id/check_edit_access` - To check if the signed-in user has edit access to the project
- `GET /api/v1/projects/:id/circuit_data` - Return the circuit data as a json object if user has view access to the project
- `PATCH /api/v1/projects/update_circuit` - Update the circuit data of the project if user has edit access to the project
- `POST /api/v1/projects` - To create a new project with circuit data
- `POST /api/v1/simulator/post_issue` - To post an issue to Slack channel using Slack hooks
- `POST /api/v1/simulator/verilogcv` - To convert the verilog code to circuitverse simulator compatible json object

more details about the API endpoints can be found [here](https://github.com/CircuitVerse/CircuitVerse/pull/3862)

### 🔹 Implementation of JWT for the Vue Simulator 🔒

Initially, the primary site and simulator used Devise for authentication. However, with the introduction of new API endpoints and the Vue simulator's potential for standalone operation and future desktop application adaptation, there was a need for a more versatile authentication mechanism. Consequently, we integrated JWT (Json Web Token) authentication for the simulator.

This included integrating and generating JWT tokens when the user logged into the site.
the jwt is configured as following:

1. create and save jwt as cookie on:
   - sign_up (session validity)
   - sign_in (session validity if not remember me / if remember me then 2 weeks validity)
2. destroy / delete saved cookie:
   - sign_out ( all cases )
   - browser close (when not remember me jwt gets deleted as session based cookie)

### 🔹 Integration of new API endpoints 🔗

Initially, the simulator utilized Axios for API calls. However, with the shift to modern ES6 JavaScript, we replaced all Axios and jQuery-related code with the fetch API. Furthermore, with the integration of JWT, authentication within the Vue simulator was transitioned to be managed exclusively by JWT.

Alongside this other changes in the simulator logic was made few new features was added and few bugs were fixed. keeping the simulator backward compatible with the old circuits. Some of these major changes would be discussed in the upcoming sections.

### 🔹 Implementation of new features 🌟

As the Simulator is target to be operated as a standalone application, it was essential to implement features that would allow users to save and load their circuits locally. This was achieved by implementing the following features:

1. Export as `cv`: This feature allows users to export their circuits as `cv` files, which can be loaded into the simulator at a later time.
2. Import as `cv`: This feature allows users to import `cv` files into the simulator, loading the circuit contained within the file.

{{< video src="/videos/Arnab_GSoC23/import_export.mp4" controls="true" preload="auto" >}}

Similarly, for creating a new circuit, the user was redirected to project edit page which wont be available with the standalone application. For this reason a new dialog box was created which would allow users to create a new circuit without leaving the simulator.

![New Circuit Dialog](/images/Arnab_GSoC23/update_project_details.png)

In addition to this, `alert()`, `prompt()`, and `confirm()` were replaced with custom dialog boxes, enhancing the user experience & future implementation of the simulator as a desktop application.

### 🔹 Enhancing UI and UX 🎨

With the increase in new features and functionalities, it was essential to enhance the UI and UX of the simulator to make it more user-friendly & developer friendly. This included:

1. Replacing the old `alert()`, `prompt()`, and `confirm()` with custom dialog boxes (as discussed ago).
2. updating the user menu to make it more user friendly and easier to add new features.
3. updating the navbar to make it more developer friendly and user friendly in smaller screens.

**Read my [Phase 1 blog](https://blog.circuitverse.org/posts/arnab_das_gsoc_phase1/) for more details on [Implementation of new features](http://localhost:1313/posts/arnab_das_gsoc_final_report/#-implementation-of-new-features-) & [UI and UX](http://localhost:1313/posts/arnab_das_gsoc_final_report/#-enhancing-ui-and-ux-) updates**

### 🔹 Performance and Stability 📈

With the conversion of the simulator to Vue.js & TypeScript lots of bugs were introduced and the old methods (such as DOM manipulation for ui changes & simulator logics) were not working, for this new methods based on Vue & es6 js were used. To talk about some of the major are:

1. moving the tab related data (eg. tabs info, active tabs etc) to be stored on Pinia Store.
2. Using Vue methods for tabs loading and switching.
3. Removal of most of SetInterval (which made the simulator slower) with vue.js watch and computed methods.
4. Saving all user Info & project related information in Pinia Store.
5. Removal most DOM manipulation with Vue methods.
6. Simulator crash on switching to layout mode.
7. Simulator + browser crash on turing on Lite mode.
8. Recursive calling of circuit due to error in subcircuit addition dialog logic.
9. Error in creating new circuit after deleting of circuit.
10. Wrong Json object creation while saving circuits resulting in cashing simulator when saved circuit is loaded.

These were some of the major issues fixed which hindered the Performance & stability of the Simulator, Lots of other bugs and logical changes were needed to be done for the simulator to be fully functional while being totally backward completable. For more information on these changes feel free to check out the blogs, prs & issues.

### 🔹 Panels Dragging Functionality 🖱️

Previously the simulator leveraged jQueryUI for the dragging functionality of the panels. However, with the transition to Vue.js, this functionality was lost.

we used modern ES6 JavaScript to implement the dragging functionality. After some research and testing, we decided to use [interact.js](https://github.com/taye/interact.js). The main reason behind using this library was its small size, similar usage to jQueryUI, most nearest internal implementation if it was to be implemented from scratch and most importantly it provided all the functionality needed for the simulator.

{{< video src="/videos/Arnab_GSoC23/dragging.mp4" controls="true" preload="auto" >}}

### 🔹 Implementation of Embed view of the simulator 🖼️

Embed view provides a preview of the circuit which, in which one can't edit the circuit. this also allows users to embed the circuit in external websites. This was implemented by creating a new route `/simualtorvue/embed/:id` which would render the embed view of the circuit.

{{< video src="/videos/Arnab_GSoC23/embed.mp4" controls="true" preload="auto" >}}

### 🔹 Internationalization of the simulator 🌎

The simulator was initially available only in English. However, with the introduction of new API endpoints and the Vue simulator's potential for standalone operation and future desktop application adaptation, there was a need for a more versatile language support mechanism. Consequently, we integrated i18n for the simulator. we used vue-i18n for the internationalization.

{{< video src="/videos/Arnab_GSoC23/i18n.mp4" controls="true" preload="auto" >}}

### 🔹 Removal of jQuery, jQueryUI & integration of TypeScript 📦

The simulator was initially built using jQuery and jQueryUI. However, jQuery being a somewhat old technology & the large size of codebase it was decided to remove all jQuery related code using es6 javascript & jQueryUI with Vue.js to make the frontend code broken into smaller component which would help new developers and make the development experience better. This also meant we could get rid of DOM manipulation using the power of Vue.js

For the typescript Integration we started with the components and converted most of them to typescript, after that the conversion of javascript files were started, some files could not be changed as active changes were being made by other contributors which need to be merged before conversion of those files, this is to be done in future period.

### 🔹 Refactoring of Styles and Codebase 🔄

Old simulator code was using SCSS at a lot of part of the codebase so those were to be converted to CSS & the new components corresponding styles were moved to the corresponding Vue components `<style></style>` tags. This was done to make the codebase more developer friendly and easier to understand. Also the clearing & refactoring of codebase was started to remove unused code and make the codebase more readable. the following folder structure was decided to be followed for the refactoring:

![refactoring folder structure](/images/Arnab_GSoC23/refactor.png)

### 🔹 Future Work 📅

- currently the simulator is working totally fine only few functionalities have some bugs so most important point would be fixing those to make the simulator fully ready to replace the current one.
- Creating the mobile version of the vue simulator.
- Finishing up the typescript integration & style Refactoring.
- Rigorous testing of each and every functionalities.
- Creating the desktop application.
- Merging of all diverged changes & bug fixes occurring in the main repo since the decoupling of the simulator.

### 🔹 Pull Requests 📥

**Below are listed some of the most important pull requests of the project for any other prs please refer to the respective repository.**

##### [Main Repo](https://github.com/CircuitVerse/CircuitVerse) :

- [integration of vue simulator to main repository](https://github.com/CircuitVerse/CircuitVerse/pull/4009)
- [add feature flag for vue simulator](https://github.com/CircuitVerse/CircuitVerse/pull/4015)
- [implementation of new API endpoints for vue simulator](https://github.com/CircuitVerse/CircuitVerse/pull/3862)
- [configure jwt for CircuitVerse web to be used with vue simulator](https://github.com/CircuitVerse/CircuitVerse/pull/4016)

##### [Vue Simulator Repo](https://github.com/CircuitVerse/cv-frontend-vue) :

- [API integration, implementation fo new dialogBox for new project creation,fix tabBar issue, project loading, updating, circuit delete and other multiple issues](https://github.com/CircuitVerse/cv-frontend-vue/pull/170)
- [implement Import export of project as .cv file](https://github.com/CircuitVerse/cv-frontend-vue/pull/171)
- [CustomShortcut to vue component](https://github.com/CircuitVerse/cv-frontend-vue/pull/172)
- [implement Verilog Editor for the vue simulator](https://github.com/CircuitVerse/cv-frontend-vue/pull/173)
- [report issue to vue component](https://github.com/CircuitVerse/cv-frontend-vue/pull/174)
- [Quick menu to vue component](https://github.com/CircuitVerse/cv-frontend-vue/pull/175)
- [User menu revamp](https://github.com/CircuitVerse/cv-frontend-vue/pull/176)
- [Navbar revamp](https://github.com/CircuitVerse/cv-frontend-vue/pull/177)
- [insert subcircuit logic & error](https://github.com/CircuitVerse/cv-frontend-vue/pull/180)
- [timing diagram to vue component](https://github.com/CircuitVerse/cv-frontend-vue/pull/183)
- [Panels dragging functionality](https://github.com/CircuitVerse/cv-frontend-vue/pull/182)
- [layout mode fix](https://github.com/CircuitVerse/cv-frontend-vue/pull/184)
- [layout element to vue component](https://github.com/CircuitVerse/cv-frontend-vue/pull/186)
- [embed view of the simulator](https://github.com/CircuitVerse/cv-frontend-vue/pull/187)

### 🔹 blogs 📝

[**Phase 1 blog GSoC@23 Arnab Das**](https://blog.circuitverse.org/posts/arnab_das_gsoc_phase1/)

- `week 1 & 2` - [GSoC@23 - week 1&2 blog](https://arnabdaz.hashnode.dev/gsocweek12)
- `week 3 & 4` - [GSoC@23 - week 3&4 blog](https://arnabdaz.hashnode.dev/gsocweek34)
- `week 5 & 6` - [GSoC@23 - week 5&6 blog](https://arnabdaz.hashnode.dev/gsocweek56)
- `week 7 & 8` - [GSoC@23 - week 7&8 blog](https://arnabdaz.hashnode.dev/gsocweek78)
- `week 9 & 10` - [GSoC@23 - week 9&10 blog](https://arnabdaz.hashnode.dev/gsocweek910)
- `week 11 & 12` - [GSoC@23 - week 11&12 blog](https://arnabdaz.hashnode.dev/gsocweek1112)

### 🔹 Conclusion ✅

Spending the summer working on this project has been an amazing experience. I've learned a lot about Vue.js, TypeScript, Ruby On rails, Docker etc amazing technologies. I've also learned a lot about the open-source community and how to work with a team of developers. I'm grateful to CircuitVerse for giving me this opportunity and to my mentors - [Aboobacker MK](https://github.com/tachyons), [Devjit Choudhury](https://github.com/devartstar) and [Vedant Jain](https://github.com/vedant-jain03) for their guidance and support throughout the summer. Also kudos to my fellow mantees for all their support, help & collaboration throughout the project period.
