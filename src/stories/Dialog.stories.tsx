import type { Meta, StoryObj } from '@storybook/react';
import { fn } from '@storybook/test';
import Dialog from '../adapters/ui/components/Dialog';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFaceAwesome, faFaceVomit, faFaceThinking } from '@fortawesome/pro-duotone-svg-icons';

const options = [
  { option: <FontAwesomeIcon icon={faFaceAwesome} style={{ color: 'lime' }} />, action: fn() },
  { option: <FontAwesomeIcon icon={faFaceThinking} style={{ color: 'gold' }} />, action: fn() },
  { option: <FontAwesomeIcon icon={faFaceVomit} style={{ color: 'salmon' }} />, action: fn() },
];
// More on how to set up stories at: https://storybook.js.org/docs/writing-stories#default-export
const meta = {
  title: 'Components/Dialog',
  component: Dialog,
  parameters: {
    // Optional parameter to center the component in the Canvas. More info: https://storybook.js.org/docs/configure/story-layout
    layout: 'centered',
  },
  // This component will have an automatically generated Autodocs entry: https://storybook.js.org/docs/writing-docs/autodocs
  tags: ['autodocs'],
  // More on argTypes: https://storybook.js.org/docs/api/argtypes
  argTypes: {},
  // Use `fn` to spy on the onClick arg, which will appear in the actions panel once invoked: https://storybook.js.org/docs/essentials/actions#action-args
  args: { openModal: true, closeModal: fn(), children: <p>Modal content</p>, options },
} satisfies Meta<typeof Dialog>;

export default meta;
type Story = StoryObj<typeof meta>;

// More on writing stories with args: https://storybook.js.org/docs/writing-stories/args
export const Default: Story = {
  args: {
    children: 'Dialog',
  },
};
