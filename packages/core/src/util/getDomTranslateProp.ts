// 有優化空間
function getDomTranslateProp(dom: HTMLElement) {
  const domTransform = getComputedStyle(dom).transform;
  if (domTransform === 'none') return { x: 0, y: 0 };
  const result = getComputedStyle(dom)
    .transform.split('(')
    .slice(1)[0]
    .slice(0, -1)
    .split(', ')
    .slice(4)
    .map(Number);
  return { x: result[0], y: result[1] };
}

export default getDomTranslateProp;
