import { describe, expect, it } from 'vitest';
import { wait, mousemove } from '../../utils';
import { WatchingYou } from '../../watchingYou';
import { mockGetBoundingClientRectSpy } from '../../mocks';

mockGetBoundingClientRectSpy();

describe('Target', () => {
  it('It should be watching mouse', async () => {
    document.body.innerHTML = `
      <div id="watcher"></div>
    `;
    const watcherDom =
      document.querySelector<HTMLElement>('#watcher');
    if (watcherDom === null) throw Error('watcherDom is not found');
    const watchingYou = new WatchingYou(watcherDom);
    watchingYou.start();
    expect(watcherDom.style.transform).toMatchSnapshot();
    await mousemove(300, 300);
    expect(watcherDom.style.transform).toMatchSnapshot();
  });

  it('It should be watching dom', async () => {
    document.body.innerHTML = `
      <div id="watcher"></div>
      <div id="target">target</div>
    `;
    const watcherDom =
      document.querySelector<HTMLElement>('#watcher');
    const targetDom = document.querySelector<HTMLElement>('#target');
    if (watcherDom === null) throw Error('watcherDom is not found');
    if (targetDom === null) throw Error('targetDom is not found');
    const watchingYou = new WatchingYou(watcherDom, {
      target: targetDom,
      targetType: 'dom',
    });
    watchingYou.start();
    await wait(100);
    expect(watcherDom.style.transform).toMatchSnapshot();
  });

  it('It should be watching input', async () => {
    document.body.innerHTML = `
      <div id="watcher"></div>
      <input id="target"/>
    `;
    const watcherDom =
      document.querySelector<HTMLElement>('#watcher');
    const targetDom = document.querySelector<HTMLElement>('#target');
    if (watcherDom === null) throw Error('watcherDom is not found');
    if (targetDom === null) throw Error('targetDom is not found');
    const watchingYou = new WatchingYou(watcherDom, {
      target: targetDom,
      targetType: 'input',
    });
    watchingYou.start();
    expect(watcherDom.style.transform).toMatchSnapshot();
    targetDom.setAttribute('value', 'foo bar');
    await wait(100);
    expect(watcherDom.style.transform).toMatchSnapshot();
  });
});
