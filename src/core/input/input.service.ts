import * as _vscode from 'vscode';
import { InputPromptT, InputSelectT } from '.';

export class InputService {
	private static instance: InputService;
	public static getInstance() {
		if (!InputService.instance) {
			InputService.instance = new InputService();
		}
		return InputService.instance;
	};

	prompt = async (props: InputPromptT) => {
		return await _vscode.window.showInputBox(props);
	};

	select = async ({items, options}: InputSelectT) => {
		return await _vscode.window.showQuickPick(items, options);
	};
};
