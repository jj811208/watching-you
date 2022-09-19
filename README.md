# Watching-you

<a href="https://www.npmjs.com/package/watching-you"><img src="https://badge.fury.io/js/watching-you.svg" alt="npm version" height="18"></a>
<a href="https://github.com/jj811208/watching-you/actions/workflows/deploy-storybook.yml"><img src="https://github.com/jj811208/watching-you/actions/workflows/deploy-storybook.yml/badge.svg" alt="deploy-storybook" height="18"></a>
<a href="https://github.com/jj811208/watching-you/actions/workflows/npm-publish-core.yml"><img src="https://github.com/jj811208/watching-you/actions/workflows/npm-publish-core.yml/badge.svg" alt="npm-publish-core" height="18"></a>
<a href="https://github.com/jj811208/watching-you/actions/workflows/npm-publish-react.yml"><img src="https://github.com/jj811208/watching-you/actions/workflows/npm-publish-react.yml/badge.svg" alt="npm-publish-react" height="18"></a>

Watching-you is a javascript library for building animations that watch anything on DOM.

![watching your mouse](https://github.com/jj811208/watching-you/blob/main/static/1.gif)(watching your mouse)

![watching your input value](https://github.com/jj811208/watching-you/blob/main/static/2.gif)(watching your input value)

## Storybook

<a href="https://jj811208.github.io/watching-you" target="_blank">Storybook</a>

## Todo

- [ ] readme
- [ ] vue watching-you
- [ ] more demo

## Features

- Zero dependency (every framework is!)
- The size of the core code is only `3kb` after gzip compression
- Ability to watch mouse or DOM or even input values, watch anything you want!
- Written in typescript
- Supports multiple frameworks
- If the element is not on the screen, it will automatically stop running

## Documents

- [Vanilla.js](https://github.com/jj811208/watching-you/tree/main/packages/core)
- [React](https://github.com/jj811208/watching-you/tree/main/packages/react)
- Vue (Todo)
<!-- - [Vue](https://github.com/jj811208/watching-you/blob/main/packages/vue) -->

## Known limitations

- When watching `input`, the `text-align` attribute must be `left`
- Only `px` are supported

## Contributions

If anyone wants to contribute, please open a issue and let me know, I'd be happy to write `CONTRIBUTING.md`.

## License

[ISC](https://github.com/jj811208/watching-you/blob/main/LICENSE.md)