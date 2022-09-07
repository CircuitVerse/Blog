---
title: "Mobile App Improvement | GSoC@2022 | Phase-1 Report"
date: 2022-07-25T23:23:48+05:30
author: Aman
type: post
---

![First Evaluation Cover](/images/aman-GSoC2022/phase_1_cover.png)

This blog post covers my journey with **Google Summer of Code 2022** at CircuitVerse till **Mid Evaluation**. This Phase starts from **13th June** and ends on **29th July**.

## Project Description
CircuitVerse is dedicated to aid students to self learn digital-logic design.

My project aimed to embed the simulator along with some improvements to the existing features in the mobile app. I have also worked on tasks other than the proposed tasks in this phase.


## Milestones Achieved

---

### I. Search Circuits
This feature enabled the user to search for particular circuit designs based on the title, tags, or author from a pool of large circuits available on the platform. I created an API to implement this feature. This was the first time I was introduced to Ruby on Rails, as I had never worked on this framework.

Here are the related **PRs**:
- [Search Circuit Frontend](https://github.com/CircuitVerse/mobile-app/pull/225)
- [Search Circuit API](https://github.com/CircuitVerse/CircuitVerse/pull/3201)

![Search Circuit Preview](/images/aman-GSoC2022/search_circuit.webp)

### II. Profile Picture Integration
Update profile picture feature was not available on the mobile app. I modified the existing Profile API to support the addition/removal of the profile picture. I also worked on the user interface of this feature.

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
Earlier, the one who created the group used to be the mentor and owner of that group. Now, the owner can also invite other mentors to his group or promote any member to be a mentor in that group.
I implemented the multiple mentor feature in the mobile app.

Here are the related **PR**:
- [feat: implement multiple mentor support in groups](https://github.com/CircuitVerse/mobile-app/pull/232)

![Mutiple Mentor Preview](/images/aman-GSoC2022/multiple_mentor.webp)


### V. Simulator Embedding
Simulator embedding was the most requested feature for the mobile app. I discussed this with the mentor and concluded that the optimal implementation would be using **WebView**. The basic implementation is done, but some bugs are still to be fixed, and a few improvements to smoothen the user experience.

Here are the related **PR**:
- [feat: embed simulator in the app](https://github.com/CircuitVerse/mobile-app/pull/235)

## Next Steps

---

In the next phase, I primarily plan to
- resolve minor improvements in the simulator
- integrate notification
- internationalization of the mobile app.

## Learning

---

- I have learned more about Ruby on Rails, Test Driven Development(TDD) and Flutter/Dart
- I have got to know more about **Markdown** rendering in flutter app.
- Gaining knowlege of writing proper commit messages and all the good practices of Open Source.

## Conclusion

---

I feel myself fortunate enough to be working with the amazing CircuitVerse community with my mentors always helping me out if i gets stuck anytime.. The Journey till now has been amazing, i couldn’t have asked for more..
Cheers!!