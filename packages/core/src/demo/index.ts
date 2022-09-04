import Gazer from '../index';

document.querySelector<HTMLDivElement>('#app')!.innerHTML = `
  <div class="section">
    <h1>Gazer Demo</h1>
    <div class="eyes">
      <div>O</div>
    </div>
  </div>
`;

const gazer = new Gazer({
  observer: '.eyes > div',
  power: {
    x: 22,
    y: 42,
  },
});
gazer.start();