---
title: "Touch Compatibility: GSoC 2021 Phase 1 Report"
date: 2021-08-18T16:07:11+05:30
draft: false
author: Abhishek Zade
type: post
---
![coverImage](/images/abhishek_phase_1_blog/FinalReportCoverAbhishekZade.png)

## ABOUT ME
Hello Everyone, I am [Abhishek R. Zade](https://www.linkedin.com/in/abhishek-zade-8095671ab/), currently an undergraduate student in Information Technology at All India Shri Shivaji Memorial Society Pune University SPPU. I am in my third year. Currently, I am working with an open-source organization named [CircuitVerse](https://circuitverse.org/) in this year’s GSoC.

## ABOUT MY PROJECT
So my project is on [Touch Compatibility](https://summerofcode.withgoogle.com/projects/#5562927320399872) with [CircuitVerse Website](https://circuitverse.org/). The current situation of the CircuitVerse website is, it supports only desktop browsers i.e mouse, it does not have any touch support. So my aim is to bring out the website for touch devices, so more users can enjoy making circuits on their smartphones.

## MY WORK (GITHUB LINK)
**Phase 1:** [Click Here](https://github.com/CircuitVerse/CircuitVerse/pull/2283)
**Phase 2:** [Click Here](https://github.com/CircuitVerse/CircuitVerse/pull/2362)

## PROJECT GOALS
1. Pan left, Right, Up, and Down on simulation Area.

2. Select Circuit Element using touch.

3. Pan the circuit element using touch.

4. Wire connections using touch.

5. Double-tap response.

6. Pinch to zoom.

7. Redesign UI 

## IMPLEMENTATION WITH EXPLANATION

Phase 1 started with initializing the touch listeners. The first thing changed  to make a common function for Pan.

- Panstart()
- Panstop()
- PanEnd()

Because whether it is mouse or Touch we need to coordinate the pan. Event listeners return event objects and through this event object, we can extract the x and y coordinate of the event.
Since we have made a common function for touch and mouse( because the same code was required ). We have to be  careful because if touch listeners start an event object and send coordinates of the mouse, the simulator won’t work, it will just break. To get over this situation I have made a new function to get the coordinates and this function will return the mouse coordinates if the mouse is enabled and touch if touch is. But how can this function recognize which coordinate to return?. The answer is simple. I have added a new property to the simulation area i.e touch and adjust its condition according to the situation.
The next most crucial thing is to select the circuit elements. After starting the pan it was impossible  to select circuit elements. Xf and Yf are the hover coordinates of the mouse before the click, which was originally passed on the hover function for circuit elements. Here X and Y are coordinates after touch start or mouse start, i.e, Mouse Click or Touch on-screen on simulation area. Here I added the following condition: if simulationArea.touch = true, then instead of Xf and Yf, replace it with X and Y. Now we are  able to select an element and pan it on the simulator with this one modification, Also able to select wire to connect them. So most of the work which is around 50 percent was done.Next thing Double tap is also implemented.
After Double tap, Pinch zoom is also implemented. There is a small bug in pinch zoom function which will be resolved post GSoC.

Phase 2 started with redesigning UI because there is a huge difference between desktop screen size and mobile screen size.
- Designed new menu button.
- Redesigned Panel for Circuit Elements, Module property , Time Diagram , quick menu.
- Add new quick tools button. 
- Designed new nav menu.
- Implemented UI for responsive version. 
- Implement lock for Portrait mode.

## FINAL RESULT
![New Designed UI](/images/abhishek_phase_1_blog/FinalDesignedCVAbhishekZade.png) 
![New Designed Navmenu](/images/abhishek_phase_1_blog/NamvmenuAbhishekZade.png)
![Potraid Lock](/images/abhishek_phase_1_blog/potraitlockAbhishekZade.png) 

### Video Link: [click here](https://drive.google.com/file/d/1_B_iZPF_WsSO_0dIdOj3CZI-pWvTiMwi/view?usp=sharing)  

## CHANGES NOT COMPLETED 
- PinchtoZoom has small bug

## FUTURE CHANGES TO BE DONE
- Once the simulator is optimized I want to introduce portrait mode since some people are comfortable with portrait mode.
- Once touch compatibility  gets complete  approval I will integrate in the flutter app using “in app web view”.

## BLOG LINKS
- [GSoC 2021 My Selection Journey and Community Bonding period @CircuitVerse](https://abhishekzade.medium.com/gsoc-2021-my-selection-journey-and-community-bonding-period-circuitverse-55633d337bde)
- [GSoC 2021 Phase 1 Blog @CircuitVerse](https://abhishekzade.medium.com/gsoc-2021-phase-1-blog-circuitverse-d09c4e7dfca0)
- [Touch Compatibility: GSoC 2021 Phase 1 Report](https://blog.circuitverse.org/posts/abhishekzade_phase_1_report/)
- [Let's Talk About UI](https://abhishekzade.medium.com/lets-talk-about-ui-df0e367f6b4?source=your_stories_page-------------------------------------)
- [Working of circuitVerse UI Phase 2](https://abhishekzade.medium.com/working-of-ui-f94e9fa07c9a?source=your_stories_page-------------------------------------)
- [The mistake I have done during the GSoC](https://abhishekzade.medium.com/the-mistake-i-have-done-during-the-gsoc-b7851d70613d?source=your_stories_page-------------------------------------)

## SUMMARY
In this summer i have successfully implemented the touch compatibility to Circuitverse website with redesigned UI for small screen version.I have  learned so many things this year most importantly I have met lots of people and made good lifetime bonding with them. Finally, I would like to thank 

- [Satvik Ramprasad](https://github.com/satu0king)
- [Shreya Prasad](https://github.com/ShreyaPrasad1209)
- [Nitin Singhal](https://github.com/nitin10s)
- [Samiran Konwar](https://github.com/abstrekt)

for guiding.
