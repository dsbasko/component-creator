import * as vscode from 'vscode';
import * as _path from 'path';
import * as fileService from './file.service';
import { IConfigResponse } from '../interfaces';

export const createComponent = async (templateName: string, config: IConfigResponse) => {
  const findDuplicate = await fileService.isExistPath(config.componentPath);
  if (findDuplicate) {
    return vscode.window.showErrorMessage('The component has already been created');
  }

  let template = await fileService.getFileList(
    _path.join(config.templatePath, templateName),
    true
  );

  if (!template) {
    return;
  }

  for (const file of template) {
    const fileParse = _path.parse(file);

    console.log('fileName', fileParse.base);
    console.log('dir', fileParse.dir);

    const buffer = await fileService.readFile(
      _path.join(config.templatePath, templateName, fileParse.dir),
      fileParse.base
    );

    const newFileName = fileParse.base.replace(/TPL/g, config.componentName);
    const newBuffer = buffer ? buffer.replace(/%TPL%/g, config.componentName) : '';

    await fileService.writeFile(
      _path.join(config.componentPath, fileParse.dir),
      newFileName,
      newBuffer
    );
  }
};
