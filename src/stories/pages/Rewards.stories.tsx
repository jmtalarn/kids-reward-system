import type { Meta, StoryObj } from '@storybook/react';
import Rewards from '../../adapters/ui/pages/Rewards';
import { withRouter, reactRouterOutlet, reactRouterParameters } from 'storybook-addon-remix-react-router';
import store from "../../adapters/state/store.ts";
import { Provider } from "react-redux";

const meta = {
  title: 'Pages/Rewards',
  component: Rewards,
  decorators: [withRouter, (Story) => (<Provider store={store} > <Story /></Provider >)],
  parameters: {
    layout: 'centered',
    reactRouter: reactRouterParameters({ routing: reactRouterOutlet(<Rewards />) })
  },
  tags: ['autodocs'],
  argTypes: {},
  args: {},
} satisfies Meta<typeof Rewards>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {

  },
};
