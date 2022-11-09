import { vi } from 'vitest';

const mockGetBoundingClientRectSpy = () => {
  const getBoundingClientRectSpy = vi.fn(function () {
    // @ts-ignore
    if (this.id === 'watcher')
      return {
        x: 0,
        y: 0,
        width: 10,
        height: 10,
        bottom: 0,
        left: 0,
        right: 0,
        top: 0,
        toJSON: () => {},
      };
    else
      return {
        x: 100,
        y: 100,
        width: 300,
        height: 300,
        bottom: 0,
        left: 0,
        right: 0,
        top: 0,
        toJSON: () => {},
      };
  });
  window.Element.prototype.getBoundingClientRect =
    getBoundingClientRectSpy;
};

export { mockGetBoundingClientRectSpy };
