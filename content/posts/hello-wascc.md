---
title: Hello waSCC
layout: post
date: "2020-02-25"
slug: hello-wascc
section: blog
images: 
- "/images/h3GAGi5tXMU.jpg"
thumbnail: /images/h3GAGi5tXMU-thumb.jpg
credit: https://unsplash.com/photos/h3GAGi5tXMU
description: "Web Assembly on the Server"
tags:
- "windows"
- "linux"
- "open source"
- "30daywslchallenge"
- "wasm"
classes:
- feature-hyphenate
- feature-justify
- feature-highlight
categories:
- "Linux"
- "Windows"
- "Open Source"
- "Web Assembly"
---




I'm *really excited* about Web Assembly on the server. The promise of sandboxed and portable code feels like the realization of the vision Docker tried to achieve. In this article I'm going to walk through creating a service using [waSCC](https://wascc.dev/), which is a host runtime for running actors written in web assembly. We'll mostly follow the tutorial for creating a new actor, but with more nuance, and specifics for using WSL2 on my Windows Laptop added for completeness.

<!-- more -->

## WASM on the Server

** This article includes information on how to setup my development environment in WSL2, because it's part of my [#30DayWSLChallenge](/windows-for-open-source-development).

### Development Environment

`waSCC` is a Rust project, and as such requires Rust to be installed. My [dotfiles](https://github.com/bketelsen/dotfiles/blob/master/bin/setup/executable_rust.sh) include a script in `~/bin/` to install Rust using "rustup". Invoking that script installs the latest version of stable Rust tooling. As of the time of this post, that's `1.41.0`.

`waSCC` has a nice project template that you can use to kickstart your development. It requires the `cargo-generate` crate to be installed, so let's get that going:

```
> cargo install cargo-generate
```

We also need the web assembly cross-compilation target so that we can build `.wasm` modules from Rust. Install it using the same `rustup` tool we used to install Rust itself:

```
> rustup target add wasm32-unknown-unknown
```


## References and Further Information

* [waSCC](https://wascc.dev)
* [First Actor Tutorial](https://wascc.dev/tutorials/first-actor/)
* [Kevin Hoffman on Twitter](https://twitter.com/kevinhoffman)
