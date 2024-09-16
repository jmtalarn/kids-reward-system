import type { Meta, StoryObj } from '@storybook/react';
import RewardForm from '../../adapters/ui/components/RewardForm.tsx';

import store from "../../adapters/state/store.ts";
import { Provider } from "react-redux";

const meta = {
  title: 'Components/RewardForm',
  component: RewardForm,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {},
  args: {},
} satisfies Meta<typeof RewardForm>;

export default meta;
type Story = StoryObj<typeof meta>;


// More on writing stories with args: https://storybook.js.org/docs/writing-stories/args
export const Default: Story = {
  decorators: [
    (Story) => (<Provider store={store} > <Story /></Provider >)
  ],
  args: { reward: { id: "REWARD_FORM", description: "Reward description" } }
};
