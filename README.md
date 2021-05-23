# Blog
Blog for updates from [CircuitVerse](https://circuitverse.org/)


# Prerequirements

- [Hugo](https://gohugo.io/)

## Create a new post

```bash
hugo new posts/my_new_post.md
```

# Run Instructions
Start Server: `hugo server -D` 

If the page doesn't load or you get an error something like-

**found no layout file for "HTML" for kind "home": You should create a template file which matches Hugo Layouts Lookup Rules for this combination**

run `git submodule update --init`. This will update the dependencies used in this Blog.
