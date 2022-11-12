import { Target } from '../type/Target';
import { round } from '../util/math';

class TextareaTarget implements Target {
  name = 'textarea';
  target: HTMLTextAreaElement | null = null;
  #fakeTextarea: HTMLPreElement | null = null;
  #targetTextareaValue: string = '';

  constructor(target: any) {
    try {
      if (typeof target === 'string') {
        this.target =
          document.querySelector<HTMLTextAreaElement>(target);
        return;
      }
      this.target = target;
    } catch (e) {
      this.target = null;
    }
  }
  setup() {
    this.#fakeTextarea = document.createElement('pre');
    document.querySelector('body')?.append(this.#fakeTextarea); //XXX: Maybe we should let the users decide?
  }
  cleanup() {
    if (!this.#fakeTextarea) return;
    this.#fakeTextarea.remove();
    this.#fakeTextarea = null;
  }

  // To be optimized
  update() {
    if (!this.target) return { x: 0, y: 0 };
    if (!this.#fakeTextarea) return { x: 0, y: 0 };

    const {
      font,
      letterSpacing,
      width,
      lineHeight,
      paddingLeft,
      whiteSpace,
      overflowWrap,
      wordBreak,
    } = getComputedStyle(this.target);
    const paddingLeftNumber = Number(paddingLeft.slice(0, -2));

    if (this.#targetTextareaValue !== this.target.value) {
      this.#targetTextareaValue = this.target.value;
      const allLine = this.target.value.split('\n');
      const lastLine = allLine[allLine.length - 1];
      const tempDom = document.createElement('pre');
      tempDom.setAttribute(
        'style',
        `
          display: inline-block;
          width: ${this.target.clientWidth}px;
          white-space: ${whiteSpace};
          overflow-wrap: ${overflowWrap};
          word-break: ${wordBreak};
          line-height: ${lineHeight};
          min-height: 1em;
          height: auto;
          font: ${font};
          letter-spacing: ${letterSpacing};
        `,
      );
      document.querySelector('body')?.append(tempDom); //XXX: Maybe we should let the users decide?
      let oneRowHeight: number = 0;
      lastLine.split('').forEach((char) => {
        tempDom.innerText += char;
        if (!oneRowHeight) oneRowHeight = tempDom.clientHeight;
        if (tempDom.clientHeight !== oneRowHeight) {
          if (char === ' ') return;
          const allWord = tempDom.innerText.split(' ');
          const lastWord = allWord[allWord.length - 1];

          tempDom.innerText = lastWord;
        }
      });
      this.#fakeTextarea.innerText = tempDom.innerText.trimEnd();
      tempDom.remove();
    }

    const targetRect = this.target.getBoundingClientRect();
    const fakeTextareaRect =
      this.#fakeTextarea.getBoundingClientRect();
    this.#fakeTextarea.setAttribute(
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
    let fakeWidth = fakeTextareaRect.width % widthNumber; //targetDom.clientWidth;
    if (fakeWidth === 0)
      fakeWidth = this.#fakeTextarea.innerText ? widthNumber : 0;
    const x = round(targetRect.left + fakeWidth + paddingLeftNumber);
    const y = round(targetRect.top + targetRect.height / 2);
    return { x, y };
  }
}

export default TextareaTarget;
