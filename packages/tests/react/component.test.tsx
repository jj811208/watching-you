import React from 'react';
import { render } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import WatchingYou from '../../react';//'react-watching-you';
import { mousemove } from '../utils';

describe('Components', () => {
  it('It should work', async () => {
    render(
      // @ts-ignore
      <WatchingYou>
        <div>O</div>
      </WatchingYou>,
    );
    await mousemove(100, 100);
    expect(document.body).toMatchSnapshot();
    await mousemove(400, 200);
    expect(document.body).toMatchSnapshot();
  });
});
