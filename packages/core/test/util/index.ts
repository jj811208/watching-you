import { fireEvent } from '@testing-library/dom';

const wait = async (ms) => {
  await new Promise((r) => {
    setTimeout(r, ms);
  });
};

const mousemove = async (x, y) => {
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
