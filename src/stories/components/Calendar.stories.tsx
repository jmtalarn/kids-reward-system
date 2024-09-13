import type { Meta, StoryObj } from '@storybook/react';
import store from "../../adapters/state/store";
import { Provider } from "react-redux";
import { Calendar } from '../../adapters/ui/components/Calendar';



const meta = {
  title: 'Components/Calendar',
  component: Calendar,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {},
  args: {
  },
} satisfies Meta<typeof Calendar>;

export default meta;
type Story = StoryObj<typeof meta>;


// const dailyTasks = ["Make the bed", "Dress on time", "Shoes on time", "Brush your teeth", "Pack backpack", "Ready to go"].map((description, idx) => ({ id: idx + 10000, description, order: idx }));
// const participants = [{ name: "Older kid", id: "1" }, { name: "Younger kid", id: "2" }];


export const Default: Story = {
  decorators: [
    (Story) => (<Provider store={store} ><Story /></Provider>)
  ]
};
