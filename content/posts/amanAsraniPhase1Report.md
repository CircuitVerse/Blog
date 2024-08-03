---
title: "Enhancing CircuitVerse User Experience | GSOC2024 | Phase 1 Report"
date: 2024-07-12T02:00:03+05:30
draft: false
author: "Aman Asrani"
type: post
---

![GSOC2024_Phase_1](/images/Aman_Asrani/Banner.jpg)

Hii Everyone,

Welcome to this blog, dedicated to summarizing the achievements of the first phase of Google Summer of Code 2024 for the project **Enhancing CircuitVerse User Experiance**

### About the Project 🖥

> **[_Enhancing CircuitVerse User Experiance_](https://summerofcode.withgoogle.com/programs/2024/projects/h3QKa7eD)
> The "Enhancing CircuitVerse User Experience" project is all about making CircuitVerse.org more engaging and user-friendly for everyone who loves digital circuits by introducing many features such improving SSO integration,better learning management system (LMS) and single sign-on (SSO) integration, plus email verification for extra security, Logs Mtransitioning to more efficient UI components will help create a smoother and safer user experience,Weekly Contest, Logs Maintenance, UI-Based Language Contribution**

So far, we have covered and implemented the following features in the first phase of the project:

- SAML Based SSO
- Email Verification During Registration for New Users 
- Send Email Verification button
- POC for Email Verification for Pre-Existing Users
- Migration to View Components
- Logs Maintenance

### SAML based SSO

Single sign-on (SSO) is an identification method that enables users to log in to multiple applications and websites with one set of credentials. SSO streamlines the authentication process for users.SAML (Security Assertion Markup Language) is a markup language designed for exchanging authentication information between the user, the identity provider, and the service provider.

We initially encountered a number of problems, some of which were due to gem devise-saml-authenticable and gem ruby-saml versioning compatibility. Finally, we were able to redirect to the OKTA login page and obtain the SAML answer after addressing these issues. However, we then ran into a problem while trying to sign the user, which took too much time. During a meeting with Tanmoy Bhaiya, we discovered that the create method in the saml_sessions_controller was being overridden by the create method from the devise_saml_authenticable gem. Finally, SAML-based SSO worked smoothly.

**Checkout the Below Video**
{{< video src="/images/Aman_Asrani/sso.mp4" type="video/mp4" preload="auto" >}}

##### Pull Requests
- PR : [SAML Based SSO](https://github.com/CircuitVerse/CircuitVerse/pull/4989)

### Email Verification at the time of User Registration

Currently, CircuitVerse doesn’t verify user's emails during registration, so we need to implement email verification at that time. Initially, we used Sendrik as the email service, but then  get to know that CircuitVerse already has access to AWS. So,  switched to using AWS SES (Simple Email Service) to send confirmation emails.

**How I Implemented? You can see the Flow below**
![Email Verification Flow](/images/Aman_Asrani/EmailVerifiationFlow.png)

**Checkout the below Video For better Understanding**
{{< video src="/images/Aman_Asrani/emailVerificationUsingDeviseConfirmable.mp4" type="video/mp4" preload="auto" >}}

##### Pull Requests
- PR : [Email Verification during during user registration](https://github.com/CircuitVerse/CircuitVerse/pull/4993)


### Resend Email Verification Functionality

There should be a button to resend emails in case there is a failure in sending the initial email. This failure could be due to issues with AWS or any other reason. To address this, We have added a button that allows users to resend the verification email. Fortunately, all the logic for handling this is already managed by the Devise gem, which is very convenient. This ensures that users can receive their confirmation emails without any hassle, even if there are technical difficulties. Below are the screenshots showing this new feature.

![Resend_Email](/images/Aman_Asrani/resendEmailButton.png)

![Resend_Email_Page](/images/Aman_Asrani/resendEmailPage.png)

##### Pull Requests
- PR : [Send Email Verification button](https://github.com/CircuitVerse/CircuitVerse/pull/4994)

### POC for Email Verification for Pre-Existing Users

One of the most crucial question for the task Email Verification at the time of User Registration is “ What to do with Pre-Existing Users?”. Earlier we thought to treat the Pre-Existing Users as verified but the problem with this approach is that existing users who added fake emails will get verified and also we couldn’t block them suddenly that they should verify their email first to continue. So, created the POC in the below video:
{{< video src="/images/Aman_Asrani/pocEmailVerificationForPreExistingUsers.mp4" type="video/mp4" preload="auto" >}}
However, we haven’t test this method yet because of having an unknown database error which still trying to resolve

### Migration to View Components

As part of this project, one of primary tasks has been to migrate several components to use ViewComponent. This migration is aimed at improving the maintainability, readability, and reusability of our codebase. By encapsulating UI logic within ViewComponents, we can ensure a cleaner separation of concerns, making the code easier to test and update in the future. Below is a summary of the PRs I have created for this migration effort:

#### Migrate Home page Buttons to a View Component:
Migrates the buttons on the home page to a dedicated ViewComponent.Included Test for button component, which is the beauty of view component that we can create test for the individual Componentand also added the Preview for the component
![HomePage_button_component](/images/Aman_Asrani/homepagebuttoncomponent.png)

##### Pull Requests
- PR : [Migrate Home page Buttons to a View Component](https://github.com/CircuitVerse/CircuitVerse/pull/4998)

#### Migrate feature card to view component:
Created FeatureCardComponent to handle the feature card logic. Added tests and previews with detailed annotations and parameters.
![Featur_card_view_component](/images/Aman_Asrani/featurecardcomponent.png)

##### Pull Requests
- PR : [Migrate feature card to view component](https://github.com/CircuitVerse/CircuitVerse/pull/5002)


#### Migrate-featureExampleCard-to-view-component:
The component includes logic for image preview, title, and URL generation. Also added tests and previews with notes and parameters to demonstrate usage.
![Featured_Example_Card_view_component](/images/Aman_Asrani/featuredExampleCard.png)
![Featured_Example_Card_view_component](/images/Aman_Asrani/featuredExamplecardReuse.png)

##### Pull Requests
- PR : [Migrate-featureExampleCard-to-view-component](https://github.com/CircuitVerse/CircuitVerse/pull/5003)

#### Migrate-CircuitCard-to-view-component:
Created `CircuitCardComponent` to encapsulate the rendering logic for circuit cards. Handled edge cases such as non-existent or nil project names in parameters. Added comprehensive tests and previews with annotations.

**Checkout the Below Video which shows Previews of `CircuitCard` and `FeaturedExampleCard` with Annonations**
{{< video src="/images/Aman_Asrani/previewFeaturedExampleCardAndCircuitCard.mp4" type="video/mp4" preload="auto" >}}

![CircuitCard_view_component](/images/Aman_Asrani/CircuitCardViewComponent.png)
![CircuitCard_view_component](/images/Aman_Asrani/CircuitCardViewComponentReuse.png)

##### Pull Requests
- PR : [Migrate-CircuitCard-to-view-component](https://github.com/CircuitVerse/CircuitVerse/pull/5010)


#### Migrate footer partial into a view component:
Added Small Small Components for better readability and maintanibility
- Moved the footer links rendering into `FooterLinksComponent`
- Moved the social links rendering into `SocialLinksComponent`
- Integrated both components into the main `FooterComponent`
- Moved the footer rendering logic from the partial into `FooterComponent`

![Migrate footer partial into a view component](/images/Aman_Asrani/footerViewComponent.png)

##### Pull Requests
- PR : [Migrate footer partial into a view component](https://github.com/CircuitVerse/CircuitVerse/pull/5011)

#### Migrate-SocialCard-to-view-component:
The component includes logic for image preview, title, and URL generation. Also added tests and previews with notes and parameters to demonstrate usage.
![Migrate-SocialCard-to-view-component](/images/Aman_Asrani/SocialCardViewComponent.png)
![Migrate-SocialCard-to-view-component](/images/Aman_Asrani/SocialCardViewComponentReuse.png)


##### Pull Requests
- PR : [Migrate-SocialCard-to-view-component](https://github.com/CircuitVerse/CircuitVerse/pull/5012)


### Logs Maintenance

Initially, We had considered setting up a Git Hook. However, this approach would likely requirestoring the logs in our database, which is an expensive task.
Instead, I've found that we can leverage the GitHub API to fetch the logs, similar to how we currently retrieve contributor information (see attached image).

![Logs Maintenance](/images/Aman_Asrani/Logs_maintanance.png)

> This is under progress and will complete in first week of Second Phase.



## Learning

---

- Understand many New Conceps of Ruby On Rails
- Learn about the SQL and PostgreSQL databases
- Gain experiance in AWS, particularly in using AWS-SES for email verification during user registration.
- Acquired comprehensive knowledge of Single Sign-On (SSO) concepts.
- Learned about View Components and their implementation.
- Expanded experience in writing tests for individual components.
- Improved debugging skills through extensive bug fixing.


## Conclusion

---

The journey has been truly amazing, filled with both challenges and growth. The community has been incredibly encouraging and motivating, providing a lot of freedom while being guided by our mentors. I have learned a great deal about how large projects are managed, and this experience has greatly boosted our confidence as developers.

I would like to thank,
[Aboobacker MK](https://github.com/tachyons), [Smriti Garg](https://github.com/smritigarg), [Tanmoy Sarkar](https://github.com/tanmoysrt), [Vedant Jain](https://github.com/vedant-jain03), [Arnab Das](https://github.com/Arnabdaz) for giving me chance for this incredible opportunity and guiding me throughout the project.