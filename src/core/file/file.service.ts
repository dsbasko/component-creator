import { GetDirectoryListT, GetFileListT } from ".";
import { promises as _fs } from "fs";
import { join, parse } from "path";

export class FileService {
	private static instance: FileService;
	public static getInstance(): FileService {
		if (!FileService.instance) {
			FileService.instance = new FileService();
		}
		return FileService.instance;
	};

	getDirectoryList = async ({ path }: GetDirectoryListT): Promise<string[]> => {
		if (!await this.isExistPath(path)) { return []; }
		const streams = await _fs.readdir(path);
		const newStream: string[] = [];

		for (const stream of streams) {
			const streamStat = await _fs.stat(join(path, stream));
			if (!streamStat.isDirectory()) { continue; }
			newStream.push(stream);
		}

		return newStream;
	};

	getFileList = async (
		{ path, deep, oldPath }: GetFileListT
	): Promise<string[]> => {
		if (!await this.isExistPath(path)) { return []; }
		const streams = await _fs.readdir(path);
		const newStream: string[] = [];

		for (const stream of streams) {
			const streamStat = await _fs.stat(join(path, stream));
			if (!streamStat.isDirectory()) {
				newStream.push(join(path, stream).replace(oldPath || path, ''));
				continue;
			}
			if (streamStat.isDirectory() && !deep) { continue; }
			newStream.push(
				...(await this.getFileList({
					path: join(path, stream),
					deep: deep || false,
					oldPath: oldPath || path
				}))
			);
		}
		return newStream;
	};
	
	isExistPath = async (path: string): Promise<boolean> => {
		try {
			await _fs.stat(path);
			return true;
		} catch (err) {
			return false;
		}
	};

	getFileBufferToString = async (path: string): Promise<string> => {
		const buffer = await _fs.readFile(path);
		return buffer.toString();
	};

	makeFile = async (path: string, buffer: string): Promise<void> => {
		const pathDir = parse(path).dir;
		if (!await this.isExistPath(pathDir)) { await this.makeDirectory(pathDir); }
		await _fs.writeFile(path, Buffer.from(buffer, 'utf-8'));
	};

	addToFile = async (filePath: string, addBuffer: string): Promise<void> => {
		await _fs.appendFile(filePath, Buffer.from(addBuffer, 'utf-8'));
	};

	makeDirectory = async (path: string): Promise<void> => {
		await _fs.mkdir(path, { recursive: true });
	};
};
