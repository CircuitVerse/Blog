---
title: "Jaydip_Dey_Final_Report"
date: 2024-09-13T14:22:06+05:30
draft: false
author: Jaydip Dey
type: post
---


This blog post is the final report for the **CircuitVerse Practice section** , which is a part of **Google Summer of Code 2024**. The project aimed create a practice section where user can practice circuit related problems.


![phase-1](/images/Jaydip_GSoC24/Final_Report.png)


## Table of Contents


{{< toc >}}


---


### Implemented features


- 👥 **Admins Managing Moderators**: Allowing admins to add and remove question moderators. 👥


- 🔧 **Question Category Management**: Allowing admins and moderators to create and delete question categories. 🔧


- 🔍 **Questions Page**: Features including search, filtering capabilities, pagination, and view options. 🔍


- 📝 **Question Management with Simulator Integration**: Allowing admins and moderators to add, edit, and delete questions. Users can attempt a question with circuit boilerplate. 📝




- ✅ **Auto Verification and Submission**: Auto-verify and submit circuits, storing users' progress. ✅


- 📊 **User Dashboard**: A dashboard to track submission history and progress, with the ability to toggle visibility. 📊


- 🚦 **Feature Access Control**: A Flipper feature flag to control access/block this entire feature. 🚦


---


### 👥 Admins Managing Moderators 👥


In the admin dashboard there is a button named `Add moderators` where admins can add the new email id's of the moderators or can remove the existing one.




![image](/images/Jaydip_GSoC24/manage-mod-2.webp)


### 🔧 Question Category Management 🔧


Similar to the Add moderators button, in the dashboard there should be an option of `Add categories`. But unlike Add modertaors , Add Categories will be visible to both question bank moderators and the admins. Clicking this button will open a modal where user can add a new category or delete and existing one.


![image](/images/Jaydip_GSoC24/categories.png)


The below screenshot shows the placement of the above two feature buttons:


![image](/images/Jaydip_GSoC24/mod_cat.png)
![image](/images/Jaydip_GSoC24/admin-mod.png)


### 🔍 Questions Page 🔍


This is the page where users will be able to see and browse questions. Features that are implemented in this page includes:


- Search filer to search for any questions based on its title and/or description.
- Filter by question categories, difficulty level and status(attempted, unattempted or solved).
- Change the view (List or grid). By default all the questions are displayed in grid view.
- Pagination is included so that users can see maximum 6 questions.


![image](/images/Jaydip_GSoC24/question_other.png)


### 📝 Question Management with Simulator Integration 📝


Moderators will be able to create/delete/edit a question


##### Create question


* Moderators will be given a form where they click on `Add Question` menu in the dropdown.
In that form they can add question heading, statement (**markdown supported**), question category and difficulty level.


![image](/images/Jaydip_GSoC24/add-q.png)


* On clicking `Create Circuit boilerplate and Test Data`, simulator page is opened to add circuit boilerplate, which will contain input/output probes and a pre-configured testbench. Moderator needs to click on save on the top right after adding boilerplate and testbench data. This gives users a ready-made setup to start solving digital logic problems.


![image](/images/Jaydip_GSoC24/boilerplate.png)
![image](/images/Jaydip_GSoC24/add_question_flow.png)


##### Edit and delete question


* Moderators and admins will be able to edit and delete a question. On the questions page, two more buttons of edit and delete will be there to Edit or delete a question. In case of edit , a form similar to create question will open with data populated
* On clicking the delete button an alert will be shown to confirm the action, and on clicking yes, questions will be deleted.


![image](/images/Jaydip_GSoC24/edit_delete.png)


##### Simulator Integration


* When the user clicks on a question, then the question is displayed alongside the circuit boilerplate which the moderator has configured while creating the question
* TestBench is removed from the UI , so that user can't see hidden test cases while attempting a question.


![image](/images/Jaydip_GSoC24/question.png)


### ✅ Auto Verification and Submission ✅


