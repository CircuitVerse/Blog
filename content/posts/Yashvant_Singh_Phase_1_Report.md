---
title: "CircuitVerse Mobile App [Project 7 : Flutter Upgrade]"
date: 2024-02-15T14:30:00+05:30
draft: false
author: Yashvant Singh
type: post
---

![cover_photo](/images/Yashvant_Singh/Phase_1/cover_photo.png)

This blog covers our recent contributions to the CircuitVerse mobile application, focusing on localization improvements, profile enhancements, RTL support, and CI/CD optimizations.

## Project Overview

CircuitVerse Mobile brings the popular digital logic simulator to mobile devices. Our contributions focused on improving internationalization, user experience, and development workflows. Here are the key areas we worked on:

## Localization System Overhaul

### Modernizing the Approach

- We removed deprecated flutter_gen in favor of the standard flutter gen-l10n
- We regenerated all localization files using modern practices
- We updated all references throughout the app
- We added comprehensive support for English and Hindi

### Enhanced Markdown Handling

- We replaced deprecated imageBuilder with custom MarkdownElementBuilder
- We implemented CustomImageBuilder for better image rendering
- We added image tap gesture support
- We upgraded Flutter SDK to version 3.32.2
- We improved SVG and network image handling

**PR:** [fix(localization): resolve flutter_gen and imageBuilder errors #375](https://github.com/CircuitVerse/mobile-app/pull/375)

## Profile Management Improvements

### Immediate Update Visibility

- We fixed profile updates not reflecting immediately
- We implemented proper state management for country/education fields
- We ensured previous values remain visible during re-editing

### Typeahead Enhancements

- We improved suggestions for countries and educational institutes
- We added support for custom values not in the API
- We enhanced API caching and fallback mechanisms

### UI Refinements

- We improved tab colors supporting dark/light modes
- We improved form validation with clear requirements
- We implemented smoother focus management between fields

![update_profile](/images/Yashvant_Singh/Phase_1/update_profile.png)

**PR:** [Improved Profile Editing with Enhanced Typeahead and UI Fixes #378](https://github.com/CircuitVerse/mobile-app/pull/378)

## Multilingual Support Expansion

### Language Selection

- We added dropdown in sidebar with English/Hindi options
- We refactored CVDrawer to use proper localization patterns
- We implemented dynamic locale switching using GetX

### Infrastructure

- We added new keys to app_en.arb and app_hi.arb
- We implemented consistent string localization throughout UI
- We added "language" key for translations

![hindi](/images/Yashvant_Singh/Phase_1/hindi.jpg)

**PR:** [Modernized codebase for multilingual support #381](https://github.com/CircuitVerse/mobile-app/pull/381)

## UI Consistency Improvements

### Text Standardization

- We changed "SEND INSTRUCTIONS" to "Send Instructions"
- We enforced sentence case across all UI text

### Component Enhancements

- CVHeader: We added spacing control parameters
- CVOutlineButton: We added fontSize parameter
- ContributorsSupportCard: We improved bullet point alignment

![card](/images/Yashvant_Singh/Phase_1/card.jpg)

**PR:** [Text capitalization and formatting #385](https://github.com/CircuitVerse/mobile-app/pull/385)

## Right-to-Left (RTL) Language Support

### Arabic Implementation

- We created app_ar.arb with Arabic translations
- We enhanced language_controller.dart with RTL detection
- We replaced EdgeInsets with EdgeInsetsDirectional

### Layout Improvements

- We updated padding, margin, and alignment to be direction-aware
- We maintained UI consistency across LTR and RTL layouts

![arabic](/images/Yashvant_Singh/Phase_1/arabic.jpg)

**PR:** [Add RTL Language Support with Arabic Translations #391](https://github.com/CircuitVerse/mobile-app/pull/391)

## CI/CD Pipeline Enhancements

### Automated Releases

- We implemented GitHub releases on master branch pushes
- We added semantic versioning support

### Build Optimizations

- We configured Android builds to run only on Ubuntu platform
- We improved artifact naming and conditional uploads
- We added environment variable support for secrets

### Steps to download the release:

Click on Releases:

![release_1](/images/Yashvant_Singh/Phase_1/release_1.jpg)

Go to assets and download the APK:

![release_2](/images/Yashvant_Singh/Phase_1/release_2.jpg)

**PR:** [Enhance CI with automated releases #398](https://github.com/CircuitVerse/mobile-app/pull/398)

## Impact and Results

These improvements have significantly enhanced the mobile app by:

1. Supporting a wider global audience through improved localization
2. Providing better user experience with immediate profile updates
3. Expanding language support to RTL languages like Arabic
4. Streamlining the development process with automated releases

## Future Work

Looking ahead, my development roadmap focuses on these key areas:

### Core Feature Enhancements

- **Interactive Book Improvements**  
  Investigate and implement fixes for the interactive book functionality, this bug is currently put on hold. For reference: - [GSoC Week 6: Deep Diving into the Interactive Book Issue](https://dev.to/jatsuakayashvant/gsoc-week-6-deep-diving-into-the-interactive-book-issue-4n3p)

### UI/UX Revamps

- **Profile Card Redesign**  
  Modernize the profile interface with improved UI
- **Project Description Card**  
  Enhance the presentation of project cards

### Authentication System

- **Auth Establishment**  
  Build a robust authentication flow that currently broken as the AUTH keys are expired

### Simulator

- Achieve full functional parity with the web simulator:

### Interaction Design

- **Microinteractions Implementation**  
  Add purposeful animations and feedback mechanisms for:
  - Button states
  - Transitions
  - User actions

### Deployment Roadmap

### Google Play Store

- **Initial Setup & Compliance**

  - Complete developer account registration
  - Thoroughly review Google Play policies and technical requirements
  - Prepare all necessary assets (store listings, screenshots, promotional materials)

- **Release Strategy**
  - Plan phased rollout (starting with internal testing track)
  - Establish versioning and update protocols
  - Implement monitoring for crash reports and user feedback

### F-Droid Integration

- **Open-Source Preparation**

  - Verify all dependencies meet F-Droid's inclusion criteria
  - Prepare reproducible build system
  - Document build instructions for maintainers

- **Submission Process**
  - Package metadata preparation (anti-features, license verification)
  - Initial merge request submission
  - Ongoing maintenance coordination with F-Droid team

### All Contribution PRs:

- [fix(localization): resolve flutter_gen and imageBuilder errors #375](https://github.com/CircuitVerse/mobile-app/pull/375)
- [Improved Profile Editing with Enhanced Typeahead and UI Fixes #378](https://github.com/CircuitVerse/mobile-app/pull/378)
- [Modernized codebase for multilingual support #381](https://github.com/CircuitVerse/mobile-app/pull/381)
- [Text capitalization and formatting #385](https://github.com/CircuitVerse/mobile-app/pull/385)
- [Add RTL Language Support with Arabic Translations #391](https://github.com/CircuitVerse/mobile-app/pull/391)
- [Enhance CI with automated releases #398](https://github.com/CircuitVerse/mobile-app/pull/398)

### My Project Board:

If you would like to stay updated on our progress in the upcoming days, you're most welcome to follow alongon my project board.

**Project Board:** [Project 7: Flutter Upgrade](https://github.com/orgs/CircuitVerse/projects/39)

### My Coding Period Blogs:

Throughout the coding period so far, I've been sharing regular blog updates detailing my progress, key learning and ocassionally a glimpse into activities beyond my work on Ciruitverse's app. You can read all my blogs :

- [Quick Open-Source Guide](https://dev.to/jatsuakayashvant/quick-open-source-guide-4hke)
- [My GSoC Community Bonding Period with CircuitVerse](https://dev.to/jatsuakayashvant/my-gsoc-community-bonding-period-with-circuitverse-8o5)
- [Week 1 of GSoC: Learning Through Dependencies and Communication](https://dev.to/jatsuakayashvant/week-1-of-gsoc-learning-through-dependencies-and-communication-1d1g)
- [GSoC Week 2 — Languages, UX & 40 Failing Tests](https://dev.to/jatsuakayashvant/gsoc-week-2-languages-ux-40-failing-tests-5b72)
- [GSoC Coding Period Week 3](https://dev.to/jatsuakayashvant/gsoc-coding-period-week-3-42j3)
- [GSoC Week 4: RTL Madness, OAuth Adventures & Markdown Mayhem](https://dev.to/jatsuakayashvant/gsoc-week-4-rtl-madness-oauth-adventures-markdown-mayhem-413p)
- [GSoC Week 5: Markdown broke, CI/CD woke](https://dev.to/jatsuakayashvant/gsoc-week-5-markdown-broke-cicd-woke-59kf)
- [GSoC Week 6: Deep Diving into the Interactive Book Issue](https://dev.to/jatsuakayashvant/gsoc-week-6-deep-diving-into-the-interactive-book-issue-4n3p)

## Acknowledgements

This journey of contributing to CircuitVerse Mobile has been incredibly rewarding,
and I'd like to express my sincere gratitude to:

- **Hardik Sachdeva** ([@hardik17771](https://github.com/hardik17771))  
  For his patient mentorship, thorough code reviews, and unwavering support throughout the development process

- **Aboobacker MK** ([@tachyons](https://github.com/tachyons))  
  For his visionary leadership and for maintaining such a welcoming open-source ecosystem

- **All Contributors**  
  Who shared their knowledge and helped shape these features through insightful discussions
