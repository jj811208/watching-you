import {
  reactive,
  ref,
  watchEffect,
  onUnmounted,
  onMounted,
} from 'vue';
import WatchingYouBase, {
  WatchingYouOptions,
} from '../../core/src/index';

interface WatchingYouVueProps
  extends Omit<WatchingYouOptions, 'customRender'> {
  active?: boolean;
}

function useWatchingYou(props: WatchingYouVueProps) {
  const className = `watching-you--watcher--${Math.random()}${Math.random()}`.split('.').join('');
  const style = reactive({
    transform: `translate(0px,0px) rotate(0deg)`,
  });

  const instance = ref(
    new WatchingYouBase(`.${className}`, {
      ...props,
      customRender: (newTransform) => {
        style.transform = `translate(${newTransform.translate.x}px,${newTransform.translate.y}px) rotate(${newTransform.rotate}deg)`;
      },
    }),
  );

  watchEffect(() => {
    instance.value.setTarget({
      target: props.target,
      targetType: props.targetType,
    });
  });
  watchEffect(() => {
    instance.value.setPower(props.power);
  });
  watchEffect(() => {
    instance.value.setRotatable(props.rotatable);
  });
  watchEffect(() => {
    instance.value.setMovable(props.movable);
  });
  onMounted(() => {
    instance.value.setWatcher(`.${className}`);
  });
  watchEffect(() => {
    if (props.active) {
      instance.value.start();
    } else {
      instance.value.stop();
    }
  });
  onUnmounted(instance.value.stop);

  return {
    style,
    className,
    instance,
  };
}
export default useWatchingYou;
export type { WatchingYouVueProps };
