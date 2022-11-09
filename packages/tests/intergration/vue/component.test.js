import { render } from '@testing-library/vue';
import { describe, expect, it } from 'vitest';
import { VueWatchingYou as WatchingYou } from '../../watchingYou';
import { mousemove } from '../../utils';

describe('Components', () => {
  it('It should work', async () => {
    const watcher = '1';
    const WatchingYouElement = render(WatchingYou, {
      props: { 'v-slot': 'watchingYouProps' },
      slots: {
        default: `<div :className="params.className" :style="params.style">${watcher}</div>`,
      },
    });
    await mousemove(100, 100);
    expect(WatchingYouElement.getByText(watcher).className).not.toBe(
      '',
    );
    expect(WatchingYouElement.getByText(watcher).style).not.toBe('');
  });
});
