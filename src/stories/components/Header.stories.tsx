import type { Meta, StoryObj } from '@storybook/react';
import { fn } from '@storybook/test';
import Header from '../../adapters/ui/components/Header.tsx';
import store from "../../adapters/state/store.ts";
import { Provider } from "react-redux";


const meta = {
  title: 'Components/Header',
  component: Header,
  parameters: {
    layout: 'centered',
  },

  tags: ['autodocs'],

  argTypes: {},

  args: { onClick: fn() },
} satisfies Meta<typeof Header>;

export default meta;
type Story = StoryObj<typeof meta>;


export const Default: Story = {
  args: {
  },
  decorators: [
    (Story) => (<Provider store={store} > <Story /></Provider >)
  ],
};
