import { describe, expect, it } from 'vitest';
import WatchingYou from '../../core';//'watching-you';

describe('Method', () => {
  it('It should start watching something, when the start method is call', async () => {
    const watchingYou = new WatchingYou();
    expect(watchingYou.getState().rafId).toBeNull();
    watchingYou.start();
    expect(watchingYou.getState().rafId).not.toBeNull();
  });

  it('It should go back to the original point, when the stop method is call', async () => {
    const watchingYou = new WatchingYou();
    watchingYou.start();
    expect(watchingYou.getState().rafId).not.toBeNull();
    watchingYou.stop();
    expect(watchingYou.getState().rafId).toBeNull();
  });

  it('It should change power, when the setPower is call', async () => {
    const watchingYou = new WatchingYou();
    expect(watchingYou.getState().power.x).toBe(50); // default
    expect(watchingYou.getState().power.y).toBe(50); // default

    watchingYou.setPower(100);
    expect(watchingYou.getState().power.x).toBe(100);
    expect(watchingYou.getState().power.y).toBe(100);

    watchingYou.setPower({ x: 10 });
    expect(watchingYou.getState().power.x).toBe(10);
    expect(watchingYou.getState().power.y).toBe(100); // keep

    watchingYou.setPower({ y: 10 });
    expect(watchingYou.getState().power.x).toBe(10); // keep
    expect(watchingYou.getState().power.y).toBe(10);

    watchingYou.setPower({ x: 30, y: 20 });
    expect(watchingYou.getState().power.x).toBe(30);
    expect(watchingYou.getState().power.y).toBe(20);
  });

  it('It should change rotatable, when the setRotatable is call', async () => {
    const watchingYou = new WatchingYou();
    expect(watchingYou.getState().rotatable).toBeTruthy(); // default

    watchingYou.setRotatable(false);
    expect(watchingYou.getState().rotatable).toBeFalsy();

    watchingYou.setRotatable(true);
    expect(watchingYou.getState().rotatable).toBeTruthy();
  });

  it('It should change movable, when the setMovable is call', async () => {
    const watchingYou = new WatchingYou();
    expect(watchingYou.getState().movable).toBeTruthy(); // default

    watchingYou.setMovable(false);
    expect(watchingYou.getState().movable).toBeFalsy();

    watchingYou.setMovable(true);
    expect(watchingYou.getState().movable).toBeTruthy();
  });

  it('It should change targetType, when the setTarget is call', async () => {
    const watchingYou = new WatchingYou();
    expect(watchingYou.getState().targetType).toBe('mouse'); // default

    watchingYou.setTarget({ targetType: 'mouse' });
    expect(watchingYou.getState().targetType).toBe('mouse');

    watchingYou.setTarget({ targetType: 'dom' });
    expect(watchingYou.getState().targetType).toBe('dom');

    watchingYou.setTarget({ targetType: 'input' });
    expect(watchingYou.getState().targetType).toBe('input');

    // Guess what users want to do (may be over-designed)
    watchingYou.setTarget();
    expect(watchingYou.getState().targetType).toBe('mouse');

    watchingYou.setTarget({ target: '.selector' });
    expect(watchingYou.getState().targetType).toBe('dom');
  });

  it('It should change target, when the setTarget is call', async () => {
    document.body.innerHTML = `
      <div class="eyes">
        <div>O</div>
      </div>
    `;
    const watchingYou = new WatchingYou();
    const targetSelector = '.eyes';
    watchingYou.setTarget({ target: targetSelector });
    const expectedDom = document.querySelector(targetSelector);
    expect(watchingYou.getState().targetDom).toBe(expectedDom);

    if (!expectedDom) throw Error('eyes is notFound');
    watchingYou.setTarget({ target: expectedDom, targetType: 'dom' });
    expect(watchingYou.getState().targetDom).toBe(expectedDom);
  });
});
