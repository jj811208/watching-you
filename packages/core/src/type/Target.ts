interface WatchingYouTargetMouse {
  targetType?: 'mouse';
  target?: undefined;
}
interface WatchingYouTargetDom {
  targetType?: 'dom';
  target: string | HTMLElement;
}
interface WatchingYouTargetInput {
  targetType: 'input';
  target: string | HTMLElement;
}

export type {
  WatchingYouTargetMouse,
  WatchingYouTargetDom,
  WatchingYouTargetInput,
};
