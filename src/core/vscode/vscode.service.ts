import { isAbsolute, join, parse } from 'path';
import { ContextT } from './../../extension';
import * as _vscode from 'vscode';
import * as _os from 'os';
import * as _fs from 'fs';

export class VscodeService {
	private context: ContextT;

	private static instance: VscodeService;
	public static getInstance() {
		if (!VscodeService.instance) {
			VscodeService.instance = new VscodeService();
		}
		return VscodeService.instance;
	};

	setContext(context: ContextT) {
		this.context = context;
	};

	getConfig = (configName: string): string | undefined => {		
		const config = _vscode.workspace.getConfiguration('componentCreatorHelper');
		return config.get(configName) || undefined;
	};

	getSelectedText = (): string | undefined => {
		const editor = _vscode.window.activeTextEditor;
      return editor?.document.getText(editor?.selection);
	};

	getTemplatePath = (): string | undefined => {
		const templateDirectoryFromConfig = this.getConfig('templateDirectory');
		if (!templateDirectoryFromConfig) { return undefined; }

		if (isAbsolute(templateDirectoryFromConfig)) {
			return templateDirectoryFromConfig;
		}

		if (templateDirectoryFromConfig[0] === '~') {
			return join(_os.homedir(), templateDirectoryFromConfig.slice(1));
		}

		const workspacePath = this.getWorkspacePath();
		const normalizePath = join(workspacePath || '', templateDirectoryFromConfig);
		return normalizePath;
	};

	getContextPath = (): string | undefined => {
		const textEditor = _vscode.window.activeTextEditor;
		const context = this.context?.fsPath || textEditor?.document.uri.fsPath;
		if (context && _fs.lstatSync(context).isFile()) {
			return parse(context).dir;
		}
		return context;
	};

	private getWorkspacePath = (): string | undefined => {
		return _vscode.workspace.workspaceFolders?.[0].uri.fsPath;
	};

	getLanguage = (): string => {
		return this.getConfig('language') || 'en';
	};
};
