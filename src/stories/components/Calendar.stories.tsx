import type { Meta, StoryObj } from '@storybook/react';

import { Calendar } from '../../adapters/ui/components/Calendar';
import { DateProvider } from '../../adapters/ui/context/DateContext';
import { ConfigProvider } from '../../adapters/ui/context/ConfigContext';

// More on how to set up stories at: https://storybook.js.org/docs/writing-stories#default-export
const meta = {
  title: 'Components/Calendar',
  component: Calendar,
  parameters: {
    // Optional parameter to center the component in the Canvas. More info: https://storybook.js.org/docs/configure/story-layout
    layout: 'centered',
  },
  // This component will have an automatically generated Autodocs entry: https://storybook.js.org/docs/writing-docs/autodocs
  tags: ['autodocs'],
  // More on argTypes: https://storybook.js.org/docs/api/argtypes
  argTypes: {},
  // Use `fn` to spy on the onClick arg, which will appear in the actions panel once invoked: https://storybook.js.org/docs/essentials/actions#action-args
  args: {
    tasks: ["Make the bed", "Dress on time", "Shoes on time", "Brush your teeth", "Pack backpack", "Ready to go"], participants: [{ name: "Older kid", id: "1" }, { name: "Younger kid", id: "2" }]
  },
} satisfies Meta<typeof Calendar>;

export default meta;
type Story = StoryObj<typeof meta>;

// More on writing stories with args: https://storybook.js.org/docs/writing-stories/args
export const Default: Story = {
  decorators: [
    (Story) => (<DateProvider><ConfigProvider><Story /></ConfigProvider></DateProvider >)
  ]
};
