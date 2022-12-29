import * as vscode from 'vscode';
import * as _path from 'path';
import { homedir } from 'os';
import { createComponent } from './createComponent';
import { downloadTemplate } from './downloadTemplate';

import {
  IConfigCreateComponentResponse,
  IConfigDownloadTemplateResponse,
} from './interfaces';
import { includes } from 'lodash';

const config: vscode.WorkspaceConfiguration = vscode.workspace.getConfiguration('componentCreatorHelper');
const configDir: string = config.get('templateDirectory') || '~/.vscode/cch-template';
const homeDir: string = homedir();
const workspaceFolder = vscode.workspace.workspaceFolders?.[0].uri.fsPath || '';
const defaultTemplatePath = _path.resolve(__dirname, '../templates/');
const userTemplatePath = _path.join(
  configDir?.[0] === '~' ? homeDir : workspaceFolder,
  ...configDir.split(configDir.includes('/') ? '/' : _path.sep).filter(item => item !== '~' && item !== '.').map(item => item)
);


export function activate(context: vscode.ExtensionContext) {
  let createComponentSub = vscode.commands.registerCommand(
    'component-creator.AddComponent',
    (context) => {
      const editor = vscode.window.activeTextEditor;
      const selection = editor?.document.getText(editor?.selection);
      const isDir = _path.parse(context.fsPath).ext === '';
            
      vscode.window
      .showInputBox({ title: 'Component name', value: selection })
      .then((componentName) => {
        if (!componentName) {
          return vscode.window.showErrorMessage('Please enter the component name.');
        }

        const config: IConfigCreateComponentResponse = {
          componentName: componentName.replace(/[\/\\]/g, _path.sep),
          defaultTemplatePath,
          userTemplatePath,
          componentPath: _path.join(context.fsPath, isDir ? '' : '../'),
        };

        Promise.all([createComponent(config)]);
      });
    }
  );

  let downloadTemplateSub = vscode.commands.registerCommand(
    'component-creator.DownloadTemplate',
    () => {
      const config: IConfigDownloadTemplateResponse = {
        defaultTemplatePath,
        userTemplatePath,
      };
      Promise.all([downloadTemplate(config)]);
    }
  );

  context.subscriptions.push(createComponentSub);
  context.subscriptions.push(downloadTemplateSub);
}

export function deactivate() {}
