# watching-you

<a href="https://www.npmjs.com/package/watching-you"><img src="https://badge.fury.io/js/watching-you.svg" alt="npm version" height="18"></a>

Watching-you is a javascript library for building animations that watch anything on DOM.

![watching your mouse](https://github.com/jj811208/watching-you/blob/main/static/1.gif)(watching your mouse)

![watching your input value](https://github.com/jj811208/watching-you/blob/main/static/2.gif)(watching your input value)

## Installation

### ESM

#### npm

```
npm install watching-you
```

#### yarn

```
yarn add watching-you
```

### UMD

```html
<!--HTML-->
<head>
  <script src="https://unpkg.com/watching-you@0.0.5/dist/watching-you.umd.cjs"></script>
</head>
```

## Quickstart

### HTML

```html
<span class="eye">O</span>
```

### JavaScript

#### UMD

```javascript
const WatchingYou = window['watching-you'];

const watcher = new WatchingYou('.eye');
watcher.start();
```

#### ESM

```javascript
import WatchingYou from 'watching-you';

const watcher = new WatchingYou('.eye');
watcher.start();
```

## API Reference

```typescript
type WatchingYouWatcher = string | Element;
type WatchingYouTarget = string | Element;
type WatchingYouTargetType = 'mouse' | 'dom' | 'input';
type WatchingYouPower = number | { x?: number; y?: number };

interface WatchingYouOptions {
  target?: WatchingYouTarget;
  targetType?: WatchingYouTargetType;
  power?: WatchingYouPower;
  render?: WatchingYouRender;
  rotatable?: boolean;
  movable?: boolean;
}

class WatchingYou{
   constructor (watcherOrOptions?: WatchingYouWatcher | WatchingYouOptions,optionsBase: WatchingYouOptions = {}){}
   setWatcher = (watcher?: WatchingYouWatcher): void
   setRotatable = (rotatable: boolean = true): void
   setMovable = (movable: boolean = true): void
   setTarget = (targetProps?: { target?: WatchingYouTarget; targetType?: WatchingYouTargetType; }): void
   setCustomRender = (render?: WatchingYouRender): void
   setPower = (power?: WatchingYouPower):void
   start = (): void
   stop = (): void
}
```
