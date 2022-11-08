import { describe, expect, it } from 'vitest';
import WatchingYou from '../../core';//'watching-you';

describe('Initialized', () => {
  it('It should be able to be initialized', () => {
    const watchingYou = new WatchingYou();
    expect(watchingYou).toBeInstanceOf(WatchingYou);
  });

  it('It should set the initialization settings correctly - watcher', () => {
    document.body.innerHTML = `
      <div class="eyes">
        <div>O</div>
      </div>
    `;
    const watcherSelector = '.eyes';
    const expectedDom = document.querySelector(watcherSelector);
    if (!expectedDom) throw Error('eyesDom is notFound');
    expect(
      new WatchingYou(watcherSelector).getState().watcherDom,
    ).toBe(expectedDom);
    expect(new WatchingYou(expectedDom).getState().watcherDom).toBe(
      expectedDom,
    );
    expect(
      new WatchingYou({ watcher: expectedDom }).getState().watcherDom,
    ).toBe(expectedDom);
    expect(
      new WatchingYou({ watcher: watcherSelector }).getState()
        .watcherDom,
    ).toBe(expectedDom);
  });

  it('It should set the initialization settings correctly - target', () => {
    document.body.innerHTML = `
      <div class="eyes">
        <div>O</div>
      </div>
    `;
    const targetSelector = '.eyes';
    const expectedDom = document.querySelector(targetSelector);
    if (!expectedDom) throw Error('eyesDom is notFound');
    expect(
      new WatchingYou({ target: targetSelector }).getState()
        .targetDom,
    ).toBe(expectedDom);
    expect(
      new WatchingYou({ target: expectedDom }).getState().targetDom,
    ).toBe(expectedDom);
  });
});
