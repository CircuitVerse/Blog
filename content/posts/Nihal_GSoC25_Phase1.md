---
title: "Open Hardware Component Library | GSoC 2025 | Phase 1 Report"
date: 2025-07-16T21:42:30+05:30
draft: true
author: "Nihal Rajpal"
type: post
---

![coverImage](/images/Nihal_Rajpal_GSoC2025/cover_image.jpg)

Hello everyone,  
I’m **Nihal Rajpal**, a GSoC 2025 contributor working on the project **“Open Hardware Component Library”**. As part of the first phase of GSoC, I’ve been working on adding hardware-oriented components to the CircuitVerse simulator and enabling serial device connectivity for real hardware interaction.

### About the Project 🖥

> **[_Open Hardware Component Library_](https://summerofcode.withgoogle.com/programs/2025/projects/cIgWR2eT)
> This project aims to improve CircuitVerse by adding new components that are useful for learning about real hardware, such as shift registers (SISO, SIMO, MISO, MIMO), comparators, and a buzzer (speaker), Priority MUX, etc. It will also introduce support for connecting CircuitVerse with real devices using the Browser’s Web Serial API, allowing users to interact with physical hardware directly through the simulator. These features will help people better understand how digital circuits work—both in theory and in practice. The goal is to make CircuitVerse more powerful and helpful for learning digital circuits and embedded systems.**

---

### Project Overview

**Project Title**: Open Hardware Component Library  
**Mentors**: Aman Asrani, Prof. Gargi Khanna  
**Tech Stack**: JavaScript, Vue.js, Web Serial API, Tauri  

### Objectives
- Add commonly used hardware components such as shift registers, comparators, and pull resistors.
- Enable real hardware interaction using the Web Serial API on both web and desktop platforms.
- Improve the simulator UI and write user-friendly documentation for each component.

---

### Phase 1 Achievements

During the first phase of GSoC 2025, we made significant progress in building out the foundation of the Open Hardware Component Library. This included implementing core hardware components, improving the simulator’s UI for configuration, writing detailed documentation, and integrating real hardware support on both web and desktop platforms.

We began by implementing three major components that are commonly used in hardware circuit design: the **Shift Register**, the **Comparator**, and the **Pull Resistor**.

The **Shift Register** was designed as a single configurable component supporting all four types—SISO, SIPO, PISO, and PIPO. While implementing this, we realized the need for a way to let users choose the register type dynamically. To achieve this, we enhanced the simulator’s `mutableProperties` system to support `dropdown` fields. This allowed us to provide a clean and intuitive UI where users can select the desired shift register configuration directly from a dropdown. The layout and simulation logic were customized to support bit shifting in both directions, and a control signal for `Shift/Load` was added to manage data operations effectively.

**Check out the video demonstration below**  
{{< video src="/videos/Nihal_Rajpal_GSoC2025/shift_register.webm" type="video/webm" preload="auto" >}}

The **Comparator** compares two binary inputs, A and B, and outputs whether A is greater than, equal to, or less than B. This component was designed to be simple yet effective for common digital logic comparisons.

**Check out the video demonstration below**  
{{< video src="/videos/Nihal_Rajpal_GSoC2025/comparator.webm" type="video/webm" preload="auto" >}}

The **Pull Resistor** component allows users to simulate pull-up or pull-down resistors for floating inputs. A dropdown field makes it easy to toggle between the two modes, providing clarity and flexibility when building input-sensitive circuits.

**Check out the video demonstration below**  
{{< video src="/videos/Nihal_Rajpal_GSoC2025/pull_resistor.mp4" type="video/mp4" preload="auto" >}}



We also prioritized documentation from the very beginning. Following the standard format used across CircuitVerse documentation—**Description**, **Ports**, **Example**, and **Embedded Circuit**—we authored complete docs for the Shift Register, Comparator, and Pull Resistor. Although the embedded circuit demos can only be linked once the components are merged, we’ve already created and tested them locally, ensuring they’ll be ready for integration.

Another key milestone was integrating support for real hardware communication. On the **web**, we successfully used the **Web Serial API** to send and receive data with physical devices like Arduino. This proof of concept lays the foundation for interactive circuit simulations that connect directly to real-world hardware.

<!-- TODO: Add demo video link for Web Serial PoC (Web) here -->

To bring this functionality to the **desktop**, we collaborated closely with contributor **Harsh Rao**, who guided us through the architecture of the CircuitVerse desktop app built using **Tauri**. Since Tauri relies on a WebView internally, standard browser-based APIs like Web Serial do not work out of the box. To address this, we used the `isTauri` hook to detect the desktop environment and load native functionality accordingly.

In the process of enabling serial communication on desktop, we first explored a plugin built for Tauri v1, but it turned out to be incompatible with our setup. Eventually, we found a better alternative—[`tauri-plugin-serialplugin`](https://crates.io/crates/tauri-plugin-serialplugin)—which is actively maintained and fully supports Tauri v2. After studying its usage, we successfully integrated it into the app. With this plugin, we were able to establish serial communication from the CircuitVerse desktop application, completing our cross-platform hardware support.

This collaborative and structured approach enabled us to meet the goals of Phase 1 successfully, and we’re looking forward to building on this progress in the second half of GSoC.


### What’s Next

For the second phase of GSoC, I plan to:
- Raise PRs for all completed components and hardware integration features.
- Add more hardware-oriented components as suggested by Prof. Gargi Khanna.
- Finalize and test the desktop integration for production use.
- Update the documentation with embedded example circuits post-merge.
- Revamp the circuit elements panel to improve categorization and accessibility — for example, by introducing a dedicated **ALU section**.

---

### List of Pull Requests (Phase 1)

#### Components – Frontend:
- [#624](https://github.com/CircuitVerse/cv-frontend-vue/pull/624) – Add Shift Register Component  
- [#622](https://github.com/CircuitVerse/cv-frontend-vue/pull/622) – Add Comparator Component  
- [#623](https://github.com/CircuitVerse/cv-frontend-vue/pull/623) – Add Pull Resistor Component  

#### Documentation:
- [#428](https://github.com/CircuitVerse/CircuitVerseDocs/pull/428) – Add documentation for Shift Register  
- [#429](https://github.com/CircuitVerse/CircuitVerseDocs/pull/429) – Add documentation for Comparator  
- [#430](https://github.com/CircuitVerse/CircuitVerseDocs/pull/430) – Add documentation for Pull Resistor 

---

### Final Thoughts

The first half of GSoC has been a great learning experience. Despite early blockers, I was able to complete major parts of the project including hardware components, serial communication, and Tauri integration. The support from my mentor, contributors, and the CircuitVerse community has been extremely valuable.

I’m excited to continue the project and deliver a complete Open Hardware Library by the end of the program.

*Thank you for reading!*