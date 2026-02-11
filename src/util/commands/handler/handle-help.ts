import { ValidCommand } from '../../../types/commands.js';
import { exitOut } from '../../exit.js';
import { printLineSeparator } from '../../layout/line-separator.js';
import { printPaddedLine } from '../../layout/print-padded-line.js';

const validCommands: ValidCommand[] = [
	{
		name: 'node-tmux',
		description: 'Runs the CLI with default config file',
	},
	{
		name: 'init',
		description:
			'Initializes a node-tmux-config.json file in the home directory under .node-tmux',
		flags: [
			{
				name: '-l / --local',
				description:
					'Creates a node-tmux-config.json in the current directory instead of the home directory',
			},
		],
	},
	{
		name: '-c / --config',
		description:
			'Allows you to pass any path to a config file, e. g. "node-tmux -c ./path/to/config.json"',
	},
	{
		name: '-h / --help',
		description: 'Prints this reference',
	},
];

export const handleHelp = () => {
	printLineSeparator();

	console.log('📚 These references might help you:');
	console.log('\n');

	validCommands.forEach((command) => {
		console.group();
		printPaddedLine(command.name, command.description);
		if (command.flags) {
			console.log('🚩 (flags)');
			command.flags.forEach((flag) => {
				console.group();
				printPaddedLine(flag.name, flag.description);
				console.groupEnd();
			});
		}
		console.groupEnd();
		console.log('\n');
	});

	exitOut();
};
