function isHtmlElement(x: unknown): x is HTMLElement {
  return x instanceof HTMLElement;
}
export { isHtmlElement };
