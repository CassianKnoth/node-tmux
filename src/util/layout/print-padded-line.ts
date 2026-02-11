import { padText } from './pad-text.js';

export const printPaddedLine = (left: string, right: string) => {
	console.log(`${padText(left)} ${right}`);
};
