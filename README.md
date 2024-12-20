# Project name: **Placard.js-light**

> _This is the lightweight version of another project called **"Placard.js"** I am actively working on._

---

### Motivation

> For the past couple of years from sit-to-sit I was using **Konva.js** as a graphical tool to learn various aspects of Maths and beyond, for that Konva.js is a great choice, consider a [Excel-like UI](https://youtube.com/playlist?list=PL7JUsQnnxGCsfxAjqhqPzBYHxk2o4u2bo&si=F-IaKSHgk79XAXw_), or a basic image editing solution with infinite canvas – [Konva.js showcase](https://konvajs.org/docs/sandbox/index.html), etc._, but then it comes about truly responsive web experience (hereinafter as – "RWX"), sadly it remains behind its competitors (at least RWX-wise), and one of those is **Placard.js**, specifically – "**Placard.js-light**".

> _Credits to this [article](https://joshuatz.com/posts/2022/canvas-hit-detection-methods/) by [Joshua Tzucker ](https://www.linkedin.com/in/joshuatzucker/)_, "Placard.js-light" is capable of providing nearly to what we call "out-of-the-box" responsive [Canvas API](https://html.spec.whatwg.org/multipage/canvas.html) web experience (_see mentioning `responsiveValue` below in the text_) !

### How to use

> Majority of the time, you will touch only the following files:
- **`./main.js`** : this is where you write your "implementation" using Placard.js-light as a wrapper
  - **`./implmentation/<name-without-angle-brackets>.js`** : recently added file-system-level modular implementation, where `<name-without-angle-brackets>.js` e.g. `wireframe.js` is _a virtual implementation of `Placard.js-light` as specification (i.e. Canvas API wrapper)_, whose the only goal is to make `./main.js` file containing as few code lines as possible.
- **`./user-settings.js`** : this is where you define your "defaults" (i.e. globals) on top of existing ones : _at the time of writing this, only very few are defined, of which perhaps most important to mention, is `responsiveValue` used as multiplicator for matrix transformations such as translation (usually this specific value accessed via `context.global.options.responsiveValue` found in Placard specification rather than its implementation, such as `./src/views/line.js`, thus it is abstracted away) – the only goal it has, is to make sure translation itself is well-responsive with the rest of content drawn on canvas_.

Okay, once you have examined the files, open the **`./main.js`** where you will find `switch` statement in the source code, whereas each `case` of such `switch` statement is striving to match against `canvas.name` evaluated in run-time : the `canvas.name` itself is given during Canvas (hereinafter – "Layer") registration, currently the source code contains two Layers registered, as follows:

```js
const stage = new Placard.ViewGroup.Stage({});
    stage.add([
        new Placard.ViewGroup.Layer({name: 'grid', opacity: 0.25, hidden: !true})
        ,
        new Placard.ViewGroup.Layer({name: 'your-implementation', opacity: 0.25, hidden: !true})
        ,
    ]);
```

Now as we registered the Layer with `name := 'your-implementation'`, we have to match against it within **switch** statement, where the following `case` would look like the following:

> **NOTE** : each `case`'s order MAY NOT match the `stage.add`'s list order, consider switch statement as follows:..

```js
// ...
switch(canvas.name) {

    case 'your-implementation':
        // All `context` manipulations goes here: please refer ./main.js for examples
    break;
    
    case 'grid' :
        Placard.Views.Grid.draw({
            canvas: stage.layers.grid, 
            options: {
                lineWidth: 2,
            }}
        );
    break;

}
// ...
```

---

### Building (production)

### GitHub Pages

##### PWA-INCOMPLETE BUILD

Run the following command: `GITHUB_READY=1 npx vite build` | Default is for `npx vite preview` (i.e. `GITHUB_READY` resolves to _false-ish_ empty string); 

**NOTE**: Please expect broken paths during the `npx vite preview` if `GITHUB_READY=1` was given for `npx vite build`, in such cases `npx vite preview` would simply load blank page with some console error attached to debugger of your PWA host environment.

##### PWA-COMPLETE BUILD

Unless someone would love to contribute by writing a Vite.js plugin for the following case (_i.e. properly replacing HTML href for LINK tag_), the following changes (see AFTER) considered as the only PREREQUISITE for what is given in **PWA-INCOMPLETE BUILD**:

> BEFORE

```html
    <link rel="manifest" href="/manifest.json"><!-- vite [serve] (development) -->
    <!-- <link rel="manifest" href="/manifest.prod.json"> --><!-- vite build (production) -->
```

> AFTER

```html
    <!-- <link rel="manifest" href="/manifest.json"> --><!-- vite [serve] (development) -->
    <link rel="manifest" href="/manifest.prod.json"><!-- vite build (production) -->
```

> Common sense, this subsequently would require to handle the paths manually in `manifest.prod.json`. Nevertheless, this is so far the easiest way, rather than writing a plugin, which in turn would handle things during run-time...

---

### Troubleshooting

> NOTE: If you encounter unexpected behavior due to typo(s) in the source code or you found something poorly-documented in README.md, or you simply want to improve something or add more examples, please report an issue on this repository. Thank you for your precious time, developer !

### Credits

- PWA is based on [web.dev](https://web.dev/learn/pwa) guidelines and good practices;
- Icons found in `/public/pwa/images/` are [Designed by Freepik](https://www.freepik.com/icon/android_6424298#fromView=search&page=1&position=27&uuid=b1e6241a-d535-4fc9-ba15-95748332be6a);
- Icons generated using [maskable.app](https://maskable.app/editor);

---

> Made with ♥ by [**projektorius96**](https://github.com/projektorius96).