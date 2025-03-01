<a href="https://github.com/jj811208/watching-you">
  <img alt="watching-you" src="https://github.com/jj811208/watching-you/blob/main/.github/static/banner.png"/>
</a>

<p align="center">
  <a href="https://www.npmjs.com/package/watching-you"><img src="https://badge.fury.io/js/watching-you.svg" alt="npm version" height="18"></a>
  <a href="https://github.com/jj811208/watching-you/actions/workflows/deploy-page.yml"><img src="https://github.com/jj811208/watching-you/actions/workflows/deploy-page.yml/badge.svg" alt="deploy-page" height="18"></a>
  <a href="https://github.com/jj811208/watching-you/actions/workflows/npm-publish-core.yml"><img src="https://github.com/jj811208/watching-you/actions/workflows/npm-publish-core.yml/badge.svg" alt="npm-publish-core" height="18"></a>
  <a href="https://github.com/jj811208/watching-you/actions/workflows/npm-publish-react.yml"><img src="https://github.com/jj811208/watching-you/actions/workflows/npm-publish-react.yml/badge.svg" alt="npm-publish-react" height="18"></a>
  <a href="https://github.com/jj811208/watching-you/actions/workflows/npm-publish-vue.yml"><img src="https://github.com/jj811208/watching-you/actions/workflows/npm-publish-vue.yml/badge.svg" alt="npm-publish-vue" height="18"></a>
</p>

<p align="center">
  <img alt="watching your mouse" src="https://github.com/jj811208/watching-you/blob/main/.github/static/1.gif" height="320" />
  <img alt="watching your input value" src="https://github.com/jj811208/watching-you/blob/main/.github/static/2.gif" height="320" />
</p>

## Features

- Be able to watch the mouse or another DOM, or even input values, watch anything you want!
- Because it is DOM-based, it is easy to support RWD
- Supports multiple frameworks
- Zero dependency (every framework is!)
- Written in typescript
- The size of the core code is only 3kb after gzip compression
- If the element is not on the screen, it will automatically stop watching

## Example

- <a href="https://jj811208.github.io/watching-you/#/example/login" target="_blank">Login Form</a>
- <a href="https://jj811208.github.io/watching-you/#/example/iron-chain" target="_blank">Iron Chain</a>
- <a href="https://jj811208.github.io/watching-you/#/example/cena" target="_blank">Cena is watching you</a>
- <a href="https://jj811208.github.io/watching-you/#/example/svg-path" target="_blank">Svg Path Watcher</a>

The source code can be found <a href="https://github.com/jj811208/watching-you/blob/main/packages/website/README.md" target="_blank">here</a>

## Storybook

watching-you's storybook using react, but every framework can do the same thing!

<a href="https://jj811208.github.io/watching-you/storybook" target="_blank">https://jj811208.github.io/watching-you/storybook</a>

## Documents

⚠️ The API is still subject to change until version 1.0.0 is released ⚠️

- [Vanilla.js](https://github.com/jj811208/watching-you/tree/main/packages/core)
- [React](https://github.com/jj811208/watching-you/tree/main/packages/react)
- [Vue](https://github.com/jj811208/watching-you/tree/main/packages/vue)

## Compatibility

If you use `watching-you` directly without any compiler(babel), (e.g. Wordpress project using [CDN](https://cdn.jsdelivr.net/npm/watching-you/dist/watching-you.umd.cjs) import `watching-you`)

|           | Chrome | Firefox | Safari | Edge | Opera | iOS Safari/Chrome | Android Chrome |
|-----------|--------|---------|--------|------|-------|-------------------|----------------|
| Supported |   70+  |   73+   |  14.1+ |  80+ |  70+  |        14.1+      |        ✔       |

But if you use a compiler like babel and import polyfill, it can even support IE11

Some references: <br/>
https://babeljs.io/ <br/>
https://github.com/vitejs/vite/tree/main/packages/plugin-legacy

## Note

- When watching `input` or `textarea`, the `text-align` attribute must be `left`
- Some inline elements ignore the `transform` attribute (let's say `span`), so you have to give them the `display` attribute to work properly. (see: https://stackoverflow.com/questions/24961795/how-can-i-use-css3-transform-on-a-span)
- You may need something like `transition: transform .1s` depending on your needs

## Contributing
[see](https://github.com/jj811208/watching-you/blob/main/CONTRIBUTING.md)

## License

[ISC](https://github.com/jj811208/watching-you/blob/main/LICENSE.md)
