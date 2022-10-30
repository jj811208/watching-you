# react-watching-you

<a href="https://www.npmjs.com/package/react-watching-you"><img src="https://badge.fury.io/js/react-watching-you.svg" alt="npm version" height="18"></a>

Watching-you is a javascript library for building animations that watch anything on DOM.

![watching your mouse](https://github.com/jj811208/watching-you/blob/main/static/1.gif)(watching your mouse)

![watching your input value](https://github.com/jj811208/watching-you/blob/main/static/2.gif)(watching your input value)

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

// render props
const App = () => {
  return (
    <WatchingYou>
      <div>O</div>
    </WatchingYou>
  );
};

// hook
const App = () => {
  const [watchingYouWatcherProps] = useWatchingYou(watchingYouProps);
  return <div {...watchingYouWatcherProps}>O</div>;
};
```

## API Reference

<a href="https://jj811208.github.io/watching-you" target="_blank">https://jj811208.github.io/watching-you</a>
