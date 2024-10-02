import type { Meta, StoryObj } from '@storybook/react';

import Loading from '../../adapters/ui/components/Loading';

const Background = () => (<p>Culpa laboris sit quis occaecat eu excepteur.Aliquip minim sit esse anim elit velit eiusmod non.Laborum cillum dolor proident aute enim enim exercitation aute esse velit est irure sint.Excepteur cillum laboris consequat irure deserunt esse Lorem adipisicing cillum.</p>);


const meta = {
  title: 'Components/Loading',
  component: Loading,
  decorators: [
    (Story) => (<><Background /><Story /></>)
  ],
  parameters: {
    layout: 'centered',
  },

  tags: ['autodocs'],

  argTypes: {},

  args: {},
} satisfies Meta<typeof Loading>;

export default meta;
type Story = StoryObj<typeof meta>;


export const Default: Story = {
  args: { show: true },
};
