---
title: "Project 4: First Evaluation"
date: 2020-07-11T21:09:47+05:30
draft: false
author: Samiran Konwar [[Abstrekt](https://linkedin.com/in/Abstrekt)]
---
Status: ***passed***

This blog summarizes the work done til first phase evaluation of **Google Summer of Code** program under the organization CircuitVerse as a part of the "Enhancing Simulator User Interface" project.

&nbsp;
&nbsp;

### Objective 1: Revamped User Interface (simulator)

![Snapshhot](/img/p4/UI_snap.png)

#### Description:
The proposed prototype is a complete custom design,  no framework or library were used, only plain CSS3 with a few jQuery plugins added in order th implement it. This User Interface tends to increase visible workspace area of about 7.95% (estimated).

##### Status: completed | merged

* It consist of making new design prototype, which was done on adobe XD: 
[UI Preview Link](https://xd.adobe.com/view/cfbc29ff-f83b-42d7-7ef0-9220dbb7d3bd-b98d/)
* Implemented it on code: [Revamp UI of the Simulator [Task 1.1.1] #1438](https://github.com/CircuitVerse/CircuitVerse/pull/1438)
* Total change of lines of code to the codebase: +5,319 addition & −1,365 deletion. 
* Read more about this task on [Medium](https://medium.com/@abstrekt/week-3-of-my-gsoc-project-b8c044b6e7f8)


&nbsp;

### Objective 2: Hotkey
![Snapshhot](/img/p4/hotkey.gif)

#### Description:

This objective aims to have hotkey bindings or  “Keyboard shortcuts” for the CircuitVerse' simulator. With a preference panel to let user's customize the keys as per their comfort. It leverage the feature of browser's localStorage for persistence.

##### Status: completed | pending review

* This object was made possible with the help of two libraries:
    - [Handling Keyboard Shortcuts in JavaScript](http://www.openjs.com/scripts/events/keyboard_shortcuts/) by Binny V A
    - [Cross-browser normalization of keyboard events](https://github.com/nostrademons/keycode.js/) by Jonathan Tang
* Implemented it on code: [Hotkeys [Task 1.2] #1475](https://github.com/CircuitVerse/CircuitVerse/pull/1475)
* Total change of lines of code to the codebase: +1,424 addition & −85 deletion.
* Read more about this task on [Medium](https://medium.com/@abstrekt/gsoc-coding-phase-week-1-9cd5c78c8a10)