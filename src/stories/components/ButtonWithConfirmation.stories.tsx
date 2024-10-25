import type { Meta, StoryObj } from '@storybook/react';
import { fn } from '@storybook/test';
import ButtonWithConfirmation from '../../adapters/ui/components/ButtonWithConfirmation';


const meta = {
  title: 'Components/ButtonWithConfirmation',
  component: ButtonWithConfirmation,
  parameters: {
    layout: 'centered',
  },
  decorators: [
    (Story) => (<div style={{ display: "flex", alignItems: "center" }}>{"Click the button to ask for permission"} <Story /> </div>)
  ],
  tags: ['autodocs'],
  argTypes: {},
  args: { onClick: () => { console.log("CLICK!"); fn(); } },
} satisfies Meta<typeof ButtonWithConfirmation>;

export default meta;
type Story = StoryObj<typeof meta>;


export const Default: Story = {
  args: {
    children: 'Hello !',
  },
};
