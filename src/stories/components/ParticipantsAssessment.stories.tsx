import type { Meta, StoryObj } from '@storybook/react';
import { fn } from '@storybook/test';
import { ParticipantsAssessment } from '../../adapters/ui/components/ParticipantsAssessment';
import store from "../../adapters/state/store";
import { Provider } from "react-redux";
import { options } from '../../core/domain/Options'
import { Participant } from '../../core/domain/Participant';
import { Task } from '../../core/domain/Task';


const dailyTasks: Task[] = ["Make the bed", "Dress on time", "Shoes on time", "Brush your teeth", "Pack backpack", "Ready to go"].map((description, idx) => ({ id: idx + 10000, description, order: idx }));
const participants: Participant[] = [{ name: "Older kid", id: "1", color: "#f05d5e" }, { name: "Younger kid", id: "2", color: "#FE6847" }];

const meta = {
  title: 'Components/ParticipantsAssessment',
  component: ParticipantsAssessment,
  parameters: {

    layout: 'centered',
  },
  // This component will have an automatically generated Autodocs entry: https://storybook.js.org/docs/writing-docs/autodocs
  tags: ['autodocs'],
  // More on argTypes: https://storybook.js.org/docs/api/argtypes
  argTypes: {},
  // Use `fn` to spy on the onClick arg, which will appear in the actions panel once invoked: https://storybook.js.org/docs/essentials/actions#action-args
  args: { selectedDate: new Date().toISOString().substring(0, 10), selectedTask: dailyTasks[dailyTasks.length - 1], options },
} satisfies Meta<typeof ParticipantsAssessment>;

export default meta;
type Story = StoryObj<typeof meta>;



export const Default: Story = {
  decorators: [
    (Story) => (
      <Provider store={store} ><Story /></Provider>
    )
  ]
};
