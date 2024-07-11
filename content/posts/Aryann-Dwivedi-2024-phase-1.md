---
title: "Aryann Dwivedi 2024 Phase 1"
date: 2024-07-11T16:43:15+05:30
draft: true
author: Aryann Dwivedi
type: post
---



![coverImage](/images/Aryann_Dwivedi_GSoC24/coverImage.jpg)

This report consolidates the progress made during the first phase of Google Summer of Code 2024 coding period for the Simulator Version Control project with [CircuitVerse](https://github.com/circuitverse).

### About my Project

[My Project](https://github.com/CircuitVerse/CircuitVerse/wiki/GSoC'24-Project-List#project-5---simulator-version-control) aims to implement a version control system for the CircuitVerse Vue simulator to maintain compatibility of circuits while allowing for independent simulator updates and version switching.



### Community Bonding Period @Circuitverse

I had our first meeting with all the mentors and contributors, and it was a pleasure to meet everyone. The meeting was very productive, allowing us to learn more about CircuitVerse's culture and its mission to provide free digital logic circuit simulators to over half a million people. These exchanges promoted understanding and laid the groundwork for effective teamwork through shared experiences and technological discussions.

### Milestones Achieved

Tasks Completed So Far:

- Versioning directories
- Modifying the build script
- Adding a version column to the projects schema.
- Creating a bash script to build different versions for Vite
- Implementing hot-swapping of the Vue simulator from the main CircuitVerse repository by taking query parameter (simver).


#### Versioning Directory

The foundational task for the simulator versioning was to create separate directories for different versions of Vue simulator. I moved the src directory of the vue simulator to different versions (v0 and v1) and adjusted the required imports in the files.

**Vue Simulator Architecture**

![Work Flow](/images/Aryann_Dwivedi_GSoC24/vue_simulator_architecture.webp)



**Pull Requests**

- [Adding Versioned Directory (v0 and v1)](https://github.com/CircuitVerse/cv-frontend-vue/pull/319)

#### Modifying the Build script

With the directories restructured for different simulator versions, the build configurations needed to be changed to serve the correct version when required.

- A `version.json` file was created to store the description, date, and name of each version.

![Work Flow](/images/Aryann_Dwivedi_GSoC24/version_storage.webp)

- The build script in the Vue simulator was modified to build different versions based on the version variable, iterating through the version.json file.

- Separate files were created for the two versions and built using a bash script.

![Work Flow](/images/Aryann_Dwivedi_GSoC24/bash_script.png)

- The script was updated to save builds in separate directories for each version as `public/simulatorvue/v0` and `public/simulatorvue/v1` in the Main CircuitVerse repository.



Pull Request

- [Build Script Modification](https://github.com/CircuitVerse/cv-frontend-vue/pull/327)

#### Adding a version column to the projects schema.

To store the version of the circuit in the database, a new column named `version` was added.

![Work Flow](/images/Aryann_Dwivedi_GSoC24/adding_version_column.webp)

Pull Request

- [Adding version column to Projects table](https://github.com/CircuitVerse/CircuitVerse/pull/4999)

#### Hot-Swapping Implementation

To swap versions of the simulator, I used a query parameter (simver) in the URL to serve the appropriate version. If `simver=v0`, version v0 is served; if `simver=v1`, version v1 is served.

- The path of the entry point in index.html was changed from `src/main.ts` to `version/main.ts` to modify the serving file accordingly.

![Work Flow](/images/Aryann_Dwivedi_GSoC24/index_entrypoint.png)

- The logic to change the simulator version variable based on the version was added to another file and imported into version/main.ts.

![Work Flow](/images/Aryann_Dwivedi_GSoC24/version_loader.png)


- The correct version was imported according to the specified `simver` variable.



![Work Flow](/images/Aryann_Dwivedi_GSoC24/version_config_simver.png)

Pull Request

- [Enable Main simulator to load Vue simulator](https://github.com/CircuitVerse/cv-frontend-vue/pull/332)

#### FINAL RESULT

In this video, the version is specified on the navbar just for representation purposes. It is not included in the actual project or code.

{{< video src="/images/Aryann_Dwivedi_GSoC24/version-hostswapping.webm" type="video/webm" preload="auto" >}}



### Learnings

- Gained an understanding of how the Vue simulator works, particularly the query parameters and imports.
- Learned more about version control systems.
- Acquired knowledge of best practices to follow while writing code.

### Conclusion

Phase 1 of GSoC 2024 at CircuitVerse focused on implementing a simulator version control system, enhancing technical skills in Vue.js and scripting, and reinforcing best coding practices.

