/**
 * @vitest-environment happy-dom
 */
import { beforeEach, describe, expect, it } from 'vitest';
import WatchingYou from '../src/index';

describe('Initialized', () => {
  beforeEach(() => {
    document.body.innerHTML = `
      <div class="eyes">
        <div>O</div>
      </div>
    `;
  });

  it('It should be able to be initialized', () => {
    const watchingYou = new WatchingYou();
    expect(watchingYou instanceof WatchingYou).toBe(true);
    watchingYou.stop();
  });
});
