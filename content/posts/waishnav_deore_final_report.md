---
title: "Forum Revamp: Final Report (GSoC 2024)"
date: 2024-08-24T12:04:13+05:30
draft: false
author: Waishnav Deore
type: post
---

![GSoC'24@CircuitVerse](/images/waishnav_deore/gsoc-phase-1.png)

Hello Readers,

This blog is dedicated to summarizing the work that we have done and goals that we have met in Google Summer of Code 2024 for the **Forum Revamp Project**.

**Table of Contents**
{{< toc >}}

## About the Project

Currently, our forum is built using [simple_discussion](https://github.com/circuitverse/simple_discussion) Rails engine, which lacks many features which we needed. The main goal of this project is to revamp the forum with new features such as a Markdown Editor for drafting forum posts, moderation tools, spam reporting features, a leaderboard for active forum users, and more.

So far, we have covered and implemented the following features in the first phase of the project:

<!--* **Removed old unsupported Rails versions from Appraisal Tests** -->
<!--* **Fixed CI fails and improved the development environment**-->
* **Language Filter to gatekeep inappropriate language**
* **Report as Spam feature**
* **New forum thread notification in Slack channel**
* **Added SimpleMDE Markdown editor for drafting messages**
* **Markdown syntax extension for embedding circuits, embedding video and user tagging**
* **Search functionality on all the forum threads**
* **Leaderboard ranking page and points distribution on contribution in forum**
* **Improve the documentation according to newly added features**

For detailed implementation of these features do checkout the biweekly blog posts [here](https://waishnav.github.io/blog/tags/gsoc/).

---

## Accomplishments
### 1. Language Filter and Profanity Check

Since the forum is public, it is crucial to gatekeep inappropriate language. This problem is common in public forums where users sometimes use inappropriate language. To solve this problem, we used the `language_filter` gem, which allows us to filter inappropriate words from forum posts.

The idea is to throw an error message to the user if the post contains any inappropriate language.

![language-filter](/images/waishnav_deore/language-filter.png)

---

### 2. UI-UX Improvements

The following are some small UI-UX improvements we have made to the forum post card:

#### a. Dropdown in Forum Post Card for Actions
![dropdown](/images/waishnav_deore/dropdown-in-forum-post-card.png)

#### b. Jump to Solution Button and Highlighted Solution
![solution-highlight](/images/waishnav_deore/solution-highlight.png)

---

### 3. Report as Spam Feature

We have covered the language filter to gatekeep inappropriate language. However, there are still chances that users can post spam content since the `language_filter` gem is not that powerful. To mitigate this, we implemented the **Report as Spam** feature. This feature allows users to report a post as spam. Once reported, the post will be reviewed by moderators.

To learn more about the implementation details, you can check out my biweekly blog post on my GSoC experience [here](https://medium.com/@waishnav/moderation-tools-and-spam-reports-week-3-4-report-gsoc24-circuitverse-f0d214648bf3). In the blog, I've discussed each aspect of the implementation in detail.

##### a. Report as Spam Modal
![report-as-spam-modal](/images/waishnav_deore/report-as-spam-modal.png)

##### b. Moderator Review Page
![moderator-review-page](/images/waishnav_deore/moderator-review-page.png)

---

### 4. Slack Notification for New Forum Thread

Currently, Slack is our main communication channel for both contributors and users. To keep the community updated about new forum threads, we implemented the Slack notification feature. This feature notifies the Slack channel about new forum threads.

It was fairly simple to implement, thanks to the `noticed` gem and Slack webhook integration documentation. Every time a new forum thread is created, the Slack community will be notified.

{{< video src="/images/waishnav_deore/slack-notification.mp4" type="video/mp4" preload="auto" >}}

---

### 5. Markdown Editor
##### a. Markdown editor using SimpleMDE

This feature is significant as it allows users to draft forum posts in Markdown format. It can be useful for adding more features like embedding CircuitVerse circuits, tagging users, embedding YouTube videos, and more using Markdown syntax extensions. So far, we have added the Markdown editor without any extensions, which will be added in the next phase of the project.

Here is how the Markdown editor looks:

![markdown-editor-simplemde](/images/waishnav_deore/markdown-editor.png)

##### b. Markdown Syntax extension

As our needs for this forum to be used in production, we need to able to embed the circuitverse ciruits, youtube video and user tagging.

For this implementation, I extended the markdown syntax both at client side using regex and server side using [redcarpet gem](https://github.com/vmg/redcarpet).

###### 1. Circuit Embedding
![embed-circuit](/images/waishnav_deore/embed-circuit.png)
###### 2. Video Embedding
![embed-video](/images/waishnav_deore/embed-video.png)
###### 3. User tagging
![tag-user](/images/waishnav_deore/tag-user.png)

---

### 6. Topic Search

Searching is important aspect, it can help user to search for issue/discussion which they are looking for. Also it can help reduce the duplicate or similar discussion.

Since we are working on gem (library), we can't be sure where this gem can be used. I mean, it can be used in rails application with Postgres as db, MySQL as db or any other db.
If we have had vendor locked the db as Postgres, search feature can be implemented through [Postgres's Full text search](https://www.postgresql.org/docs/current/textsearch.html).
But we can't do that. So we have to give users of this engine option to override the default search functionality with their own implementation.

Here is the video of search functionality which will be going to be used by CircuitVerse using [PgSearch](https://github.com/Casecommons/pg_search) gem.

{{< video src="/images/waishnav_deore/topic-search.mp4" type="video/mp4" preload="auto" >}}

---

### 7. Leaderboard Ranking

Ranking is important, if one need to judge the crediblity of the message. Using simple point distribution on forum thread creation, on comments etc etc, we can simply able to create a leaderboard of users.

During the implementation, I got little confuse where the distribution of the points logic should exists, in the controller or in the model file. Then I read few blogs on fat model and slim controllers and vice versa.
In the rails, these conventions are very helpful and important, depending on it's usecase one can utilize this concepts.

Here is the screenshot of leaderboard page. Note: UI of leaderboard may changes later

![leaderboard-ranking](/images/waishnav_deore/leaderboard-ranking.png)

---
## Pull Requests

- `Week 1:` [Adding supported Rails versions in Appraisal](https://github.com/CircuitVerse/simple_discussion/pull/22)
- `Week 2:` [Fixing CI fails](https://github.com/CircuitVerse/simple_discussion/pull/23)
- `Week 3:` [Adding language filters and UI changes](https://github.com/CircuitVerse/simple_discussion/pull/24)
- `Week 4:` [Report as spam and moderation review page](https://github.com/CircuitVerse/simple_discussion/pull/25)
- `Week 5:` [Slack notification in specific channel for new thread](https://github.com/CircuitVerse/CircuitVerse/pull/5005)
- `Week 6:` [Markdown editor using SimpleMDE](https://github.com/CircuitVerse/simple_discussion/pull/26)
- `Week 7:` [Markdown syntax extension](https://github.com/CircuitVerse/simple_discussion/pull/27)
- `Week 8:` [Topic search on Forum Threads](https://github.com/CircuitVerse/simple_discussion/pull/28)
- `Week 9:` [Moderator delete access](https://github.com/CircuitVerse/simple_discussion/pull/29)
- `Week 10:` [Leaderboard Page and Ranking](https://github.com/CircuitVerse/simple_discussion/pull/32)
- `Week 11:` [Improved Documentation](https://github.com/CircuitVerse/simple_discussion/pull/33)

---

## Blogs
CV community encourage to document each and every aspect of project. So I posted the biweely blogs and shared the progress as well as the implementation details in depth of each features and documented the whole project.
You guys can checkout these blogs [here](https://waishnav.github.io/blog/tags/gsoc/)


## What's Next?

I’m excited to continue to contribute to this incredible open-source project which helps students to design and learn about digital circuit design.

Additionaly, I started to work on this project with the thought that this revamped forum gemd will be distributed and published as different name, instead of `simple_discussion`

---

## Learning

Following are the key takeaways from the first phase of the project:

- The importance of `git rebase` over `git merge` for maintaining a clean git history.
- Learning the internals of the Rails engine and how to integrate it with the main application.
- Understanding the importance of testing and its significance as a gem maintainer and library author.
- Improved debugging skills through extensive bug fixing.
- The importance of feature flags in the Rails engine to toggle features through configuration.
- Gaining confidence in navigating and understanding large codebases with the help of git commit history.

---

## Acknowledgments and Conclusion

Over the past few weeks, I've had an incredible journey contributing to CircuitVerse. The community has been supportive and motivating, and I had the freedom to meticulously plan and execute my tasks, all under the helpful guidance of my mentors. 
I've learned a lot about the inner workings of Rails Engine, and I've gained a lot of confidence in my abilities as a developer.

I would like to thank my mentors, [Aboobacker MK](https://github.com/tachyons) and [Tanmoy Sarkar](https://github.com/tanmoysrt), for always being there to help me out and guiding me throughout the project.
