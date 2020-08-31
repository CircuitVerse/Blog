---
title: "GSoC 2020 Final Submission Refactoring and Electron App"
date: 2020-08-27T15:47:48+05:30
draft: false
author: Shubhankar Sharma
type: post
---

This is my final blogpost regarding GSoC 2020 and I will try to summarize everything I managed to accomplish while working on this amazing project. I think everyone will remember the summer of 2020 for their entire lives because of the stuff that happened this year but for me it will be extra memorable because of this great journey.

## Recap:

My proposal has 3 parts Making a Separate Repository and Refactoring Simulator Code: The first part is refactoring of the simulator code base. For some time now, the CircuitVerse community has wanted to refactor the current javascript codebase (sample GitHub issues: #199, #110, #190). Testing Simulator Code: With bug fixes and new features being implemented by a growing community of circuitverse it will be essential to test Pull Requests before CircuitVerse admins and maintainers merge them. so the second part of my proposal is adding tests to ensure the basic functionality of the simulator. Electron App: CircuitVerse provides a platform to perform simulations on an online simulator that users don’t have to install, is lightweight and has a lot of features but sadly not everyone has unrestricted access to the internet. This can be one of the reasons why CircuitVerse’s maximum traffic is from developed countries with above-average or good internet connectivity like the USA(26%), India(11%), UK(6%) and Canada(4%). It would be a big step towards increasing accessibility to have an offline App. Hence, I propose the third part of my proposal: An offline electron app for CircuitVerse.

## Phase 1:

In my proposal I planned to dive right into the toughest parts and start refactoring them but there were some open issues that needed to be merged before I could start refactoring. So in our first meeting we decided I should start from documentation first and then get into refactoring. This was a blessing because while documenting I learnt that there were some assumptions I was going to make while refactoring which were baseless. 
For documenting each file, I used JSDoc. JSDoc can auto-generate HTML pages for Documentation based on comments in files which gives more meaning to comments and also leads to an easily readable and navigable Documentation.
I started off with files that I had read about a hundred times during the research period and proceeded to ones I never felt the need to read before. It was a good learning opportunity because now that I have documented each and every function and I know (or at least I hope I do) what every function does in those 34 files with 30k+ lines. I have added at least 2400 lines of comments and fixed some linting issues. With a PR of line difference 13323, even the code climate bot has given up. 
link to the [documentation](http://shubhankarsharma00.tech/out/index.html).

After documentation in week 1 It was finally time for me to start working on refactoring and updating the JS codebase in CircuitVerse.
I had spent most of my research time researching and refactoring the codebase so at least 10–20 percent work was already done. I started working on making separate files with default exports for most classes and object literals. Tried to move some global functions to appropriate files, changed some variable names which were not following camelCase. I also fixed some listing issues.
In my official proposal, I have given myself a time of 4 weeks to refactor the whole codebase. But since I have learned a lot while documenting so I didn’t need to do research on some particular functionality before refactoring it, I did it in 2 weeks.

Refactoring included:
+ Converted ES5 classes to ES6 classes by using [lebab](https://github.com/lebab/lebab) which is a great tool to convert ES5 code to ES6.
+ imported relevant function into files.
+ fixed some linting issues.
+ removed redundant code.

and much more, Here's the link to now merged 
PR: https://github.com/CircuitVerse/CircuitVerse/pull/1468
(please be patient the PR got very large and so the link crashes sometimes because response takes too long xD.)

And then I got my first evaluation
![My First Evaluation](/img/eval1.jpg)

## Phase 2:

In the second phase of my project I worked on:
+ Making a [separate repository](https://github.com/shubhankarsharma00/Cv-frontend) for CircuitVerse-Simulator code.

+ Completed testing, added tests for all elements and some more UI corner cases.

In the separate Repository I set up webpack (initially all work was on webpacker gem in Ruby on Rails) Then I made adjustments for an environment in which a developer will be able to make changes and implement features easily. There is a UI revamp project which ended just and I will be working on merging the UI changes to this repository and after setting all this I plan on adding this as a submodule to the rails app repository.


Also I set up testing for simulator these tests are written in JEST and I have automated github action to test the newest code pushed onto master or incase there is a new PR on it. Report on these test can be seen [here](https://github.com/shubhankarsharma00/Cv-frontend/actions)
I am hopeful all these test, refactoring, documenting and linting will make it really easy for future contributors to pick up and implement new features into the simulator which was probably the hardest part of trying to contribute in CircuitVerse.


Second Evaluation
![My Second Evaluation](/img/eval2.jpg)

## Phase 3:

The third phase was the electron app. I used the same repo I separated in phase 2 as a submodule and modified it to do some web specific stuff differently using isElectron module. The electron app has all the features that the online simulator has but the save offline feature actually saves stuff offline in your file manager instead of browser localStorage. You can open this code online and you can also save circuits online from save offline feature. 

The separate repository can be found [here](https://github.com/shubhankarsharma00/cv-electron)

![Outlook](/img/electron-app.jpg)
With an offline save, online save, and basic editor menu options.
![Outlook](/img/electron-app-save.jpg)

## Further Work:
After GSoC I will be working on integrating the new UI work (which has been done for the simulator) with the offline app and moving the current codebase to a separate repo officially. 
I will also be helping in the work left on SubCircuits.

## Epilogue:

I was able to achieve my proposal well before my proposed timeline and I learnt a lot in this journey. I would like to thank [Satvik](https://github.com/satu0king) who taught and helped me a lot. He was always available and cleared all my doubts everytime despite being busy and working himself. Also I am grateful to Google which paid me for something I love doing. The whole process is great and the whole Open Source community is very helping. I just wish I can give back enough to a community that has given so much to me.

Thanks for reading this.