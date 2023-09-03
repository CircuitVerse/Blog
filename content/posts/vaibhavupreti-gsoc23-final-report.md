---
title: "Improve Deployment Infrastructure using 12 Factor: GSoC'23 Final Report 📝"
date: 2023-08-27
author: Vaibhav Upreti
type: post
---

The goal of this blog is to showcase, in detail, the work that [Vaibhav Upreti](https://github.com/VaibhavUpreti) did on 
[CircuitVerse](https://circuitverse.org/) during Google Summer of Code 2023, which took place from May 29, 2023, to 28 August 2023.

**CircuitVerse** is a cool open-source platform which allows users to construct digital logic circuits online.

Table of Contents
{{< toc >}}

## Project Description 📁
___

The primary objective of my GSoC project was to upgrade CircuitVerse's deployment infrastructure to 
meet the 12 factor standards, that would pave the way for a more efficient, scalable, maintainable, and robust platform. 
The project involved several important tasks, each contributing to the overall enhancement of the platform.

For a detailed description of the project, refer to the [project page](https://summerofcode.withgoogle.com/archive/2023/projects/r2R8ARJ9).

## Accomplishments 📜
---

Here's a concise summary of my achievements:

- This is indeed the first time I've made changes that directly impacted hundreds of thousands of users through large-scale data migrations
- My changes and optimisations resulted in a direct benefit to the organization by reducing infrastructure costs.
- Successfully applied 12-factor principles, boosting scalability, reliability, and significantly reducing infrastructure costs.
- Learnt a great deal from my mentor, a senior software engineer, about Ruby, Rails, software development practices and handling applications in production.

### 1. Make CircuitVerse a 12 Factor Application ⚙️

I prioritized the implementation of 12 Factor principles throughout the development process.

An achievement was customizing CircuitVerse's Docker image for wider usability, reducing memory consumption(by using [jemalloc](https://jemalloc.net/)) and reducing Docker image build time.

Initialized CircuitVerse runbooks, as suggested by my mentor, which provide comprehensive documentation for production deployment, including all necessary background information.

- [CircuitVerse Runbooks](https://github.com/CircuitVerse/infra/tree/main/runbooks)

### 2. Migrate Assets to AWS ☁️  S3 🪣

**Large-Scale Migration**: I led the migration of nearly a million assets, including user profile pictures and circuit images from old, deprecated Configuration (CarrierWave, PaperClip) to 
rails solution for handling file uploads called ActiveStorage on AWS S3.
This transition not only improved storage efficiency but set the stage for seamless expansion.

**My approach**: Ensure zero downtime for users by mirroring uploads to both new(ActiveStorage) and old(Paperclip, CarrierWave) configurations, followed by data migrations and background jobs
to backfill data.

Initially, we employed the data_migrations approach, maintaining a Redis counter for tracking progress and enhancing logging for insights.
However, with growing server traffic, memory issues arose, leading us to transition to background jobs via Sidekiq. For this we utilized Shopify's [maintenance_tasks](https://github.com/Shopify/maintenance_tasks) gem, employing a single job to migrate 1000 records.

**Scalability & Cost Reduction**: Migrating to object storage, specifically S3, not only reduced infrastructure costs compared to EBS due to its cost-effectiveness but also ensured scalability,
making it a preferred choice for storing large volumes of data and accommodating future growth.



### 3. Improve Observability using OpenTelemetry 🔭

I configured distributed tracing with OpenTelemetry for CircuitVerse and exported the telemetry data to [jaeger](https://www.jaegertracing.io/) and [new relic](https://newrelic.com/) backend.
This tracing system provides invaluable insights into our platform's performance, enabling us to identify bottlenecks and enhance user experiences


OpenTelemetry's architecture and its utilization in our service-
![Otel-arch](/images/vaibhav-upreti/otel-arch.png)


**Jaeger Dashboard**

![Otel-arch](/images/vaibhav-upreti/jaeger-dashboard.png)

**New Relic Dashboard** 
![new-relic-dashboard](/images/vaibhav-upreti/new-relic-otel-dashboard.png)

**Inspecting a trace**

![Otel-arch](/images/vaibhav-upreti/jaeger-trace-inspect-deep.png)
![Otel-arch](/images/vaibhav-upreti/jaeger-trace-inspect.png)


- [OpenTelemetry Setup & Configuration docs](https://github.com/CircuitVerse/CircuitVerse/tree/master/.otel)
- [OpenTelemetry runbook](https://github.com/CircuitVerse/infra/tree/main/runbooks/docs/opentelemetry)


### 4. Zero Downtime Deployment Pipeline with GitHub Actions and Kamal 🛠️ 

Successfully set up a Continous Deployment Pipeline that deploys CircuitVerse Docker images to production using GitHub Actions and [kamal](https://kamal-deploy.org/) with zero downtime.

Kamal uses the dynamic reverse-proxy Traefik to hold requests, while the new app container is started and the old one is stopped — working seamlessly across multiple hosts, using SSHKit to 
execute commands. Originally built for Rails apps, Kamal will work with any type of web app that can be containerized with Docker.


The workflow consists of two jobs:

1. **`build-production`**:
This job builds the Docker image and pushes it to the registry for linux/amd64 and linux/arm64 architectures.
The build process is optimized using docker buildx caching, significantly reducing build times.

2. **`deploy`**:
After the build job completes, the deploy workflow requires a review by a repository committer.
Once approved, it sets up Kamal and deploys the latest Docker image tagged with the GitHub SHA hash from the repository's current origin.

![kamal-job](/images/vaibhav-upreti/kamal-job.png)

As we can see in the image above the deploy job has protection rules for the "production" environment in GitHub Actions. When a newer `deploy` job is enqueued, it cancels the previous workflow to ensure the latest image is deployed.


In the deploy action, Kamal performs several key tasks:
1. pulls the image from the registry
2. runs healthchecks on the servers at `http://localhost:3999/up` route.
3. If the healthchecks are healthy, Kamal proceeds to swap the existing container with the newer version.
4. However, if the health check fails, Kamal acquires a lock on the deployment to prevent any conflicts or issues during the update process.

Hence, in CircuitVerse CI workflows, we build Docker images for each pull request to the master branch, helping developers validate their code for production readiness.

**Memory Optimisation**: Configured Jemalloc for Docker image, reducing memory fragmentation.

Deploying CircuitVerse to staging environment successfully.

![cv-staging](/images/vaibhav-upreti/cv-staging.png)

**Feeback**
![staging-feedback](/images/vaibhav-upreti/staging-feedback.png)

- [GitHub Action workflow file](https://github.com/CircuitVerse/CircuitVerse/blob/master/.github/workflows/deploy.yml)
- [kamal runbooks](https://github.com/CircuitVerse/infra/tree/main/runbooks/docs/kamal)


### 5. Monitoring Server with Monit 🔎

Introduced [Monit](https://mmonit.com/monit/), 
Monit is an open source server monitoring tool, it conducts automatic maintenance and repair and can execute meaningful tasks.

I added Monit configuration for the following services:
- Sidekiq
- Procodile
- Postgres
- Redis

Monit promptly restarts services and sends SMTP alerts when a service goes down or reaches its alert limit

**Monit Alerts**
![monit-alerts](/images/vaibhav-upreti/monit-alerts.png)

- [Monit configuration files](https://github.com/CircuitVerse/infra/tree/main/runbooks/docs/monit/conf-enabled)
- [Monit Runbook](https://github.com/CircuitVerse/infra/tree/main/runbooks/docs/monit)

### 6. Drop visitor tracking by storing user details and adopt HyperLogLog for project view counts 🗂️


HyperLogLog is a probabilistic data structure that estimates the cardinality of a set. As a probabilistic data structure, HyperLogLog trades perfect accuracy for efficient space utilization. 
Thus this algorithm can estimate the number of unique values within a very large dataset using little memory and time.

**Transition Strategy**: I evaluated multiple HLL (HyperLogLog) libraries, prioritizing solutions aligned with ease of setup, precision, and strong community support.


We had three options:

1. Utilize the postgres-hll extension, incorporating a separate HLL field for projects.
2. Implement [Redis HyperLogLog](https://redis.io/docs/data-types/probabilistic/hyperloglogs/)
3. Store HLLs as text in the PostgreSQL database.

Most of the libraries that evaluated HLLs were outdated, hence the idea of storing HLLs as text in the database was temporarily shelved.
Additionally, others had external dependencies that could complicate setup for new contributors. Using Redis HyperLogLog counters appeared viable(just like GitLab uses HLL counters) but would 
entail higher infrastructure costs. After discussions with my mentor, we decided to exclude this from the program's scope due to the need for further research and potential complexities.

- [Postgres-hll extension approach](https://github.com/VaibhavUpreti/gsoc-work/pull/54)
- [Text Based HyperLogLog](https://github.com/VaibhavUpreti/gsoc-work/pull/70)


## Feedback 📈 
___

![vu-midterm-feedback](/images/vaibhav-upreti/vu-midterm-feedback.png)

## Pull Requests 🔄 & Blogs 📖
___


### [Repo - CircuitVerse/CircuitVerse](https://github.com/CircuitVerse/CircuitVerse)
| Pull Request                                | Description                                              |
|--------------------------------------------|----------------------------------------------------------|
| [fix: erb tags](https://github.com/CircuitVerse/CircuitVerse/pull/3756)                                  | Fix for erb tags in the codebase                          |
| [feat: mirror pfp & projects, backfill profile_pictures](https://github.com/CircuitVerse/CircuitVerse/pull/3786) | Added a feature to mirror pfp & projects,while simultaneously backfilled profile_pictures |
| [feat: migrate image_preview to AWS S3](https://github.com/CircuitVerse/CircuitVerse/pull/3813)       | Migration of image_preview to AWS S3 storage            |
| [chore: update rails to 7.0.5.1](https://github.com/CircuitVerse/CircuitVerse/pull/3842)             | Updated Rails version to 7.0.5.1                         |
| [fix: use env[] instead of fetch](https://github.com/CircuitVerse/CircuitVerse/pull/3856)            | Code fix to use `env[]` instead of `.fetch`                |
| [feat: make member since field more readable](https://github.com/CircuitVerse/CircuitVerse/pull/3938)  | Added a feature to make the 'member since' field more readable |
| [feat: distributed tracing using OpenTelemetry](https://github.com/CircuitVerse/CircuitVerse/pull/3947) | Implemented distributed tracing using OpenTelemetry      |
| [feat: continuous deployment workflow using GitHub Actions and Kamal](https://github.com/CircuitVerse/CircuitVerse/pull/3952) | Added a continuous deployment workflow using GitHub Actions and Kamal |
| [feat: serve profile_pictures with ActiveStorage](https://github.com/CircuitVerse/CircuitVerse/pull/3960) | Implemented serving profile pictures with ActiveStorage   |
| [chore: disable generating spans for default settings](https://github.com/CircuitVerse/CircuitVerse/pull/3961) | Disabled generating spans for default settings           |
| [fix: commentator profile_picture error](https://github.com/CircuitVerse/CircuitVerse/pull/3966)    | Fixed commentator profile_picture error                  |
| [chore: rerun image preview migration](https://github.com/CircuitVerse/CircuitVerse/pull/3972)      | Reran the image preview migration                         |
| [feat: migrate image_preview using Sidekiq](https://github.com/CircuitVerse/CircuitVerse/pull/3984) | Migrated image_preview using Sidekiq                     |
| [chore: make maintenance tasks migrations safe](https://github.com/CircuitVerse/CircuitVerse/pull/3993) | Made maintenance tasks migrations safe                    |
| [chore: mark maintenance tasks migrations safe](https://github.com/CircuitVerse/CircuitVerse/pull/4000) | Marked maintenance tasks migrations as safe               |
| [feat: deploy CircuitVerse to staging using Kamal](https://github.com/CircuitVerse/CircuitVerse/pull/4001) | Deployed CircuitVerse to staging using Kamal              |
| [feat: Serve assets using active storage](https://github.com/CircuitVerse/CircuitVerse/pull/3860) | Serve Image Preview using ActiveStorage |
| [feat: production deployment using kamal](https://github.com/CircuitVerse/CircuitVerse/pull/3994) | Deploy CircuitVerse to production using kamal |


### [Repo - CircuitVerse/infra](https://github.com/CircuitVerse/infra)

| Pull Request                                | Description                                                |
|--------------------------------------------|------------------------------------------------------------|
| [feat: monit config files #1](https://github.com/CircuitVerse/infra/pull/1) | Added Monit configuration files |
| [feat: Intialise runbook #3](https://github.com/CircuitVerse/infra/pull/3) | Initialized CircuitVerse runbooks |
| [docs: distributed tracing using OpenTelemetry #5](https://github.com/CircuitVerse/infra/pull/5) | Documented distributed tracing using OpenTelemetry |
| [docs: Kamal documentation #6](https://github.com/CircuitVerse/infra/pull/6) | Added Kamal documentation |

### Blog Posts

I published weekly blog posts throughout this period, which you can read at https://vaibhavupreti.github.io/hugo-blog/tags/gsoc

**Featured posts:**

- [My Journey to GSoC 2023 with CircuitVerse.Org: How I Prepared and Applied for the Program](https://vaibhavupreti.github.io/hugo-blog/blog/my-journey-to-gsoc-2023-with-circuitverse/)
- [The Ultimate Guide to Distributed Tracing: Monitor your Rails app using Opentelemetry, Jaeger and New Relic Agent](https://vaibhavupreti.github.io/hugo-blog/blog/distributed-tracing-opentelemetry/)

- [Community Bonding Period at CircuitVerse.org](https://vaibhavupreti.github.io/hugo-blog/blog/community-bonding-period-gsoc/)

## What's Next 📅
---
I’m excited to continue as a Core Team member, maintaining this incredible open-source project.

Additionally, we plan to implement a blue-green deployment approach implement the CD pipeline after rigorous testing in the staging environment.
- `Blue` - older server
- `Green` - current staging environment

This involves copying the latest production data to staging(latest `pg_dump` and redis data),
Production traffic will continue on 'blue' until we replicate and scale 'green' to match or exceed its capacity.
Once performance and stability are confirmed, we'll transition production traffic to 'green', the `staging server` and phase out the older 'blue' instance, ensuring a risk-minimized transition.


## Acknowledgments 📝
___

I'm grateful to my mentor [Aboobacker M.K](https://github.com/tachyons) who helped me whenever I faced challenges and never 
overlooked any part of their mentoring. Taught me a lot of stuff around Ruby, Rails and Software Development in general.
The weekly meetings were exceptionally informative, and I cannot overstate how much I learned through my interactions 
with my mentor. I doubt I will ever encounter a similar experience. Their dedication motivates me to aspire to become 
a software engineer like them and to share my learnings with others.

