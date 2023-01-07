import * as _vscode from 'vscode';
import { OutputErrorT } from '.';

export class OutputService {
	private static instance: OutputService;
	public static getInstance() {
		if (!OutputService.instance) {
			OutputService.instance = new OutputService();
		}
		return OutputService.instance;
	};

	error = async ({ message, buttons }: OutputErrorT): Promise<string | undefined> => {
		const items: string[] = [];
		if (buttons) { items.push(...buttons); }
		const result = await _vscode.window.showErrorMessage(message, ...items);
		return result;
	};
};
