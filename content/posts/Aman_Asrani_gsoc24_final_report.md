---
title: "Enhancing CircuitVerse User Experience | GSOC2024 | Final Report"
date: 2024-07-12T02:00:03+05:30
draft: false
author: "Aman Asrani"
type: post
---

![GSOC2024_Phase_1](/images/Aman_Asrani/final_report_gsoc2024/banner.jpg)

Hii Everyone,

Welcome to this blog, dedicated to summarizing the achievements of the  Google Summer of Code 2024 for the project **Enhancing CircuitVerse User Experiance**

Let's Dive in...

### About the Project 🖥

> **[_Enhancing CircuitVerse User Experiance_](https://summerofcode.withgoogle.com/programs/2024/projects/h3QKa7eD)
> The "Enhancing CircuitVerse User Experience" project is all about making CircuitVerse.org more engaging and user-friendly for everyone who loves digital circuits by introducing many features such improving SSO integration, single sign-on (SSO) integration, plus email verification for extra security, transitioning to view components  which  help creating  a smoother and safer user experience and having better code readability and usabilty, weekly Contest, Logs Maintenance, CircuitVerse Language Support**

### Project goals
---
So far, we have covered and implemented the following features:

- SAML Based SSO
- Email Verification During Registration for New Users 
- Send Email Verification button
- Migration to View Components
- Logs Maintenance
- Updation of Weekly Contest feature
- UI Improvements
- CircuitVerse Language Support

---

### SAML based SSO

Single sign-on (SSO) is an identification method that enables users to log in to multiple applications and websites with one set of credentials. SSO streamlines the authentication process for users.SAML (Security Assertion Markup Language) is a markup language designed for exchanging authentication information between the user, the identity provider, and the service provider.

We initially encountered a number of problems, some of which were due to gem devise-saml-authenticable and gem ruby-saml versioning compatibility. Finally, we were able to redirect to the Identity Provider(IDP) login page and obtain the SAML answer after addressing these issues. However, we then ran into a problem while trying to sign the user, which took too much time. During a meeting with Tanmoy, we discovered that the create method in the saml_sessions_controller was being overridden by the create method from the devise_saml_authenticable gem. Finally, SAML-based SSO worked smoothly.

We also added detailed documentation on how to configure CircuitVerse with SAML using both Okta and Keycloak. You can Preview the Documentation [Click Here!](https://docs.circuitverse.org/#/chapter2/5ssointegration)

**Checkout the Below Video**
{{< video src="/images/Aman_Asrani/sso.mp4" type="video/mp4" preload="auto" >}}

##### Pull Requests

- PR : [SAML Based SSO](https://github.com/CircuitVerse/CircuitVerse/pull/4989)
- PR : [Documentation](https://github.com/CircuitVerse/CircuitVerseDocs/pull/380)

---

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

---

### Migration to View Components

As part of this project, one of primary tasks has been to migrate several components to use ViewComponent. This migration is aimed at improving the maintainability, readability, and reusability of our codebase. By encapsulating UI logic within ViewComponents, we can ensure a cleaner separation of concerns, making the code easier to test and update in the future. Below is a summary of the PRs  for this migration effort:

#### Migrate feature card to view component:
Created FeatureCardComponent to handle the feature card logic. Added tests and previews with detailed annotations and parameters.
![Featur_card_view_component](/images/Aman_Asrani/featurecardcomponent.png)

##### Pull Requests
- PR : [Migrate feature card to view component](https://github.com/CircuitVerse/CircuitVerse/pull/5002)


#### Migrate-CircuitCard-to-view-component:
Created `CircuitCardComponent` to encapsulate the rendering logic for circuit cards. This also Improves the code readability and maintainability. Handled edge cases such as non-existent or nil project names in parameters. Added comprehensive tests and previews with annotations.

**Checkout the Below Video which shows Previews of `CircuitCard` with Annonations. Also we made `CircuitCard` more generous so now we need not of seprate `featureExampleCard` component**
{{< video src="/images/Aman_Asrani/previewFeaturedExampleCardAndCircuitCard.mp4" type="video/mp4" preload="auto" >}}

![CircuitCard_view_component](/images/Aman_Asrani/CircuitCardViewComponent.png)
![CircuitCard_view_component](/images/Aman_Asrani/CircuitCardViewComponentReuse.png)

##### Pull Requests
- PR : [Migrate-CircuitCard-to-view-component](https://github.com/CircuitVerse/CircuitVerse/pull/5010)


#### Migrate footer partial into a view component:
Added Small Small Components for better readability and maintanibility. Also added the Preview for the `FooterComponent`
- Moved the footer links rendering into `FooterLinksComponent`
- Moved the social links rendering into `SocialLinksComponent`
- Integrated both components into the main `FooterComponent`
- Moved the footer rendering logic from the partial into `FooterComponent`

![Migrate footer partial into a view component](/images/Aman_Asrani/footerViewComponent.png)
![Migrate footer partial into a view component](/images/Aman_Asrani/final_report_gsoc2024/footer_Preview.png)

##### Pull Requests
- PR : [Migrate footer partial into a view component](https://github.com/CircuitVerse/CircuitVerse/pull/5011)

#### Migrate-SocialCard-to-view-component:
The component includes logic for image preview, title, and URL generation. Also added tests and previews with notes and parameters to demonstrate usage.
![Migrate-SocialCard-to-view-component](/images/Aman_Asrani/SocialCardViewComponent.png)
![Migrate-SocialCard-to-view-component](/images/Aman_Asrani/SocialCardViewComponentReuse.png)


##### Pull Requests
- PR : [Migrate-SocialCard-to-view-component](https://github.com/CircuitVerse/CircuitVerse/pull/5012)

### Logs Maintenance

Initially, We had considered setting up a Git Hook. However, this approach requires storing the logs in our database, which is expensive.
Instead, I've found that we can leverage the GitHub API to fetch the logs, similar to how we currently retrieve contributor information (see attached image).

![Logs Maintenance](/images/Aman_Asrani/Logs_maintanance.png)

**Demonstration of Logs Maintenance**
{{< video src="/images/Aman_Asrani/final_report_gsoc2024/logs_maintanance.mp4" type="video/mp4" preload="auto" >}}

##### Pull Requests
- PR : [Logs Maintenance](https://github.com/CircuitVerse/CircuitVerse/pull/5021)

---

### Weekly Contest

One of the most interesting tasks I've taken on is updating the Weekly Contest feature, which was originally created by Vedant Jain two years ago. With so many changes to the master branch since then, including new coding styles, my first step was to bring the old pull request up to date. Instead of just merging the changes, I chose to go through each of Vedant's commits, rewriting the code myself and making adjustments to fit the current codebase. It was a challenging but rewarding experience, and I learned a lot more about Ruby on Rails, though it took much longer than I expected.

Let's see this feature in deeply


##### More

- Contest duration: 1 month(for now).
- Admin can update the deadline of the Contest 
- Maximum Winners: 1 per contests(for now).
- Concurrent Contest not allowed.
- Maximum votes per user: 3.
- No limit to the circuit submission(for now).
- Duplicate circuits not allowed.
- User can vote the submission one and the action is not reversible.
- **Users can:**
  - Submit their circuit.
  - Withdraw there submission from contest(action is not reversible).
  - Vote other submission(maximum 3 per contest).
- **Admin can:**
  - Update the deadline for the contest
  - Start new contest(other contest must have status: "completed").
  - Close the live contest(manually).
- Contest can be closed manually(admin) and automatically(active jobs scheduler).
- Users will get notified for each new contests.

##### Pull Requests
- PR : [Updating Weekly Contests](https://github.com/CircuitVerse/CircuitVerse/pull/5021)


> The feature is under testing phase.

##### A glimpse of the Contest Feature, which was originally conceived by my mentor Vedant Jain

- **All Contest Page**

  Route: `/contests`
  {{< video src="/images/Aman_Asrani/final_report_gsoc2024/conest1.mp4" type="video/mp4" preload="auto" >}}

- **Contest Page**

  Route: `/contests/:contest_id`
  ![contest_page](/images/vedant_gsoc22/final_phase/contest_page.gif)

- **Project Submission**

  Route: `/contests/:contest_id/new`
  ![project_submission](/images/vedant_gsoc22/final_phase/project_submission.gif)

- **Withdraw Submission**

  ![withdraw_submission](/images/vedant_gsoc22/final_phase/withdraw_submission.gif)

- **Vote Submission**

  ![vote_submission](/images/vedant_gsoc22/final_phase/vote_submission.gif)
- **Update Deadline**
   {{< video src="/images/Aman_Asrani/final_report_gsoc2024/edit_deadline.mp4" type="video/mp4" preload="auto" >}}

- **Completed Contest & Winners**

  ![completed_contest](/images/vedant_gsoc22/final_phase/completed_contest.gif)

- **Winner and Contest Notifications**
   ![Contest and Winner Notifications](/images/Aman_Asrani/final_report_gsoc2024/winner_notification.png)

--- 

### UI Improvements

For the UI Improvements many thing need to be done such as 

- Removal of "Recent Circuits on Landing Page"
- Introduction of a Dedicated Testimonials Section
- Inclusion of Tech Conference Talks, Open Source Participations, and Organisation Acievements
- Simplification of Search Page
- Improve other UI bugs if needed

Completed:
- Removed footer margin and padding bugs 
 : [Pull Request](https://github.com/CircuitVerse/CircuitVerse/pull/5052)
- Removed "Recent Circuits" section from the landing page
: [Pull Request](https://github.com/CircuitVerse/CircuitVerse/pull/5052)

For the other task Figma Design part from my side has been Completed but yet need a final review for mentors

Here is the Figma Design Mockup :[Click Here](https://www.figma.com/design/i2Ul2N65mPqyATQb0KWWMF/Enhancing-CircuitVerse-User-Experiance?node-id=52-986&t=zy1s2ZytXIzZaaMA-1)

--- 

### CircuitVerse Language Support

Currently, CircuitVerse use rails-i18n gem which is shipped with Ruby on Rails by default. It is an easy to use and extensible framework for translating Rails platform into multiple languages. Till Now, CircuitVerse Platform can be only Translated in English(default), Hindi, Bengali, and Marathi.

So there is a need of adding more translations and a method in which users,who are unfamiliar with Git and Coding can contribute CircuitVerse’s Language support.This integration will enhance language support capabilities for CircuitVerse.

So Currently, We have setup the Crowdin by:
 - Created a new project for CircuitVerse in Crowdin
 - Configured English as the source language
 - Added Hindi, Bengali, and Marathi as target languages (We can easily add new language through Crowdin Interface by Admins Approval)

 {{< video src="/images/Aman_Asrani/final_report_gsoc2024/crowdin1.mp4" type="video/mp4" preload="auto" >}}

Configured GitHub integration:

- Connected CircuitVerse GitHub repository to Crowdin
- Set up file mapping for source and translated files

 {{< video src="/images/Aman_Asrani/final_report_gsoc2024/crowdin2.mp4" type="video/mp4" preload="auto" >}}

Created Crowdin configuration file (crowdin.yml):

- Defined source files path: ```/config/locales/**/en.yml```
- Specified translated files path: ```/config/locales/**/%two_letters_code%.yml```
- Configured language mapping for `hi`, `bn`, and `mr`

Implemented GitHub Actions workflow:

- Created .github/workflows/crowdin.yml
- Set up automated synchronization between GitHub and Crowdin
- Configured actions for uploading sources, downloading translations, and creating pull requests


> Currently task is work in Progress

Pull Request: [CircuitVerse Language Support](https://github.com/CircuitVerse/CircuitVerse/pull/5058)

##### Tasks Pending
---
- Improve the Github Action Flow, Current Flow have some issues. 
- Enalabe this intergration with CircuitVerse current Interface

### Blog posts written

---
- [Community Bonding Period at CircuitVerse — Google Summer of Code 2024](https://medium.com/@amanasrani1712/community-bonding-period-at-circuitverse-google-summer-of-code-2024-39897faba846)
- [GSoC 2024 CircuitVerse | Week 1 Report](https://medium.com/@amanasrani1712/gsoc-24-circuitverse-week-1-report-029d0cc32487)
- [GSoC 2024 CircuitVerse | Week 2 Report](https://medium.com/@amanasrani1712/gsoc-2024-circuitverse-week-2-report-saml-based-sso-integration-54365268bc0c)
- [GSoC 2024 CircuitVerse | Week 3 and Week 4 Report](https://medium.com/@amanasrani1712/its-been-almost-a-month-in-gsoc-and-i-ve-learned-a-lot-while-facing-many-challenges-50af503abf1f)
- [GSoC 2024 CircuitVerse | Week 5 and 6 Report](https://medium.com/@amanasrani1712/during-these-two-weeks-i-have-worked-on-e94c0db2ba1b)
- [GSoC 2024 CircuitVerse | Week 7 and 8 Report](https://medium.com/@amanasrani1712/week-7-and-week-8-progress-report-8a26ee2603e1)
- [GSoC 2024 CircuitVerse | Week 9 and 10 Report](https://medium.com/@amanasrani1712/in-the-past-two-weeks-i-had-several-of-my-pull-requests-successfully-merged-and-i-cant-even-cfe8b2ae8c38)
- [GSoC 2024 CircuitVerse | Week 11 and 12 Report](https://medium.com/@amanasrani1712/so-what-i-have-done-in-these-two-weeks-e8631d77b9e1)

## Experience

- Mentor: Vedant Jain, Smriti Garg, Hiran Venugopalan, Arnab Das
- Contributor: Aman Asrani

>I have experienced my best productive, learning phase of my life in GSoC with CircuitVerse. Really my mentors and Org Admins are Amazing and supportive. I am so grateful  to be the part of CircuitVerse. Thank you for your support us in each phase of my contribution journey. I really learned many things along this journey. Special thanks to Aboobacker to help me out in each of my difficulties. It is really inspiring how you manage your job as senior backend Engineer at Gitlab and managing almost every project. I am sorry when I ask something again and again when having a doubt but you always make understand us in detail with so much of patience. I am honored to being the part of the CircuitVerse. I would also like to express my gratitude to Tanmoy Bhaiya, who, although not a mentor on this project, was always there to offer assistance. Finally, thank you to Smriti Garg, Vedant Jain, Arnab Das and  Hiran Venugopalan for giving me this incredible opportunity. I am truly thankful for the experience.


Thanks for reading!!!