#!/usr/bin/env node

import { styleText } from 'node:util';
import { configuredSessions } from './config.js';
import { Context } from './types/state.js';
import { renderState } from './util/state/render-state.js';
import { exitOut } from './util/exit.js';
import { printLineSeparator } from './util/layout/line-separator.js';
import { transition } from './util/state/transition.js';

printLineSeparator();
console.log('🚀 tmux ACTiON!');

// exit without configurations
const configuredSessionNames = Object.keys(configuredSessions);
if (configuredSessionNames.length < 1) {
	console.log(styleText('red', '❌ Found no configured sessions'));
	console.log('➡️ Please provide at least 1 configuration in config.ts');
	exitOut();
	// EXiT
}

let context: Context = {
	sessionState: 'NO_CONFIG',
	sessionName: '',
};

while (true) {
	if (context.sessionState === 'EXIT') {
		exitOut();
	}

	// render state
	renderState(context);

	// handle state transition
	const newContext = await transition(context);

	// set new state
	context = newContext;
}

// TODO

// 1. check user input > argument given?
//      - no argument
//          > ✅ inform user about configured session names which can be used as argument
//          > *CHOiCE-LOOP* [other, exit]
//              - other
//                  > ask for session name
//                  > *CONTiNUE* >>> 1.
//              - exit
//                  > ***EXiT NODE***
//      - invalid argument
//          > inform user about configured session names which can be used as argument
//          > *CHOiCE-LOOP* [other, exit]
//              - other
//                  > ask for session name
//                  > *CONTiNUE* >>> 1.
//              - exit
//                  > ***EXiT NODE***
//      - valid argument
//          > *CONTiNUE* >>> 2.
// 2. check if given session already exists
//      - exists
//          > check if it is attached or detached
//              - is detached
//                  > inform user that session exist in detached state
//                  > *CHOiCE-LOOP* [attach, destroy, restart, other, exit]
//                      - attach
//                          > *ATTACH* session
//                          > ***EXiT NODE***
//                      - destroy
//                          > *DESTROY* session
//                          > *CHOiCE-LOOP* [other, exit]
//                      - restart
//                          > *DESTROY session*
//                          > *CONTiNUE* >>> start 3.
//                      - other
//                          > ask for session name
//                          > *CONTiNUE* >>> 1.
//                      - exit
//                          > ***EXiT NODE***
//              - is attached
//                  > inform user that session is already attached somewhere
//                  > *CHOiCE-LOOP* [destroy, restart, other, exit]
//                      - destroy
//                          > *DESTROY* session*
//                          > *CHOiCE-LOOP* [other, exit]
//                              - other
//                                  > ask for session name
//                                  > *CONTiNUE* >>> 1.
//                              - exit
//                                  > ***EXiT NODE***
//                      - restart
//                          > *DESTROY* session
//                          > *CONTiNUE* >>> start 3.
//                      - other
//                          > ask for session name
//                          > *CONTiNUE* >>> 1.
//                      - exit
//                          > ***EXiT NODE***
//      - does not exist
//          > *CONTiNUE* >>> start 3.
// 3. create session
//      - find session configuration
//      - create session with session name
//      - iterate over windows
//          > create window with session-name + window-name at given path
//              - if ERROR
//                  > CATCH
//                  > notify user to check config for session name
//                  > pass ERROR
//                  > ***EXiT NODE***
//              - are panes configured?
//                  > not configured
//                  > configured
// 4. inform user that session 'session name' has been successfully created
//      - *CHOiCE-LOOP* [attach, destroy, restart, other, exit]
//          - attach
//              > *ATTACH* session
//              > ***EXiT NODE***
//          - destroy
//              > *DESTROY* session
//              > *CHOiCE-LOOP* [other, exit]
//                  - other
//                      > ask for session name
//                      > *CONTiNUE* >>> 1.
//                  - exit
//                      > ***EXiT NODE***
//          - restart
//              > *DESTROY session*
//              > *CONTiNUE* >>> start 3.
//          - other
//              > ask for session name
//              > *CONTiNUE* >>> 1.
//          - exit
//              > ***EXiT NODE***

// choices/actions: attach, destroy, restart, other, exit
// start sessions always detached --> then ask to attach
