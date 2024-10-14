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
    participant: { name: "Miquel", color: "#054a91", id: "698c8cab-6b4d-4048-b9fa-ff7701d28476" }
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
