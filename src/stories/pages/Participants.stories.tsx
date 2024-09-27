import type { Meta, StoryObj } from '@storybook/react';
import Participants from '../../adapters/ui/pages/Participants.tsx';
import { withRouter, reactRouterOutlet, reactRouterParameters } from 'storybook-addon-remix-react-router';
import store from "../../adapters/state/store.ts";
import { Provider } from "react-redux";

const meta = {
  title: 'Pages/Participants',
  component: Participants,
  decorators: [withRouter, (Story) => (<Provider store={store} > <Story /></Provider >)],
  parameters: {
    layout: 'centered',
    reactRouter: reactRouterParameters({ routing: reactRouterOutlet(<Participants />) })
  },
  tags: ['autodocs'],
  argTypes: {},
  args: {},
} satisfies Meta<typeof Participants>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {

  },
};
