import * as _path from 'path';
import * as fileService from './file.service';
import * as stringService from './string.service';
import { IConfigCreateComponentResponse } from '../interfaces';

export const createComponent = async (
  templateName: string,
  config: IConfigCreateComponentResponse
) => {
  let template = await fileService.getFileList(
    _path.join(config.userTemplatePath, templateName),
    true
  );

  if (!template) {
    return;
  }

  for (const file of template) {
    const filePath = file.split(_path.sep).filter((n) => n);
    const fileName = filePath.splice(-1)[0];
    const componentPath = config.componentName.split(_path.sep).filter((n) => n);
    const componentName = componentPath.splice(-1)[0];

    const buffer = await fileService.readFile(
      _path.join(config.userTemplatePath, templateName, ...filePath),
      fileName
    );

    const newFileName = stringService.replace(fileName, componentName);
    const newBuffer = buffer ? stringService.replace(buffer, componentName) : '';

    const writePath = stringService.replace(
      _path.join(config.componentPath, ...componentPath, ...filePath),
      componentName
    );

    await fileService.writeFile(writePath, newFileName, newBuffer);
  }
};
