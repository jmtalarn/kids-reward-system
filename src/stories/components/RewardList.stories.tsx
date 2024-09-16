import type { Meta, StoryObj } from '@storybook/react';
import RewardList from '../../adapters/ui/components/RewardList.tsx';
import { withRouter } from 'storybook-addon-remix-react-router';
import store from "../../adapters/state/store.ts";
import { Provider } from "react-redux";

const meta = {
  title: 'Components/RewardList',
  component: RewardList,
  decorators: [withRouter],
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {},
  args: {},
} satisfies Meta<typeof RewardList>;

export default meta;
type Story = StoryObj<typeof meta>;



export const Default: Story = {
  decorators: [
    (Story) => (<Provider store={store} > <Story /></Provider >)
  ],
  args: {}
};
