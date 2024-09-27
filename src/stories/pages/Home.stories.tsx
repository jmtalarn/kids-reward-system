import type { Meta, StoryObj } from '@storybook/react';
import Home from '../../adapters/ui/pages/Home';
import { withRouter, reactRouterOutlet, reactRouterParameters } from 'storybook-addon-remix-react-router';
import store from "../../adapters/state/store.ts";
import { Provider } from "react-redux";

const meta = {
  title: 'Pages/Home',
  component: Home,
  decorators: [withRouter, (Story) => (<Provider store={store} > <Story /></Provider >)],
  parameters: {
    layout: 'centered',
    reactRouter: reactRouterParameters({ routing: reactRouterOutlet(<Home />) })
  },
  tags: ['autodocs'],
  argTypes: {},
  args: {},
} satisfies Meta<typeof Home>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {

  },
};
