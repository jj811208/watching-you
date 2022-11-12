import { Target } from '../type/Target';
import { round } from '../util/math';

class DomTarget implements Target {
  name = 'dom';
  target: HTMLElement | null = null;

  constructor(target: HTMLElement | string) {
    try {
      if (typeof target === 'string') {
        this.target = document.querySelector(target);
        return;
      }
      this.target = target;
    } catch (e) {
      this.target = null;
    }
  }
  setup() {}
  cleanup() {}
  update() {
    if (!this.target) return { x: 0, y: 0 };

    const rect = this.target.getBoundingClientRect();

    // XXX: Only return the center position of the dom now
    const x = round(rect.left + rect.width / 2);
    const y = round(rect.top + rect.height / 2);
    return { x, y };
  }
}

export default DomTarget;
