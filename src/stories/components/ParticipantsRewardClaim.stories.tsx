import type { Meta, StoryObj } from '@storybook/react';
import { Provider } from "react-redux";
import store from "../../adapters/state/store";
import { ParticipantsRewardClaim } from '../../adapters/ui/components/ParticipantsRewardClaim';


const meta = {
  title: 'Components/ParticipantsRewardClaim',
  component: ParticipantsRewardClaim,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {},
  args: {
    reward: { id: "REWARD_FORM", description: "Reward description" }
  },
} satisfies Meta<typeof ParticipantsRewardClaim>;

export default meta;
type Story = StoryObj<typeof meta>;



export const Default: Story = {
  decorators: [
    (Story) => (
      <Provider store={store} ><Story /></Provider>
    )
  ]
};
