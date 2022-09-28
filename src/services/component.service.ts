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

  const isOldTemplate = template.some(
    (file) =>
      /TPL/g.test(file) ||
      /%tpl/gi.test(file) ||
      /%_tpl/gi.test(file) ||
      /%-tpl/gi.test(file)
  );

  for (const file of template) {
    const fileParse = _path.parse(file);

    const buffer = await fileService.readFile(
      _path.join(config.userTemplatePath, templateName, fileParse.dir),
      fileParse.base
    );

    const newFileName = stringService.replace(fileParse.base, config.componentName);
    const newBuffer = buffer ? stringService.replace(buffer, config.componentName) : '';

    await fileService.writeFile(
      stringService.replace(
        isOldTemplate
          ? _path.join(
              config.componentPath,
              stringService.spaceTo(config.componentName, 'empty'),
              fileParse.dir
            )
          : _path.join(config.componentPath, fileParse.dir),
        config.componentName
      ),
      newFileName,
      newBuffer
    );
  }
};
