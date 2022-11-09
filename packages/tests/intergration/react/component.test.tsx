import React from 'react';
import { render, waitFor } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import { ReactWatchingYou as WatchingYou } from '../../watchingYou';
import { mousemove } from '../../utils';

describe('Components', async () => {
  it('It should work', async () => {
    const watcher = 'O';
    const watchingYouElement = render(
      // @ts-ignore
      <WatchingYou>
        <div>{watcher}</div>
      </WatchingYou>,
    );
    await waitFor(() => mousemove(100, 100));
    expect(watchingYouElement.getByText(watcher)).toMatchSnapshot();
  });
});
