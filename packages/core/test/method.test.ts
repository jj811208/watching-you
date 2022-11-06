/**
 * @vitest-environment happy-dom
 */
import { beforeEach, describe, expect, it } from 'vitest';
import WatchingYou from '../src/index';
import { mousemove, wait } from './util';

describe('Method', () => {
  beforeEach(() => {
    document.body.innerHTML = `
      <div class="eyes">
        <div>O</div>
      </div>
    `;
  });

  it('It should start watching something, when the start method is call', async () => {
    const eyesDom = document.querySelector<HTMLElement>('.eyes');
    if (eyesDom === null) throw Error('eyesDom is not found!');
    const watchingYou = new WatchingYou(eyesDom);
    expect(eyesDom.style.transform).toBe('');
    watchingYou.start();
    await mousemove(100, 200);
    expect(eyesDom.style.transform).not.toBe('');
    expect(eyesDom.style.transform).not.toBe(
      'translate3d(0px,0px,0px) rotate(0deg)',
    );
    watchingYou.stop();
  });

  it('It should go back to the original point, when the stop method is call', async () => {
    const eyesDom = document.querySelector<HTMLElement>('.eyes');
    if (eyesDom === null) throw Error('eyesDom is not found!');
    const watchingYou = new WatchingYou(eyesDom);
    watchingYou.start();
    await mousemove(100, 200);
    expect(eyesDom.style.transform).not.toBe('');
    expect(eyesDom.style.transform).not.toBe(
      'translate3d(0px,0px,0px) rotate(0deg)',
    );
    watchingYou.stop();
    expect(eyesDom.style.transform).toBe(
      'translate3d(0px,0px,0px) rotate(0deg)',
    );
  });

  it('Its coordinates should be changed when the power is changed', async () => {
    const eyesDom = document.querySelector<HTMLElement>('.eyes');
    if (eyesDom === null) throw Error('eyesDom is not found!');
    const watchingYou = new WatchingYou(eyesDom);
    watchingYou.start();
    watchingYou.setPower(100);
    await mousemove(500, 500);
    expect(eyesDom.style.transform).toMatchSnapshot();
    watchingYou.setPower(10);
    await mousemove(501, 501);
    expect(eyesDom.style.transform).toMatchSnapshot();
    watchingYou.setPower({ x: 100, y: 0 });
    await mousemove(502, 502);
    expect(eyesDom.style.transform).toMatchSnapshot();
  });
});
