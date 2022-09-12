import * as vscode from 'vscode';
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
            rootPath: vscode.workspace.workspaceFolders?.[0].uri.fsPath || '',
            componentPath: `${context.fsPath}/${componentName}`,
            componentName,
          };

          Promise.all([main(config)]);
        });
    }
  );

  context.subscriptions.push(disposable);
}

export function deactivate() {}
