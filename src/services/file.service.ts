import { IConfigResponse } from 'interfaces';
import * as _path from 'path';
import * as fs from 'fs';

export class FileService {
  config: IConfigResponse;

  constructor(config: IConfigResponse) {
    this.config = config;
  }

  getFileList = async (path: string): Promise<string[]> =>
    await fs.promises.readdir(path);

  readFile = async (path: string, fileName: string): Promise<Buffer | null> => {
    const pathJoin = _path.join(path, fileName);
    const isExist = await this.isExistPath(pathJoin);
    if (!isExist) {
      return null;
    }
    return await fs.promises.readFile(pathJoin);
  };

  makeDirectory = async (path: string): Promise<void> => {
    await fs.promises.mkdir(path, { recursive: true });
  };

  writeFile = async (path: string, fileName: string, buffer: Buffer): Promise<void> => {
    const pathJoin = _path.join(path, fileName);
    await this.makeDirectory(path);
    await fs.promises.writeFile(pathJoin, buffer);
  };

  isExistPath = async (dir: string): Promise<boolean> => {
    try {
      await fs.promises.stat(dir);
      return true;
    } catch (err) {
      return false;
    }
  };
}
