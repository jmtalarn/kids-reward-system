import type { Meta, StoryObj } from '@storybook/react';
import Root from '../../adapters/ui/pages/Root';

const meta = {
  title: 'Pages/Root',
  component: Root,
  parameters: {
    layout: 'centered',
  },

  tags: ['autodocs'],
  argTypes: {},

  args: {},
} satisfies Meta<typeof Input>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {

  },
};
