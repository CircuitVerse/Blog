---
title: "Improve deployment infrastructure & experience with 12 factor: Phase 1 Report"
date: 2023-07-08
author: Vaibhav Upreti
type: post
---

![gsoc-cover](/images/gsoc_cover.png)

It's hard to believe that it has already been six weeks since I began my journey as a GSoC student at [CircuitVerse.org](https://circuitverse.org/).
Time flies by quickly! 
Throughout this period, I have gained extensive knowledge and experience by exploring various tools and have significantly 
enhanced my skills in managing servers and handling applications in production serving a vast user base. It was also a
remarkable experience to directly impact hundreds of thousands of users through my contributions, such as migrating all 
user avatars and circuits' images.

I will try to balance this blog with the technical work as well my general experience as a GSoC student at CircuitVerse.
If you're interested in more technical details, you can find detailed information in the blog posts I wrote during the 
coding period, mentioned below.

## Project Overview 📋

During the past 6 weeks, my focus at CircuitVerse has been on improving the deployment infrastructure and user experience 
in line with the 12-factor methodology.

[GSoC-Project](https://summerofcode.withgoogle.com/programs/2023/projects/r2R8ARJ9)

> [12factor](https://12factor.net/) is a methodology for building and deploying scalable, maintainable, and suitable 
software applications. My project focuses on implementing various features in CircuitVerse and to make it 12 factor
compatible, typical of SRE(Site Reliability Engineering) practices.

In the initial phase, my project was more SRE-oriented, and I dedicated my time to finding engineering solutions for 
challenges that didn't have straightforward answers. At every stage, I made sure to validate CircuitVerse's adherence to 
the 12-factor methodology.

I thoroughly enjoy working on production applications because it taught me a great deal about the general workflows that
need to be followed when introducing any changes or adding new features. This experience has taught me how to make modifications while ensuring minimal disruption for regular users, with a key focus on maintaining 100% availability.

Now, let's delve into the details...

## Community Bonding Period 🏙 (May 4, 2023 - May 28, 2023)

During the initial days following the announcement of the GSoC results, contributors were assigned separate private channels
for their respective projects. After a few days, we had our first meet, which aimed to break the ice and foster a sense of
camaraderie among all the GSoC students and mentors. The meet provided an opportunity for informal conversations, where 
students and mentors engaged in friendly chats.

One week prior to the start of coding period I had a detailed call with my mentor Aboobacker and Vedant, where he showed us
the behind the scenes at CircuitVerse, the server config - general workflows, monitoring tools, basically he gave a 
comprehensive tour of the server infrastructure. In addition to this, we had a discussion about the timeline of my project 
and the order of tasks.

Initially, I had planned to prioritize the migration of assets to AWS S3. However, considering the resource-intensive 
nature of this task and the need for data migration and validation, my mentor advised me to work on certain smaller tasks
alongside it. 

At the end of community bonding period I was invited to join the CircuitVerse organization on GitHub.

For the best part regarding the bonding period go [here](https://vaibhavupreti.github.io/hugo-blog/blog/community-bonding-period-gsoc/#the-best-part-).

### Coding Period ~ Phase 1 💻

Throughout my journey, I have devoted significant time to exploring various codebases, including the Ruby STL and Rails 
codebase, among others. This experience has provided me with valuable exposure to different design practices and best 
coding practices that should be followed.

As someone who enjoys writing blogs, I made it a priority to document my progress in detail, ensuring that I published a 
blog post every week, sometimes even more frequently. Some of these posts delve into technical topics that could be
beneficial to individuals in the Ruby/Rails community.

Communication is the key for GSoC, I had weekly meets with my mentor on every Saturday to discuss my project progress.
We have also had numerous pair programming sessions to implement my changes on production together. 

**References**
- [Community Bonding Period at CircuitVerse.org](https://vaibhavupreti.github.io/hugo-blog/blog/community-bonding-period-gsoc/)
- [PR- fix: erb tags](https://github.com/CircuitVerse/CircuitVerse/pull/3756)

#### Week 1 ~ (May 29, 2023 - June 4, 2023)

In the first week of the coding period, I worked on migrating CircuitVerse attachments from local storage (using deprecated tools such as Paperclip & CarrierWave) to object storage on AWS S3 using ActiveStorage.

My approach involved first mirroring the attachments to ensure that all new data is saved in both configurations: 
(Paperclip & ActiveStorage) and (CarrierWave & ActiveStorage). Subsequently, backfilling all the previous data.

The main goal of this task was to achieve:
- Zero downtime, to ensure uninterrupted service
- Avoid duplicate attachments
- Successful migration all previous data.

Hence, I added configurations to duplicate attachments and data migrations to backfill past data.

**References**
- [Base PR for Step1](https://github.com/CircuitVerse/CircuitVerse/pull/3771)
- [GSoC Week1: Migrating assets to AWS S3](https://vaibhavupreti.github.io/hugo-blog/blog/gsoc-week1/)

#### Week 2 ~ (June 5, 2023 - June 11, 2023)

During this week, After receiving initial feedback from my mentor regarding the AWS S3 migration task, I made the 
necessary changes. Finally, my modifications were deployed to production after setting up the S3 bucket for attachments.

I had a meeting with my mentor where we reviewed the code together. I also provided a quick demo to demonstrate how my
changes ensure that the old configuration remains unaffected.

Then we ran migrations to migrate `profile_pictures` of users at CircuitVerse.

**References**

- [feat: mirror pfp & projects, backfill profile_pictures #3786](https://github.com/CircuitVerse/CircuitVerse/pull/3786)
- [Hitchhiker's Guide to GSoC: Week 2, Don't Panic Edition](https://vaibhavupreti.github.io/hugo-blog/blog/gsoc-week2/)
 

#### Week 3 ~ (June 12, 2023 - June 18, 2023)

In week 3, I completed the Monit configurations for CircuitVerse, as advised by my mentor to work on small tasks alongside
the AWS migration task.

Monit is a small Open Source utility for managing and monitoring Unix systems. Monit conducts automatic maintenance and 
repair and can execute meaningful causal actions in error situations.

Here is an example of how monit sends alerts: 
![monit-alerts](/images/vaibhav-upreti/monit-alerts.png)

The Monit configuration can be found [here](https://github.com/CircuitVerse/infra/tree/main/runbooks/docs/monit),

After thorough discussions with my mentor, we decided to integrate Monit and Opentelemetry into production after completing
the S3 migration task and setting up a continuous deployment workflow. This decision was made because these integrations 
would require additional RAM and CPU resources from the server.


**References**

- [feat: monit config files #1](https://github.com/CircuitVerse/infra/pull/1)
- [GSoC Chronicles: Week 3](https://vaibhavupreti.github.io/hugo-blog/blog/gsoc-week3/)
 

#### Week 4 ~ (June 19, 2023 - June 25, 2023)

Week 4 was dedicated to exploring Distributed Tracing. I delved deeper into Opentelemetry and completed the OTEL 
configuration for CircuitVerse. Additionally, I wrote a comprehensive technical guide on monitoring a Rails app using 
distributed tracing with multiple vendors such as Jaeger, New Relic, Prometheus, and more.

**Jaeger Dashboard:**
![Jaeger-image](/images/vaibhav-upreti/jaeger-dashboard.png)

**Jaeger Single Trace**

![jaeger-trace-inspect](/images/vaibhav-upreti/jaeger-trace-inspect.png)

![jaeger-trace-inspect-deep](/images/vaibhav-upreti/jaeger-trace-inspect-deep.png)

**New Relic Dashboard:**

![new-relic-otel-dashboard](/images/vaibhav-upreti/new-relic-otel-dashboard.png)

Apart from working on OTEL, my mentor advised me to initialize runbooks for CircuitVerse, covering all the essential 
workflows and infrastructure details. These runbooks would serve as a resource similar to GitLab's 
[runbooks](https://gitlab.com/gitlab-com/runbooks). Although we considered having a static site for runbooks like GitLab,
due to the small size of our infrastructure team, we decided to document them as markdown files instead.

If you are interested in joining us at CircuitVerse, you can start [contributing](https://circuitverse.org/contribute). 
Contributions are not limited to the codebase alone; we also encourage students and teachers to contribute to CircuitVerse 
by creating amazing digital design circuits and sharing them with friends.

Week 4 was one of the most productive weeks during my GSoC journey.

**References**

- [feat: Intialise runbook #3](https://github.com/CircuitVerse/infra/pull/3)
- [feat: migrate image_preview to AWS S3 #3813](https://github.com/CircuitVerse/CircuitVerse/pull/3813)
- [GSoC Week 4: Distributed Tracing and Runbook Development](https://vaibhavupreti.github.io/hugo-blog/blog/gsoc-week4/)
- [The Ultimate Guide to Distributed Tracing: Monitor your Rails app using Opentelemetry, Jaeger and New Relic Agent](https://vaibhavupreti.github.io/hugo-blog/blog/distributed-tracing-opentelemetry/)

#### Week 5 ~ (June 26, 2023 - July 2, 2023)

During Week 5, I devoted most my time to [mrsk](https://mrsk.dev/) & working on serving assets using ActiveStorage,
the second step that completesthe migrate to object storage task.

mrsk is a tool that allows you to deploy docker containers to bare metal servers, (or cloud VMs) using docker with zero 
downtime. mrsk is still in aplha stage but is now in production at [37signals](https://37signals.com/).

During this time, I connected with my mentor and, we had detailed discussions, exchanging ideas and exploring different 
strategies for deploying CircuitVerse to a production environment using mrsk.
One important topic we deliberated on was whether to maintain the existing configuration of having PostgreSQL and Redis on 
the server itself or to transition them to containers while persisting data using volumes.

Additionally, this week marked the completion of migrating User Circuits' `image_preview` to AWS S3. Up until Week 5 in 
production at circuitverse.org, we have been mirroring attachments to both the old and new configurations. Now that we have
successfully backfilled all the data, it is time to serve them using ActiveStorage and remove the deprecated gems, namely
Paperclip and CarrierWave.
However, this process caused a few hours of downtime for CircuitVerse due to an OOM (Out of Memory) error, as the server 
ran out of memory. Despite this, we were able to successfully migrate hundreds of thousands of attachments to AWS S3.

**References**
- [chore: update rails to 7.0.5.1 (#3842) ](https://github.com/CircuitVerse/CircuitVerse/pull/3842)
- [fix: use env[] instead of fetch (#3856)](https://github.com/CircuitVerse/CircuitVerse/pull/3856)
- [feat: Serve assets using active storage #3860](https://github.com/CircuitVerse/CircuitVerse/pull/3860)
- [GSoC Week 5 at CircuitVerse.org](https://vaibhavupreti.github.io/hugo-blog/blog/gsoc-week5/)


#### Week 6 ~ (July 3, 2023 - July 9, 2023)

During Week 6, my main focus was on continuing the work related to the mrsk task and updating the Rails API for the 
Serving assets using ActiveStorage pull request at CircuitVerse.

The mrsk task itself was quite time-consuming, taking around 25–30 minutes for all the steps on my intel Mac.
The process involved creating the Docker image for the rails app, pushing the image to the repository, pulling it to the 
server, and then restarting the application. 
Fortunately, I had previously invested effort in creating a personal deployment of CircuitVerse using mrsk, which helped 
me set up the basic configuration quickly. 
To streamline the debugging process, I opted to build the Docker images separately. I would then run these containers on a 
Docker network and test my changes there. This approach helped me efficiently identify and resolve any issues.

As I continue my work, I will prioritize implementing proper logging, monitoring, and alerting mechanisms for the container-
based deployment of CircuitVerse.
Additionally, I will optimize resource consumption, such as RAM and CPU, to ensure efficient utilization and enhance the scalability of CircuitVerse. By fine-tuning these aspects, we aim to provide users with an optimized and reliable experience.

These tasks are expected to take the first few weeks of the next phase to make it to production after thorough validations.

After completing these tasks, only the Hyperloglog task remains, as outlined in my GSoC proposal. Additionally, I intend to
contribute to diversifying deployment options for CircuitVerse, although it falls outside the scope of GSoC. Regardless, I 
am committed to making progress in this area.

Special mention to my mentor, [Aboobacker](https://github.com/tachyons) for generously dedicating his valuable time to
review my pull requests and providing guidance whenever I encountered challenges.

**References**

- [GSoC Week 6](https://vaibhavupreti.github.io/hugo-blog/blog/gsoc-week6/)
- [Deploying CircuitVerse using mrsk | YouTube](https://www.youtube.com/watch?v=KWJlWUfPWhw)

### Commits Merged 

1. [**CircuitVerse/CircuitVerse**](https://github.com/CircuitVerse/CircuitVerse/commits?author=vaibhavupreti&since=2023-05-04&until=2023-07-14)

2. [**CircuitVerse/infra**](https://github.com/CircuitVerse/infra/commits?author=vaibhavupreti&since=2023-05-04&until=2023-07-14)

### Featured Blog Posts

All blogs written during GSoC Period are on my 
[website](https://vaibhavupreti.github.io/hugo-blog/tags/gsoc/)

Some of my favourite being:
1. [My Journey to GSoC 2023 with CircuitVerse.Org: How I Prepared and Applied for the Program
](https://vaibhavupreti.github.io/hugo-blog/blog/my-journey-to-gsoc-2023-with-circuitverse/)
2. [Community Bonding Period at CircuitVerse.org](https://vaibhavupreti.github.io/hugo-blog/blog/community-bonding-period-gsoc/)
3. [The Ultimate Guide to Distributed Tracing: Monitor your Rails app using Opentelemetry, Jaeger and New Relic Agent
](https://vaibhavupreti.github.io/hugo-blog/blog/distributed-tracing-opentelemetry/)
