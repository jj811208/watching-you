<a href="https://github.com/jj811208/watching-you">
  <img alt="watching-you" src="https://socialify.git.ci/jj811208/watching-you/image?description=1&descriptionEditable=Watching-you%20is%20a%20javascript%20library%20for%20building%20animations%20that%20watch%20anything%20on%20DOM.&font=Inter&language=1&logo=https%3A%2F%2Femojipedia-us.s3.dualstack.us-west-1.amazonaws.com%2Fthumbs%2F120%2Fapple%2F325%2Feyes_1f440.png&pattern=Charlie%20Brown&theme=Dark"/>
</a>

<p align="center">
  <a href="https://www.npmjs.com/package/watching-you"><img src="https://badge.fury.io/js/watching-you.svg" alt="npm version" height="18"></a>
  <a href="https://github.com/jj811208/watching-you/actions/workflows/deploy-page.yml"><img src="https://github.com/jj811208/watching-you/actions/workflows/deploy-page.yml/badge.svg" alt="deploy-page" height="18"></a>
  <a href="https://github.com/jj811208/watching-you/actions/workflows/npm-publish-core.yml"><img src="https://github.com/jj811208/watching-you/actions/workflows/npm-publish-core.yml/badge.svg" alt="npm-publish-core" height="18"></a>
  <a href="https://github.com/jj811208/watching-you/actions/workflows/npm-publish-react.yml"><img src="https://github.com/jj811208/watching-you/actions/workflows/npm-publish-react.yml/badge.svg" alt="npm-publish-react" height="18"></a>
  <a href="https://github.com/jj811208/watching-you/actions/workflows/npm-publish-vue.yml"><img src="https://github.com/jj811208/watching-you/actions/workflows/npm-publish-vue.yml/badge.svg" alt="npm-publish-vue" height="18"></a>
</p>

<p align="center">
  <img alt="watching your mouse" src="https://github.com/jj811208/watching-you/blob/main/static/1.gif" height="320" />
  <img alt="watching your input value" src="https://github.com/jj811208/watching-you/blob/main/static/2.gif" height="320" />
</p>

## Features
- Ability to watch mouse or another DOM or even input values, watch anything you want!
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

## Storybook

watching-you's storybook using react, but every framework can do the same thing!

<a href="https://jj811208.github.io/watching-you/storybook" target="_blank">https://jj811208.github.io/watching-you/storybook</a>

## Documents

- [Vanilla.js](https://github.com/jj811208/watching-you/tree/main/packages/core)
- [React](https://github.com/jj811208/watching-you/tree/main/packages/react)
- [Vue](https://github.com/jj811208/watching-you/tree/main/packages/vue)

## Known limitations

- When watching `input`, the `text-align` attribute must be `left`
- Only `px` are supported

## Compatibility

|           | Chrome | Firefox | Safari | Edge | Opera | iOS Safari/Chrome | Android Chrome |
|-----------|--------|---------|--------|------|-------|-------------------|----------------|
| Supported |   70+  |   73+   |  14.1+ |  80+ |  70+  |        14.1+      |        ✔       |


Changing build settings or adding polyfill should result in better compatibility, but for now, I think that's enough, and I don't want its bundle size to get any bigger.

## Contributions

If anyone wants to contribute, please open a issue and let me know, I'd be happy to write `CONTRIBUTING.md`.

## License

[ISC](https://github.com/jj811208/watching-you/blob/main/LICENSE.md)

## Todo

- [ ] more test
