import * as vscode from 'vscode';
import * as _path from 'path';
import * as fileService from './file.service';
import * as strH from './string.service';
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
    const name = config.componentName;

    const buffer = await fileService.readFile(
      _path.join(config.templatePath, templateName, fileParse.dir),
      fileParse.base
    );

    const newFileName = fileParse.base
      .replace(/%tPl/g, strH.spaceTo(strH.camelCase(name), 'empty'))
      .replace(/%TpL/g, strH.spaceTo(strH.pascalCase(name), 'empty'))
      .replace(/%TPL/g, strH.spaceTo(strH.upperCase(name), 'empty'))
      .replace(/%tpl/g, strH.spaceTo(strH.lowerCase(name), 'empty'))
      .replace(/%_TpL/g, strH.spaceTo(strH.pascalCase(name), 'snake'))
      .replace(/%_TPL/g, strH.spaceTo(strH.upperCase(name), 'snake'))
      .replace(/%_tpl/g, strH.spaceTo(strH.lowerCase(name), 'snake'))
      .replace(/%-TpL/g, strH.spaceTo(strH.pascalCase(name), 'kebab'))
      .replace(/%-TPL/g, strH.spaceTo(strH.upperCase(name), 'kebab'))
      .replace(/%-tpl/g, strH.spaceTo(strH.lowerCase(name), 'kebab'))
      .replace(/TPL/g, strH.spaceTo(name, 'empty'));

    const newBuffer = buffer
      ? buffer
          .replace(/%%tPl%/g, strH.spaceTo(strH.camelCase(name), 'empty'))
          .replace(/%%TpL%/g, strH.spaceTo(strH.pascalCase(name), 'empty'))
          .replace(/%%TPL%/g, strH.spaceTo(strH.upperCase(name), 'empty'))
          .replace(/%%tpl%/g, strH.spaceTo(strH.lowerCase(name), 'empty'))
          .replace(/%%_TpL%/g, strH.spaceTo(strH.pascalCase(name), 'snake'))
          .replace(/%%_TPL%/g, strH.spaceTo(strH.upperCase(name), 'snake'))
          .replace(/%%_tpl%/g, strH.spaceTo(strH.lowerCase(name), 'snake'))
          .replace(/%%-TpL%/g, strH.spaceTo(strH.pascalCase(name), 'kebab'))
          .replace(/%%-TPL%/g, strH.spaceTo(strH.upperCase(name), 'kebab'))
          .replace(/%%-tpl%/g, strH.spaceTo(strH.lowerCase(name), 'kebab'))
          .replace(/%TPL%/g, strH.spaceTo(name, 'empty'))
      : '';

    console.log(config.componentPath);
    await fileService.writeFile(
      _path.join(config.componentPath, fileParse.dir),
      newFileName,
      newBuffer
    );
  }
};
