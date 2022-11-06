// the `domTransform` format we get from our test environment is different from the browser's format, which is a compatibility writing method
const splitRegex = /px\) rotate\(|translate\(|deg\)|px,/;
function getDomTranslateProp(dom: Element) {
  const domTransform = getComputedStyle(dom).transform;
  if (domTransform === 'none') return { x: 0, y: 0 };
  if (domTransform.includes('translate')) {
    const result = domTransform.split(splitRegex);
    return { x: Number(result[1]), y: Number(result[2]) };
  }
  // the way faster then `new DOMMatrix` or `regex`
  const result = domTransform
    .slice(0, -1)
    .split(', ')
    .slice(-2)
    .map(Number);
  return { x: result[0] || 0, y: result[1] || 0 };
}

export default getDomTranslateProp;
