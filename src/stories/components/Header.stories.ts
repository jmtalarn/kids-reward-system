import type { Meta, StoryObj } from '@storybook/react';
import { fn } from '@storybook/test';
import Header from '../../adapters/ui/components/Header';


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
};
