import { Target } from '../type/Target';
import { round } from '../util/math';

class InputTarget implements Target {
  name = 'input';
  target: HTMLInputElement | null = null;
  #fakeInput: HTMLPreElement | null = null;

  constructor(target: any) {
    try {
      if (typeof target === 'string') {
        this.target =
          document.querySelector<HTMLInputElement>(target);
        return;
      }
      this.target = target;
    } catch (e) {
      this.target = null;
    }
  }
  setup() {
    this.#fakeInput = document.createElement('pre');
    document.querySelector('body')?.append(this.#fakeInput); //XXX: Maybe we should let the users decide?
  }
  cleanup() {
    if (!this.#fakeInput) return;
    this.#fakeInput.remove();
    this.#fakeInput = null;
  }
  update() {
    if (!this.target) return null;
    if (!this.#fakeInput) return null;

    if (this.#fakeInput.innerText !== this.target.value) {
      this.#fakeInput.innerText = this.target.value;
    }

    const { font, letterSpacing, width, lineHeight, paddingLeft } =
      getComputedStyle(this.target);
    const paddingLeftNumber = Number(paddingLeft.slice(0, -2));
    const inputRect = this.target.getBoundingClientRect();
    const fakeInputRect = this.#fakeInput.getBoundingClientRect();
    this.#fakeInput.setAttribute(
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
    return { x, y };
  }
}

export default InputTarget;
