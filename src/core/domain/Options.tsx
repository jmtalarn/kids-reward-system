import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFaceAwesome, faFaceVomit, faFaceThinking } from '@fortawesome/pro-duotone-svg-icons';


export const options = [
	{ option: <FontAwesomeIcon icon={faFaceAwesome} style={{ color: 'lime' }} />, value: 1 },
	{ option: <FontAwesomeIcon icon={faFaceThinking} style={{ color: 'gold' }} />, value: 2 },
	{ option: <FontAwesomeIcon icon={faFaceVomit} style={{ color: 'salmon' }} />, value: 3 },
];
