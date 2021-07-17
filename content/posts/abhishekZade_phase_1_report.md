---
title: "Touch Compatibility: GSoC 2021 Phase 1 Report"
date: 2021-07-17T16:07:11+05:30
draft: false
author: Abhishek Zade
type: post
---
![coverImage](/images/abhishek_phase_1_blog/Phase1CoverAbhishekZade.png)

## About my project
So my project is on [Touch Compatibility](https://summerofcode.withgoogle.com/projects/#5562927320399872) with [CircuitVerse Website](https://circuitverse.org/). The current situation of the CircuitVerse website is, it supports only desktop browsers i.e mouse, it does not have any touch support. So my aim is to bring out the website for touch devices, so more users can enjoy making circuits on their smartphones.

## Let’s start with Phase 1
Phase 1 was all about touch integration. It started on June 7 still my practical/viva was going on online so I started late. I began on 12th June. I was not following the timeline that I declared on the proposal because I was confident enough that I could complete it before time. Since I was working for the community for more than 5 months, I was very well introduced to the code base by the time of phase 1. I was 70–80 % clear about what I am going to do and what will be my approach for the project. To add touch, the first thing I did was understand how the mouse works because if the mouse is working then touch has to work in any condition. While searching on the internet, I found that Javascript has listeners for the mouse. So in my local repository, I searched MouseStart and found code written in the listener.js file. I read Mouse Code, understood it and afterward, I started research on touch Listeners and read articles and tried to understand its working, and developed the basic structure of my project. Below are the given photos which will help you to get to know more about my project.

## Before Phase 1 (Only mouse is supported)
![Before](/images/abhishek_phase_1_blog/BeforeAbhishekZade.png)

## After Phase 1(Both Touch and mouse is supported)
![After](/images/abhishek_phase_1_blog/AfterAbhishekZade.png)

To make CircuitVerse completely Touch Compatible following things are necessary :

- Pan left, Right, Up and Down on simulation Area
- Select Circuit Element using touch
- Pan the circuit element using touch
- Wire connections using touch
- Double-tap response
- Pinch to zoom

Since there was already so much of a program written for the mouse I realized that I have to just add a few lines to make it work with touch. The First Thing I did was to make a common function for Pan.

- Panstart()
- Panstop()
- PanEnd()

Next, I have removed the mouse code and paste it into this function. Afterward added touch listeners in listeners.js.

- touchstart()
- touchmove()
- touchend()
 
Take note of the most important thing, which is coordinates because whether it is mouse or Touch we need to coordinate to the pan. Event listeners return event objects and through this event object, we can extract the x and y coordinate of the event.

To extract the touch coordinates, we use

- e.touches[0].clientX;
- e.touches[0].clientY;

Since I have made a common function for touch and mouse( because the same code was required ). I have to be careful because if touch listeners start an event object and send coordinates of the mouse, the simulator won’t work, it will just break. To get over this situation I have made a new function to get the coordinates and this function will return the mouse coordinates if the mouse is enabled and touch if touch is. But how can this function recognize which coordinate to return?. The answer is simple. I have added a new property to the simulation area i.e touch and adjust its condition according to the situation.

For example:
![example](/images/abhishek_phase_1_blog/sampleAbhishekZade.png)

Consider this example when the simulation area recognizer mouse down the simulation area. touch = false this means touch is disabled and getcoordinate() returns mouse coordinate. This is how I have started panning on the simulator.

The next most crucial thing is to select the circuit elements. After starting the pan I was not able to select circuit elements to understand the problem. I again switched to desktop mode and realized we can only select that element on which the mouse is hovering over. I started searching on the codebase and found the condition for hovering on circuit elements in circuitelement.js. Before explaining the changes I have done, I will demonstrate one thing that is the panmove function calculates the following on the simulation area on the Touch and Mouse move

- Raw x and y
- Xf and Yf
- X and Y on simulation area

The most important difference between mouse and touch listeners is that a mouse is always active even if you click or don’t click so the mouse has a hover property but touch does not. It starts only when someone i.e touches the screen.

Xf and Xf are the hover coordinates of the mouse before the click, which was originally passed on the hover function for circuit elements. Here X and Y are coordinates after touchstart or mouse start ie Mouseclick or Touch on-screen on simulation area. Now coming to an important point which is what I did. I have written a condition if simulationArea.touch = true instead of Xf and Yf, replacing it with X and Y. Boom! Now I was able to select an element and pan it on the simulator with this one modification, I was also able to select wire to connect them. So most of the work which is around 50 percent was done.

At this point, I had committed changes and created the PR. But I made a mistake which was the most crucial thing. I saved everything in one commit and my mentor was not able to read code changes or steps I have done. I asked my mentor if I can make another PR. They were okay with it and I created another fresh branch and started again but this time I consciously committed to each step and created PR. After this, I started with the Pinch to Zoom feature so that we can zoom in and out in the simulator using pinch. I easily implemented it as I had previously done the research in my proposal preparation phase and have implemented, committed, and pushed the changes. After some days one of the mentors reviewed the PR and found some issues/bugs. He also appreciated me for the changes I had made. We had a meeting regarding the changes.

After the meeting, I immediately implemented the following modifications:

- Double-tap was not implemented
- Pinch to zoom was not working as expected

I implemented the double-tap and after that started working on pinch to zoom, and corrected the code 80%. There are still some issues, and I am relentlessly working on them. But essentially I have almost completed my Phase 1. This is not a complete story but I tried to explain most of it. So this was my Journey till Phase 1. Phase 2 will be released soon…..
