export type Command = 'run' | 'init' | 'help';

export type CliArgs = {
	command: Command;
	configPath?: string;
	local?: boolean;
};

type ValidFlag = {
	/** How the flag is typed
	 * @example "-l / --local"
	 */
	name: string;
	description: string;
};

export type ValidCommand = {
	/** How the command is typed
	 * @example "init"
	 */
	name: string;
	description: string;
	flags?: ValidFlag[];
};
