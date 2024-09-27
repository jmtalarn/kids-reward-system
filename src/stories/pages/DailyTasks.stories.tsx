import type { Meta, StoryObj } from '@storybook/react';
import DailyTasks from '../../adapters/ui/pages/DailyTasks.tsx';
import { withRouter, reactRouterOutlet, reactRouterParameters } from 'storybook-addon-remix-react-router';
import store from "../../adapters/state/store.ts";
import { Provider } from "react-redux";

const meta = {
  title: 'Pages/DailyTasks',
  component: DailyTasks,
  decorators: [withRouter, (Story) => (<Provider store={store} > <Story /></Provider >)],
  parameters: {
    layout: 'centered',
    reactRouter: reactRouterParameters({ routing: reactRouterOutlet(<DailyTasks />) })
  },
  tags: ['autodocs'],
  argTypes: {},
  args: {},
} satisfies Meta<typeof DailyTasks>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {

  },
};
