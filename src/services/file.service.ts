import * as vscode from 'vscode';
import * as _path from 'path';
import * as fs from 'fs';
import * as stringService from './string.service';

export const getFileList = async (
  path: string,
  deep?: boolean,
  oldPath?: string
): Promise<string[]> => {
  const streams = await fs.promises.readdir(path);
  const newStream: string[] = [];

  for (const stream of streams) {
    const streamStat = await fs.promises.stat(_path.join(path, stream));

    if (!streamStat.isDirectory()) {
      newStream.push(_path.join(path, stream).replace(oldPath || path, ''));
      continue;
    }

    if (streamStat.isDirectory() && !deep) {
      continue;
    }

    newStream.push(
      ...(await getFileList(_path.join(path, stream), deep || false, oldPath || path))
    );
  }

  return newStream;
};

export const getDirectoryList = async (path: string): Promise<string[]> => {
  const streams = await fs.promises.readdir(path);
  const newStream: string[] = [];

  for (const stream of streams) {
    const streamStat = await fs.promises.stat(_path.join(path, stream));

    if (!streamStat.isDirectory()) {
      continue;
    }

    if (streamStat.isDirectory()) {
      newStream.push(stream);
    }
  }

  return newStream;
};

export const readFile = async (
  path: string,
  fileName: string
): Promise<string | null> => {
  const pathJoin = _path.join(path, fileName);
  const isExist = await isExistPath(pathJoin);
  if (!isExist) {
    return null;
  }
  const file = await fs.promises.readFile(pathJoin);
  return file.toString();
};

export const writeFile = async (
  path: string,
  fileName: string,
  buffer: string
): Promise<void> => {
  const pathJoin = _path.join(path, fileName);
  const fullPath = _path.join(pathJoin, '../');

  if (await isExistPath(pathJoin)) {
    vscode.window.showErrorMessage(
      `The file "${_path.parse(pathJoin).base}" has already been created!`
    );
    return;
  }

  if (!(await isExistPath(fullPath))) {
    await makeDirectory(fullPath);
  }

  await fs.promises.writeFile(pathJoin, Buffer.from(buffer, 'utf-8'));
};

export const makeDirectory = async (
  path: string,
  props?: { replace?: string }
): Promise<void> => {
  const pathParse = _path.parse(path);
  await fs.promises.mkdir(
    props?.replace
      ? _path.join(pathParse.dir, stringService.replace(pathParse.name, props.replace))
      : path,
    { recursive: true }
  );
};

export const isExistPath = async (dir: string): Promise<boolean> => {
  try {
    await fs.promises.stat(dir);
    return true;
  } catch (err) {
    return false;
  }
};

export const isExistPathSync = (dir: string): boolean => {
  try {
    fs.statSync(dir);
    return true;
  } catch (err) {
    return false;
  }
};
