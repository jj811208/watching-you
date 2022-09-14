import {
  WatchingYouTargetDom,
  WatchingYouTargetInput,
  WatchingYouTargetMouse,
} from '../type/Target';

function isTargetMouse(targetProps?: {
  target?: unknown;
  targetType?: unknown;
}): targetProps is WatchingYouTargetMouse {
  return (
    !targetProps ||
    targetProps.targetType === 'mouse' ||
    (!targetProps.targetType && !targetProps.target)
  );
}
function isTargetDom(targetProps?: {
  target?: unknown;
  targetType?: unknown;
}): targetProps is WatchingYouTargetDom {
  if (!targetProps) return false;
  return (
    targetProps.targetType === 'dom' ||
    (!targetProps.targetType && !!targetProps.target)
  );
}
function isTargetInput(targetProps?: {
  target?: unknown;
  targetType?: unknown;
}): targetProps is WatchingYouTargetInput {
  if (!targetProps) return false;
  // if(!watch) log(`If the targetType parameter is input, then the watch must be a input`,'warn');
  return targetProps.targetType === 'input';
}

export { isTargetMouse, isTargetDom, isTargetInput };
