import { addons } from '@storybook/addons';
import watchYouTheme from './theme';

addons.setConfig({
  theme: watchYouTheme,
  sidebar: {
    showRoots: true,
  },
});
