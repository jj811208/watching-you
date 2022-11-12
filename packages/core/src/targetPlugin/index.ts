import MouseTarget from './mouse';
import DomTarget from './dom';
import InputTarget from './input';
import TextareaTarget from './textarea';

const targetPlugins = {
  mouse: MouseTarget,
  dom: DomTarget,
  input: InputTarget,
  textarea: TextareaTarget,
};

export default targetPlugins;
