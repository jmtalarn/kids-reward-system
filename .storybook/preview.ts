import type { Preview } from '@storybook/react';

import '@fontsource/luckiest-guy';
import '@fontsource-variable/grandstander';
import '../src/index.css';

const preview: Preview = {
  parameters: {
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
  },
};

export default preview;
