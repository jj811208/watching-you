import { Coordinate } from './type/Coordinate';
import getDomTranslateProp from './util/getDomTranslateProp';
import log from './util/log';
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
type GazerRender = (delta: Coordinate) => void;
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
}

// Don't trust the parameters given by the user
// function checkDomParameterValid(
//   selectorOrDom: unknown,
//   target: string,
// ) {
//   if (isHtmlElement(selectorOrDom)) return;
//   if (selectorOrDom === undefined) {
//     log(`The ${target} parameter is require.`, 'error');
//     return;
//   }
//   if (typeof selectorOrDom !== 'string') {
//     log(
//       `The ${target} must be a html element or a selector.`,
//       'error',
//     );
//     return;
//   }
//   const dom = document.querySelector<HTMLElement>(selectorOrDom);
//   if (!dom) log(`The ${target} is not found.`, 'error');
// }
// function checkObservedValid(observedProps: {
//   observed?: unknown;
//   observedType?: unknown;
// }) {
//   const { observedType, observed } = observedProps;
//   if (observedType === 'mouse') {
//     if (observed)
//       log(
//         `If the observedType parameter is mouse, then the observed parameter is not necessary.`,
//         'warn',
//       );
//     return;
//   }
//   if (observedType === 'input') {
//     if (!observed)
//       log(
//         `If the observedType parameter is input, then the observed parameter is require.`,
//         'error',
//       );
//     return;
//   }
//   if (observedType === 'dom' || observedType === undefined) {
//     if (!observed)
//       log(
//         `If the observedType parameter is dom or empty, then the observed parameter is require.`,
//         'error',
//       );
//     return;
//   }
// }

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

class Gazer {
  private customRender: GazerRender | null = null;
  private observerDom: HTMLElement | null = null;
  private observedDom: HTMLElement | null = null;
  private observerPosition: Coordinate | null = null;
  private observedPosition: Coordinate | null = null;
  private lastRenderingObserverPosition: Coordinate | null = null;
  private lastRenderingObservedPosition: Coordinate | null = null;
  private observedType: GazerObservedType = DEFAULT_OBSERVED_TYPE;
  private powerX = DEFAULT_POWER;
  private powerY = DEFAULT_POWER;
  private fakeInputDom: HTMLElement | null = null;
  private rafId: number | null = null;

  constructor(props: GazerProps) {
    const { observer, power, render, ...observedProps } = props;
    // checkDomParameterValid(observer, 'observer');
    // checkObservedValid(observedProps);

    this.setCustomRender(render);
    this.setObserver(observer);
    this.setObserved(observedProps);
    this.setPower(power);
  }

  private updateObserverPosition = (): void => {
    if (this.observerDom === null) return;
    const rect = this.observerDom.getBoundingClientRect();
    const translate = getDomTranslateProp(this.observerDom);
    const x = rect.left - translate.x + rect.width / 2;
    const y = rect.top - translate.y + rect.height / 2;
    this.observerPosition = { x, y };
  };

  private updateObservedPositionViaMouse = (e: MouseEvent): void => {
    this.observedPosition = { x: e.clientX, y: e.clientY };
  };

  private updateObservedPositionViaDom = (): void => {
    if (!this.observedDom) return;
    const rect = this.observedDom.getBoundingClientRect();
    // XXX: Only return the center position of the dom now
    const x = rect.left + rect.width / 2;
    const y = rect.top + rect.height / 2;
    this.observedPosition = { x, y };
  };

  private updateObservedPositionViaInput = (): void => {
    if (!this.observedDom) return;
    if (!this.fakeInputDom) {
      this.createFakeInput();
      return;
    }
    const thisObservedDom = this.observedDom as HTMLInputElement;
    if (this.fakeInputDom.innerText !== thisObservedDom.value)
      this.fakeInputDom.innerText = thisObservedDom.value;

    if (thisObservedDom.value === '') {
      this.observedPosition = null;
      return;
    }

    const inputRect = this.observedDom.getBoundingClientRect();
    const fakeInputRect = this.fakeInputDom.getBoundingClientRect();
    const x = inputRect.left + fakeInputRect.width;
    const y = inputRect.top + fakeInputRect.height;
    this.observedPosition = { x, y };
  };

  private createFakeInput = (): void => {
    if (!this.observedDom) return;
    this.fakeInputDom = document.createElement('div');
    const { font, letterSpacing, padding } = getComputedStyle(
      this.observedDom,
    );
    this.fakeInputDom.setAttribute(
      'style',
      `
          position: absolute;
          opacity: 0;
          pointer-events: none;
          display: inline-block;
          font: ${font};
          letter-spacing: ${letterSpacing};
          padding: ${padding};
        `,
    );
    document.querySelector('body')?.append(this.fakeInputDom); //XXX: Maybe we should let the users decide?
  };

