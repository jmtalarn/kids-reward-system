import type { Meta, StoryObj } from '@storybook/react';
import Recurring from '../../adapters/ui/components/Recurring.tsx';
import { fn } from '@storybook/test';
import store from "../../adapters/state/store.ts";
import { Provider } from "react-redux";
import { dateToShortISOString } from '../../core/domain/utils/date-utils.ts';

const meta = {
  title: 'Components/Recurring',
  component: Recurring,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {},
  args: {},
} satisfies Meta<typeof Recurring>;

export default meta;
type Story = StoryObj<typeof meta>;


// More on writing stories with args: https://storybook.js.org/docs/writing-stories/args
export const Default: Story = {
  decorators: [
    (Story) => (<Provider store={store} > <Story /></Provider >)
  ],
  args: {
    recurring: {
      kind: "OnlyOnce",
      startingDate: dateToShortISOString(),
      dueDate: dateToShortISOString()
    },
    setRecurring: fn()
  }
};
