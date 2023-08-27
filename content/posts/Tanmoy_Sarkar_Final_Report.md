---
title: "Improve Development Experience: Final Report (GSoC 2023)"
date: 2023-08-27T12:04:13+05:30
draft: false
author: Tanmoy Sarkar
type: post
---

![gsoc23_final_phase](/images/tanmoy_gsoc23/final_phase_cover_image.png)


This blog is dedicated to describe the work we have done and the goals we have accomplished in Google Summer of Code'23.


### Project Description
---
CircuitVerse is a Digital Logic Simulator on web. It is an educational tool for students interested in electronics to simulate and make circuits on their browser.

This project focuses on making the process of working and developing with CircuitVerse easier and more efficient. The main goal is to simplify setting up the development environment and working with the code. Additionally, Our aim to enhance the test cases and improve the continuous integration (CI) workflow, which will ultimately reduce the time required for code review by maintainers.

### Project Goals
---
Throught this period, we have focused on improving the development experience of CircuitVerse. The main goals of this project are:

* Integrate Ruby Debugger
* Integrate Solargraph LSP & Write YARD Docs
* Integrate Vite Rails
* Integrate RBS in Project & Static Type Checking in CI
* Integrate Undercover CI
* Improve Unit Testcase Coverage
* Add Missing Integration Testcases
* Improve Remote Development Platform [GitHub Codespaces, Gitpod]
* Improve Docker Development Setup
* Improve Setup Documentation


