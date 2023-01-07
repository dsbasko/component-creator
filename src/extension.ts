import * as _vscode from 'vscode';
import { App } from './app';

export type ContextT = {
	$mid: number;
	external: string;
	fsPath: string;
	path: string;
	scheme: string;
} | undefined;

const app = new App();
export function activate(context: _vscode.ExtensionContext) {
	const commands = _vscode.commands;
	const commandName = 'component-creator.AddComponent';
	let sub = commands.registerCommand(commandName, (context: ContextT) => {		
		app.componentAdd(context);
	});
	context.subscriptions.push(sub);
};

export function deactivate() {};
