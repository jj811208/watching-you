import { Coordinate } from './type/Coordinate';
interface WatchingYouRenderTransform {
    translate: {
        x: number;
        y: number;
    };
    rotate: number;
}
declare type WatchingYouRender = (transform: WatchingYouRenderTransform) => void;
declare type WatchingYouWatcher = string | HTMLElement;
declare type WatchingYouTarget = string | HTMLElement;
declare type WatchingYouTargetType = 'mouse' | 'dom' | 'input';
declare type WatchingYouPower = number | {
    x?: number;
    y?: number;
};
interface WatchingYouOptions {
    target?: WatchingYouTarget;
    targetType?: WatchingYouTargetType;
    power?: WatchingYouPower;
    render?: WatchingYouRender;
    rotatable?: boolean;
    movable?: boolean;
}
declare class WatchingYou {
    #private;
    constructor(watcher?: WatchingYouWatcher, options?: WatchingYouOptions);
    setWatcher: (watcher?: WatchingYouWatcher | undefined) => void;
    setRotatable: (rotatable?: boolean) => void;
    setMovable: (movable?: boolean) => void;
    setTarget: (targetProps?: {
        target?: WatchingYouTarget | undefined;
        targetType?: WatchingYouTargetType | undefined;
    } | undefined) => void;
    setCustomRender: (render?: WatchingYouRender | undefined) => void;
    setPower: (power?: WatchingYouPower | undefined) => void;
    start: () => void;
    cancel: () => void;
}
export default WatchingYou;
export type { WatchingYouRenderTransform, WatchingYouRender, WatchingYouWatcher, WatchingYouTarget, WatchingYouTargetType, WatchingYouPower, Coordinate as WatchingYouCoordinate, WatchingYouOptions, };
