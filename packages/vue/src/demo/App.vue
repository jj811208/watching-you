<script setup lang="ts">
import WatchingYou from '../component.vue'
</script>

<template>
  <WatchingYou :active="true" :power="1000" :movable="false"  v-slot="watchingYouProps">
    <div :className="watchingYouProps.className" :style="watchingYouProps.style">1</div>
  </WatchingYou>
</template>