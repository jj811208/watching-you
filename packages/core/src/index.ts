import { Coordinate } from './type/Coordinate';
import getDomTranslateProp from './util/getDomTranslateProp';
import { round } from './util/math';
import { isHtmlElement } from './util/type';
import TargetPlugins from './targetPlugin';

interface WatchingYouRenderTransform {
  translate: {
    x: number;
    y: number;
  };
  rotate: number;
}
type WatchingYouRender = (
  transform: WatchingYouRenderTransform,
) => void;

type WatchingYouWatcher = string | Element;
type WatchingYouTarget = string | Element;
type WatchingYouTargetType = keyof typeof TargetPlugins;
type WatchingYouPower = number | { x?: number; y?: number };
interface WatchingYouOptions {
  target?: WatchingYouTarget;
  targetType?: WatchingYouTargetType;
  power?: WatchingYouPower;
  customRender?: WatchingYouRender;
  rotatable?: boolean;
  movable?: boolean;
}
const DEFAULT_POWER = 50;
const DEFAULT_TARGET_TYPE = 'mouse';
const ORIGIN_TRANSFORM = {
  translate: { x: 0, y: 0 },
  rotate: 0,
};

class WatchingYou {
  #watcherSelector: string | null = null;
  #watcher: HTMLElement | null = null;
  #watcherPosition: Coordinate | null = null;
  #targetPosition: Coordinate | null = null;
  #activeTargetPlugin: any = null;
  #lastRenderingWatcherPosition: Coordinate | null = null;
  #lastRenderingTargetPosition: Coordinate | null = null;
  #rotatable: boolean = true;
  #movable: boolean = true;
  #powerX = DEFAULT_POWER;
  #powerY = DEFAULT_POWER;
  #customRender: WatchingYouRender | null = null;
  #rafId: number | null = null;

  constructor();
  constructor(
    options: WatchingYouOptions & { watcher?: WatchingYouWatcher },
  );
  constructor(
    watcher: WatchingYouWatcher,
    options: WatchingYouOptions,
  );
  constructor(watcherOrOptions?: any, optionsBase: any = {}) {
    const isFirstParamOptions =
      typeof watcherOrOptions === 'object' &&
      !isHtmlElement(watcherOrOptions);
    const watcher: WatchingYouWatcher = isFirstParamOptions
      ? watcherOrOptions.watcher
      : watcherOrOptions;
    const options: WatchingYouOptions = isFirstParamOptions
      ? watcherOrOptions
      : optionsBase;
    // TODO: Don't trust the parameters given by the user
    const {
      power,
      rotatable,
      movable,
      customRender,
      ...targetProps
    } = options;
    this.setCustomRender(customRender);
    this.setWatcher(watcher);
    this.setTarget(targetProps);
    this.setPower(power);
    this.setRotatable(rotatable);
    this.setMovable(movable);
  }

  #updateWatcherPosition = (): void => {
    if (this.#watcher === null) {
      if (this.#watcherSelector !== null)
        this.#watcher = document.querySelector(this.#watcherSelector);

      return;
    }
    const rect = this.#watcher.getBoundingClientRect();
    const translate = getDomTranslateProp(this.#watcher);
    const x = round(rect.left - translate.x + rect.width / 2);
    const y = round(rect.top - translate.y + rect.height / 2);
    this.#watcherPosition = { x, y };
  };

  #updateTargetPosition = (): void => {
    this.#targetPosition = this.#activeTargetPlugin.update();
  };

  #checkWatcherVisibility = (): boolean => {
    if (!this.#watcher) return false;
    const rect = this.#watcher.getBoundingClientRect();
    // not exact, but very efficient
    const boundaryY = this.#powerY * 2;
    const boundaryX = this.#powerX * 2;
    const top = rect.top - boundaryY;

    // early return, saving efficiency
    if (
      top >
      (window.innerHeight || document.documentElement.clientHeight)
    )
      return false;
    const bottom = rect.bottom + boundaryY;
    if (bottom < 0) return false;
    const left = rect.left - boundaryX;
    if (
      left >
      (window.innerWidth || document.documentElement.clientWidth)
    )
      return false;
    const right = rect.right + boundaryX;
    if (right < 0) return false;
    return true;
  };

