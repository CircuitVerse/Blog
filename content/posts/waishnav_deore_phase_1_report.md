---
title: "Forum Revamp : Phase 1 Project Report (GSoC 2024)"
date: 2024-07-07T12:04:13+05:30
draft: false
author: Waishnav Deore
type: post
---

![GSoC'24@CircuitVerse](/images/waishnav_deore/gsoc-phase-1.png)

Hello Readers,
This blog is dedicated to summarise the progress for the First Phase of Google Summer of Code 2024 for the **Forum Revamp Project**.


### About Project
Currently for forum we have been using the [simple_discussion](https://github.com/circuitverse/simple_discussion) rails engine but it lacks many features 
and is not actively maintained. The main goal of this project is to revamp the forum with new features such 
as Markdown Editor for drafting forum posts, moderation tool and spam reporting features, leaderboard for active
forum users etc etc.

So far, we have covered and implemented the following features in the first phase of the project:

* **Removed old unsuported rails version from Appraisal Tests**
* **Fixed CI fails and improving Dev environment**
* **Language Filter to gatekeep the inapproriate language**
* **Report as Spam feature**
* **New forum thread notification in slack channel**
* **Added SimpleMDE markdown editor for drafting messages**

---
### Appraisal Tests and CI fixes

These tests are very important from the gem maintainer perspective as it helps to ensure that the gem is compatible 
with different versions of Rails. The Appraisal gem was already being used in rails engine but it was not updated for a long time.
In the week 1 and 2, I fixed the appraisal tests and updated with currently supported rails versions. In this weeks, I got to learn
so much about the testing and debugging through dependencies version mismatch issues.

Also In these weeks, I also explore about improving development experience by integrating with various tools like Solargraph, RubyLSP etc
Through the guidance of my mentors, I drop the idea of using Solargraph and goes with RubyLSP as it is more stable and actively maintained.

![ci-pass-test](/images/waishnav_deore/ci-test-pass.png)

---
### Language Filter and Profanity Check
Since the forum is public, it is very important to gatekeep the inappropriate language. This problem is very common in the public forums where users uses wrong
language to communicate. To solve this problem, we used `language_filter` gem, which let us filter the inappropriate word from the forum posts.

Here idea is to throw the error message to user if the post contains any inappropriate language. 

![language-filter](/images/waishnav_deore/language-filter.png)

---
### UI-UX imporovements
Following are the very small UI-UX improvements which we have done in the forum post card:

##### 1. Dropdown in Forum Post Card for actions
![dropdown](/images/waishnav_deore/dropdown-in-forum-post-card.png)

##### 2. Jump to Solution button and highlighted solution
![solution-highlight](/images/waishnav_deore/solution-highlight.png)

---
### Report as Spam feature
So far we have covered the language filter to gatekeep the inappropriate language. But still there are chances that
user can post the spam content since `language-filter` gem is not that much powerful. To avoid this, we have implemented
the **Report as Spam** feature. This feature will allow the user to report the post as spam. Once the post is reported 
as spam, it will be hidden from the public view and will be reviewed by the moderators.

To know more about the implementation in detail, you can checkout the biweekly blog post of my GSoC experience [here](https://waishnav.github.io/blog/week-3-4-experience-moderation-tools-and-spam-reports-gsoc24-circuitverse/).
In the blog, I've gone through each aspect of the implementation in detail so do check it out if you find it interesting.

##### 1. Report as spam modal
![report-as-spam-modal](/images/waishnav_deore/report-as-spam-modal.png)
##### 2. Moderator Review Page
![moderator-reivew-page](/images/waishnav_deore/moderator-review-page.png)

---
### Slack Notification for new forum thread
Currently slack is our main communication channel both for contributors and users. So to keep community updated about the 
new forum thread, we have implemented the slack notification feature. This feature will notify the slack channel about 
the new forum thread.

It was fairly simple to implement thanks to `noticed` gem and slack webhook integration documentation. So every time 
new forum thread is getting created, slack community will be notified about it.

{{< video src="/images/waishnav_deore/slack-notification.mp4" type="video/mp4" preload="auto" >}}

---
### Markdown Editor using SimpleMDE
This feature is significant as it allows users to draft forum posts in Markdown format. It can be useful for adding more features like embedding CircuitVerse circuits, tagging users, embedding YouTube videos, etc., using Markdown syntax extensions. So far, we have added the Markdown editor without any extensions, which will be added in the next phase of the project.

Here is how the Markdown editor looks:

![markdown-editor-simplemde](/images/waishnav_deore/markdown-editor.png)

---
### Link to all Pull Requests
- `week 1` [adding supported rails version in appraisal](https://github.com/CircuitVerse/simple_discussion/pull/22)
- `week 2` [fixing CI fails](https://github.com/CircuitVerse/simple_discussion/pull/23)
- `week 3` [adding language filters and UI changes](https://github.com/CircuitVerse/simple_discussion/pull/24)
- `week 4` [report as spam and moderation review page](https://github.com/CircuitVerse/simple_discussion/pull/25)
- `week 5` [slack notification in specific channel for new thread](https://github.com/CircuitVerse/CircuitVerse/pull/5005)
- `week 6` [markdown editor using simplemde](https://github.com/CircuitVerse/simple_discussion/pull/26)

---
### Future Work
The work of phase 1 was focused on adding high priority features to the forum like language filter, spam reporting, markdown editor, and slack notifications.

In the second phase, we will be focusing on adding features like embedding circuitverse circuits, tagging user etc in markdown editor, 
adding a leaderboard for active forum users.

More importantly if time permits we will be thinking of republishing the rails engine as a new gem with all this new features.

---
### Learning
Following are the key takeaways which I've learned during the first phase of the project:

- Importance of `git rebase` over `git merge` for maintaining a clean git history.
- Learned internals of the Rails engine and how to integrate it with the main application.
- Understood the importance of testing and it's significance as a gem maintainer and library author.
- Improved debugging skills through extensive bug fixing.
- Importance of feature flags in rails engine to toggle features through configuration.
- Gain confidence in navigating and understanding large codebases with the help git commit history.

---
### Conclusion

Over the past few weeks, I've had an incredible journey contributing to CircuitVerse. The community has been supportive and motivating, and I had the freedom to meticulously plan and execute my tasks, all under the helpful guidance of my mentors. 
I've learned a lot about the inner workings of a large-scale project built using ruby on rails, and I've gained a lot of confidence in my abilities as a developer.

I would like to thank my mentors,
[Aboobacker MK](https://github.com/tachyons) and [Tanmoy Sarkar](https://github.com/tanmoysrt) for always being there to help me out and guiding me throughout this period.
