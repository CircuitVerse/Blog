---
title: "Project Recommendation System: Phase 1 Report (GSoC 2021- Devansh Dixit)"
date: 2021-07-17T14:36:10+05:30
draft: false
author: Devansh Dixit
type: post
---

This blog describes my work done for [Recommendation System](https://summerofcode.withgoogle.com/projects/?sp-search=devansh%20dixit#6552204183339008) project during Google Summer of Code 2021 at CircuitVerse.

I have successfully completed Phase 1 of the Coding period @CircuitVerse and received amazing feedback from my mentor.

![GSoC](images/DevanshD3-GSoC-21/Passed.png)

#### Major Goals Accomplished in Phase 1

*   Ready with the data extraction, pre-processing, and testing modules.
*   Implemented the proposed model (Clustering + Re-Ranking) at the end of week 3.
*   Currently working on a hybrid model based on Topic Modelling using LDA, K-Means clustering, and content-based re-ranking.

Here's a draft PR of the work that I have done [#2327](https://github.com/CircuitVerse/CircuitVerse/pull/2327).

#### Slight changes from the Proposal

The model that I had mentioned in my proposal, was giving good results but since we had some more time to test out other SOTA methods, we are currently working on the hybrid model as mentioned above. This might take some time to build and we might have to reduce the time allotted to the integration part in the timeline.

#### Future Goals

The upcoming coding period involves:

*   Integrating the LDA model with the K-Means model.
*   Implementing the 2nd layer of the model (currently, it's just a simple re-ranking based on the number of views and stars).
*   Creating a model pipeline.
*   Making a UI and integrating the system with the website (if time permits).

#### My Experience

It has been a wonderful experience working with the mentors and people at CircuitVerse! The community is extremely supportive, understanding, and welcoming. There are always people to help you when in need. My mentor Biswesh, is a really great mentor and has guided me whenever in need. I feel extremely grateful to be able to work on this project under such an amazing group of people.

#### Read my other GSoC blogs

*   My phase 1 work (divided into weeks) is written [here](https://medium.com/gsoc21-coding-phase-1-circuitverse-2061993148f9).
*   The Community Bonding [experience](https://medium.com/gsoc21-community-bonding-period-circuitverse-3ee093e3b1f1).

Thank you for reading XD.