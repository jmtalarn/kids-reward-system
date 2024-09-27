import type { Meta, StoryObj } from '@storybook/react';
import { ParticipantsAssessment } from '../../adapters/ui/components/ParticipantsAssessment';
import store from "../../adapters/state/store";
import { Provider } from "react-redux";
import { options } from '../../core/domain/Options';
// import { Participant } from '../../core/domain/Participant';
import { Task } from '../../core/domain/Task';
import { dateToShortISOString } from '../../core/domain/utils/date-utils';

const dailyTasks: Task[] = ["Make the bed", "Dress on time", "Shoes on time", "Brush your teeth", "Pack backpack", "Ready to go"].map((description, idx) => ({ id: (idx + 10000).toString(), rewardId: "REWARD_FORM", description, order: idx }));
// const participants: Participant[] = [{ name: "Older kid", id: "1", color: "#f05d5e" }, { name: "Younger kid", id: "2", color: "#FE6847" }];

const meta = {
  title: 'Components/ParticipantsAssessment',
  component: ParticipantsAssessment,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {},
  args: {
    selectedDate: dateToShortISOString(),
    selectedTask: dailyTasks[dailyTasks.length - 1], options
  },
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
