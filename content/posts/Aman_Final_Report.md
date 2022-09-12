---
title: "Mobile App Improvement: Final Report (GSoC 2022)"
date: 2022-09-11T09:25:55+05:30
author: Aman
type: post
---


GSoC 2022 is nearing its end. I’m glad to say that I’ve met all the goals as planned in the beginning.
This post will be a brief report of all the feature requests implemented, goals accomplished, some stuff left to do, and future plans.

## Project Description
CircuitVerse is well established as a free educational platform that provides an easy-to-use online digital circuit simulator & is dedicated to aiding students to self-learn digital-logic design.

My project aimed to embed the simulator along with some improvements to the existing features in the mobile app. I have also worked on tasks other than the proposed tasks.


## Project Goals

---

### I. Search Circuits
This feature enabled the user to search for particular circuit designs based on the title, tags, or author from a pool of large circuits available on the platform. I created an API to implement this feature. This was the first time I was introduced to Ruby on Rails, as I had never worked on this framework.

Here are the related **PRs**:
- [Search Circuit Frontend](https://github.com/CircuitVerse/mobile-app/pull/225)
- [Search Circuit API](https://github.com/CircuitVerse/CircuitVerse/pull/3201)

![Search Circuit Preview](/images/aman-GSoC2022/search_circuit.webp)

### II. Profile Picture Integration
Add/Update profile picture feature was not available on the mobile app. I workedAdd/ the existing Profile API to support the addition/removal of the profile picture. I also worked on the user interface of this feature.

Here are the related **PRs**:
- [feat(profile): implement update profile picture](https://github.com/CircuitVerse/mobile-app/pull/226)
- [feat(api): expose profile picture parameter](https://github.com/CircuitVerse/CircuitVerse/pull/3190)

![Profile Picture Preview](/images/aman-GSoC2022/profile_picture.webp)

### III. Search in Interactive Book
The search is an essential feature in the Interactive Book because this will enable the user to search for the specific content faster, instead of searching for them manually on each page.
Please read the [blog](https://medium.com/@aman_s07/gsoc22-circuitverse-week-3-report-d92375f53c10) if you are interested in learning more about search in markdown.

Here are the related **PR**:
- [feat: search on the interactive book page](https://github.com/CircuitVerse/mobile-app/pull/229)

![Interactive Book Search Preview](/images/aman-GSoC2022/search_interactive_book.webp)

### IV. Multiple Mentor Support
This feature enables owners to invite multiple mentors to their group for collaboration without creating a specific group for each mentor. Earlier, the one who made the group used to be the mentor and owner of that group. Now, the owner can also invite other mentors to his group or promote any member to be a mentor in that group.

Here are the related **PR**:
- [feat: implement multiple mentor support in groups](https://github.com/CircuitVerse/mobile-app/pull/232)

![Mutiple Mentor Preview](/images/aman-GSoC2022/multiple_mentor.webp)


### V. Simulator Embedding
Simulator embedding was the most requested feature for the mobile app. I discussed this with the mentor and concluded that the optimal implementation would be using **WebView**. The basic implementation is done, but some bugs are still to be fixed, and a few improvements to smoothen the user experience.

Here are the related **PR**:
- [feat: embed simulator in the app](https://github.com/CircuitVerse/mobile-app/pull/235)


### VI. Notification integration
Notifying users about the different events is important for user engagement. So, this year we have introduced the notification for star and fork of the project. The app will notify users who have recently starred or forked their projects. This feature will also support push notifications in the near future.

Here are the related **PR**:
- [feat(notification): implement notification in the mobile app](https://github.com/CircuitVerse/mobile-app/pull/238)

## Future Developments

- Adding responsiveness to the UI views for all types of screens & orientations be it mobile, tablet or other devices.

- Adding more tests for `mobile_app`.

- Implementing those features available on the web app but not the mobile app.

- I am planning to introduce new `State management` (like Bloc, Riverpod, etc..) to the mobile app. Currently, it is `MVVM + Provider`, but still, at some places, setState is used.



## Experience

---

Honestly, my experience has been great working with CircuitVerse. I got to learn a new language, `ruby`, building modern APIs in `rails` & best software practices. I've had a great & productive summers, thanks to my mentors [@manjotsidhu](https://github.com/manjotsidhu), [@tachyons](https://github.com/tachyons)& the amazing CircuitVerse community.

I would definitely keep working on my project post GSoC & getting people contributing to the project. Hope to see this project the next summers & help other people get started.

Signing Off..
