# Blog
Blog for updates from [CircuitVerse](https://circuitverse.org/)


# Prerequirements

- [Hugo](https://gohugo.io/)

## How to clone

Clone the repo in following manner:

`git clone --recursive git@github.com:CircuitVerse/Blog.git`

In case --recursive is not used, then you will need to use `git submodule update --init` to clone submodules after cloning the main repo.

[Reference: Stack Overflow](https://stackoverflow.com/questions/3796927/how-to-git-clone-including-submodules)

## Create a new post

```bash
hugo new posts/my_new_post.md
```

# Run Instructions
Start Server: `hugo server -D` 

## ShortCodes

Some common Hugo ShortCodes that might come in handy while writing a blog post:
1. Table of Contents

```html
<!-- Use anywhere in markdown -->
{{<toc>}}
```

2. Embed a Video

```html
{{< video src="/path/to/video.mp4" type="video/mp4" preload="auto" >}}
```
