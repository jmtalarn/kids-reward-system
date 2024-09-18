import type { Meta, StoryObj } from '@storybook/react';
import WhyToUseIt from '../../adapters/ui/pages/WhyToUseIt';
import { withRouter, reactRouterOutlet, reactRouterParameters } from 'storybook-addon-remix-react-router';

const meta = {
  title: 'Pages/WhyToUseIt',
  component: WhyToUseIt,
  decorators: [withRouter],
  parameters: {
    layout: 'centered',
    reactRouter: reactRouterParameters({ routing: reactRouterOutlet(<WhyToUseIt />) })
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
