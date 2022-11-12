import WatchingYou from '../src/index';

document.querySelector<HTMLDivElement>('#app')!.innerHTML = `
  <div class="section">
    <h1>WatchingYou Demo</h1>
    ${new Array(8)
      .fill('')
      .map(
        () => `<div style="display: flex; gap: 12px;">
          ${new Array(25)
            .fill('')
            .map(() => `<div class="eyes"><div>O</div></div>`)
            .join('')}
        </div>
        `,
      )
      .join('')}
  </div>
`;

const allWatcher = document.querySelectorAll('.eyes > div');
const watchingYouList: any[] = [];

allWatcher.forEach((watcher) => {
  const watchingYou = new WatchingYou(watcher, {
    power: {
      x: 22,
      y: 42,
    },
  });
  watchingYou.start();
  watchingYouList.push(watchingYou);
});

const cancelButton = document.querySelector('#app > div > h1');

cancelButton?.addEventListener('click', () => {
  watchingYouList.forEach((watchingYou) => {
    watchingYou.cancel();
  });
});
