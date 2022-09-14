import { Coordinate } from './type/Coordinate';
import getDomTranslateProp from './util/getDomTranslateProp';
import log from './util/log';
import { round } from './util/math';
import { isHtmlElement } from './util/type';

interface GazerObservedMouse {
  observedType?: 'mouse';
  observed?: undefined;
}
interface GazerObservedDom {
  observedType?: 'dom';
  observed: string | HTMLElement;
}
interface GazerObservedInput {
  observedType: 'input';
  observed: string | HTMLElement;
}
interface GazerRenderTransform {
  translate: {
    x: number;
    y: number;
  };
  rotate: number;
}
type GazerRender = (transform: GazerRenderTransform) => void;
type GazerObserver = string | HTMLElement;
type GazerObserved = string | HTMLElement;
type GazerObservedType = 'mouse' | 'dom' | 'input';
type GazerPower = number | { x?: number; y?: number };
interface GazerProps {
  observer?: GazerObserver;
  observed?: GazerObserved;
  observedType?: GazerObservedType;
  power?: GazerPower;
  render?: GazerRender;
  rotatable?: boolean;
  movable?: boolean;
}

function isObservedMouse(observedProps?: {
  observed?: unknown;
  observedType?: unknown;
}): observedProps is GazerObservedMouse {
  return (
    !observedProps ||
    observedProps.observedType === 'mouse' ||
    (!observedProps.observedType && !observedProps.observed)
  );
}
function isObservedDom(observedProps?: {
  observed?: unknown;
  observedType?: unknown;
}): observedProps is GazerObservedDom {
  if (!observedProps) return false;
  return (
    observedProps.observedType === 'dom' ||
    (!observedProps.observedType && !!observedProps.observed)
  );
}
function isObservedInput(observedProps?: {
  observed?: unknown;
  observedType?: unknown;
}): observedProps is GazerObservedInput {
  if (!observedProps) return false;
  // if(!observed) log(`If the observedType parameter is input, then the observed must be a input`,'warn');
  return observedProps.observedType === 'input';
}

const DEFAULT_POWER = 50;
const DEFAULT_OBSERVED_TYPE = 'mouse';
const ORIGIN_TRANSFORM = {
  translate: { x: 0, y: 0 },
  rotate: 0,
};

class Gazer {
  #customRender: GazerRender | null = null;
  #observerDom: HTMLElement | null = null;
  #observedDom: HTMLElement | null = null;
  #observerPosition: Coordinate | null = null;
  #observedPosition: Coordinate | null = null;
  #lastRenderingObserverPosition: Coordinate | null = null;
  #lastRenderingObservedPosition: Coordinate | null = null;
  #rotatable: boolean = true;
  #movable: boolean = true;
  #observedType: GazerObservedType = DEFAULT_OBSERVED_TYPE;
  #powerX = DEFAULT_POWER;
  #powerY = DEFAULT_POWER;
  #fakeInputDom: HTMLElement | null = null;
  #rafId: number | null = null;

  constructor(props: GazerProps = {}) {
    // TODO: Don't trust the parameters given by the user
    const {
      observer,
      power,
      rotatable,
      movable,
      render,
      ...observedProps
    } = props;
    this.setCustomRender(render);
    this.setObserver(observer);
    this.setObserved(observedProps);
    this.setPower(power);
    this.setRotatable(rotatable);
    this.setMovable(movable);
  }

