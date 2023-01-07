export type GetDirectoryListT = {
	path: string,
};


export type GetFileListT = {
	path: string,
	deep?: boolean,
	oldPath?: string
};
