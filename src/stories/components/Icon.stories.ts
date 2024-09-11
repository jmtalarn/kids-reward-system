import type { Meta, StoryObj } from '@storybook/react';
import Icon from '../../adapters/ui/components/Icon';

const meta = {
	title: 'Components/Icon',
	component: Icon,
	parameters: {
		layout: 'centered',
	},
	tags: ['autodocs'],
	argTypes: {},
	args: {},
} satisfies Meta<typeof Icon>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
	argTypes: {
		icon: {
			options: ["No valid icon",
				"align-center",
				"align-justify",
				"arrow-left",
				"arrow-right",
				"calendar",
				"check",
				"chevron-down",
				"chevron-left",
				"chevron-right",
				"chevron-up",
				"chevrons-left",
				"chevrons-right",
				"corner-down-left",
				"corner-left-down",
				"corner-right-down",
				"fast-forward",
				"frown",
				"help-circle",
				"meh",
				"move",
				"plus-circle",
				"plus",
				"rewind",
				"skip-back",
				"skip-forward",
				"smile",
				"thumbs-down",
				"thumbs-up",
				"trash-2",
				"user-check",
				"user-minus",
				"user-plus",
				"user-x",
				"user",
				"users",
			],
			control: { type: 'select' },
		},

	}
};
