---
title: "Mobile App: Final Report"
date: 2020-08-25T08:51:49+05:30
draft: false
author: Nitish Aggarwal
type: post
url: "/posts/gsoc_2020_mobile_app_report"
---

![CircuitVerse](/img/cv_cover.png)
![GSoC](/img/gsoc_cover.png)

GSoC 2020 is nearing its end. I’m glad to say that I’ve met all the goals as planned in the beginning. You can find out about it in my previous blog posts [here](https://nitish145.github.io/blog).

This post is going to be a brief report of all the feature requests implemented, goals accomplished, some stuff that’s left to do and future plans.

## Project Overview

CircuitVerse is well established as a free educational platform which provides an easy to use online digital circuit simulator & is dedicated to aid students to self learn digital-logic design. For more information visit us [here](http://circuitverse.org/). The day organisations list were announced and the `mobile_app` was a project in the ideas list, i knew this was my chance.

My Project Proposal basically had two parts:

- CircuitVerse API (`ruby on rails`)
- CV Mobile App (`flutter`)

A `mobile_app` was much required to let people actually know about the amazing platform our community has been building with unparalleled support from the project mentors & the whole community.

Github Link to Mobile App : https://github.com/CircuitVerse/mobile-app/

CircuitVerse uses `ruby on rails` & `postgresql` as its tech stack. Hence, the API also needs to be built on `ruby on rails`. I had no prior exposure to `ruby` before and this has been one of my greatest learnings from GSoC 2020.

The last phase of GSoC was the most challenging since i spent most of the time writing tests and having no prior flutter testing experience had me research a lot, read a lot of blogs and stuff. I gained a lot out of writing tests & i truly loved the experience.

## CircuitVerse API

Developed REST API in ruby on rails framework using jsonapi & modern API specs including associations on demand, queries, sorting, filtering etc.

The following API were implemented:

1. Add Authentication and Users API [PR#1431](https://github.com/CircuitVerse/CircuitVerse/pull/1431)

2. Add Projects API including CRUD, starring, forking projects [PR#1441](https://github.com/CircuitVerse/CircuitVerse/pull/1441) | [PR#1490](https://github.com/CircuitVerse/CircuitVerse/pull/1490) | [PR#1529](https://github.com/CircuitVerse/CircuitVerse/pull/1529) | [PR#1581](https://github.com/CircuitVerse/CircuitVerse/pull/1581)

3. Add Favourite Projects API [PR#1499](https://github.com/CircuitVerse/CircuitVerse/pull/1499)

4. Add Groups, Group Members & Assignments API endpoints including but not limited to CRUD for Groups & Assignments, adding/deleting group members, reopening, starting assignment [PR#1462](https://github.com/CircuitVerse/CircuitVerse/pull/1462)

5. Add Project Collaborators API [PR#1473](https://github.com/CircuitVerse/CircuitVerse/pull/1473)

6. Add Grading API [PR#1482](https://github.com/CircuitVerse/CircuitVerse/pull/1482)

7. OAuth API & Services [PR#1510](https://github.com/CircuitVerse/CircuitVerse/pull/1510)

8. Project's Comments [PR#1590](https://github.com/CircuitVerse/CircuitVerse/pull/1590)

9. Firebase Cloud Messaging Notifications [PR#1598](https://github.com/CircuitVerse/CircuitVerse/pull/1598)

### Documentation

The Circuitverse API was being documented with every single PR fired and is built using [slate](https://github.com/slatedocs/slate/). [PR#1512](https://github.com/CircuitVerse/CircuitVerse/pull/1512)

### Specs

For each of the above mentioned featured requests / minor changes, a total of 223 requests specs in addition to about 20 other specs for corresponding models/controllers & other changes were also added. The tests coverage increased about 7%.

## CircuitVerse Mobile App

The Circuitverse Mobile was developed using [flutter](http://flutter.dev/) as a cross-platform app for both Android & iOS. Since this was a ground up project, quite a time was spent researching about the various options.

The following features were implemented :

1. Architectural setup using [provider](https://pub.dev/packages/provider)(for `state management`) & [get_it](https://pub.dev/packages/get_it)(for `dependency injection`) with github actions setup [PR#1](https://github.com/CircuitVerse/mobile-app/pull/1)

2. Add Static Views including `HomeView` [PR#2](https://github.com/CircuitVerse/mobile-app/pull/2), `AboutView` [PR#5](https://github.com/CircuitVerse/mobile-app/pull/5), `TeachersView` [PR#6](https://github.com/CircuitVerse/mobile-app/pull/6) & `ContributorsView` [PR#7](https://github.com/CircuitVerse/mobile-app/pull/7)

3. Add Users & Authentication views, viewmodels & related services [PR#8](https://github.com/CircuitVerse/mobile-app/pull/8)

4. Add Groups & Assignments views, viewmodels & related services [PR#10](https://github.com/CircuitVerse/mobile-app/pull/10)

5. Add Projects & Profile views, viewmodels & related services [PR#11](https://github.com/CircuitVerse/mobile-app/pull/11)

6. Prepare for release, removing exposed secrets, vulnerabilities & Add configurability for OAuth [PR#12](https://github.com/CircuitVerse/mobile-app/pull/12)

### Tests

A complete testing suite for the `mobile_app` including `model_tests`, `utils_tests`, `service_tests` & `viewmodel_tests` to get hold of all the logic, parsing & stuff was also added & a total of 200 tests were written that added to a coverage of 51.166%.

## Takeaways

- **Dynamic Datetimes in Testing** : Never use dynamic dateTimes/offsets in testing/specs, several hours got me debugging for a failing test in github actions & passing on my setup due to `DateTime.timeZoneOffset` difference.

- **RoadMap before implementation** : Utilize the community bonding period for preparing the implementation your project, this way i got hold of most of the API endpoints by end of phase one.

- **Digging through the Source Code** : When implementing comments, digging through the commontator source code proved to be very helpful to implement comments & threads controller's logic.

- **Pure Business Logic in Viewmodels** : When i started writing tests for viewmodels i quickly realized using Snackbars, dialogs in viewmodels is UI interaction & hence requires `MaterialApp` to be initialized for testing purposes which defeats the purpose of separation of logics into `viewmodels`, `services` & `views`.

## Future Developments

- Add localization texts/phrases getters & linking to `.arb` files. Localization has been setup with `AppLocalization` & `AppLocalizationDelegate` in place but referencing to the messages in `lib/locale/locales.dart` still needs to be done.

- Adding responsiveness to the UI views for all types of screens & orientations be it mobile, tablet or other devices.

- Adding UI tests for `mobile_app`, user interaction using mocked `viewmodels`. UI views holds a big chunk of code hence the coverage being on the lower side.

- Currently for data parsing separate model entities with generic `fromJson` factory methods are used. Use of the [json_api](https://pub.dev/packages/json_api) package to exploit the true power of `jsonapi specs` is recommended.

- Improve `WYSIWYG` editors to remove irrelevant options like camera, video in context to CircuitVerse.

- UI/UX revamp to suit the needs of the app further more effectively.

## Experience

Truly, my experience has been great working with CircuitVerse. Got to learn a new language `ruby`, building modern APIs in `rails`, a lot of amazing `gems` & best software practices in general. I've had a great & productive summers, thanks to my mentors [@tachyons](https://github.com/tachyons), [@nitin](https://github.com/nitin10s) & the amazing CircuitVerse community.

I would definitely keep working on my project post GSoC & getting people contributing to the project. Hope to see this project the next summers & help other people get started.

Signing Off..
