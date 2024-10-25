import type { Meta, StoryObj } from '@storybook/react';
import ParticipantsList from '../../adapters/ui/components/ParticipantsList.tsx';
import { withRouter } from 'storybook-addon-remix-react-router';
import store from "../../adapters/state/store";
import { Provider } from "react-redux";

const meta = {
  title: 'Components/ParticipantsList',
  component: ParticipantsList,
  decorators: [withRouter],
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {},
  args: {},
} satisfies Meta<typeof ParticipantsList>;

export default meta;
type Story = StoryObj<typeof meta>;

// More on writing stories with args: https://storybook.js.org/docs/writing-stories/args
export const Default: Story = {
  decorators: [
    (Story) => (<Provider store={store} > <Story /></Provider >)
  ],
};
