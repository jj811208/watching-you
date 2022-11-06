# watching-you

<a href="https://www.npmjs.com/package/watching-you"><img src="https://badge.fury.io/js/watching-you.svg" alt="npm version" height="18"></a>

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
  <script src="https://cdn.jsdelivr.net/npm/watching-you/dist/watching-you.umd.cjs"></script>
</head>
```

## Quickstart

### HTML

```html
<div class="eye">O</div>
```

### JavaScript

#### ESM

```javascript
import WatchingYou from 'watching-you';

const options = {/* options */};
const watcher = new WatchingYou('.eye', options);
watcher.start();
```

#### UMD

```javascript
const WatchingYou = window['watching-you'];

const options = {/* options */};
const watcher = new WatchingYou('.eye', options);
watcher.start();
```

## API Reference

### Initialize

```javascript
new WatchingYou(watcher, restOptions);
new WatchingYou(options);
```

### Options

|name|type|default|description|
|----|----|-------|-----------|
|watcher| string \| HtmlElement | undefined | The DOM that becomes the eye, i.e. the DOM that is given the css transform |
|target| string \| HtmlElement | undefined | The DOM being watched |
|targetType| 'mouse' \| 'dom' \| 'input' | 'mouse' | `watching-you` determines the subsequent behavior based on the `targetType`. |
|power| number \| {x: number, y: number} | 50 | The maximum displacement distance of the watcher, which is always a circle |
|rotatable| boolean | true | Does Watcher rotate|
|movable| boolean | true | Does Watcher move |

### Method
|name|type|description|
|----|----|-----------|
|start| (): void | Start watching |
|stop| (): void | Stop watching |
|setWatcher| (watcher?: string \| HtmlElement): void |Change `watcher` property |
|setTarget| (targetProps?: {target?: string \| HtmlElement; targetType?: 'mouse' \| 'dom' \| 'input'; }): void | Change `target` and `targetType` properties |
|setPower| (power: number \| {x: number, y: number}):void | Change `power` property |
|setRotatable| (rotatable: boolean = true): void | Change `rotatable` property |
|setMovable| (movable: boolean = true): void | Change `movable` property |
