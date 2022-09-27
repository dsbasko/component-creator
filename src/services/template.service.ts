import * as vscode from 'vscode';
import * as _path from 'path';
import * as fileService from './file.service';
import { IConfigResponse } from 'interfaces';

const createTemplate = async (config: IConfigResponse): Promise<void> => {
  const templateFiles = await fileService.getFileList(config.defaultTemplatePath, true);
  if (!templateFiles) {
    return;
  }

  for (const file of templateFiles) {
    const buffer = await fileService.readFile(config.defaultTemplatePath, file);

    await fileService.writeFile(_path.join(config.templatePath), file, buffer || '');
  }
};

export const getTemplate = async (config: IConfigResponse): Promise<string | null> => {
  let findTemplatePath = await fileService.isExistPath(config.templatePath);
  if (!findTemplatePath) {
    await createTemplate(config);
  }
  const templateDirs = await fileService.getDirectoryList(config.templatePath);

  if (templateDirs.length === 1) {
    return templateDirs[0];
  }

  const selectedTemplate = await vscode.window.showQuickPick(templateDirs, {
    placeHolder: 'Template name',
  });

  if (!selectedTemplate) {
    vscode.window.showErrorMessage('Please choose a template');
    return null;
  }

  return String(selectedTemplate);
};