  private checkObserverDomVisibility = (): boolean => {
    if (!this.observerDom) return false;
    const rect = this.observerDom.getBoundingClientRect();
    const translate = getDomTranslateProp(this.observerDom);
    const top = rect.top - translate.y;
    const left = rect.left - translate.x;
    const bottom = rect.bottom - translate.y;
    const right = rect.right - translate.x;
    return (
      top - this.powerY <=
        (window.innerHeight ||
          document.documentElement.clientHeight) &&
      left - this.powerX <=
        (window.innerWidth || document.documentElement.clientWidth) &&
      bottom + this.powerY >= 0 &&
      right + this.powerX >= 0
    );
  };

  private calculateDelta = (): Coordinate => {
    if (!this.observerPosition) return { x: 0, y: 0 };
    if (!this.observedPosition) return { x: 0, y: 0 };
    const deltaX = this.observedPosition.x - this.observerPosition.x;
    const deltaY = this.observedPosition.y - this.observerPosition.y;
    const symbolX = deltaX >= 0 ? 1 : -1;
    const symbolY = deltaY >= 0 ? 1 : -1;
    const distanceX = Math.abs(deltaX);
    const distanceY = Math.abs(deltaY);
    const resultX =
      Math.min(
        distanceX,
        Math.abs(
          Math.cos(Math.atan2(distanceY, distanceX)) * this.powerX,
        ),
      ) * symbolX;
    const resultY =
      Math.min(
        distanceY,
        Math.abs(
          Math.sin(Math.atan2(distanceY, distanceX)) * this.powerY,
        ),
      ) * symbolY;
    return {
      x: resultX,
      y: resultY,
    };
  };

  private defaultRender: GazerRender = (delta) => {
    if (!this.observerDom) return;
    this.observerDom.style.transform = `translate(${delta.x}px,${delta.y}px)`;
  };

  private needRender = (): boolean => {
    if (
      this.lastRenderingObserverPosition?.x !==
      this.observerPosition?.x
    )
      return true;
    if (
      this.lastRenderingObserverPosition?.y !==
      this.observerPosition?.y
    )
      return true;
    if (
      this.lastRenderingObservedPosition?.x !==
      this.observedPosition?.x
    )
      return true;
    if (
      this.lastRenderingObservedPosition?.y !==
      this.observedPosition?.y
    )
      return true;
    return false;
  };

  private render = (): void => {
    if (!this.needRender()) return;
    const delta = this.calculateDelta();
    if (this.customRender) {
      this.customRender(delta);
    } else {
      this.defaultRender(delta);
    }
    this.lastRenderingObserverPosition = this.observerPosition;
    this.lastRenderingObservedPosition = this.observedPosition;
  };

  public setObserver = (observer?: GazerObserver): void => {
    if (observer) {
      this.observerDom = isHtmlElement(observer)
        ? observer
        : document.querySelector(observer);
    }
  };

  public setObserved = (observedProps?: {
    observed?: GazerObserved;
    observedType?: GazerObservedType;
  }): void => {
    if (isObservedMouse(observedProps)) {
      this.observedType = 'mouse';
      this.observedDom = null;
    } else if (isObservedDom(observedProps)) {
      const { observed } = observedProps;
      this.observedType = 'dom';
      this.observedDom = isHtmlElement(observed)
        ? observed
        : document.querySelector(observed);
    } else if (isObservedInput(observedProps)) {
      const { observed } = observedProps;
      this.observedType = 'input';
      this.observedDom = isHtmlElement(observed)
        ? observed
        : document.querySelector(observed);
    } else {
      // @ts-ignore: static type checking, prevent human error
      const x: never = observedProps;
      log(`Unexpected observed: ${JSON.stringify(x)}`, 'error');
    }
  };

  public setCustomRender = (render?: GazerRender): void => {
    if (render) {
      this.customRender = render;
    }
  };

  public setPower = (power?: GazerPower) => {
    if (power !== undefined) {
      if (typeof power === 'number') {
        this.powerX = power;
        this.powerY = power;
        return;
      }
      if (power?.x !== undefined) this.powerX = power.x;
      if (power?.y !== undefined) this.powerY = power.y;
    }
  };

  public start = (): void => {
    this.cancel();
    if (this.observedType === 'mouse') {
      window.addEventListener(
        'mousemove',
        this.updateObservedPositionViaMouse,
      );
    }
    const nextRaf = () => {
      if (this.checkObserverDomVisibility()) {
        this.updateObserverPosition();
        if (this.observedType === 'dom') {
          this.updateObservedPositionViaDom();
        }
        if (this.observedType === 'input') {
          this.updateObservedPositionViaInput();
        }
        this.render();
      }
      this.rafId = requestAnimationFrame(nextRaf);
    };
    nextRaf();
  };

  public cancel = (): void => {
    cancelAnimationFrame(this.rafId || 0);
    window.removeEventListener(
      'mousemove',
      this.updateObservedPositionViaMouse,
    );
  };
}

export default Gazer;
export type {
  GazerObservedMouse,
  GazerObservedDom,
  GazerObservedInput,
  GazerRender,
  GazerObserver,
  GazerObserved,
  GazerObservedType,
  GazerPower,
  Coordinate as GazerCoordinate,
  GazerProps,
};
