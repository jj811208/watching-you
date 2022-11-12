import { ComponentStory, ComponentMeta } from '@storybook/react';
import WatchingYou from '../index';
import './stories.css';

// More on default export: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
// https://storybook.js.org/docs/react/essentials/controls
// https://storybook.js.org/docs/react/writing-docs/doc-block-argstable
export default {
  title: 'Watching-You',
  component: WatchingYou,
  argTypes: {
    power: {
      control: {
        type: 'range',
        min: 20,
        max: 300,
        step: 10,
        default: 123,
      },
      description: 'Maximum distance to move from the origin (px).',
      defaultValue: {
        summary: 50,
      },
    },
    movable: {
      control: {
        type: 'boolean',
      },
      description: 'Ability to move',
      defaultValue: {
        summary: true,
      },
    },
    rotatable: {
      control: {
        type: 'boolean',
      },
      description: 'Ability to rotate',
      defaultValue: {
        summary: true,
      },
    },
    active: {
      control: {
        type: 'boolean',
      },
      description: 'active',
      defaultValue: {
        summary: true,
      },
    },
  },
} as ComponentMeta<typeof WatchingYou>;

// More on component templates: https://storybook.js.org/docs/react/writing-stories/introduction#using-args
const MouseTargetTemplate: ComponentStory<typeof WatchingYou> = (
  args,
) => (
  <div className="container">
    <WatchingYou {...args}>
      <span>1</span>
    </WatchingYou>
  </div>
);
export const MouseTarget = MouseTargetTemplate.bind({});
// More on args: https://storybook.js.org/docs/react/writing-stories/args
MouseTarget.args = {
  power: 50,
  movable: true,
  rotatable: true,
  active: true,
};

const DomTargetTemplate: ComponentStory<typeof WatchingYou> = (
  args,
) => (
  <div className="container">
    <div className="running-target">target</div>
    <WatchingYou {...args} targetType="dom" target=".running-target">
      <span>1</span>
    </WatchingYou>
  </div>
);
export const DomTarget = DomTargetTemplate.bind({});
// More on args: https://storybook.js.org/docs/react/writing-stories/args
DomTarget.args = {
  power: 50,
  movable: true,
  rotatable: true,
  active: true,
};

const InputTargetTemplate: ComponentStory<typeof WatchingYou> = (
  args,
) => (
  <div className="container">
    <WatchingYou {...args} targetType="input" target=".target">
      <span>1</span>
    </WatchingYou>
    <input className="target" />
  </div>
);
export const InputTarget = InputTargetTemplate.bind({});
// More on args: https://storybook.js.org/docs/react/writing-stories/args
InputTarget.args = {
  power: 50,
  movable: true,
  rotatable: true,
  active: true,
};

const TextareaTargetTemplate: ComponentStory<typeof WatchingYou> = (
  args,
) => (
  <div className="container">
    <WatchingYou {...args} targetType="textarea" target=".target2">
      <span>1</span>
    </WatchingYou>
    <textarea className="target2"></textarea>
  </div>
);
export const TextareaTarget = TextareaTargetTemplate.bind({});
// More on args: https://storybook.js.org/docs/react/writing-stories/args
TextareaTarget.args = {
  power: 50,
  movable: true,
  rotatable: true,
  active: true,
};
