import type { Meta, StoryObj } from '@storybook/react';
import Particpants from '../../adapters/ui/pages/Particpants.tsx';
import { withRouter, reactRouterOutlet, reactRouterParameters } from 'storybook-addon-remix-react-router';
import store from "../../adapters/state/store.ts";
import { Provider } from "react-redux";

const meta = {
  title: 'Pages/Particpants',
  component: Particpants,
  decorators: [withRouter, (Story) => (<Provider store={store} > <Story /></Provider >)],
  parameters: {
    layout: 'centered',
    reactRouter: reactRouterParameters({ routing: reactRouterOutlet(<Particpants />) })
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