  #updateObserverPosition = (): void => {
    if (this.#observerDom === null) return;
    const rect = this.#observerDom.getBoundingClientRect();
    const translate = getDomTranslateProp(this.#observerDom);
    const x = round(rect.left - translate.x + rect.width / 2);
    const y = round(rect.top - translate.y + rect.height / 2);
    this.#observerPosition = { x, y };
  };

  #updateObservedPositionViaMouse = (e: MouseEvent): void => {
    this.#observedPosition = {
      x: round(e.clientX),
      y: round(e.clientY),
    };
  };

  #updateObservedPositionViaDom = (): void => {
    if (!this.#observedDom) return;
    const rect = this.#observedDom.getBoundingClientRect();
    // XXX: Only return the center position of the dom now
    const x = round(rect.left + rect.width / 2);
    const y = round(rect.top + rect.height / 2);
    this.#observedPosition = { x, y };
  };

  #updateObservedPositionViaInput = (): void => {
    if (!this.#observedDom) return;
    if (!this.#fakeInputDom) {
      this.#createFakeInput();
      return;
    }
    const thisObservedDom = this.#observedDom as HTMLInputElement;
    if (this.#fakeInputDom.innerText !== thisObservedDom.value)
      this.#fakeInputDom.innerText = thisObservedDom.value;

    if (thisObservedDom.value === '') {
      this.#observedPosition = null;
      return;
    }

    const inputRect = this.#observedDom.getBoundingClientRect();
    const fakeInputRect = this.#fakeInputDom.getBoundingClientRect();
    const x = round(inputRect.left + fakeInputRect.width);
    const y = round(inputRect.top + fakeInputRect.height);
    this.#observedPosition = { x, y };
  };

  #createFakeInput = (): void => {
    if (!this.#observedDom) return;
    this.#fakeInputDom = document.createElement('div');
    const { font, letterSpacing, padding, width } = getComputedStyle(
      this.#observedDom,
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

  #checkObserverDomVisibility = (): boolean => {
    if (!this.#observerDom) return false;
    const rect = this.#observerDom.getBoundingClientRect();
    const boundaryY = this.#powerY * 2;
    const boundaryX = this.#powerX * 2;
    const top = rect.top - boundaryY;
    const left = rect.left - boundaryX;
    const bottom = rect.bottom + boundaryY;
    const right = rect.right + boundaryX;
    return (
      top <=
        (window.innerHeight ||
          document.documentElement.clientHeight) &&
      left <=
        (window.innerWidth || document.documentElement.clientWidth) &&
      bottom >= 0 &&
      right >= 0
    );
  };

  #calculateTransform = (): Parameters<GazerRender>[0] => {
    const result: Parameters<GazerRender>[0] = {
      translate: { x: 0, y: 0 },
      rotate: 0,
    };
    if (!this.#observerPosition) return result;
    if (!this.#observedPosition) return result;
    if (!this.#movable && !this.#rotatable) return result;
    const deltaX =
      this.#observedPosition.x - this.#observerPosition.x;
    const deltaY =
      this.#observedPosition.y - this.#observerPosition.y;

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

  #defaultRender: GazerRender = (transform) => {
    if (!this.#observerDom) return;
    this.#observerDom.style.transform = `translate(${transform.translate.x}px,${transform.translate.y}px) rotate(${transform.rotate}deg)`;
  };

  #needRender = (): boolean => {
    if (
      this.#lastRenderingObserverPosition?.x !==
      this.#observerPosition?.x
    )
      return true;
    if (
      this.#lastRenderingObserverPosition?.y !==
      this.#observerPosition?.y
    )
      return true;
    if (
      this.#lastRenderingObservedPosition?.x !==
      this.#observedPosition?.x
    )
      return true;
    if (
      this.#lastRenderingObservedPosition?.y !==
      this.#observedPosition?.y
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
    this.#lastRenderingObserverPosition = this.#observerPosition;
    this.#lastRenderingObservedPosition = this.#observedPosition;
  };

  setObserver = (observer?: GazerObserver): void => {
    if (observer) {
      this.#observerDom = isHtmlElement(observer)
        ? observer
        : document.querySelector(observer);
    }
  };

  setRotatable = (rotatable: boolean = true): void => {
    this.#rotatable = !!rotatable;
  };

  setMovable = (movable: boolean = true): void => {
    this.#movable = !!movable;
  };

  setObserved = (observedProps?: {
    observed?: GazerObserved;
    observedType?: GazerObservedType;
  }): void => {
    if (isObservedMouse(observedProps)) {
      this.#observedType = 'mouse';
      this.#observedDom = null;
    } else if (isObservedDom(observedProps)) {
      const { observed } = observedProps;
      this.#observedType = 'dom';
      this.#observedDom = isHtmlElement(observed)
        ? observed
        : document.querySelector(observed);
    } else if (isObservedInput(observedProps)) {
      const { observed } = observedProps;
      this.#observedType = 'input';
      this.#observedDom = isHtmlElement(observed)
        ? observed
        : document.querySelector(observed);
    } else {
      // @ts-ignore: static type checking, prevent human error
      const x: never = observedProps;
      log(`Unexpected observed: ${JSON.stringify(x)}`, 'error');
    }
  };

  setCustomRender = (render?: GazerRender): void => {
    if (render) {
      this.#customRender = render;
    }
  };

  setPower = (power?: GazerPower) => {
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
    if (this.#observedType === 'mouse') {
      window.addEventListener(
        'mousemove',
        this.#updateObservedPositionViaMouse,
      );
    }
    const nextRaf = () => {
      if (this.#checkObserverDomVisibility()) {
        this.#updateObserverPosition();
        if (this.#observedType === 'dom') {
          this.#updateObservedPositionViaDom();
        }
        if (this.#observedType === 'input') {
          this.#updateObservedPositionViaInput();
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
      this.#updateObservedPositionViaMouse,
    );
    if (this.#observerDom) {
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

export default Gazer;
export type {
  GazerObservedMouse,
  GazerObservedDom,
  GazerObservedInput,
  GazerRenderTransform,
  GazerRender,
  GazerObserver,
  GazerObserved,
  GazerObservedType,
  GazerPower,
  Coordinate as GazerCoordinate,
  GazerProps,
};
