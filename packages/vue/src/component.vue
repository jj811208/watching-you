
<script setup lang="ts">
import useWatchingYou from './hook';
import { WatchingYouTarget, WatchingYouTargetType, WatchingYouPower } from '../../core/src';

// vue does not seem to work on defineProps in this way
// interface WatchingYouVueProps
//   extends Omit<WatchingYouOptions, 'customRender'> {
//   active?: boolean;
// }

interface WatchingYouVueProps{
  target?: WatchingYouTarget;
  targetType?: WatchingYouTargetType;
  power?: WatchingYouPower;
  rotatable?: boolean;
  movable?: boolean;
  active?: boolean;
}
// Give to core to decide default value
const props = withDefaults(defineProps<WatchingYouVueProps>(),{
  target: undefined,
  targetType: undefined,
  power: undefined,
  rotatable: undefined,
  movable: undefined,
  active: undefined,
});
const watchingYou = useWatchingYou(props);
</script>


<template>
  <slot :className="watchingYou.className" :style="watchingYou.style"/>
</template>
