import * as vscode from 'vscode';
import * as _path from 'path';
import { IConfigResponse } from '../interfaces';
import { FileService } from './file.service';

const defaultTemplatePath = _path.join(_path.resolve(__dirname, '../../template/'));

export class TemplateService {
  private config: IConfigResponse;
  private fileService: FileService;
  templatePath: string;

  constructor(config: IConfigResponse) {
    this.config = config;
    this.fileService = new FileService(config);
    this.templatePath = _path.join(config.rootPath, '.vscode/cch-template');
  }

  getTemplate = async (): Promise<string | null> => {
    let findTemplatePath = await this.fileService.isExistPath(this.templatePath);
    if (!findTemplatePath) {
      await this.createTemplate();
    }

    const templateDirs = await this.fileService.getFileList(this.templatePath);
    if (templateDirs.length === 1) {
      return templateDirs[0];
    }

    const selectedTemplate = await vscode.window.showQuickPick(templateDirs, {
      placeHolder: 'Template name',
    });

    return selectedTemplate || null;
  };

  createTemplate = async (): Promise<void> => {
    const templateFiles = await this.fileService.getFileList(defaultTemplatePath);
    if (!templateFiles) {
      return;
    }

    for (const file of templateFiles) {
      const buffer = await this.fileService.readFile(defaultTemplatePath, file);

      await this.fileService.writeFile(
        _path.join(this.templatePath, 'default'),
        file,
        buffer?.toString() ? buffer : Buffer.from('', 'utf-8')
      );
    }
  };

  createComponent = async (templateName: string): Promise<void | string> => {
    const findDuplicate = await this.fileService.isExistPath(this.config.componentPath);
    if (findDuplicate) {
      return vscode.window.showErrorMessage('The component has already been created');
    }

    let template = await this.fileService.getFileList(
      _path.join(this.templatePath, templateName)
    );
    if (!template) {
      return;
    }
    for (const file of template) {
      const buffer = await this.fileService.readFile(
        _path.join(this.templatePath, templateName),
        file
      );

      const newFileName = file
        .replace(/\:/gi, '.')
        .replace(/TPL/g, this.config.componentName);

      const newBuffer = buffer?.toString()
        ? Buffer.from(
            buffer?.toString().replace(/%TPL%/g, this.config.componentName),
            'utf-8'
          )
        : Buffer.from('', 'utf-8');
      await this.fileService.writeFile(this.config.componentPath, newFileName, newBuffer);
    }
  };
}
