import * as vscode from 'vscode';
import { IConfigResponse } from './interfaces';
import { TemplateService } from './services';

export const main = async (props: IConfigResponse) => {
  const templateService = new TemplateService(props);
  const templateName = await templateService.getTemplate();
  if (!templateName) {
    return vscode.window.showErrorMessage('Please choose a template');
  }
  await templateService.createComponent(templateName);
};
