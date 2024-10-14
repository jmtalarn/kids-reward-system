import type { Meta, StoryObj } from '@storybook/react';
import { Provider } from "react-redux";
import store from "../../adapters/state/store";
import { ParticipantClaimedRewards } from '../../adapters/ui/components/ParticipantClaimedRewards';


const meta = {
  title: 'Components/ParticipantClaimedRewards',
  component: ParticipantClaimedRewards,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {},
  args: {
    participant: {
      name: "Miquel", color: "#054a91", id: "cdaa511e-79de-4b0a-ab6b-03d7216307ad"
    }
  },
} satisfies Meta<typeof ParticipantClaimedRewards>;

export default meta;
type Story = StoryObj<typeof meta>;



export const Default: Story = {
  decorators: [
    (Story) => (
      <Provider store={store} ><Story /></Provider>
    )
  ]
};
