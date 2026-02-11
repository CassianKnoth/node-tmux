import { Context } from './state.js';

export type UserChoice = 'attach' | 'destroy' | 'restart' | 'other' | 'exit';

type AllUserChoices = Record<UserChoice, true>;

type AtLeastOne<T> = {
	[K in keyof T]: Required<Pick<T, K>> & Partial<Omit<T, K>>;
}[keyof T];

export type UserChoiceList = AtLeastOne<AllUserChoices>;

export type ChoiceHandler = (currentContext?: Context) => Context;

type Choice = {
	/**
	 * How the option can be referenced in text
	 * @example attach
	 */
	label: string;
	/** How the option is presented to the user in context of a choice dialouge.
	 * @example [r]estart (indicating "r" or "restart" triggers this option)
	 */
	optionLabel: string;
	/** Pattern to match the user input which can be variable
	 * e. g. match "o", "other" and "Other"
	 */
	regex: RegExp;
	/** Function to handle the given choice */
	handler: ChoiceHandler;
};
export type AllChoices = Record<UserChoice, Choice>;
