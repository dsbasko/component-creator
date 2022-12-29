import { IConfigDownloadTemplateResponse } from './interfaces';
import * as templateService from './services/template.service';

export const downloadTemplate = async (config: IConfigDownloadTemplateResponse) => {
  await templateService.downloadTemplate(
    config.defaultTemplatePath,
    config.userTemplatePath,
    true
  );
};
