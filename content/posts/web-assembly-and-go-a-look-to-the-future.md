---
author: "Brian Ketelsen"
categories: 
  - "wasm"
  - "web"
  - "go"
  - "javascript"
date: "2018-06-22T16:17:21Z"
description: ""
images: 
  - "/images/2018/06/612px-Web_Assembly_Logo.svg.png"
aliases: 
  - "/web-assembly-and-go-a-look-to-the-future"
tags: 
  - "wasm"
  - "web"
  - "go"
  - "javascript"
title: "Web Assembly and Go: A look to the future"

---


It's no secret that I'm resistant to learning Javascript and frontend development.  I learned HTML back before CSS was even a thing, and even Javascript came long after I started doing web development.  When I look at modern web development I shudder; the ecosystem is so confusing for someone who has been out of touch as long as I have.  Node, webpack, yarn, npm, frameworks, UMD, AMD, arghhh!

<!-- more -->
I've been watching Web Assembly with anticipation for quite some time, with the hope that it would allow me to write web applications without the typical Javascript build process.

When Web Assembly(wasm) support [landed](https://go-review.googlesource.com/c/go/+/102835) in Go recently, I knew that the time was ripe for some experimentation.  And I couldn't wait to dive in and try it.  I read a few [good](https://blog.owulveryck.info/2018/06/08/some-notes-about-the-upcoming-webassembly-support-in-go.html) [articles](https://docs.google.com/document/d/131vjr4DH6JFnb-blm_uRdaC0_Nv3OUwjEY5qVCxCup4/preview#heading=h.mjo1bish3xni) before diving in.  This post will chronicle my experience.

To get started with wasm in Go you need to checkout Go from source and build it.  Web Assembly support will be released in Go 1.11, which isn't out yet.

You can find instructions [here](https://golang.org/doc/install/source) on building Go from source.  Because Go requires a working `go` installation to bootstrap itself, you'll end up with two different installations of Go when you're done.  *Caution - this could surprise you in ways you won't like if you don't remember that you've got two installs of Go.  I use [direnv](http://direnv.net) to manage my path for each project so I can specify which Go installation I want to use.*

After installing the latest Go, you're ready to experiment with Web Assembly.  You'll need an HTML file, and a Javascript shim to load the wasm files that you produce.  These are included in the `misc/wasm` directory of your new Go installation.  You can copy them into any new project and modify the HTML file to load your wasm output.

My first project was a bit ambitious, I wanted to build something that looks roughly like a [Web Component](https://www.webcomponents.org/) in Go, compiled to Web Assembly.  I didn't get that whole thing done, because I got distracted and excited by how well everything worked.

To get started, I copied the HTML and Javascript files from `GOROOT/misc/wasm` into a new directory and added a `main.go` file.  I started with the preconcieved notion that I would render my HTML into an existing node in the DOM that I declared in the HTML file.  So I created an HTML `section` tag with the ID of `thing`.

```
    <section class="main" id="thing" >Please wait...</section>
```

I inserted this right above the script tags at the bottom of the HTML file.  Next, I knew I would want to replace this node programatically, so I looked up the syntax to interact with the DOM from Go's wasm libraries.  Go added a `syscall/js` package that allows interaction with the DOM.  I got a reference to the HTML node with the ID of `thing` using this Go code:

```
	el := js.Global.Get("document").Call("getElementById", "thing")
```

Now I have a reference to the empty DOM node that I can populate with my rendered HTML.  So the next step is to actually create some HTML and stuff it in there.

I used the famous TodoMVC app as my inspiration.  I started by creating two files: `todo.go` and `todolist.go`.  These files contain Go structures that represent Todo items, and a list of Todo items.

```
type Todo struct {
	Title     string
	Completed bool
	//Root      js.Value
	tree *vdom.Tree
}

type TodoList struct {
	Todos []Todo
	Component
}

type Component struct {
	Name     string
	Root     js.Value
	Tree     *vdom.Tree
	Template string
}
```

I also got a little cocky and started extracting things out into a `Component` type thinking that I would be embedding it in my custom types to give them Web Component functionality.  *I never finished this thought... you'll see why later in the article*

Each of these custom Go types has a `Render()` method and a template:

```
var todolisttemplate = `<ul>
{{range $i, $x := $.Todos}} 
	{{$x.Render}} 
{{end}}
</ul>`
```

```
func (todoList *TodoList) Render() error {

	tmpl, err := template.New("todolist").Parse(todoList.Template)
	if err != nil {
		return err
	}
	// Execute the template with the given todo and write to a buffer
	buf := bytes.NewBuffer([]byte{})
	if err := tmpl.Execute(buf, todoList); err != nil {
		return err
	}
	// Parse the resulting html into a virtual tree
	newTree, err := vdom.Parse(buf.Bytes())
	if err != nil {
		return err
	}

	if todoList.Tree != nil {
		// Calculate the diff between this render and the last render
		//	patches, err := vdom.Diff(todo.tree, newTree)
}		//	if err != nil {
		//		return err
		//	}

		// Effeciently apply changes to the actual DOM
		//		if err := patches.Patch(todo.Root); err != nil {
		//			return err
		//		}
	} else {

		todoList.Tree = newTree
	}
	// Remember the virtual DOM state for the next render to diff against
	todoList.Tree = newTree

	todoList.Root.Set("innerHTML", string(newTree.HTML()))
	return nil
}
```

My idea was that I'd use the [vdom](https://github.com/albrow/vdom) package I found to do rendering so that the rendering would be more efficient.  That's where I ran into my first snag.

## Differences Between GopherJS and Go/wasm
The vdom package was written for [GopherJS](https://gopherjs.org) which is a transpiler from Go to Javascript.  GopherJS uses a type called `js.Object` as the base of all its conversions.  Go's new wasm library `syscall/js` uses a type called `js.Value`.  They're similar in spirit, but very different in implementation.  This meant that my vdom rendering idea was dead in the water until I ported vdom to use the new `js.Value` type instead of `js.Object`.  The vdom's `tree.HTML()` method did work without modification, though, so I was able to set the inner HTML of my HTML node to the output of the vdom's parsing.  The Render() method parses the Go struct's template, passing an instance of the Go struct as the context.  Then it uses the vdom library to create a parsed dom tree, and renders that tree in the last line of the method:

```
	todoList.Root.Set("innerHTML", string(newTree.HTML()))
```

At this point I had a working Go/wasm prototype that didn't have any events wired up.  But it DID render to the dom and display in the browser.  That was a huge first step; I was pretty excited at this point.

I built a Makefile so I wouldn't have to keep typing long build commands over and over:
```
wasm2:
	GOROOT=~/gowasm GOARCH=wasm GOOS=js ~/gowasm/bin/go build -o example.wasm markdown.go

wasm:
	GOROOT=~/gowasm GOARCH=wasm GOOS=js ~/gowasm/bin/go build -o example.wasm .

build-server:
	go build -o server-app server/server.go

run: build-server wasm
	./server-app
```

The make file also points out a critical problem with the state of Web Assembly today.  Modern browsers will ignore WASM files unless they're served with the proper MIME type.  [This article](https://blog.owulveryck.info/2018/06/08/some-notes-about-the-upcoming-webassembly-support-in-go.html) had a simple HTTP file server that sets the right MIME type for web assembly files.  I copied it into my project and use it to serve the app.  If your web server does the right thing for `.wasm` files, you don't need a custom server.

### Nerd Sniped
It was at this point that I realized that Web Assembly worked really well, and maybe more importantly: much of the code for GopherJS would work with little or no modifications in Web Assembly.  I [nerd sniped](https://xkcd.com/356/) myself.  The next thing I attempted was to take a [vecty](https://github.com/gopherjs/vecty) application and compile it.  It failed pretty hard because vecty is written for GopherJS, and uses the `js.Object` types instead of `js.Value`.  I [forked vecty](https://github.com/gowasm/vecty) and made some modifications, some hacks, and commented out too much code to make vecty compile in wasm.

The end result was that the live markdown editor in the `vecty/examples` folder runs beautifully in Web Assembly.  This post is getting a little wordy, so I'll let you read the source [here](https://github.com/bketelsen/wasmplay/tree/master/markdownvecty). TL;DR: it's almost exactly the same as the GopherJS version, but web assembly exits when main() exits, so I added an empty channel receive at the end of main() to prevent the exit and keep the app running.

### Events
`syscall/js` in Go uses a very different method of registering events.  I had to modify vecty's [event registration](https://github.com/gowasm/vecty/blob/wasm-wip/dom.go#L231) code to use the new wasm method of callback registration.  It took me far too long to figure this out, but it works really well now.

### Conclusion

<blockquote class="twitter-tweet" data-lang="en"><p lang="en" dir="ltr">2005: Rails<br>2010: Go<br>2013: Docker <br>2018: Web assembly is going to democratize the frontend.  I&#39;m predicting that in 2 years or less, Go, Swift, Rust will be 1/3 of the frontend code</p>&mdash; Brian Ketelsen (@bketelsen) <a href="https://twitter.com/bketelsen/status/1009989486346948608?ref_src=twsrc%5Etfw">June 22, 2018</a></blockquote>
<script async src="https://platform.twitter.com/widgets.js" charset="utf-8"></script>

After playing with this for a few hours over the course of several evenings, I've decided that Web Assembly is the future of web development.  It enables any language that can compile to wasm to be a "frontend" language.  That's huge for old people like me who never really wanted to get into the Javascript ecosystem, and it's huge for all the languages that aren't Javascript. 

*You can find the source code for these demo applications [here](https://github.com/bketelsen/wasmplay).  Use at your own risk, it may destroy your computer, and it's definitely hacky code!* 

> Image Credit [webassembly.org](https://webassembly.org/)
> [GopherJS](https://gopherjs.org)
> [Vecty](https://github.com/gopherjs/vecty)
> 
> GopherJS and Vecty are open source projects created by @neelance, @slimsag and many others.
