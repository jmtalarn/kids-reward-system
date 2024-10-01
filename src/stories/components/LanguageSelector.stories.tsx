import type { Meta, StoryObj } from '@storybook/react';
import LanguageSelector from '../../adapters/ui/components/LanguageSelector.tsx';

import store from "../../adapters/state/store.ts";
import { Provider } from "react-redux";

const meta = {
  title: 'Components/LanguageSelector',
  component: LanguageSelector,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {},
  args: {},
} satisfies Meta<typeof LanguageSelector>;

export default meta;
type Story = StoryObj<typeof meta>;

// More on writing stories with args: https://storybook.js.org/docs/writing-stories/args
export const Default: Story = {
  decorators: [
    (Story) => (<Provider store={store} > <Story /></Provider >)
  ],
};
