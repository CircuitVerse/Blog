---
title: 'Project Recommendation System: Final Report (GSoC 2021- Devansh Dixit)'
date: 2021-08-13T21:32:37+05:30
draft: false
author: Devansh Dixit
type: post
---
&nbsp;



## Recommendation System

The project aims to add the functionality of a recommendation system to the [CircuitVerse](https://github.com/CircuitVerse/CircuitVerse) website. In this report, I have explained every decision or technology in simple words to give a better understanding and to give an idea of why we did, what we did. All my code files 💻🎉 [here](https://github.com/DevanshD3/CircuitVerse/tree/recommendation-system/recommendation%20system).

&nbsp;


## Why use an unsupervised learning-based model?

The data that was available for us (check out the [database schema](https://github.com/CircuitVerse/CircuitVerse/blob/master/db/schema.rb#L275)) to use didn't have a target variable (typically a X and a Y to train and test the model and improve the accuracy). Therefore, we had to rely on the usage of unsupervised learning-based algorithms to find the intrinsic pattern and hidden structures in the data and present it to the user.

&nbsp;

## Model Structure

Our model is a 2 layered model with the first layer consisting of CountVectorizer + LDA and in the next layer we find top 50 closest projects using K-D Trees, while using stars and views for re-ranking. 
The diagram below shows the model structure in detail :
![Recommendation System Structure](https://i.imgur.com/q5o3GGY.jpg)

&nbsp;


## Data Cleaning Module

A SQL query was used to extract the id, author_id, name, description, tag_names, views, and star count which were stored as a JSON file (1,80,000 projects approx). We removed the following:

- HTML tags
- Non-ASCII characters
- Punctuations.
- Replaced NULL values and "Untitled" by empty strings.

  > **Note:** We did not remove punctuations like &, \*, +, etc as they have a meaning in logic circuits.

&nbsp;


## Feature Extraction

Feature Extraction is mainly done to extract important parts or features from a huge chunk of items, based on the frequency/count of occurrence and thus reducing the dimensions of the dataset to enhance processing.
Our recommendation system uses [CountVectorizer](https://scikit-learn.org/stable/modules/generated/sklearn.feature_extraction.text.CountVectorizer.html) which converts the collection of documents to a matrix of token counts, thus filtering out the important and relevant keywords.

&nbsp;

## Topic Modelling using Latent Dirichlet Allocation (LDA)

[LDA](https://scikit-learn.org/stable/modules/generated/sklearn.discriminant_analysis.LinearDiscriminantAnalysis.html) is used to classify text in a document to a particular topic. It builds a topic per document model and words per topic model, modeled as [Dirichlet distributions](https://www.sciencedirect.com/topics/mathematics/dirichlet-distribution).

- Each document is modeled as a multinomial distribution of topics and each topic is modeled as a multinomial distribution of words.
- LDA assumes that every chunk of text we feed into it will contain words that are somehow related. Therefore choosing the right corpus of data is crucial.
- It also assumes documents are produced from a mixture of topics. Those topics then generate words based on their probability distribution.

Simply put, LDA creates a distribution of words and packs them together as a topic (the number of topics is chosen by the user). When a new sentence is fed into the model, it is converted to a vector based on the word count (by CountVectorizer). LDA then runs on this project vector and hence we get a distribution of the sentence over all the topics. This becomes the new dimension of the project, thus reducing the dimension of every project to the number of topics (in our case 10). It also reduces the time taken to build the K-D Tree and helps in finding better neighbors.

In our recommendation system, the log-likelihood was the least for 10 topics for the given dataset.

![Topics 5 to 50](/images/DevanshD3-GSoC'21/MT.png)
**Topics 5 to 50**
![Zoomed for topics 5 to 20](/images/DevanshD3-GSoC'21/LT.png)
**Zoomed for topics 5 to 20**

&nbsp;


## K-D Trees

After getting the probability distribution of each project we can compare the items and thus enhancing the 2nd layer of the model. Item distance being the best collaborative filtering approach gives us the most similar items. However, this will be a computationally expensive method with time complexity of `O(N^2 log(N))`, and training the model will take days. We also won't be able to use this method for new project recommendations in the online mode because of the high runtime.

Therefore, the need to use [K-D Trees](https://www.cs.cmu.edu/~ckingsf/bioinfo-lectures/kdtrees.pdf) arose. A K-D Tree (also called a K-Dimensional Tree) is a binary search tree where data in each node is a K-Dimensional point in space. Points to the left of this space are represented by the left subtree of that node and points to the right of the space are represented by the right subtree.

The advantages of using K-D Trees were:

- The time complexity of the nearest neighbor search of K-D Tree is `O(log n)` (hence it can be used online).
- The cost for building the tree is `O(N log(N))` (faster training).

The top 50 nearest neighbors of each item are then taken and recommendations are computed.

&nbsp;


## Computing the Recommendations

We take the top 50 nearest neighbors of the project along with the stars and the views of each project.

### Old Project

We split the 10 recommendations into 3 parts:

1.  The first 2 recommendations are just name-based ( since some well-documented circuits like [this](https://circuitverse.org/users/3/projects/67) had too many "important" words in the description and hence was giving different results).
2.  The next 4 recommendations are the top 4 nearest neighbors (based on name + description) that we got from the K-D Tree.
3.  We then re-rank the remaining 46 neighbors by giving them a popularity score which is:

    **Score = (5 S) + V**

> Here S is the number of Stars and V is the number of views of a project.

### New Project

Since we need to calculate the recommendations in real-time, we won't be working and computing the recommendations for names separately. So the first 5 recommendations would be taking the name + description, extracting features, lemmatization, topic modeling, and showing the top 5 K-D Trees recommendations.

The next 5 recommendations would be re-ranking the remaining 45 recommendations based on the above formula and displaying the results to the user.

&nbsp;


## Things we discarded

1.  **TF-IDF for feature extraction:** We preferred counts of words rather than a score and LDA models were giving better distributions with CountVectorizer than TF-IDF so we decided to go ahead with this. Not any major reason, might be changed in the future if some problem comes up.
2.  **K- Means clustering:** Initially our plan was just to use K-Means and re-rank the items and recommend. Then to improve the model we integrated LDA with K-Means and the results were pretty good for layer 1. However, for the 2nd layer, we felt the need to incorporate a distance-based collaborative filtering method to recommend items.
    K-Means had the following issues:

- Uneven distribution of items in clusters.
- Distance calculation was too computationally expensive.
- Increased runtime for new projects.
  Hence we replaced K-Means with K-D Trees.

![Uneven Distribution of projects](/images/DevanshD3-GSoC'21/Kmeans+lda.png)
**Uneven distribution of items**

3. **Inclusion of Tag names:** Just 1800 out of 1,80,000 projects had tag names and we felt they would add unnecessary noise to our model. We also weren't sure what additional information would they be able to provide us (scope for future contributions).
4. **Gensim module for LDA:** Though Gensim was faster than Sci-Kit Learn module for LDA modelling but it had one major problem which was multi-processing. Multi-processing / threading created issues which we couldn't resolve (like freezing your local setup) and since Sci-Kit Learn was a stong option and gave better results, we switched.

&nbsp;

## Scope for future contributions

Since this project was the first recommendation system for the organization, there's tremendous scope for improvement in the project and we would love you to contribute to anything that seems interesting🎉.

Some of the things are listed below:

- Converting the project to a supervised learning problem.
- Inclusion of labels/components used in circuits and sub-circuits.
- Other suggestions regarding optimization of the process.

&nbsp;


## Pull Requests:

- _[[#2367]](https://github.com/CircuitVerse/CircuitVerse/pull/2367)_ Consists of all my code, modules, and pre-computed recommendations.
- _[[#83]](https://github.com/CircuitVerse/Blog/pull/83)_ Phase - 1 blog post

&nbsp;


## My overall experience at CircuitVerse

My experience at CircuitVerse couldn't be any better, I was given the right support, the mentors were really helpful, cooperative and understanding. My GSoC journey was filled with testing, implementation, researching and a lot of unexpected challenges but my mentor [Biswesh Mohapatra](https://www.linkedin.com/in/biswesh-mohapatra-199158120/) helped me throughout. I have learned a lot from the project and super happy with my outcome. I also learnt a lot from my other fellow GSoCers. Kudos to the awesome team and the awesome community of CircuitVerse!

&nbsp;

## Acknowledgments

I am very grateful to my mentor Biswesh Mohapatra for helping me throughout the Google Summer of Code Period and for making this project a success. Special thanks to all the core members of the organization [Satvik Ramaprasad](https://github.com/satu0king), [Aboobacker MK](https://github.com/tachyons), [Shivansh Srivastava](https://github.com/Shivansh2407) and [Shreya Prasad](https://www.linkedin.com/in/-shreya-prasad/) for looking out at my work & guiding me throughout. Lastly, sincere gratitude to Google for offering me this great opportunity to contribute to this wonderful community.

&nbsp;


## My other content pieces

- [Documenting my pre-GSoC journey](https://www.youtube.com/watch?v=QXGierzS76Y)
- [GSoC community bonding period](https://devanshd3.medium.com/gsoc21-community-bonding-period-circuitverse-3ee093e3b1f1)
- [GSoC coding phase-1](https://devanshd3.medium.com/gsoc21-coding-phase-1-circuitverse-2061993148f9)
- [GSoC phase 1 report](https://devanshd3.medium.com/project-recommendation-system-phase-1-report-gsoc-2021-devansh-dixit-68e01c228b2f)
- [GSoC week 6 + week 7](https://devanshd3.medium.com/coding-period-week-6-week-7-cb5eb56ead9d) 
- [GSoC week 8+9+10](https://devanshd3.medium.com/week-8-9-10-circuitverse-808091b9d247)

Feel free to follow me on [medium](https://devanshd3.medium.com/) and subscribe to my [youtube channel](https://www.youtube.com/channel/UCuuJ5BzP5WL1sX2plRL9S6A), I am sure you'll learn something new. 

Thank you for reading. Happy Coding !! 💻🎉
