import * as _path from 'path';
import * as templateService from './services/template.service';
import * as componentService from './services/component.service';
import { IConfigCreateComponentResponse } from './interfaces';

export const createComponent = async (config: IConfigCreateComponentResponse) => {
  const template = await templateService.getTemplate(config);
  if (!template) {
    return;
  }
  await componentService.createComponent(template, config);
};
