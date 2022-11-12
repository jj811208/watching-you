# vue-watching-you

<a href="https://www.npmjs.com/package/vue-watching-you"><img src="https://badge.fury.io/js/vue-watching-you.svg" alt="npm version" height="18"></a>

## Installation

### npm

```
npm install vue-watching-you
```

### yarn

```
yarn add vue-watching-you
```

## Quickstart

```vue
// 1
<script setup lang="ts">
import WatchingYou from 'vue-watching-you';
</script>

<template>
  <WatchingYou v-slot="watchingYouProps" :active="true"> <!-- another options...-->
    <div
      :className="watchingYouProps.className"
      :style="watchingYouProps.style"
    >
      O
    </div>
  </WatchingYou>
</template>

// 2
<script setup lang="ts">
import { useWatchingYou } from 'vue-watching-you';
const watchingYouOptions = { active: true, /* another options... */};
const watchingYou = useWatchingYou(watchingYouOptions);
</script>

<template>
  <div
    :className="watchingYou.className"
    :style="watchingYou.style"
  >
    O
  </div>
</template>
```

## API Reference

### Props

|name|type|default|description|
|----|----|-------|-----------|
|active| boolean | true | Decide whether to start watching |
|target| string \| HtmlElement | undefined | The DOM being watched |
|targetType| 'mouse' \| 'dom' \| 'input' \| 'textarea' | 'mouse' | `watching-you` determines the subsequent behavior based on the `targetType`. |
|power| number \| {x: number, y: number} | 50 | The maximum displacement distance of the watcher, which is always a circle |
|rotatable| boolean | true | Does Watcher rotate|
|movable| boolean | true | Does Watcher move |

## Storybook

This is the storybook for react but their props are exactly the same.

<a href="https://jj811208.github.io/watching-you" target="_blank">https://jj811208.github.io/watching-you</a>
