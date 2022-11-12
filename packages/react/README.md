# react-watching-you

<a href="https://www.npmjs.com/package/react-watching-you"><img src="https://badge.fury.io/js/react-watching-you.svg" alt="npm version" height="18"></a>

## Installation

### npm

```
npm install react-watching-you
```

### yarn

```
yarn add react-watching-you
```

## Quickstart

```javascript
import WatchingYou, { useWatchingYou } from 'react-watching-you';

// 1
const App = () => {
  const watchingYouOptions = { /* options... */ };
  return (
    <WatchingYou {...watchingYouOptions}>
      <div>O</div>
    </WatchingYou>
  );
};

// 2
const App = () => {
  const watchingYouOptions = { /* options... */ };
  const [watchingYouWatcherProps] = useWatchingYou(watchingYouOptions); 
  return <div {...watchingYouWatcherProps}>O</div>;
};
```

## API Reference

### Props

|name|type|default|description|
|----|----|-------|-----------|
|active| boolean | true | Decide whether to start watching |
|children| ReactNode | undefined | The DOM that becomes the eye, i.e. the DOM that is given the css transform ||
|target| string \| HtmlElement | undefined | The DOM being watched |
|targetType| 'mouse' \| 'dom' \| 'input' \| 'textarea' | 'mouse' | `watching-you` determines the subsequent behavior based on the `targetType`. |
|power| number \| {x: number, y: number} | 50 | The maximum displacement distance of the watcher, which is always a circle |
|rotatable| boolean | true | Does Watcher rotate|
|movable| boolean | true | Does Watcher move |

## Storybook

<a href="https://jj811208.github.io/watching-you" target="_blank">https://jj811208.github.io/watching-you</a>