* When the user clicks on `Submit and Test` button, then the number of test case passed out of total number test cases (provided in the testBench while creating question) is shown as an alert.
If all the test cases are passed, then it goes under `solved` category else it goes under `attempted` category.
* **Progress of the user is also saved** when the user clicks on `Submit and Test` button, so that the user can start of from where he/she left off.




### 📊 User Dashboard 📊


* In the dashboard a separate tab named `My Questions` is added beside `Collaborated Circuits` tab. In this tab an user can see all the questions which he/she has **attempted** or **solved**. On clicking the `View` button, he/she will be able to attempt the question again and circuit will be restored from where he/she left off.


![image](/images/Jaydip_GSoC24/my_questions.png)


* User has also have an option to make the `My Questions` tab **public** or **private**. If a particular user makes his/her questions dashboard public, then other users will be able to see his/her submissions of a particular question in his `My Question` Tab on the url `users/:user_id` . **If he/she modifies that submission, then it will be reflected on his/her dashboard for the same question and not on other user dashboard**.


![image](/images/Jaydip_GSoC24/question_privacy.png)
![image](/images/Jaydip_GSoC24/privacy_flow.png)


### 🚦 Feature Access Control 🚦


A flipper named `question_bank` has been created to enable or disable this feature. When enabled, all the features of this project can be accessed by the members of respective roles. When disabled none of the features including administrative can be accessed .


### 📅 Future work 📅


- As of now user can see the latest submission of a partcular question and make changes on that. In future, they will be shown all list of submission of a particular question and can navigate to that submission.
- Analysis of submission in the dashboard using more parameters like percentage of questions solved/attempted, highest streak etc. and on the basis of that rating can be introduced.
- Currently teachers add assignments and those are checked manually, but this feature can be integrated with that to allow auto verification and assign marks.




### 📥 Pull Requests 📥


Pull request for the entire feature can be found [here](https://github.com/CircuitVerse/CircuitVerse/pull/5015)


### 📝 Blogs 📝


[**Phase 1 blog GSoC@24 Jaydip Dey**](https://blog.circuitverse.org/posts/jaydip_dey_phase_1_report/)


- `week 0` - [GSoC@24 - Community Bonding](https://medium.com/@jaydipdey2807/community-bonding-period-at-circuitverse-google-summer-of-code-2024-097a13617f75)
- `week 1 to 3` - [GSoC@24 - week 1 to 3 blog](https://medium.com/@jaydipdey2807/week-1-3-at-circuitverse-google-summer-of-code-2024-9accce10639dj)
- `week 4` - [GSoC@24 - week 4 blog](https://medium.com/@jaydipdey2807/week-4-at-circuitverse-google-summer-of-code-2024-a134f59f05f4)
- `week 5 & 6` - [GSoC@24 - week 5&6 blog](https://medium.com/@jaydipdey2807/week-5-6-at-circuitverse-google-summer-of-code-2024-87ea6f738cb4)
- `week 7 & 8` - [GSoC@24 - week 7&8 blog](https://medium.com/@jaydipdey2807/week-7-8-at-circuitverse-google-summer-of-code-2024-1931cf66e654)
- `week 9 & 10` - [GSoC@24 - week 9&10 blog](https://medium.com/@jaydipdey2807/week-7-8-at-circuitverse-google-summer-of-code-2024-1931cf66e654)
- `week 11 & 12` - [GSoC@24 - week 11&12 blog](https://medium.com/@jaydipdey2807/week-11-12-at-circuitverse-google-summer-of-code-2024-a743d731035b)




### 📌  Conclusion 📌
The project has been successfully completed, achieving all its objectives. This new `CircuitVerse Practise Section` feature is ready for integration into the main CircuitVerse repository. The past 12 weeks have been an incredible experience working on this project and collaborating with the team. I’m deeply grateful to the mentors for their unwavering support and willingness to address any doubts I had. I look forward to continuing to contribute to CircuitVerse and am always happy to assist fellow contributors in the future.
