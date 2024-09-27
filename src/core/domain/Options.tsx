import { Smile, Meh, Frown } from 'react-feather';
import { DialogOption } from './DialogOption';

export const options: DialogOption[] = [
	{ option: <Smile style={{ color: 'lime' }} />, value: 3 },
	{ option: <Meh style={{ color: 'gold' }} />, value: 1 },
	{ option: <Frown style={{ color: 'salmon' }} />, value: 0 },
];

export const ValueOptionMap =
{
	[options[0].value]: options[0].option,
	[options[1].value]: options[1].option,
	[options[2].value]: options[2].option
};
