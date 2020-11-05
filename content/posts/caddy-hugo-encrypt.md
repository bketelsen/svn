---
author: "Brian Ketelsen"
categories: 
  - "hugo"
  - "caddy"
  - "let's encrypt"
date: "2015-11-11T23:49:00Z"
description: ""
section: blog
images: 
  - "https://images.unsplash.com/photo-1477244075012-5cc28286e465?ixlib=rb-0.3.5&q=80&fm=jpg&crop=entropy&cs=tinysrgb&w=1080&fit=max&s=650281f5f6da101b6954a53645bf6501"
slug: caddy-hugo-encrypt
tags: 
  - "hugo"
  - "caddy"
  - "let's encrypt"
title: "Caddy and Let's Encrypt"

---



I spent all of 5 minutes configuring [Caddy](https://caddyserver.com) to automatically pull content from github, post-process it with [hugo](http://gohugo.io) and serve it up with fresh SSL/TLS certificates from Let's Encrypt. <!-- more -->

When you think about it, that's pretty damned amazing.  Caddy already made web serving easy.  It powers everything I do now: gopheracademy.com, gophercon.com and a dozen more.  Add hugo to the mix and you have a really powerful publishing platform that is fully automated with just a git push.  I really love that Caddy polls my github repository and publishes new content.  It's a zero-overhead proposition to publish a new post.

After configuring the Let's Encrypt integration, my esteem for Caddy leveled up to 11.  I did almost nothing to enable it.  Changed a flag in the command line to invoke Caddy, changed the URL in the Caddy configuration file from http to https.  In the background, Caddy requested and installed the certificates for me, and will continue to renew them before they expire.  SSL Everywhere is no longer a dream, it's real, it's here, and the tools couldn't be easier to use.
