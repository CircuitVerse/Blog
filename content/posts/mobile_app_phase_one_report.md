---
title: "Mobile App: Phase One Report"
date: 2020-07-09T08:51:49+05:30
draft: false
---

The first evaluations happened from June 29th to July 3rd and Yay.. I Passed!!! This blog post comes as a summary to the amazing work done in the first phase of Google Summer of Code.

<p align="center">
	<img src="/img/first_eval_dashboard.png">
</p>

The mobile_app project was primarily focussed on two sub projects as follows:

1. CircuitVerse API development.
2. The Mobile App.

## Overview

Before the GSoC period CircuitVerse was primarily focussed for the Web. We have this very amazing [simulator](http://circuitverse.org/simulator), ability to create groups, beautiful circuits, assignments with grading obviously <3 and a lot more features. make sure to check them out on our [website](https://circuitverse.org/). Thanks to our amazing community, [@satu0king](https://github.com/satu0king), [@tachyons](http://github.com/tachyons/) & [@nitin10s](https://github.com/nitin10s).

CircuitVerse now plans to expand.. GSoC 2020 basically aims at improving the Simulator and Web UI, structuring & refactoring the huge JS codebase, offline electron app, the mobile_app and implementing API.

<br/>

## The CircuitVerse API

### Authentication & Users API

For authenticating users, token auth is being used to `encode` user data and return the token for successful login/signup. The `private_key.pem` can also be fetched in `/private_key.pem` which could be used to `decode` the token to fetch user info on client side. Also added `/password/forgot` to send reset password instructions. Coming onto users, all users public info is made available at `/users` & logged in user at `/me`.

Related PRs: [#1431](https://github.com/CircuitVerse/CircuitVerse/pull/1431)(Merged), [#1510](https://github.com/CircuitVerse/CircuitVerse/pull/1510)(Under Review).

### Projects API

I have added endpoints to fetch public/accessible projects @ `/projects`, user projects @ `/users/:id/projects`, favourites/starred projects @ `/projects/favourites`, featured projects @ `/projects/featured`. Specific project can also be starred/unstarred @ `/projects/:id/toggle-star`, fork @ `/projects/:id/fork`.

Related PRs : [#1441](https://github.com/CircuitVerse/CircuitVerse/pull/1441), [#1490](https://github.com/CircuitVerse/CircuitVerse/pull/1490), [#1499](https://github.com/CircuitVerse/CircuitVerse/pull/1499) (All Merged)

### Collaborators API

CircuitVerse also supports adding collaborators to your projects so does the API @ `/projects/:project_id/collaborators`. Deleting a collaborator would require DELETE request to `/projects/:project_id/collaborators/:id`

Related PR : [#1473](https://github.com/CircuitVerse/CircuitVerse/pull/1473)(Merged)

### Groups, Assignments & Group Members API

CircuitVerse API supports fetching groups you mentor or you are member of @ `/groups` & `/groups/mentored` respectively. Mentor can also add group members using email in `/groups/:group_id/members`. Support to add/delete assignments had also been incorporated. Specific assignment can be `reopened` or `start` @ `/assignments/:id/reopen` & `/assignments/:id/start`.

Related PR : [#1462](https://github.com/CircuitVerse/CircuitVerse/pull/1462)(Under Review)

### Grading API

Circuits related to assignments can be graded & are uniquely identified using `assignment_id` & `project_id`. Uniqueness check for multiple grades with same identifiers was also added.

Related PR : [#1482](https://github.com/CircuitVerse/CircuitVerse/pull/1482)(Merged)

### API Specs/Tests

A total of 164 specs/examples were added in view of the CircuitVerse API. The codeclimate coverage marked an increase of about 5%. Yay!

<p align="center">
	<img src="/img/api_test_suite.png">
</p>

### API Documentation

The complete API documentation has also been added using [slate](https://github.com/slatedocs/slate/). PR [#1512](https://github.com/CircuitVerse/CircuitVerse/pull/1512) is under review, the next step being adding continuous deployment for the documentation.

> No rubocop recommendations were harmed during API development xD

<br/>

## CV Mobile App

Since I started early, i had some time devoted to the mobile app too. Hence had significant progress in the same context :)

### Architecture & Initial Setup

I plan to use MVVM architecture for CV Mobile App. [Provider](https://github.com/rrousselGit/provider) for State Management & [get_it](https://github.com/fluttercommunity/get_it) for `dependency_injection` makes up an awesome pair for me :) I had previously talked about the file structure and the app architecture in detail in the first half of this [blog post](https://nitish145.github.io/blog/journal/week-1-report.html).

Related PR : [#1](https://github.com/CircuitVerse/mobile-app/pull/1)

### Static Views

The first step was adding the static views i.e which generally don't require viewmodel bindings. The `home_view`, `teachers_view`, `about_view`, `contribute_view` falls under this category.

<p align="center" >
    <img src="/img/home_view.gif" title="Home View" width="150px" >
    <img src="/img/teachers_view.gif" title="Teachers View" width="150px" >
    <img src="/img/about_view.gif" title="About View" width="150px" >
    <img src="/img/contribute_view.gif" title="Contribute View" width="150px" >
</p>

### Authentication Views

I have added `login_view` & `signup_view` with appropriate `viewmodel` bindings set up. Forgot password API has also been implemented..

<p align="center" >
    <img src="/img/signup_view.gif" title="Signup View" width="150px" >
    <img src="/img/login_view.gif" title="Login View" width="150px" >
</p>

### Group's Views

The CV Mobile App can show you the groups you mentor or belongs to in `my_groups_view`, related members and assignments in `group_details_view`. Adding/Deleting groups members are also click of a button away :)

<p align="center" >
    <img src="/img/my_groups_view.gif" title="My Groups View" width="160px" >
    <img src="/img/group_details_view.gif" title="Group Details View" width="160px" >
    <img src="/img/group_update.gif" title="Update Group" width="160px" >
    <img src="/img/add_group_member.gif" title="Add Group Member" width="160px" >
    <img src="/img/delete_group_member.gif" title="Delete Group Member" width="160px" >
</p>

### Assignment Views

Adding, Updating & deleting Assignments were also implemented during the first phase..

<p align="center" >
    <img src="/img/add_assignment.gif" title="Add Assignment" width="150px" >
    <img src="/img/update_assignment.gif" title="Update Assignment" width="150px" >
    <img src="/img/delete_assignment.gif" title="Delete Assignment" width="150px" >
</p>

## Contributions

By end of phase one, 10 in all [PRs](https://github.com/CircuitVerse/CircuitVerse/pulls/Nitish145), 7 have been merged, 3 are under constructive review. Contributed about 3500 lines of code in a total of 20 commits. Thanks CircuitVerse.

<p align="center">
	<img src="/img/contributions_phase_one_mobile_app.png" width="300px">
</p>

## Next Steps

In the second phase, primarily i plan to implement the remaining sections, view & viewmodel bindings with some improvements to the existing codebase, FCM notifications etc.. Also, I would be now actively putting up PRs for different feature requests in the [mobile_app](https://github.com/CircuitVerse/mobile-app). If everything works out well, the MVP for CV Mobile App shall be expected by the end of second phase.. <3

## Experience

I feel myself fortunate enough to be working with the amazing CircuitVerse community with my mentors always helping me out if i gets stuck anytime.. The Journey till now has been amazing, i couldn't have asked for more.. I gained a lot of insights in backend development with Ruby on Rails & best practices in general.. Looking forward for the exciting phase two..

Cheers!!
