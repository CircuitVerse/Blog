---
title: "Mobile App: Phase Two Report"
date: 2020-08-06T08:51:49+05:30
draft: false
author: Nitish Aggarwal
type: post
---

The second evaluations happened from July 27th to July 31st, I Passed!!! This blog post comes as a summary to the work done in the second phase of Google Summer of Code.

![Second Evaluations Passed](/img/second_eval_dashboard.png)

## API Enhancements

This phase i worked on improving the APIs, with projects & authentication enhancements catching the limelight.

### Projects Enhancements

Collaborators for Projects were added in `include` options while fetching `projects`. An attribute `is_starred` was also added signifying the starred status for the authorized user.

Also added `user_favourites` in `/api/v1/users/:id/favourites`. Now, the User Projects & Featured Projects are available without authentication but still the "Non-Public" projects could only be fetched if authenticated.

Related PRs: [#1529](https://github.com/CircuitVerse/CircuitVerse/pull/1529)(Merged), [#1581](https://github.com/CircuitVerse/CircuitVerse/pull/1581)(Under Review).

### Authentication Enhancements

One change introduced by [@tachyons](https://github.com/tachyons) was the use of warden authentication for API requests which is the underlying auth model for devise.

Related commit: [faea536](https://github.com/CircuitVerse/CircuitVerse/commit/faea53637ed922aaab8fce39675313924b71b8b8)

### API Specs/Tests

A total of 223 requests specs/examples were added in view of the CircuitVerse API. Specs for model's changes were also added.

![API Test Suite](/img/api_test_phase_two.png)

### API Documentation

The API documentation was also updated in view of the changes made during this phase. API Docs to a public URL yet needs to be hosted & will be done at the end of final phase.

Related PR: [#1512](https://github.com/CircuitVerse/CircuitVerse/pull/1512)(Under Review)

## Mobile App MVP

This phase marked the completion of MVP for the `mobile_app`. The following major changes were made:

### OAuth

CircuitVerse Mobile supports google, facebook & github oauth. The Google OAuth was implemented using [google_sign_in](https://pub.dev/packages/google_sign_in) & the app was signed using Java KeyStore(`key.jks`). Facebook OAuth was implemented using [flutter_facebook_login](https://pub.dev/packages/flutter_facebook_login) with SDK setup for both Android & iOS. Github OAuth used [oauth2_client](https://pub.dev/packages/oauth2_client) to interact with Github's OAuth servers.

![OAuth Options](/img/oauth_options.jpg)

### Assignment Details

Worked on Assignment details screen that also features creating/editing/deleting grade for all the submissions for a particular assignment before the deadline.

![Assignment Details](/img/assignment_details.jpg)

### Project Views

Also Worked on User Projects & Favourites views & viewmodel bindings. Handling state in viewmodels is what i learned here, since all of the business logic is handled in the viewmodels passing variables back and forth just for project options like `star_count` & `view_count` should never be an option. Also, helps to establish a better testing suite & is independent of the views.

![Project Details](/img/project_details.jpg)
![Delete Collaborator](/img/delete_collaborator.jpg)

### Profile Views

The Profile View now also features the projects you created & the ones you starred under `Circuits` & `Favourites` respectively.

![Profile View](/img/profile_view.jpg)

### UI Changes

Some minor UI/UX changes include :

- Improving the designs for `cv_text_field`, a generic widget that acts as base for all the text fields used in `cv_mobile`.
- Some Typographical changes following material guidelines.
- Adding consistent colors/font-sizes etc across the web & the mobile.

## Next Steps

In the final phase, i plan to create a complete test suite for the `mobile_app` including `viewmodel_tests`, `service_tests`, `model_tests` & `ui_tests`. Will also setup constructive feedback loops with my mentors for any UI/UX changes or some feature requests for the [mobile_app](https://github.com/CircuitVerse/mobile-app). Excited for the final phase..

Cheers!!
