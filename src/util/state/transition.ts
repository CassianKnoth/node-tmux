import { Context } from '../../types/state.js';
import { printLineSeparator } from '../layout/line-separator.js';
import { handleUserChoice } from '../user-input/user-choice/handle-user-choice.js';
import { handleNoConfigState } from './handler/handle-no-config-state.js';

export const transition = async (currentContext: Context): Promise<Context> => {
	printLineSeparator();

	let newContext: Context = { ...currentContext, sessionState: 'EXIT' };

	switch (currentContext.sessionState) {
		case 'NO_CONFIG':
			newContext = await handleNoConfigState(currentContext);
			break;
		case 'DETACHED_SESSION':
			newContext = await handleUserChoice(
				{
					attach: true,
					restart: true,
					destroy: true,
					other: true,
					exit: true,
				},
				currentContext,
			);
			break;
		case 'ATTACHED_SESSION':
			newContext = await handleUserChoice(
				{
					restart: true,
					destroy: true,
					other: true,
					exit: true,
				},
				currentContext,
			);
			break;
	}

	return newContext;
};