  #calculateTransform = (): Parameters<WatchingYouRender>[0] => {
    const result: Parameters<WatchingYouRender>[0] = {
      translate: { x: 0, y: 0 },
      rotate: 0,
    };
    if (!this.#watcherPosition) return result;
    if (!this.#targetPosition) return result;
    if (!this.#movable && !this.#rotatable) return result;
    const deltaX = this.#targetPosition.x - this.#watcherPosition.x;
    const deltaY = this.#targetPosition.y - this.#watcherPosition.y;
    const symbolX = deltaX >= 0 ? 1 : -1;
    const symbolY = deltaY >= 0 ? 1 : -1;
    if (this.#movable) {
      const distanceX = Math.abs(deltaX);
      const distanceY = Math.abs(deltaY);
      const radians = Math.atan2(distanceY, distanceX);
      const translateX =
        Math.min(distanceX, Math.cos(radians) * this.#powerX) *
        symbolX;
      const translateY =
        Math.min(distanceY, Math.sin(radians) * this.#powerY) *
        symbolY;
      result.translate.x = round(translateX);
      result.translate.y = round(translateY);
    }
    if (this.#rotatable) {
      const degrees = (Math.atan2(deltaY, deltaX) * 180) / Math.PI;
      result.rotate = round(degrees + 90);
    }
    return result;
  };

  #defaultRender: WatchingYouRender = (transform) => {
    if (!this.#watcher) return;
    this.#watcher.style.transform = `translate3d(${transform.translate.x}px,${transform.translate.y}px,0px) rotate(${transform.rotate}deg)`;
  };

  #needRender = (): boolean => {
    if (
      this.#lastRenderingWatcherPosition?.x !==
      this.#watcherPosition?.x
    )
      return true;
    if (
      this.#lastRenderingWatcherPosition?.y !==
      this.#watcherPosition?.y
    )
      return true;
    if (
      this.#lastRenderingTargetPosition?.x !== this.#targetPosition?.x
    )
      return true;
    if (
      this.#lastRenderingTargetPosition?.y !== this.#targetPosition?.y
    )
      return true;
    return false;
  };

  #render = (): void => {
    const transform = this.#calculateTransform();
    if (this.#customRender) {
      this.#customRender(transform);
    } else {
      this.#defaultRender(transform);
    }
    this.#lastRenderingWatcherPosition = this.#watcherPosition;
    this.#lastRenderingTargetPosition = this.#targetPosition;
  };

  // To avoid internal state modification by users, so the attributes should be a new object.
  getState = () => {
    const state = {
      watcher: this.#watcher,
      watcherPosition: {
        x: this.#watcherPosition?.x || 0,
        y: this.#watcherPosition?.y || 0,
      },
      target: this.#activeTargetPlugin.target,
      targetPosition: {
        x: this.#targetPosition?.x || 0,
        y: this.#targetPosition?.y || 0,
      },
      targetType: this.#activeTargetPlugin.name,
      rotatable: this.#rotatable,
      movable: this.#movable,
      power: {
        x: this.#powerX,
        y: this.#powerY,
      },
      active: !!this.#rafId,
    };
    return state;
  };

  setWatcher = (watcher?: WatchingYouWatcher): void => {
    if (!watcher) return;
    if (isHtmlElement(watcher)) {
      this.#watcher = watcher;
    } else if (typeof watcher === 'string') {
      this.#watcherSelector = watcher;
      this.#watcher = document.querySelector(watcher);
    } else {
      console.error(`Unexpected watcher: ${JSON.stringify(watcher)}`);
    }
  };

  setRotatable = (rotatable: boolean = true): void => {
    this.#rotatable = !!rotatable;
  };

  setMovable = (movable: boolean = true): void => {
    this.#movable = !!movable;
  };

  setTarget = (targetProps?: {
    target?: WatchingYouTarget;
    targetType?: WatchingYouTargetType;
  }): void => {
    if (this.#rafId !== null && this.#activeTargetPlugin !== null) {
      this.#activeTargetPlugin.cleanup();
    }

    let targetType: WatchingYouTargetType = DEFAULT_TARGET_TYPE;

    if (
      targetProps &&
      !targetProps.targetType &&
      !!targetProps.target
    ) {
      targetType = 'dom';
    } else if (targetProps?.targetType) {
      targetType = targetProps.targetType;
    }

    // TODO: Remove any type
    this.#activeTargetPlugin = new TargetPlugins[targetType](
      targetProps?.target as any,
    );

    if (this.#rafId !== null && this.#activeTargetPlugin !== null) {
      this.#activeTargetPlugin.setup();
    }
  };

  setCustomRender = (render?: WatchingYouRender): void => {
    if (render !== undefined) {
      this.#customRender = render;
    }
  };

  setPower = (power?: WatchingYouPower): void => {
    if (power !== undefined) {
      if (typeof power === 'number') {
        this.#powerX = power;
        this.#powerY = power;
        return;
      }
      if (power?.x !== undefined) this.#powerX = power.x;
      if (power?.y !== undefined) this.#powerY = power.y;
    }
  };

  start = (): void => {
    if (this.#rafId !== null) return;
    this.#activeTargetPlugin.setup();
    const nextRaf = () => {
      if (this.#checkWatcherVisibility()) {
        this.#updateWatcherPosition();
        this.#updateTargetPosition();
        if (this.#needRender()) {
          this.#render();
        }
      }
      this.#rafId = requestAnimationFrame(nextRaf);
    };
    nextRaf();
  };

  stop = (): void => {
    if (this.#rafId === null) return;

    this.#activeTargetPlugin.cleanup();

    cancelAnimationFrame(this.#rafId || 0);
    this.#rafId = null;
    if (this.#watcher) {
      if (this.#customRender) {
        this.#customRender(ORIGIN_TRANSFORM);
      } else {
        this.#defaultRender(ORIGIN_TRANSFORM);
      }
    }
  };
}

export default WatchingYou;
export type {
  WatchingYouRenderTransform,
  WatchingYouRender,
  WatchingYouWatcher,
  WatchingYouTarget,
  WatchingYouTargetType,
  WatchingYouPower,
  Coordinate as WatchingYouCoordinate,
  WatchingYouOptions,
};
