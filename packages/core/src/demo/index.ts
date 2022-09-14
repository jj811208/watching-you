import WatchingYou from '../index';

document.querySelector<HTMLDivElement>('#app')!.innerHTML = `
  <div class="section">
    <h1>WatchingYou Demo</h1>
    <div class="eyes">
      <div>O</div>
    </div>
  </div>
`;

const watchingYou = new WatchingYou('.eyes > div', {
  power: {
    x: 22,
    y: 42,
  },
});
watchingYou.start();
