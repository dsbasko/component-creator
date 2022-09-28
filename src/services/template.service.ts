import * as vscode from 'vscode';
import * as _path from 'path';
import * as fileService from './file.service';
import { IConfigCreateComponentResponse } from 'interfaces';

export const getTemplate = async (
  config: IConfigCreateComponentResponse
): Promise<string | null> => {
  let findTemplatePath = await fileService.isExistPath(config.userTemplatePath);
  if (!findTemplatePath) {
    await downloadTemplate(config.defaultTemplatePath, config.userTemplatePath, false);
  }
  const templateDirs = await fileService.getDirectoryList(config.userTemplatePath);

  if (templateDirs.length === 1) {
    return templateDirs[0];
  }

  const selectedTemplate = await vscode.window.showQuickPick(templateDirs, {
    title: 'Select a template',
  });

  if (!selectedTemplate) {
    vscode.window.showErrorMessage('Please select a template');
    return null;
  }

  return String(selectedTemplate);
};

export const downloadTemplate = async (
  defaultTemplatePath: string,
  userTemplatePath: string,
  isNeedRenameTemplate: boolean
) => {
  const templateList = await fileService.getDirectoryList(defaultTemplatePath);
  const selectedTemplate = await vscode.window.showQuickPick(templateList, {
    title: 'Select a template',
  });

  if (!selectedTemplate) {
    vscode.window.showErrorMessage('Please select a template to download');
    return null;
  }

  const templateFiles = await fileService.getFileList(
    _path.join(defaultTemplatePath, selectedTemplate),
    true
  );
  if (!templateFiles) {
    return null;
  }

  const renameTemplate = isNeedRenameTemplate
    ? await vscode.window.showInputBox({
        title: 'Rename the template if you need to',
        value: selectedTemplate,
      })
    : selectedTemplate;

  if (!renameTemplate) {
    vscode.window.showErrorMessage('Please specify the name of the template');
    return null;
  }

  if (fileService.isExistPathSync(_path.join(userTemplatePath, renameTemplate))) {
    vscode.window.showErrorMessage('This template name already exists');
    return null;
  }

  for (const file of templateFiles) {
    const buffer = await fileService.readFile(
      _path.join(defaultTemplatePath, selectedTemplate),
      file
    );

    await fileService.writeFile(
      _path.join(userTemplatePath, renameTemplate),
      file,
      buffer || ''
    );
  }
};
