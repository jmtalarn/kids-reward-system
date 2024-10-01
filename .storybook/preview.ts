import type { Preview } from '@storybook/react';
import { reactIntl } from './reactIntl.js';

import '@fontsource/luckiest-guy';
import '@fontsource-variable/grandstander';
import '../src/index.css';

const preview: Preview = {
  globals: {
    locale: reactIntl.defaultLocale,
    locales: {
      en: 'English',
      ca: 'Català',
      es: 'Spanish'
    },
  },
  parameters: {
    reactIntl,
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
  },
};

export default preview;
