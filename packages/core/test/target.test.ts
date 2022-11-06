/**
 * @vitest-environment happy-dom
 */
import { beforeEach, describe, expect, it } from 'vitest';
import WatchingYou from '../src/index';
import { mousemove } from './util';

describe('core test', () => {
  beforeEach(() => {
    document.body.innerHTML = `
      <div class="eyes">
        <div>O</div>
      </div>
    `;
  });

  describe('Targets', () => {
    it('It should be watching mouse', async () => {
      const eyesDom = document.querySelector<HTMLElement>('.eyes');
      if (eyesDom === null) throw Error('eyesDom is not found');
      const watchingYou = new WatchingYou(eyesDom);
      watchingYou.start();
      await mousemove(100, 200);
      expect(eyesDom.style.transform).not.toBe('');
      expect(eyesDom.style.transform).not.toBe(
        'translate3d(0px,0px,0px) rotate(0deg)',
      );
      expect(eyesDom.style.transform).toMatchSnapshot();
      await mousemove(300, 300);
      expect(eyesDom.style.transform).toMatchSnapshot();
    });
  });
});
