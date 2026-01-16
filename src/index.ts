#!/usr/bin/env node

import { execSync } from 'node:child_process';

const hasSession = (sessionName: string): boolean => {
	try {
		execSync(`tmux has-session -t ${sessionName}`, { stdio: 'ignore' });
		return true;
	} catch {
		return false;
	}
};

const checkForSession = (sessionName: string) => {
	console.log(`looking for session "${sessionName}"`);

	if (hasSession(sessionName)) {
		console.log(`session "${sessionName}" exists`);
	} else {
		console.log(`no session "${sessionName}" exists`);
	}
};

checkForSession('mysession');

// TODO

// 1. check user input > argument given?
//      - no argument
//          > inform user about configured session names which can be used as argument
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
