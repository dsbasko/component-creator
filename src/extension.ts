import * as vscode from 'vscode';
import * as _path from 'path';
import { createComponent } from './createComponent';
import { downloadTemplate } from './downloadTemplate';

import {
  IConfigCreateComponentResponse,
  IConfigDownloadTemplateResponse,
} from './interfaces';

const userTemplatePath = _path.join(
  vscode.workspace.workspaceFolders?.[0].uri.fsPath || '',
  '.vscode',
  'cch-template'
);

const defaultTemplatePath = _path.resolve(__dirname, '../templates/');

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
