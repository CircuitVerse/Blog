---
title: "GSoC 2026 Mid-Term Report: CircuitVerse Mobile"
date: 2026-07-06T01:30:32+05:30
draft: false
author: "Santam"
tags: ["GSoC 2026", "CircuitVerse", "Flutter", "Mobile App"]
type: post
---

Hello everyone,

This is my mid-term blog for Google Summer of Code 2026 with CircuitVerse. For the first half of GSoC, I have been working on the CircuitVerse mobile app and trying to build a better foundation for the upcoming features.

The last few weeks were mostly about understanding the project properly, discussing things with mentors, and slowly moving from setup work to feature work.

## Getting Started

I started by setting up the project locally and getting familiar with the codebase. Since the app depends on the Flutter ecosystem, one of the early tasks was to update dependencies and fix the issues that came up after the upgrade.

This helped me understand the project structure better and also made the development setup smoother for the upcoming work.

## Planning the Work

After the initial setup, we discussed the larger goals for the project. Some of the main areas we talked about were authentication, Firebase integration, Kotlin DSL migration, desktop support, and the Interactive Book.

These discussions helped me get a clearer idea of what needed to be done and how the different parts of the project connect with each other.

## Authentication

Authentication has been one of the important parts of the project so far. I spent time understanding how CircuitVerse handles login on the backend and how the mobile app should connect with it.

We also discussed using Firebase Authentication for the mobile app. I worked on the initial setup and also explored Google Sign-In configuration using the Android package name and SHA-1 fingerprint.

I also made some initial authentication screen designs in Figma so we could discuss the flow before moving too deep into implementation.

## Interactive Book

Another major part of my work has been around the Interactive Book.

The main challenge here is that the content is not just a fixed set of screens. The app needs to render different kinds of content dynamically, so I spent time thinking about the data models and how the UI should be built around them.

While working on this, I also explored Server-Driven UI. The idea is to keep the app flexible enough so that new content can be rendered without changing too much inside the Flutter code.

This part is still evolving, but it has been one of the most interesting parts of the project for me.

## Mock Data

To test the Interactive Book flow without depending completely on backend APIs, I also worked on scripts to generate mock data.

This made it easier to try out different content structures and continue frontend work in parallel.

## Work Done So Far

Some of the things I worked on during the first half:

- Dependency upgrades and setup fixes
- Initial authentication planning
- Firebase and Google Sign-In exploration
- Authentication screen designs
- Interactive Book model planning
- Initial work on dynamic rendering
- Mock data generation for testing

I will add more exact PR links and screenshots here later.

## What I Learned

The first half of GSoC helped me understand how important planning is before writing code. I also learned a lot about working in an existing codebase, discussing approaches before implementation, and breaking larger features into smaller parts.

Working with mentors and getting feedback regularly has been really helpful.

## Next Steps

For the second half, I will continue working on the authentication flow and Interactive Book integration. The focus will be on completing the pending implementation, testing things properly, and polishing the user experience.

I am looking forward to continuing the project and improving the CircuitVerse mobile app further.
