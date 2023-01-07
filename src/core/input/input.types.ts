export type InputPromptT = {
	title: string;
	prompt?: string;
	value?: string;
	placeHolder?: string;
};

export type InputSelectT = {
	items: string[],
	options: InputSelectOptionsT
};

type InputSelectOptionsT = {
	title: string;
	placeHolder?: string;
	canPickMany?: boolean;
};