### Integrate Ruby Debugger
---
This integration enhances the debugging experience for developers by providing a visual debugging capability directly from their integrated development environment (IDE). It allows anyone to conveniently set breakpoints and debug the application from their IDE. This integration also support docker based environment. By changing configuration in IDE , it can easily connect to TCP based debugger and debug the application easily. [The documentation](https://github.com/CircuitVerse/CircuitVerse/blob/master/LSP-SETUP.md) has been updated accordingly.

**Debugger Preview**
{{< video src="/images/tanmoy_gsoc23/ruby_debugger.mp4" type="video/mp4" preload="auto" >}}

##### Pull Requests
- [Integrate Ruby Debugger](https://github.com/CircuitVerse/CircuitVerse/pull/3760)


### Integrate Solargraph LSP & Write YARD Docs
---
Solargraph is a Language Server Protocol (LSP) server that enhances autocompletion for Ruby codebases by providing YARD documentation. To further enhance support for Rails codebases, the solargraph-rails gem has been installed and configured. YARD documentation has been generated for the entire codebase to ensure seamless autocompletion.

This integration also supports Docker-based environments, allowing the application to be run in a Docker container while connecting the IDE/Editor's solargraph extension to the Solargraph server via a TCP socket. Initially, there was a significant challenge in this setup. The extension used to send the current directory to the LSP server, but the LSP server had a different path inside the Docker container. However, this issue was successfully resolved by creating a symlink inside the container. 

![solargraph-docker](/images/tanmoy_gsoc23/solargraph-docker.jpeg)

For more detailed information, please refer to the blog post available at [https://tanmoy.online/week-1-2-circuitversegsoc23](https://tanmoy.online/week-1-2-circuitversegsoc23)

Currently, documentation and support has been added for 

* VS Code
* Sublime Editor
* Neovim

**Visual Studio Code**
![vscode-solargraph](/images/tanmoy_gsoc23/solargraph_vscode.gif)

**Sublime Editor**
![sublime-solargraph](/images/tanmoy_gsoc23/solargraph_sublime.gif)

**Neovim**
![neovim-solargraph](/images/tanmoy_gsoc23/solargraph_neovim.gif)


##### Pull Requests
- [feat: (1) Solargraph Install & Configuration](https://github.com/CircuitVerse/CircuitVerse/pull/3819)
- [feat: (2) Solargraph Remote Debugging with Docker](https://github.com/CircuitVerse/CircuitVerse/pull/3897)
- [feat: (3) Yard Docs for models](https://github.com/CircuitVerse/CircuitVerse/pull/3898)
- [feat: (4) Yard Docs for notifications](https://github.com/CircuitVerse/CircuitVerse/pull/3899)
- [feat: (5) Yard Docs for mailer](https://github.com/CircuitVerse/CircuitVerse/pull/3900)
- [feat: (6) Yard Docs for lib](https://github.com/CircuitVerse/CircuitVerse/pull/3901)
- [feat: (7) Yard Docs for helper](https://github.com/CircuitVerse/CircuitVerse/pull/3902)
- [feat: (8) Yard Docs for Jobs + Component + Decorator](https://github.com/CircuitVerse/CircuitVerse/pull/3903)
- [feat: (9) Yard Docs for controllers](https://github.com/CircuitVerse/CircuitVerse/pull/3904)
- [feat: (10) Yard Docs for policy](https://github.com/CircuitVerse/CircuitVerse/pull/3905)
- [feat: (11) Yard Docs for queries and uploaders](https://github.com/CircuitVerse/CircuitVerse/pull/3906)
- [feat: (12) Yard Docs for service](https://github.com/CircuitVerse/CircuitVerse/pull/3907)
- [feat: (13) Solagraph Usage Documentation Added](https://github.com/CircuitVerse/CircuitVerse/pull/3908)

### Integrate Vite Rails
---
Previously in the project, all javascript compiled in a single one via esbuild and served by sprocket asset pipeline in development and production [mostly same]. As a result, during development on each change, esbuild need to build multiple JS files againg which increase friction during development. 

That’s why vite rails is integrated, and simulator assets moved to vite. After this integration, if there are many changes in the javascript, only the specific portion will be updated in the website and hot reload will be performed (if possible), otherwise entire page will reload. Also, instead of packing and serving javascript files, it will load all dependency of javascript files asynchronously in browser. 

In production, vite can pack all the javascript files together and serve static javascript files to make it faster.

**Vite Rails Hot Reload**
![vite-rails-hot-reload](/images/tanmoy_gsoc23/vite_hot_reload.gif)

##### Pull Requests
- [Move Simulator Assets To Vite Rails](https://github.com/CircuitVerse/CircuitVerse/pull/3777)


### Integrate RBS in Project & Static Type Checking in CI
---
RBS [Ruby static typing] enabled static typing mechanism which enables to maintain consistency in codebase and reduce the bugs in code. 

We used `rbs` gem for rbs annotation files. We used `steep` gem to verify type signatures. 

We have also included `steep check` in our CI to verify the changes in code or rbs annotation before finalizing any PR.

##### Pull Requests
- [Install RBS & Configure](https://github.com/CircuitVerse/CircuitVerse/pull/3807)
- [feat: Add RBS to CI](https://github.com/CircuitVerse/CircuitVerse/pull/3833)
- [feat: add rbs for models](https://github.com/CircuitVerse/CircuitVerse/pull/3955)

> RBS has beend added for `models` only. We will add RBS for other files in future.

### Integrate Undercover CI
---
Undercover is a tool that analyzes the report generated by simplecov and generates a code coverage report based on it. The primary objective of this integration is to examine pull requests created by contributors and identify any new functions without code coverage.

To facilitate this process, we have incorporated the undercover_easy gem along with the reviewdog GitHub Actions bot. This enables us to provide feedback on any issues directly within the pull request by posting comments.

![undercover](/images/tanmoy_gsoc23/undercover-bot.png)

##### Pull Requests
- [Integrate Undercover CI](https://github.com/CircuitVerse/CircuitVerse/pull/3812)


### Improve Unit Testcase Coverage
---
The codebase currently has a code coverage of approximately 86%. However, some recently added functions were lacking unit test coverage. As part of this task, We have addressed this gap by writing unit tests specifically for those functions.

##### Pull Requests
- [Unit test for models](https://github.com/CircuitVerse/CircuitVerse/pull/3835)
- [Unit test for helpers](https://github.com/CircuitVerse/CircuitVerse/pull/3836)
- [Unit test for controllers](https://github.com/CircuitVerse/CircuitVerse/pull/3852)
- [Unit test for jobs](https://github.com/CircuitVerse/CircuitVerse/pull/3853)


### Add Missing Integration Testcases
---
To optimize the integration testing process in CircuitVerse, Capybara has been utilized for comprehensive automated testing. During the analysis, it was identified that certain workflows, including Profile management, Group management, Assignment management, and Project management, lacked integration testing. As part of this task, integration tests for these missing workflows have been incorporated to ensure their proper functioning and improve the overall quality of the application.

##### Pull Requests
- [Integration testing for profile management](https://github.com/CircuitVerse/CircuitVerse/pull/3863)
- [Integration testing for group management](https://github.com/CircuitVerse/CircuitVerse/pull/3864)
- [Integration testing for assignment management](https://github.com/CircuitVerse/CircuitVerse/pull/3865)
- [Integration testing for project management](https://github.com/CircuitVerse/CircuitVerse/pull/3959)

### Improve Remote Development Platform [GitHub Codespaces, Gitpod]
---


##### Pull Requests
- [fix: Gitpod Remote Development Revamp](https://github.com/CircuitVerse/CircuitVerse/pull/3892)
- [feat: Github Codespace as Remote Development Environment](https://github.com/CircuitVerse/CircuitVerse/pull/3894)

### Improve Docker Development Setup
---
[CONTENT]

##### Pull Requests
- [feat: docker based development improvement](https://github.com/CircuitVerse/CircuitVerse/pull/3998)
- [feat: vite in docker dev environment and support root user](https://github.com/CircuitVerse/CircuitVerse/pull/4002)

### Improve Setup Documentation
---
[CONTENT]

##### Pull Requests
- [chore: Documentation Update](https://github.com/CircuitVerse/CircuitVerse/pull/3933)

### Blog posts written
---
- [GSoC 2023 CircuitVerse | Week 1 & 2 Report](https://tanmoy.online/week-1-2-circuitversegsoc23)
- [GSoC 2023 CircuitVerse | Week 3 Report](https://tanmoy.online/week-3-circuitversegsoc23)
- [GSoC 2023 CircuitVerse | Week 4 Report](https://tanmoy.online/week-4-circuitversegsoc23)
- [GSoC 2023 CircuitVerse | Week 5 Report](https://tanmoy.online/week-5-circuitversegsoc23)
- [GSoC 2023 CircuitVerse | Week 6 Report](https://tanmoy.online/week-6-circuitversegsoc23)
- [GSoC 2023 CircuitVerse | Week 7 & 8 Report](https://tanmoy.online/week-7-8-circuitversegsoc23)
- [GSoC 2023 CircuitVerse | Week 9, 10 & 11 Report](https://tanmoy.online/week-9-10-11-circuitversegsoc23)
- [GSoC 2023 CircuitVerse | Week 12 Report](https://tanmoy.online/week-12-circuitversegsoc231)

### Experience

- Mentor: Vedant Jain and Smriti Garg
- Contributor: Tanmoy Sarkar

> I've had a wonderful time working with CircuitVerse. Through this experience, I've learned about various tools and concepts, giving me a fresh outlook on open source projects. I've gained knowledge in areas such as Solargraph LSP, Debugger, Vite, Rollup, Github Actions CI, Remote Development Platform, and Docker-based development setup. This newfound knowledge will definitely benefit me in the future. The mentors and organization admin were incredibly supportive and helpful, and I'm truly grateful for their guidance and assistance.


### Conclusion
---
The 12-week duration of this project was productive, allowing us to achieve nearly all our goals. I want to express my gratitude to my mentors, Vedant Jain and Smriti Garg, as well as the organization admin, Aboobacker, for their support and guidance.

I would definitely keep working on CircuitVerse post GSoC & helping new contributors to contribute to this project.

---
Thanks for reading this blog.