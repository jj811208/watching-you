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

type WatchingYouWatcher = string | Element;
type WatchingYouTarget = string | Element;
type WatchingYouTargetType = 'mouse' | 'dom' | 'input';
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
const DEFAULT_OBSERVED_TYPE = 'mouse';
const ORIGIN_TRANSFORM = {
  translate: { x: 0, y: 0 },
  rotate: 0,
};

class WatchingYou {
  static #mousePosition: Coordinate | null = null;
  static #mouseObserverCount: number = 0;
  static #updateTargetPositionViaMouse = (e: MouseEvent): void => {
    WatchingYou.#mousePosition = {
      x: round(e.clientX),
      y: round(e.clientY),
    };
  };
  static #updateTargetPositionViaTouch = (e: TouchEvent): void => {
    WatchingYou.#mousePosition = {
      x: round(e.touches[0].clientX),
      y: round(e.touches[0].clientY),
    };
  };

  #customRender: WatchingYouRender | null = null;
  #watcherSelector: string | null = null;
  #watcherDom: HTMLElement | null = null;
  #targetDom: HTMLElement | null = null;
  #watcherPosition: Coordinate | null = null;
  #_targetPosition: Coordinate | null = null;
  #lastRenderingWatcherPosition: Coordinate | null = null;
  #lastRenderingTargetPosition: Coordinate | null = null;
  #rotatable: boolean = true;
  #movable: boolean = true;
  #targetType: WatchingYouTargetType = DEFAULT_OBSERVED_TYPE;
  #powerX = DEFAULT_POWER;
  #powerY = DEFAULT_POWER;
  #fakeInputDom: HTMLElement | null = null;
  #rafId: number | null = null;

  get #targetPosition() {
    if (this.#targetType === 'mouse')
      return WatchingYou.#mousePosition;
    return this.#_targetPosition;
  }
  set #targetPosition(newPosition) {
    if (this.#targetType === 'mouse')
      WatchingYou.#mousePosition = newPosition;
    this.#_targetPosition = newPosition;
  }

  constructor(
    watcherOrOptions?: WatchingYouWatcher | WatchingYouOptions,
    optionsBase: WatchingYouOptions = {},
  ) {
    const isFirstParamOptions =
      typeof watcherOrOptions === 'object' &&
      !isHtmlElement(watcherOrOptions);
    const options = isFirstParamOptions
      ? (watcherOrOptions as WatchingYouOptions)
      : optionsBase;
    const watcher = isFirstParamOptions
      ? undefined
      : (watcherOrOptions as WatchingYouWatcher);
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
    if (this.#watcherDom === null) {
      if (this.#watcherSelector !== null)
        this.#watcherDom = document.querySelector(
          this.#watcherSelector,
        );

      return;
    }
    const rect = this.#watcherDom.getBoundingClientRect();
    const translate = getDomTranslateProp(this.#watcherDom);
    const x = round(rect.left - translate.x + rect.width / 2);
    const y = round(rect.top - translate.y + rect.height / 2);
    this.#watcherPosition = { x, y };
  };

  #updateTargetPositionViaDom = (): void => {
    if (!this.#targetDom) return;
    const rect = this.#targetDom.getBoundingClientRect();
    // XXX: Only return the center position of the dom now
    const x = round(rect.left + rect.width / 2);
    const y = round(rect.top + rect.height / 2);
    this.#targetPosition = { x, y };
  };

  #updateTargetPositionViaInput = (): void => {
    if (!this.#targetDom) return;
    if (!this.#fakeInputDom) {
      this.#createFakeInput();
    }
    const fakeInputDom = this.#fakeInputDom!;
    const thisWatchDom = this.#targetDom as HTMLInputElement;

    if (fakeInputDom.innerText !== thisWatchDom.value) {
      fakeInputDom.innerText = thisWatchDom.value;
    }

    const { font, letterSpacing, width, lineHeight, paddingLeft } =
      getComputedStyle(this.#targetDom);
    const paddingLeftNumber = Number(paddingLeft.slice(0, -2));
    const targetTagName = this.#targetDom.tagName;
    const isInput = targetTagName === 'INPUT';
    const isTextarea = targetTagName === 'TEXTAREA';
    const inputRect = this.#targetDom.getBoundingClientRect();
    const fakeInputRect = fakeInputDom.getBoundingClientRect();
    if (isInput) {
      fakeInputDom.setAttribute(
        'style',
        `
          position: absolute;
          opacity: 0;
          top: 0;
          left: -100%;
          pointer-events: none;
          display: inline-block;
          line-height: ${lineHeight};
          font: ${font};
          max-width: ${width};
          letter-spacing: ${letterSpacing};
          `,
      );
      const x = round(
        inputRect.left + fakeInputRect.width + paddingLeftNumber,
      );
      const y = round(inputRect.top + fakeInputRect.height / 2);
      this.#targetPosition = { x, y };
    }
    if (isTextarea) {
      fakeInputDom.setAttribute(
        'style',
        `
          position: absolute;
          opacity: 0;
          top: 0;
          left: -100%;
          pointer-events: none;
          display: inline-block;
          word-break: keep-all;
          line-height: ${lineHeight};
          font: ${font};
          letter-spacing: ${letterSpacing};
        `,
      );
      const widthNumber = Number(width.slice(0, -2));
      const fakeWidth = fakeInputRect.width % widthNumber;
      const x = round(inputRect.left + fakeWidth + paddingLeftNumber);
      const y = round(inputRect.top + inputRect.height / 2);
      this.#targetPosition = { x, y };
    }
  };

  #createFakeInput = (): void => {
    if (!this.#targetDom) return;
    this.#fakeInputDom = document.createElement('div');
    document.querySelector('body')?.append(this.#fakeInputDom); //XXX: Maybe we should let the users decide?
  };

  #checkWatcherDomVisibility = (): boolean => {
    if (!this.#watcherDom) return false;
    const rect = this.#watcherDom.getBoundingClientRect();
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
    if (!watcher) return;
    if (isHtmlElement(watcher)) {
      this.#watcherDom = watcher;
    } else if (typeof watcher === 'string') {
      this.#watcherSelector = watcher;
      this.#watcherDom = document.querySelector(watcher);
    } else {
      log(`Unexpected watcher: ${JSON.stringify(watcher)}`, 'warn');
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
    if (this.#targetType === 'mouse' && this.#rafId !== null) {
      WatchingYou.#mouseObserverCount--;
    }
    if (isTargetMouse(targetProps)) {
      this.#targetType = 'mouse';
      this.#targetDom = null;
    } else if (isTargetDom(targetProps)) {
      const { target } = targetProps;
      this.#targetType = 'dom';
      this.#targetDom = !target
        ? null
        : isHtmlElement(target)
        ? target
        : document.querySelector(target);
    } else if (isTargetInput(targetProps)) {
      const { target } = targetProps;
      this.#targetType = 'input';
      this.#targetDom = !target
        ? null
        : isHtmlElement(target)
        ? target
        : document.querySelector(target);
    } else {
      log(
        `Unexpected target: ${JSON.stringify(targetProps)}`,
        'warn',
      );
    }
    if (this.#targetType === 'mouse' && this.#rafId !== null) {
      WatchingYou.#mouseObserverCount++;
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
    if (this.#targetType === 'mouse') {
      if (WatchingYou.#mouseObserverCount === 0) {
        window.addEventListener(
          'mousemove',
          WatchingYou.#updateTargetPositionViaMouse,
        );
        window.addEventListener(
          'touchmove',
          WatchingYou.#updateTargetPositionViaTouch,
        );
      }
      WatchingYou.#mouseObserverCount++;
    }
    const nextRaf = () => {
      if (this.#checkWatcherDomVisibility()) {
        this.#updateWatcherPosition();
        if (this.#targetType === 'dom') {
          this.#updateTargetPositionViaDom();
        }
        if (this.#targetType === 'input') {
          this.#updateTargetPositionViaInput();
        }
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
    if (this.#targetType === 'mouse') {
      WatchingYou.#mouseObserverCount--;
    }
    if (WatchingYou.#mouseObserverCount === 0) {
      window.removeEventListener(
        'mousemove',
        WatchingYou.#updateTargetPositionViaMouse,
      );
      window.removeEventListener(
        'touchmove',
        WatchingYou.#updateTargetPositionViaTouch,
      );
    }

    cancelAnimationFrame(this.#rafId || 0);
    this.#rafId = null;
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
