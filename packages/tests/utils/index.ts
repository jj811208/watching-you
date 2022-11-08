import { fireEvent } from '@testing-library/dom';

const wait = async (ms: number) => {
  await new Promise((r) => {
    setTimeout(r, ms);
  });
};

const mousemove = async (x: number, y: number) => {
  fireEvent(
    window,
    new MouseEvent('mousemove', {
      clientX: x,
      clientY: y,
    }),
  );
  await wait(100);
};

export { wait, mousemove };
