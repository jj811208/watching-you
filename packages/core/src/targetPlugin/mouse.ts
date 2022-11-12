import { Coordinate } from '../type/Coordinate';
import { Target } from '../type/Target';
import { round } from '../util/math';

class MouseTarget implements Target {
  name = 'mouse';
  target = 'mouse';

  static #mousePosition: Coordinate | null = null;
  static #mouseWatcherCount: number = 0;
  static #updateTargetPositionViaMouse = (e: MouseEvent): void => {
    MouseTarget.#mousePosition = {
      x: round(e.clientX),
      y: round(e.clientY),
    };
  };
  static #updateTargetPositionViaTouch = (e: TouchEvent): void => {
    MouseTarget.#mousePosition = {
      x: round(e.touches[0].clientX),
      y: round(e.touches[0].clientY),
    };
  };

  setup() {
    if (MouseTarget.#mouseWatcherCount === 0) {
      window.addEventListener(
        'mousemove',
        MouseTarget.#updateTargetPositionViaMouse,
      );
      window.addEventListener(
        'touchmove',
        MouseTarget.#updateTargetPositionViaTouch,
      );
    }
    MouseTarget.#mouseWatcherCount++;
  }
  cleanup() {
    MouseTarget.#mouseWatcherCount--;
    if (MouseTarget.#mouseWatcherCount === 0) {
      window.removeEventListener(
        'mousemove',
        MouseTarget.#updateTargetPositionViaMouse,
      );
      window.removeEventListener(
        'touchmove',
        MouseTarget.#updateTargetPositionViaTouch,
      );
    }
  }
  update() {
    return MouseTarget.#mousePosition;
  }
}

export default MouseTarget;
