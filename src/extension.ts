import * as vscode from 'vscode';
import * as _path from 'path';
import * as strH from './services/string.service';
import { main } from './main';
import { IConfigResponse } from './interfaces';

export function activate(context: vscode.ExtensionContext) {
  let disposable = vscode.commands.registerCommand(
    'component-creator.AddComponent',
    (context) => {
      vscode.window
        .showInputBox({ placeHolder: 'Component name' })
        .then((componentName) => {
          if (!componentName) {
            return vscode.window.showErrorMessage('Please enter the component name.');
          }

          const config: IConfigResponse = {
            componentName,
            rootPath: vscode.workspace.workspaceFolders?.[0].uri.fsPath || '',
            defaultTemplatePath: _path.resolve(__dirname, '../template/'),
            templatePath: _path.join(
              vscode.workspace.workspaceFolders?.[0].uri.fsPath || '',
              '.vscode',
              'cch-template'
            ),
            componentPath: _path.join(
              context.fsPath,
              strH.spaceTo(componentName, 'empty')
            ),
          };

          Promise.all([main(config)]);
        });
    }
  );

  context.subscriptions.push(disposable);
}

export function deactivate() {}
