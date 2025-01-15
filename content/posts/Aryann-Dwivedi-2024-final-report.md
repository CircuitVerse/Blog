---
title: "Simulator Version Control: Final Report (GSoC 2024)"
date: 2024-08-24T15:56:33+05:30
draft: false
author: Aryann Dwivedi
type: post
---



![coverImage](/images/aryann_final_blog2024/coverImage.jpg)

This report consolidates the progress made during Google Summer of Code 2024 coding period for the Simulator Version Control project with [CircuitVerse](https://github.com/circuitverse).

<!-- ## Table of Contents

{{< toc >}} -->

### [Work Repository 🖥](https://github.com/CircuitVerse/cv-frontend-vue)

> **[_Simulator Version Control -_](https://summerofcode.withgoogle.com/programs/2024/projects/6hvwat1f)
> This project aims to develop various versions of the Vue simulator and implement a version control system for these simulators. The goal is to ensure that circuits created with older versions remain compatible and functional even when there are significant updates or new releases of the simulator.**

### Project Goals & Accomplishments -

---

1. Versioning directories
2. Modifying the build script
3. Creating a bash script to build different versions for Vite
4. Implementing hot-swapping of the Vue simulator from the main CircuitVerse repository by taking query parameter (simver)
5. Adding the HTML script for injection and injectionScript tag in vite config and index.html respectively
6. Adding Version in the circuit data
7. Redirecting to correct circuit_version based on simulatorVersion
8. Adding index-cv.html to inject custom script
9. Setting v0 as the default simulator
10. Setting up netlify.toml for different version
11. Adding Circuit Preview image for Vue simulator
12. Update simulatorvue action to use version parameter for dynamic HTML file
13. Adding version specific links to the Launch button of circuit

---

### Versioning directories

The primary goal of this project is to manage multiple versions of the Vue simulator by organizing the project structure accordingly. To achieve this:

**Version-Specific Directories:**
   - Creating separate folders for each version of the Vue simulator (e.g., v0, v1).


**Source File Management:**
   - Taking the contents of the src folder into each version-specific directory.
   - The v0 folder contains the src files for version v0, and similarly, the v1 folder containS the src files for version v1.


   ![versioning directories](/images/aryann_final_blog2024/versiondirectory.png)


This approach allows for maintaining and developing multiple versions of the simulator independently.

### Modifying the build script

To ensure both version `v0` and `v1` of the Vue simulator work correctly, we need to adjust the build script for each version:

**Configuration Files:**  
  - Created separate Vite configuration files for each version (e.g., `vite.config.v0.ts` and `vite.config.v1.ts`).


**Build Output Settings:**  
  - `vite.config.v0.ts` will build the `v0` version and place the output in the `simulatorvue` directory within the main repository's `public` folder.
  - It sets the base URL to `simulatorvue/v0/` for version `v0`.


**Path Aliases:**  
  - Updating path aliases (`#` and `@`) to simplify and shorten import statements by mapping them to the respective `v0` and `v1` directories.


This setup allows each version to be built and managed independently while keeping the import statements clear and concise.


### Creating a bash script to build different versions for Vite

To build different versions at once, we wanted to run all the Vite configuration files for each version. To do this, we first needed a way to store the simulator versions. We chose to store this information in a `version.json` file, where we kept the version details, including the date and description, in JSON format.

Next, we created a bash script that reads through the versions listed in the `version.json` file. The script then builds each version using the command `npx vite build --config vite.config."$version".ts`.

Finally, to make this process easy to execute during development, we specified the build command in the `package.json` file as `"build": "bash build.sh"`. This way, we can run the build script for all versions with a single command.

{{< video src="/videos/Aryann_Final_GSoC2024/buildingversion.webm" controls="true" preload="auto" >}}

### Implementing hot-swapping of the Vue simulator from the main CircuitVerse repository by taking query parameter (simver)

To implement hotswapping in the Vue simulator, we needed to enable version switching based on the `simver` query parameter. This required modifying the entry point of the simulator so that when the query parameter changes, the code can seamlessly switch between versions.

Since the `index.html` file of the Vue simulator must load the correct JavaScript and CSS files, it wasn’t feasible to include script tags for both `v0` and `v1` in a single file. To solve this, we needed a way to dynamically load the appropriate script tag based on the version specified.

This led me to implement a solution where the script tag is injected dynamically. Instead of hardcoding both script tags, we replace them with an injection script that loads the correct version’s script tag from the build file. This approach ensures that each version is built separately and avoids loading all versions in the same file.

{{< video src="/videos/Aryann_Final_GSoC2024/correct_version.webm" controls="true" preload="auto" >}}

### Adding the HTML script for injection and injectionScript tag in vite config and index.html respectively

To dynamically inject the correct script tag for each version, I’m using the `<%- injectScript %>` placeholder in the `index.html` file. The specific script tag for each version is injected during the build process using the `createHtmlPlugin` in the Vite configuration files (`vite.config.v0` and `vite.config.v1`).

Here’s how it works:
![createHtmlPlugin](/images/aryann_final_blog2024/createhtmlplugin.png)

![injectScript](/images/aryann_final_blog2024/injectScript.png)

This configuration injects the script tag for the specified version (e.g., `v0` or `v1`) into the `index.html` file during the build process. As a result, each version’s build will have the appropriate script tag, ensuring that the correct JavaScript is loaded without mixing scripts from different versions. This approach keeps each version’s build independent and avoids conflicts.

### Adding Version in the circuit data

The issue we faced was determining the version of the circuit created. There were two possible approaches: either store the version in the project table or include it in the circuit data. Since the circuit data can be accessed offline, we chose to add a field for the simulator version directly within the circuit data. By storing the simulator version in the circuit data, we can easily check and manage the circuit version, allowing us to load the circuit with the appropriate simulator version.


{{< video src="/videos/Aryann_Final_GSoC2024/store_simulatorVersion.webm" controls="true" preload="auto" >}}

### Redirecting to correct circuit_version based on simulatorVersion

The challenge we faced was determining the version of the circuit that was created. We considered two approaches: either storing the version in the `project` table or storing it in the `circuit_data`. Given that `circuit_data` can be easily loaded in offline mode, we chose to add an extra field to `circuit_data` to store the `simulatorVersion`.

By storing the `simulatorVersion` in `circuit_data`, we can easily check the version of the circuit whenever needed. This makes it straightforward to swap between versions based on the stored version information.


{{< video src="/videos/Aryann_Final_GSoC2024/correct_version.webm" controls="true" preload="auto" >}}

### Adding index-cv.html to inject custom script

To ensure the development server for `cv-frontend-vue` works correctly, we needed to avoid dynamic changes in the entry point (`index.html`). Since the development of `cv-frontend-vue` is static, we created a separate `index-cv.html` file to serve as the entry point for the main repository. The `index.html` file remains the entry point for the `cv-frontend-vue` repository.

This setup allows the default version to be loaded statically in `cv-frontend-vue`, maintaining stability during development. If anyone wants to develop in a different version, they would need to manually change the default version in the `cv-frontend-vue` repository. However, for the main repository, version changes can still be handled automatically.



### Setting v0 as the default simulator

Since we're setting up the default version to `v0`, we needed to make some changes in the entry point of `index.html`. Given that the Vue simulator's development is statically handled, we set the `src` of the script tag in `index.html` to `"v0/src/main.ts"`. This ensures that every time someone opens a development server, the entry point points directly to the `v0` version.

To support this setup, we also modified the `vite.config.ts` file, which is the configuration file for the Vue development server. Specifically, we changed the path aliases (`'#'` and `'@'`) to point towards the `v0` directory. While this approach may not be ideal for frequent version switching, it provides the necessary flexibility when needed.

### Adding Circuit Preview image for Vue simulator

There was a bug in the Vue simulator where image previews for circuits weren't displaying correctly. The issue stemmed from the fact that we were using Active Storage to attach images in the project table for the main simulator, which allowed image previews to display properly for circuits created there. However, this functionality hadn't been implemented in the Vue simulator, leading to a lack of image previews for circuits created within it.

To fix this, we added a method for attaching images during the circuit creation process in the Vue simulator. This ensures that image previews are now properly displayed for circuits created in both the main simulator and the Vue simulator.

#### Before

![vue simulator circuits without image preview](/images/aryann_final_blog2024/img2.png)

#### After

![vue simulator circuits with image preview](/images/aryann_final_blog2024/img1.png)


### Update simulatorvue action to use version parameter for dynamic HTML file

In the `StaticController` for the Vue simulator, we've implemented an action named `simulatorvue` that dynamically serves the correct version of the Vue simulator based on a `simver` parameter in the URL query string. If no version is provided, it defaults to `"v0"`. 

The action constructs the file path to the `index-cv.html` file, which is located in the public directory under a version-specific subdirectory (e.g., `public/simulatorvue/v0/index-cv.html`). By setting `layout: false`, the file is rendered without any Rails layouts. This setup allows me to easily switch between different versions of the Vue.js application depending on the URL parameter.

![static controller with simulator action](/images/aryann_final_blog2024/staticcontroller.png)

### Adding version specific links to the Launch button of circuit.

To ensure users are redirected to the correct version of the simulator in which a circuit was created, we needed to implement changes to the links associated with the circuit's launch button. These links are now dynamic, meaning they retrieve the `simulatorVersion` from the `circuit_data` and then generate the appropriate redirect URL. The resulting URL is structured as `'/simulatorvue?simver={simulatorVersion}'`, ensuring that users are directed to the specific version of the simulator that corresponds to the circuit they are trying to access.

{{< video src="/videos/Aryann_Final_GSoC2024/link_launchsim.webm" controls="true" preload="auto" >}}


### Future Work 

- Writing tests for all the Ruby on Rails code.
- Designing and implementing the UI/UX for version switching.
- Creating a dialog box to appear when switching versions.
- Enable embed mode for different version circuits.

###  Pull Requests 

**Below are listed some of the most important pull requests of the project for any other prs please refer to the respective repository.**

##### [Main Repo](https://github.com/CircuitVerse/CircuitVerse) :

- [attach circuit preview image to project during create and update actions](https://github.com/CircuitVerse/CircuitVerse/pull/5047)
- [update simulatorvue action to use version parameter for dynamic HTML file](https://github.com/CircuitVerse/CircuitVerse/pull/5030)
- [changing redirect link in the buttons for vue simulator circuits](https://github.com/CircuitVerse/CircuitVerse/pull/5054)

##### [Vue Simulator Repo](https://github.com/CircuitVerse/cv-frontend-vue) :

- [Combining Vue Simulator Versioning PRs](https://github.com/CircuitVerse/cv-frontend-vue/pull/337)
- [Enable the Main simulator to dynamically load the Vue simulator](https://github.com/CircuitVerse/cv-frontend-vue/pull/332)
- [script modification for different builds](https://github.com/CircuitVerse/cv-frontend-vue/pull/327)
- [adding versioned directory(v0 and v1)](https://github.com/CircuitVerse/cv-frontend-vue/pull/319)



### Blogs 

[**Phase 1 blog GSoC@24 Aryann Dwivedi**](https://blog.circuitverse.org/posts/aryann-dwivedi-2024-phase-1/)

- `week 1` - [GSoC@24 - week 1 blog](https://medium.com/@aryanndwivedi2403/gsoc-24-circuitverse-week-1-report-31e38cc408de)
- `week 2 & 3` - [GSoC@24 - week 2&3 blog](https://medium.com/@aryanndwivedi2403/gsoc24-circuitverse-week-3-4-report-695c89931df4)
- `week 4 & 5` - [GSoC@24 - week 4&5 blog](https://medium.com/@aryanndwivedi2403/gsoc24-circuitverse-week-4-5-report-3ed8041c81d5)
- `miderm week` - [GSoC@24 - week 6 blog](https://medium.com/@aryanndwivedi2403/my-gsoc-journey-with-circuitverse-until-midterm-evaluation-cb2675e91760)
- `week 7` - [GSoC@24 - week 7 blog](https://medium.com/@aryanndwivedi2403/gsoc24-circuitverse-week-7-report-0017d431d743)
- `week 8` - [GSoC@24 - week 8 blog](https://medium.com/@aryanndwivedi2403/gsoc24-circuitverse-week-8-report-5e7b73b424c9)
- `week 9` - [GSoC@24 - week 9 blog](https://medium.com/@aryanndwivedi2403/gsoc24-circuitverse-week-9-report-e2494a38a187)
- `week 10 & 11` - [GSoC@24 - week 10&11 blog](https://medium.com/@aryanndwivedi2403/gsoc24-circuitverse-week-10-11-report-b3d68358b5ec)

### Conclusion 

Spending the summer working on this project has been an incredible experience. I've gained valuable knowledge in technologies like JavaScript, Vite Build and Development server, Ruby on Rails, and Docker. I've also had the opportunity to learn about the open-source community and collaborate effectively with a team of developers. 

I am deeply grateful to CircuitVerse for this opportunity and to my mentors—[Aboobacker MK](https://github.com/tachyons), [Josh Varga](https://github.com/JoshVarga), and [Prerna Sharma](https://github.com/Prerna-0202)—for their invaluable guidance and support throughout the summer. I also want to extend special thanks to [Ruturaj Mohite](https://github.com/gr455) and [Vaibhav Upreti](https://github.com/VaibhavUpreti) for their ongoing support throughout the project. Additionally, I appreciate my fellow mentees for their constant assistance, help, and collaboration during this time.
