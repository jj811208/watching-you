import { Coordinate } from './type/Coordinate';
import getDomTranslateProp from './util/getDomTranslateProp';
import log from './util/log';
import { round } from './util/math';
import {
  isTargetDom,
  isTargetInput,
  isTargetMouse,
} from './util/target';
import { isHtmlElement } from './util/type';

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
type WatchingYouWatcher = string | HTMLElement;
type WatchingYouTarget = string | HTMLElement;
type WatchingYouTargetType = 'mouse' | 'dom' | 'input';
type WatchingYouPower = number | { x?: number; y?: number };
interface WatchingYouOptions {
  target?: WatchingYouTarget;
  targetType?: WatchingYouTargetType;
  power?: WatchingYouPower;
  render?: WatchingYouRender;
  rotatable?: boolean;
  movable?: boolean;
}
const DEFAULT_POWER = 50;
const DEFAULT_OBSERVED_TYPE = 'mouse';
const ORIGIN_TRANSFORM = {
  translate: { x: 0, y: 0 },
  rotate: 0,
};

class WatchingYou {
  #customRender: WatchingYouRender | null = null;
  #watcherDom: HTMLElement | null = null;
  #targetDom: HTMLElement | null = null;
  #watcherPosition: Coordinate | null = null;
  #targetPosition: Coordinate | null = null;
  #lastRenderingWatcherPosition: Coordinate | null = null;
  #lastRenderingTargetPosition: Coordinate | null = null;
  #rotatable: boolean = true;
  #movable: boolean = true;
  #targetType: WatchingYouTargetType = DEFAULT_OBSERVED_TYPE;
  #powerX = DEFAULT_POWER;
  #powerY = DEFAULT_POWER;
  #fakeInputDom: HTMLElement | null = null;
  #rafId: number | null = null;

  constructor(
    watcher?: WatchingYouWatcher,
    options: WatchingYouOptions = {},
  ) {
    // TODO: Don't trust the parameters given by the user
    const { power, rotatable, movable, render, ...targetProps } =
      options;
    this.setCustomRender(render);
    this.setWatcher(watcher);
    this.setTarget(targetProps);
    this.setPower(power);
    this.setRotatable(rotatable);
    this.setMovable(movable);
  }

  #updateWatcherPosition = (): void => {
    if (this.#watcherDom === null) return;
    const rect = this.#watcherDom.getBoundingClientRect();
    const translate = getDomTranslateProp(this.#watcherDom);
    const x = round(rect.left - translate.x + rect.width / 2);
    const y = round(rect.top - translate.y + rect.height / 2);
    this.#watcherPosition = { x, y };
  };

  #updateWatchPositionViaMouse = (e: MouseEvent): void => {
    this.#targetPosition = {
      x: round(e.clientX),
      y: round(e.clientY),
    };
  };

  #updateWatchPositionViaDom = (): void => {
    if (!this.#targetDom) return;
    const rect = this.#targetDom.getBoundingClientRect();
    // XXX: Only return the center position of the dom now
    const x = round(rect.left + rect.width / 2);
    const y = round(rect.top + rect.height / 2);
    this.#targetPosition = { x, y };
  };

  #updateWatchPositionViaInput = (): void => {
    if (!this.#targetDom) return;
    if (!this.#fakeInputDom) {
      this.#createFakeInput();
      return;
    }
    const thisWatchDom = this.#targetDom as HTMLInputElement;
    if (this.#fakeInputDom.innerText !== thisWatchDom.value)
      this.#fakeInputDom.innerText = thisWatchDom.value;

    if (thisWatchDom.value === '') {
      this.#targetPosition = null;
      return;
    }

    const inputRect = this.#targetDom.getBoundingClientRect();
    const fakeInputRect = this.#fakeInputDom.getBoundingClientRect();
    const x = round(inputRect.left + fakeInputRect.width);
    const y = round(inputRect.top + fakeInputRect.height);
    this.#targetPosition = { x, y };
  };

  #createFakeInput = (): void => {
    if (!this.#targetDom) return;
    this.#fakeInputDom = document.createElement('div');
    const { font, letterSpacing, padding, width } = getComputedStyle(
      this.#targetDom,
    );
    this.#fakeInputDom.setAttribute(
      'style',
      `
        position: absolute;
        opacity: 0;
        pointer-events: none;
        display: inline-block;
        font: ${font};
        max-width: ${width};
        letter-spacing: ${letterSpacing};
        padding: ${padding};
      `,
    );
    document.querySelector('body')?.append(this.#fakeInputDom); //XXX: Maybe we should let the users decide?
  };

  #checkWatcherDomVisibility = (): boolean => {
    if (!this.#watcherDom) return false;
    const rect = this.#watcherDom.getBoundingClientRect();
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
    if (!this.#watcherDom) return;
    this.#watcherDom.style.transform = `translate(${transform.translate.x}px,${transform.translate.y}px) rotate(${transform.rotate}deg)`;
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
    if (!this.#needRender()) return;
    const transform = this.#calculateTransform();
    if (this.#customRender) {
      this.#customRender(transform);
    } else {
      this.#defaultRender(transform);
    }
    this.#lastRenderingWatcherPosition = this.#watcherPosition;
    this.#lastRenderingTargetPosition = this.#targetPosition;
  };

  setWatcher = (watcher?: WatchingYouWatcher): void => {
    if (watcher) {
      this.#watcherDom = isHtmlElement(watcher)
        ? watcher
        : document.querySelector(watcher);
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
    if (isTargetMouse(targetProps)) {
      this.#targetType = 'mouse';
      this.#targetDom = null;
    } else if (isTargetDom(targetProps)) {
      const { target } = targetProps;
      this.#targetType = 'dom';
      this.#targetDom = isHtmlElement(target)
        ? target
        : document.querySelector(target);
    } else if (isTargetInput(targetProps)) {
      const { target } = targetProps;
      this.#targetType = 'input';
      this.#targetDom = isHtmlElement(target)
        ? target
        : document.querySelector(target);
    } else {
      // @ts-ignore: static type checking, prevent human error
      const x: never = targetProps;
      log(`Unexpected target: ${JSON.stringify(x)}`, 'error');
    }
  };

  setCustomRender = (render?: WatchingYouRender): void => {
    if (render) {
      this.#customRender = render;
    }
  };

  setPower = (power?: WatchingYouPower) => {
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
    this.cancel();
    if (this.#targetType === 'mouse') {
      window.addEventListener(
        'mousemove',
        this.#updateWatchPositionViaMouse,
      );
    }
    const nextRaf = () => {
      if (this.#checkWatcherDomVisibility()) {
        this.#updateWatcherPosition();
        if (this.#targetType === 'dom') {
          this.#updateWatchPositionViaDom();
        }
        if (this.#targetType === 'input') {
          this.#updateWatchPositionViaInput();
        }
        this.#render();
      }
      this.#rafId = requestAnimationFrame(nextRaf);
    };
    nextRaf();
  };

  cancel = (): void => {
    cancelAnimationFrame(this.#rafId || 0);
    window.removeEventListener(
      'mousemove',
      this.#updateWatchPositionViaMouse,
    );
    if (this.#watcherDom) {
      if (this.#customRender) {
        this.#customRender(ORIGIN_TRANSFORM);
      } else {
        this.#defaultRender(ORIGIN_TRANSFORM);
      }
    }
    if (this.#fakeInputDom) {
      this.#fakeInputDom.remove();
      this.#fakeInputDom = null;
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
