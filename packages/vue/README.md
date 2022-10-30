# vue-watching-you

<a href="https://www.npmjs.com/package/vue-watching-you"><img src="https://badge.fury.io/js/vue-watching-you.svg" alt="npm version" height="18"></a>

Watching-you is a javascript library for building animations that watch anything on DOM.

![watching your mouse](https://github.com/jj811208/watching-you/blob/main/static/1.gif)(watching your mouse)

![watching your input value](https://github.com/jj811208/watching-you/blob/main/static/2.gif)(watching your input value)

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
  <WatchingYou :active="true"  v-slot="watchingYouProps"> <!-- another options...-->
    <span
      :className="watchingYouProps.className"
      :style="watchingYouProps.style"
    >
      O
    </span>
  </WatchingYou>
</template>

// 2
<script setup lang="ts">
import { useWatchingYou } from 'vue-watching-you';
const watchingYouOptions = { active: true, /* another options... */};
const watchingYou = useWatchingYou(watchingYouOptions);
</script>

<template>
  <span
    :className="watchingYou.className"
    :style="watchingYou.style"
  >
    O
  </span>
</template>
```

## API Reference

This is the storybook for react but their props are exactly the same.

<a href="https://jj811208.github.io/watching-you" target="_blank">https://jj811208.github.io/watching-you</a>
