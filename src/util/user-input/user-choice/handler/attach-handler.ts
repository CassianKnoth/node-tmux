import { ChoiceHandler } from '../../../../types/user-choice-types.js';
import { tmuxAttach } from '../../../tmux/attach-session.js';

export const attachHandler: ChoiceHandler = (currentContext) => {
	if (!currentContext) {
		throw new Error('Internal: No currentContext provided');
	}

	tmuxAttach(currentContext.sessionName);

	return { ...currentContext, sessionState: 'EXIT' };
};
