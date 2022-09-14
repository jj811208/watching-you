import { WatchingYouTargetDom, WatchingYouTargetInput, WatchingYouTargetMouse } from '../type/Target';
declare function isTargetMouse(targetProps?: {
    target?: unknown;
    targetType?: unknown;
}): targetProps is WatchingYouTargetMouse;
declare function isTargetDom(targetProps?: {
    target?: unknown;
    targetType?: unknown;
}): targetProps is WatchingYouTargetDom;
declare function isTargetInput(targetProps?: {
    target?: unknown;
    targetType?: unknown;
}): targetProps is WatchingYouTargetInput;
export { isTargetMouse, isTargetDom, isTargetInput };
