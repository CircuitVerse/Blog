---
title: "LMS Integration: Final Report (GSoC 2021- Ayan Biswas)"
date: 2021-08-08T16:19:04+05:30
draft: false
author: Ayan Biswas
type: post
---

![GSoC](/images/gsoc_cover.png)

This is the final blog report summarizing the work done for 📚 [LMS Integration](https://summerofcode.withgoogle.com/projects/#6282924346834944) project during Google Summer of Code 2021 🖥.

### [Get the Code](https://github.com/CircuitVerse/CircuitVerse/pull/2382)

Here is the more detailed Phase 1 Report :

[LMS Integration: Phase 1 Report (GSoC 2021- Ayan Biswas)](https://blog.circuitverse.org/posts/ayan_phase_1_report/)

### About LMS Integration Project

Currently CircuitVerse have a basic LMS within CircuitVerse to manage assignments. But with the increasing demand for a full-fledged LMS features, it is required to be integrated with publicly available popular LMSs like Moodle/Canvas etc. However individual LMS integration per case to case basis is not possible, so CircuitVerse is looking for a way to integrate with multiple LMSs in a single flow. See the [CircuitVerse Wiki](https://github.com/CircuitVerse/CircuitVerse/wiki/GSoC%2721-Project-List#project-4---lms-integration) and [Project Board](https://github.com/orgs/CircuitVerse/projects/4) for more details.

### Project Goals

The major goals of the project are listed below :

* Integrate CircuitVerse with the LMSs supported by [LTI (Learning Tools Interoperability)](https://www.imsglobal.org/activity/learning-tools-interoperability) protocol.
* Provide a simple and easy to use interface for the LMS users to integrate with CircuitVerse.
* Provide an automatic grade syncing facility between the LMS and CircuitVerse.

In the video below, I have demonstrated the integration of CircuitVerse with the [Moodle](https://moodle.org) LMS. Please watch the video to see the integration in action.

![GSoC Final Video](/images/ayan-biswas-GSoC2021/Ayan_LMS_Final_LTI.gif)

### Technical Specifications

Here is a diagrammatic representation of the LMS Integration Project:

![GSoC](/images/ayan-biswas-GSoC2021/Ayan_LMS_Final_project_flow.png)

The entire logic of incoming and outgoing requestes are handled by the [ims-lti](https://github.com/instructure/ims-lti) gem, which is a Ruby gem that implements the LTI protocol.

This project has two main segments:

#### 1. LTI Tool Provider

See in [app/controllers/lti_controller.rb](https://github.com/CircuitVerse/CircuitVerse/blob/9a0a1bd76cd39add7f256573af3e439114067863/app/controllers/lti_controller.rb#L19)

```
    @provider = IMS::LTI::ToolProvider.new(
        params[:oauth_consumer_key], 
        @assignment.lti_shared_secret,
        params
    )
```
here the provider is specified with the consumer key and shared secret of the LMS and in the next step the entire LTI request is validated.

See in [app/controllers/lti_controller.rb](https://github.com/CircuitVerse/CircuitVerse/blob/9a0a1bd76cd39add7f256573af3e439114067863/app/controllers/lti_controller.rb#L25)

```
    if !@provider.valid_request?(request)
        render :launch_error, status: 401
        return
    end
```

If the request is valid, then corresponding assignment is fetched from the database and proper page is rendered and delivered via iframe to the LMS.

#### 2. Grade Syncing with the LMSs

For the grade passback service the native LTI protocol is followed, because the [ims-lti](https://github.com/instructure/ims-lti) gem doesn't support the flow as per our requirements.

So the grade passback service is implemented as per specifications of IMS-Global, see in [lti_score_submission.rb](https://github.com/CircuitVerse/CircuitVerse/blob/9a0a1bd76cd39add7f256573af3e439114067863/app/services/lti_score_submission.rb)

```
  def call
    response = oauth_token.post(lis_outcome_service_url, score_body.to_xml, 'Content-Type' => 'application/xml')
    if response.body.match(/\bsuccess\b/)
      puts "score submitted"
      return true
    else
      puts "score submission failed"
      return false
    end
  end
```

for more information about the grade passback service please refer [Learning Tools Interoperability (LTI) Implementation Guide](https://www.imsglobal.org/specs/ltiv1p1/implementation-guide)

### New Features Added to CircuitVerse

The goals are almost achieved. The following features are added to CircuitVerse:

* [x] The CircuitVerse codebase made [LTI (Learning Tools Interoperability)](https://www.imsglobal.org/activity/learning-tools-interoperability) compatible.
* [x] Necessary credentials can be generated for the LMSs to integrate with CircuitVerse.Updated the assignment creation UI to support the new credentials generation facility.
* [x] The LMSs can now sync grades with the CircuitVerse platform.
* [x] Some of the pages like (Groups/Assignemnts) are made iframable such that they can be accessed from LMS side using [LTI]((https://www.imsglobal.org/activity/learning-tools-interoperability)) protocol.
* [x] Added documentation for the teachers to connect the assignments with their LMS.
* [x] Feature flagged the LMS integration feature.

![Feature-Flag](/images/ayan-biswas-GSoC2021/Ayan_LMS_feature_flag.png)

### Pull Requests made

Here are the pull requests made to the [CircuitVerse](https://github.com/CircuitVerse) main repository:

* [Add assignments as LTI to LMS from CircuitVerse](https://github.com/CircuitVerse/CircuitVerse/pull/2292)
* [UI changes done for LMS credentials generation](https://github.com/CircuitVerse/CircuitVerse/pull/2312)
* [Grade Submission to LMS from CircuitVerse](https://github.com/CircuitVerse/CircuitVerse/pull/2355)
* [Feature flag to enable/disable LTI integration](https://github.com/CircuitVerse/CircuitVerse/pull/2379)

Here are the pull requests made to the [CircuitVerseDocs](https://github.com/CircuitVerse/CircuitVerseDocs) repository:

* [LMS Integration Project documentation for teachers](https://github.com/CircuitVerse/CircuitVerseDocs/pull/304)

### Testing and Documentation

Rspec tests has been added to check the entire LTI integration flow. Please refer to the [spec/requests/lti_spec.rb](https://github.com/CircuitVerse/CircuitVerse/blob/9a0a1bd76cd39add7f256573af3e439114067863/spec/requests/lti_spec.rb)

Here is a glimpse of the testing scenarios of the LMS integration project

![GSoC](/images/ayan-biswas-GSoC2021/Ayan_LMS_Final_tests.png)

The tutorial documentation for the teachers has been also added to the [CircuitVerseDocs](https://github.com/CircuitVerse/CircuitVerseDocs) check the documentation [here](https://docs.circuitverse.org/)

Here is a glimpse of the documentation of the LMS integration project

![GSoC](/images/ayan-biswas-GSoC2021/Ayan_LMS_Final_docs.png)

### Future Plans

The initial integration of CircuitVerse with the LMS is ready for production use of teachers and students. The next step is to add more features to the platform.Here are some of the future plans :

* Add dynamic XML configuration support for each assignments for the LMSs to integrate with CircuitVerse.
* Automatic cron job to sync grades with the LMSs (Checking of grade submission failures if necessary).
* Integration with non-LTI LMSs (like Google Classroom).

### Blog posts written

I have described my entire journey through a series of blogs in my web profile.You can find the links below, plese click on the links to read the posts :

1. [My Journey to Google Summer of Code 21 with CircuitVerse and insights on the Proposal for GSoC](https://www.ayanbiswas.in/2021/05/20/my-journey-to-google-summer-of-code-21-with-circuitverse-and-insights-on-the-proposal-for-gsoc)

2. [GSoC’21 Community Bonding Period @CircuitVerse](https://www.ayanbiswas.in/2021/06/09/gsoc21-community-bonding-period-circuitverse/)

3. [GSoC’21 Week 1+2 Experience @CircuitVerse](https://www.ayanbiswas.in/2021/06/23/gsoc21-week-12-experience-circuitverse)

4. [GSoC’21 Week 3+4 Experience @CircuitVerse](https://www.ayanbiswas.in/2021/07/06/gsoc21-week-34-experience-circuitverse)

5. [LMS Integration: Phase 1 Report (GSoC 2021- Ayan Biswas)](https://blog.circuitverse.org/posts/ayan_phase_1_report/)

6. [Learning Tools Interoperability implementation in Ruby on Rails](https://www.ayanbiswas.in/2021/07/25/learning-tools-interoperability-implementation-in-ruby-on-rails)

7. [GSoC’21 Week 7+8 Experience @CircuitVerse](https://www.ayanbiswas.in/2021/08/07/gsoc21-week-78-experience-circuitverse/)

### Experience

Google Summer of Code has been a great experience for me. I have learned a lot from my project and I am very happy with the outcome.Engaging in the beautiful community like CircuitVerse is an excellent opportunity for me, I also want to thank my mentors [Aboobacker MK](https://github.com/tachyons), [Satvik Ramaprasad](https://github.com/satu0king/) and [Shivansh Srivastava](https://github.com/Shivansh2407) for their extreme support and continuous code reviewes.

Looking forward to contribute even more to CircuitVerse and the whole Open-source community !

Thank you for reading 🎉 Happy coding 🖥
