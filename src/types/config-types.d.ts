export type Window = {
	/** Name of the tmux window. This will be used as the prefix for window and pane names. */
	name: string;
	/** Absolute path to workspace root.
	 *
	 * @examples "/Users/username/Desktop/myAwesomeProject"
	 */
	workspacePath: string;
	/**  Optional: Besides the given root, what other panes should be horizontally split next to it in the same window, for example:
	 *
	 * @examples
	 * - a pane at the root running a server
	 * - a pane at the root running a watcher
	 * - both of the above in parallel
	 * - any other ideas you have
	 */
	additionalPanes?: Pane[];
};

type Pane = {
	/** This will be used together with the window name */
	name: string;
	/** Optional: Opens the pane at the given relative path which will be appended to the `workSpacePath`
	 *
	 * @examples "packages/server/src" --> "/Users/username/Desktop/myAwesomeProject/packages/server/src"
	 *
	 * If omitted panes open at `workSpacePath`
	 */
	subPath?: string;
	/** Optional: Command that should be run in ths pane
	 *
	 * @examples "npm run  start"
	 */
	command?: string;
};
