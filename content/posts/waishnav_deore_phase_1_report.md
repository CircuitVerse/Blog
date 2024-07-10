---
title: "Forum Revamp: Phase 1 Project Report (GSoC 2024)"
date: 2024-07-07T12:04:13+05:30
draft: false
author: Waishnav Deore
type: post
---

![GSoC'24@CircuitVerse](/images/waishnav_deore/gsoc-phase-1.png)

Hello Readers,

This blog is dedicated to summarizing the progress of the first phase of Google Summer of Code 2024 for the **Forum Revamp Project**.

### About the Project

Currently, our forum is built using [simple_discussion](https://github.com/circuitverse/simple_discussion) Rails engine, which lacks many features and is not actively maintained. The main goal of this project is to revamp the forum with new features such as a Markdown Editor for drafting forum posts, moderation tools, spam reporting features, a leaderboard for active forum users, and more.

So far, we have covered and implemented the following features in the first phase of the project:

* **Removed old unsupported Rails versions from Appraisal Tests**
* **Fixed CI fails and improved the development environment**
* **Language Filter to gatekeep inappropriate language**
* **Report as Spam feature**
* **New forum thread notification in Slack channel**
* **Added SimpleMDE Markdown editor for drafting messages**

---

### Appraisal Tests and CI Fixes

These tests are crucial from the gem maintainer's perspective as they help ensure that the gem is compatible with different versions of Rails. The Appraisal gem was already being used in the Rails engine but had not been updated for a long time. In weeks 1 and 2, I fixed the appraisal tests and updated them with currently supported Rails versions. During these weeks, I learned a lot about testing and debugging dependency version mismatch issues.

I also explored improving the development experience by integrating various tools like Solargraph and RubyLSP. With guidance from my mentors, I chose RubyLSP as it is more stable and actively maintained.

![ci-pass-test](/images/waishnav_deore/ci-test-pass.png)

---

### Language Filter and Profanity Check

Since the forum is public, it is crucial to gatekeep inappropriate language. This problem is common in public forums where users sometimes use inappropriate language. To solve this problem, we used the `language_filter` gem, which allows us to filter inappropriate words from forum posts.

The idea is to throw an error message to the user if the post contains any inappropriate language.

![language-filter](/images/waishnav_deore/language-filter.png)

---

### UI-UX Improvements

The following are some small UI-UX improvements we have made to the forum post card:

#### 1. Dropdown in Forum Post Card for Actions
![dropdown](/images/waishnav_deore/dropdown-in-forum-post-card.png)

#### 2. Jump to Solution Button and Highlighted Solution
![solution-highlight](/images/waishnav_deore/solution-highlight.png)

---

### Report as Spam Feature

We have covered the language filter to gatekeep inappropriate language. However, there are still chances that users can post spam content since the `language_filter` gem is not that powerful. To mitigate this, we implemented the **Report as Spam** feature. This feature allows users to report a post as spam. Once reported, the post will be reviewed by moderators.

To learn more about the implementation details, you can check out my biweekly blog post on my GSoC experience [here](https://waishnav.github.io/blog/week-3-4-experience-moderation-tools-and-spam-reports-gsoc24-circuitverse/). In the blog, I've discussed each aspect of the implementation in detail.

#### 1. Report as Spam Modal
![report-as-spam-modal](/images/waishnav_deore/report-as-spam-modal.png)

#### 2. Moderator Review Page
![moderator-review-page](/images/waishnav_deore/moderator-review-page.png)

---

### Slack Notification for New Forum Thread

Currently, Slack is our main communication channel for both contributors and users. To keep the community updated about new forum threads, we implemented the Slack notification feature. This feature notifies the Slack channel about new forum threads.

It was fairly simple to implement, thanks to the `noticed` gem and Slack webhook integration documentation. Every time a new forum thread is created, the Slack community will be notified.

{{< video src="/images/waishnav_deore/slack-notification.mp4" type="video/mp4" preload="auto" >}}

---

### Markdown Editor Using SimpleMDE

This feature is significant as it allows users to draft forum posts in Markdown format. It can be useful for adding more features like embedding CircuitVerse circuits, tagging users, embedding YouTube videos, and more using Markdown syntax extensions. So far, we have added the Markdown editor without any extensions, which will be added in the next phase of the project.

Here is how the Markdown editor looks:

![markdown-editor-simplemde](/images/waishnav_deore/markdown-editor.png)

---

### Link to All Pull Requests

- `Week 1:` [Adding supported Rails versions in Appraisal](https://github.com/CircuitVerse/simple_discussion/pull/22)
- `Week 2:` [Fixing CI fails](https://github.com/CircuitVerse/simple_discussion/pull/23)
- `Week 3:` [Adding language filters and UI changes](https://github.com/CircuitVerse/simple_discussion/pull/24)
- `Week 4:` [Report as spam and moderation review page](https://github.com/CircuitVerse/simple_discussion/pull/25)
- `Week 5:` [Slack notification in specific channel for new thread](https://github.com/CircuitVerse/CircuitVerse/pull/5005)
- `Week 6:` [Markdown editor using SimpleMDE](https://github.com/CircuitVerse/simple_discussion/pull/26)

---

### Future Work

The work of phase 1 focused on adding high-priority features to the forum like language filters, spam reporting, markdown editor, and Slack notifications.

In the second phase, we will focus on adding features like embedding CircuitVerse circuits, tagging users, etc., in the Markdown editor, and adding a leaderboard for active forum users.

More importantly, if time permits, we will consider republishing the Rails engine as a new gem with all these new features.

---

### Learning

Following are the key takeaways from the first phase of the project:

- The importance of `git rebase` over `git merge` for maintaining a clean git history.
- Learning the internals of the Rails engine and how to integrate it with the main application.
- Understanding the importance of testing and its significance as a gem maintainer and library author.
- Improved debugging skills through extensive bug fixing.
- The importance of feature flags in the Rails engine to toggle features through configuration.
- Gaining confidence in navigating and understanding large codebases with the help of git commit history.

---

### Conclusion

Over the past few weeks, I've had an incredible journey contributing to CircuitVerse. The community has been supportive and motivating, and I had the freedom to meticulously plan and execute my tasks, all under the helpful guidance of my mentors. 
I've learned a lot about the inner workings of Rails Engine, and I've gained a lot of confidence in my abilities as a developer.

I would like to thank my mentors, [Aboobacker MK](https://github.com/tachyons) and [Tanmoy Sarkar](https://github.com/tanmoysrt), for always being there to help me out and guiding me throughout this period.
