---
title: "Final Report for GSoC 2020"
date: 2020-08-26T17:14:55+05:30
draft: false
author: Samiran Konwar
---

This is the report produced as a part of the final evaluation of the GSoC 2020 project titled [Enhancing Simulator User Interface](https://github.com/CircuitVerse/CircuitVerse/wiki/GSoC%2720-Project-List#project-4---enhancing-simulator-user-interface) with the organization [CircuitVerse](https://github.com/CircuitVerse/CircuitVerse).

Student: [Samiran Konwar](https://github.com/abstrekt)

Mentors: [Nitin Singhal](https://github.com/nitin10s/), [Dustin Harris](https://github.com/devl0rd)

&nbsp;

| Project Details|  |
|---	|---	|
|Initial Proposal|  [Project 4](https://docs.google.com/document/d/17H3BqUwqL_sRxXUo8-wkHShpFo-38ywnn6LUWDJUdUY/edit?usp=sharing)|
|Repository|[CircuitVerse](https://github.com/CircuitVerse/CircuitVerse)|
|Duration| ~4 Months (4 May'20 - 24 Aug'20)|


&nbsp;

| MAJOR TASK     |      STATUS   |  Links |
|----------|:-------------:|------:|
| Revamp User Interface on simulator |  completed/merged | [Revamp UI of the Simulator [Task 1.1.1]](https://github.com/CircuitVerse/CircuitVerse/pull/1438/commits) |
| Hotkeys |    completed/open   |   [Hotkeys [Task 1.2]](https://github.com/CircuitVerse/CircuitVerse/pull/1475/commits) |
| Color Themes |    completed/open   |   [Color Themes](https://github.com/CircuitVerse/CircuitVerse/pull/1520/commits) |
| Built-in tutorials | completed/open |    [Built-in tutorials / getting started tutorials](https://github.com/CircuitVerse/CircuitVerse/pull/1569/commits) |
| Support for Touch Screens | completed/open |   [Enabling support for touch screen #1570](https://github.com/CircuitVerse/CircuitVerse/pull/1570/commits) |
| Features & Improvements | completed/open |    [features & improvements](https://github.com/CircuitVerse/CircuitVerse/pull/1585/commits) |


&nbsp;
&nbsp;

## Community Bonding Period (May 4, 2020 - June 1, 2020)

Activities:

1. Established communication channel with mentors/students (working on the same repository).
2. Weekly E-meetings with all members, discussing about project workflow.
3. Researching about color schema, WCGA 2.0 guidelines, Color Blind Support, etc. 
4. Blogs wrote during this phase (in-order): [blog 0](https://abstrekt.github.io/single-blog.html), [Blog 1](https://medium.com/@abstrekt/week-3-of-my-gsoc-project-b8c044b6e7f8), [Blog 2](https://medium.com/@abstrekt/week-4-before-after-i-shall-hide-6096118bd2dc).
5. Finishing up the User Interface Design [prototype](https://xd.adobe.com/view/cfbc29ff-f83b-42d7-7ef0-9220dbb7d3bd-b98d/).
6. Setting up development environment.

&nbsp;
&nbsp;

## First Phase (June 1, 2020 - June 29, 2020)

Activities:

1. Breaking apart the current User Interace, transitioning to new User Interface on a separate [branch](https://github.com/CircuitVerse/CircuitVerse/tree/new_UI).
2. Generating the SMACSS architecture [schema](https://github.com/CircuitVerse/CircuitVerse/tree/new_UI/public/css) for breaking down the old stylesheet into new [main.stylesheet.css](https://github.com/CircuitVerse/CircuitVerse/blob/new_UI/public/css/main.stylesheet.css).
3. Generating all [assets](https://github.com/CircuitVerse/CircuitVerse/tree/new_UI/public/css/assets) required for the UI.
5. Addition of UI plugins in order to achive custom shadow elements.
6. Complete restructuring of [edit.html.erb](https://github.com/CircuitVerse/CircuitVerse/blob/new_UI/app/views/simulator/edit.html.erb).
7. Blogs wrote during this phase (in-order): [blog 0](https://medium.com/@abstrekt/gsoc-coding-phase-week-1-9cd5c78c8a10), [Blog 1](https://medium.com/@abstrekt/gsoc-week-2-keydown-87776a3cdab2), [Blog 2](https://medium.com/@abstrekt/first-evaluation-1610c33e694f).

#### TODOs:

- [ ] The SMACSS archtiecture were created but un-used due to webpacker setup unavailability, needs to break down [main.stylesheet.css](https://github.com/CircuitVerse/CircuitVerse/blob/new_UI/public/css/main.stylesheet.css) into their dedicated files/folder structure.
- [x] Merging [Webpacker](https://github.com/CircuitVerse/CircuitVerse/tree/stories/webpack_setup) branch into [NewUI](https://github.com/CircuitVerse/CircuitVerse/tree/new_UI) branch.

&nbsp;
&nbsp;

## Second Phase (July 4, 2020 - July 27, 2020)

Activities:

1. Setting up required [library](https://github.com/CircuitVerse/CircuitVerse/pull/1475/files/2702754aa000716a35dce6527e573f9c4a863f74#diff-1fb8ee4783576259cb2937e8cee8102e) to be used for Hotkeys feature.
2. Building the hotkey preference [panel](https://github.com/CircuitVerse/CircuitVerse/pull/1475/commits/d9459a112db7e20c455e5485d44d8eba45cde5a9).
3. Generating the defaultkeys [metadata](https://github.com/CircuitVerse/CircuitVerse/pull/1475/commits/fc32848c75eb3a97ef14a293e8fcac1cb09b8763#diff-17fbf1f652a79440baed7c82e2a8d76a).
5. Core logic generation for hotkeys & [actions](https://github.com/CircuitVerse/CircuitVerse/pull/1475/commits/b330aef1f65cf4a7c5ebc75c3bf95665c7d750a2#diff-f978a9831c3ff5fc6f243872ae6731cf) file.
7. Added keyevent normalization [library](https://github.com/CircuitVerse/CircuitVerse/pull/1475/commits/abf1bf27842d46c1ed6b62c95421cd2c3a781f98).
8. Merging [Webpacker](https://github.com/CircuitVerse/CircuitVerse/tree/stories/webpack_setup) branch into [NewUI](https://github.com/CircuitVerse/CircuitVerse/tree/new_UI) branch through [PR](https://github.com/CircuitVerse/CircuitVerse/pull/1519/commits).
9. Addition of color variables, changing all hexcode into css vars & separting all theme related ruleset it into [```color_theme.scss```](https://github.com/CircuitVerse/CircuitVerse/pull/1520/files?file-filters%5B%5D=.css&file-filters%5B%5D=.scss#diff-b9b8812305a12ea85f0e281b3e90dfbb).
10. Core logic generation of color themer.
11. Editing all ```module\js --> customDraw()``` from hardcoded color code to query from DOM.
12. Research about colors, generating color palettes, building themes [mock-ups](https://xd.adobe.com/view/f791691e-cf90-4b7f-a180-b26582b5b515-a2c2/?fullscreen).
13. Weekly e-meets about project related work.
14. Blogs written during this phase [Blog](https://medium.com/@abstrekt/gsoc-2020-second-phase-evaluation-report-5cc86e31e5cf?source=your_stories_page---------------------------)

#### TODOs:

- [x] Make use of webpacker for the hotkey feature, moving all files from ```/js``` to ```/src```, making use of modular javascript.

&nbsp;
&nbsp;

## Final Phase (August 1, 2020 -  August 24, 2020)

Activities:

1. Generating color theme configuration UI panel, with SVG preview generation.
2. Implementation of [```Filter Search```](https://github.com/CircuitVerse/CircuitVerse/pull/1577) on modules panel.
3. Feature panel drag [ability](https://github.com/CircuitVerse/CircuitVerse/pull/1585/commits/f444b95bb030101e68331e37b607f187bc5aa0c3).
4. Implementation & replace zoom buttons with zoom range [slider](https://github.com/CircuitVerse/CircuitVerse/pull/1585/commits/003a013cd63dee1af84d6fe8aaad395a31297519).
5. Module property & Element panels [minimization](https://github.com/CircuitVerse/CircuitVerse/pull/1585/commits/003a013cd63dee1af84d6fe8aaad395a31297519) ability.
6. Added circuit [preview](https://github.com/CircuitVerse/CircuitVerse/pull/1585/commits/0d23ac1d4ca524c2577ae0155acd2c22dba08a13) feature.
7. Multi-add element on ```Ctrl``` hold ability.
9. Modular hoktkey files, making use of webpacker.
10. Regular e-meets about project related work.
11. Blogs written during this phase [blog 0](https://medium.com/@abstrekt/gsoc-2020-final-phase-report-1-f3ff405a5922), [blog 1](#)
12. Various [UI-fixes](https://github.com/CircuitVerse/CircuitVerse/pull/1584/commits).
13. Addition of touch listeners for touch screen detection.

#### TODOs:

- [ ] For complete touch screen support major UI changes required for a touch detected device, as well as changing core logic of ```simulationArea``` to accomodate support.
- [ ] Elements overlapping inside the canvas should be avoided, currently there is no proper logic to detect element objects present/placed inside the canvas. Further research required on the canvas & logic.
- [ ] ```"What's new"``` popup to be built, presenting the various changes/features done on the simulator.
- [ ] Partialize SVG from [edit.html.erb](https://github.com/CircuitVerse/CircuitVerse/blob/new_UI/app/views/simulator/edit.html.erb) & reduce file line length.



&nbsp; 
&nbsp; 

#### Acknowledgment:

I am very grateful to my mentors [Nitin Singhal](https://github.com/nitin10s/) & [Dustin Harris](https://github.com/devl0rd) for helping me throughout the Google Summer of Code Period for making this project a success, special thanks to all the core members of the organization [Satvik Ramaprasad](https://github.com/satu0king), [Aboobacker MK](https://github.com/tachyons) for looking out at my work & guiding me throughout. Lastly, Sincere gratitude to Google for offering me this great opportunity to contribute to this wonderful community.
