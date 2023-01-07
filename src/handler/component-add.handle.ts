import { TemplateFilesT } from "./component-add.types";
import { ContextT } from "../extension";
import { basename, join, parse } from "path";

import {
	FileService,
	InputService,
	LangService,
	StringService,
	VscodeService
} from "../core";

export class ComponentAddHandle {
	private readonly langService: LangService;
	private readonly vscodeService: VscodeService;
	private readonly inputService: InputService;
	private readonly fileService: FileService;
	private readonly stringService: StringService;

	lang: 'ru' | 'en';
	componentName: string;
	templatePath: string;
	contextPath: string;
	selectedTemplate: string;
	templateFiles: TemplateFilesT[];

	constructor(context: ContextT) {
		this.vscodeService = VscodeService.getInstance();
		this.vscodeService.setContext(context);
		this.lang = this.vscodeService.getConfig('language') as 'en';
		const contextPath = this.vscodeService.getContextPath();
		if (contextPath) { this.contextPath = contextPath; }

		this.langService = LangService.getInstance();
		this.inputService = InputService.getInstance();
		this.fileService = FileService.getInstance();
		this.stringService = StringService.getInstance();
	};

	verifyTemplates = async (): Promise<ComponentAddHandle> => {
		const templatePath = this.vscodeService.getTemplatePath();
		if (!templatePath) {
			throw new Error(this.langService.translate({
				str: "Please set the template path in the settings",
				lang: this.lang
			}) + "!");
		}
		this.templatePath = templatePath;

		if (!await this.fileService.isExistPath(templatePath)) {
			await this.fileService.makeDirectory(templatePath);
		}

		const allTemplatesBefore = await this.fileService.getDirectoryList({
			path: this.templatePath
		});

		if (allTemplatesBefore.length) { return this; }
		const extensionTemplatesPath = join(__dirname, '../../assets/templates/');
		const extensionTemplates = await this.fileService.getDirectoryList({
			path: extensionTemplatesPath,
		});
		const selectedTemplate = await this.inputService.select({
			items: extensionTemplates, options: { title: this.langService.translate({
				str: "Download template",
				lang: this.lang
			})}
		});
		if (selectedTemplate) {
			const templateFiles = await this.fileService.getFileList({
				path: join(extensionTemplatesPath, selectedTemplate),
				deep: true
			});
			for (const file of templateFiles) {
				const newFilePath = join(templatePath, selectedTemplate, file);
				const buffer = await this.fileService.getFileBufferToString(join(
					extensionTemplatesPath, selectedTemplate, file
				));
				await this.fileService.makeFile(newFilePath, buffer);
			}
		}

		const allTemplatesAfter = await this.fileService.getDirectoryList({
			path: this.templatePath
		});
		if (!allTemplatesAfter.length) {
			throw new Error(this.langService.translate({
				str: "No templates found",
				lang: this.lang
			}) + "!");
		}

		return this;
	};

	setComponentName = async (): Promise<ComponentAddHandle> => {
		const selectedText = this.vscodeService.getSelectedText();
		const componentName = await this.inputService.prompt({
			title: this.langService.translate({
				str: "Component name",
				lang: this.lang
			}),
			placeHolder: this.langService.translate({
				str: "Component name",
				lang: this.lang
			}),
			prompt: this.langService.translate({
				str: "Please enter a component name",
				lang: this.lang
			}),
			value: selectedText,
		});
		if (!componentName || !componentName.length) {
			throw new Error(this.langService.translate({
				str: "Please enter a component name",
				lang: this.lang
			}) + "!");
		}

		const normalizedComponentName = componentName.replace('\\\\', '/');
		if (normalizedComponentName.includes('/')) {
			const parseComponent = parse(normalizedComponentName);
			this.componentName = parseComponent.base;
			this.contextPath = join(this.contextPath, parseComponent.dir);
		return this;
		}

		this.componentName = normalizedComponentName;
		return this;
	};

	setTemplateDirectory = async (): Promise<ComponentAddHandle> => {
		const allTemplates = await this.fileService.getDirectoryList({
			path: this.templatePath
		});
		if (!allTemplates.length) {
			throw new Error(this.langService.translate({
				str: "No templates found",
				lang: this.lang
			}) + "!");
		}

		let selectedTemplate: string | undefined = allTemplates[0];
		if (allTemplates.length > 1) {
			selectedTemplate = await this.inputService.select({
				items: allTemplates, options: { title: this.langService.translate({
					str: "Select template",
					lang: this.lang
				})}
			});
		};
		if (!selectedTemplate) {
			throw new Error(this.langService.translate({
				str: "Please select a template",
				lang: this.lang
			}) + "!");
		}		
		this.selectedTemplate = selectedTemplate;

		const templateFiles = await this.fileService.getFileList({
			path: join(this.templatePath, selectedTemplate),
			deep: true
		});
		this.templateFiles = templateFiles.map((fileName) => ({
			fileName: basename(fileName),
			path: join(fileName),
			templatePath: join(this.templatePath, this.selectedTemplate, fileName),
			buffer: '',
		}));

		return this;
	};

	getFilesBuffer = async (): Promise<ComponentAddHandle> => {
		let i = 0;
		for(const file of this.templateFiles) {
			const buffer = await this.fileService.getFileBufferToString(file.templatePath);
			this.templateFiles[i].buffer = buffer;
			i++;
		}
		return this;
	};

	replaceTemplateMask = async (): Promise<ComponentAddHandle> => {
		let i = 0;
		for(const file of this.templateFiles) {
			const newPath = this.stringService.replace(file.path, this.componentName);
			const newBuffer = this.stringService.replace(file.buffer, this.componentName);
			this.templateFiles[i].path = newPath;
			this.templateFiles[i].buffer = newBuffer;
			i++;
		}
		return this;
	};
	
	writeFile = async (): Promise<ComponentAddHandle> => {
		const files = this.templateFiles.filter((file) => !file.fileName.includes('{{concat}}'));
		const existedFiles = [];
		let existedFilesAction: 'skip' | 'replace' | 'stop' = 'stop';
		for (const file of files) {
			if (!this.contextPath) { break; };
			const path = join(this.contextPath, file.path);
			if (await this.fileService.isExistPath(path)) {
				existedFiles.push(file.path);
			}
		}
		
		if (existedFiles.length) {
			const action = await this.inputService.select({
				items: [
					this.langService.translate({str: "Replace", lang: this.lang}),
					this.langService.translate({str: "Skip", lang: this.lang}),
					this.langService.translate({str: "Cancel", lang: this.lang}),
				],
				options: {
					title: this.langService.translate({
						str: "Some files already exists",
						lang: this.lang
					}),
					placeHolder: this.langService.translate({
						str: "Some files already exists",
						lang: this.lang
					})
				}
			});
			if (action === this.langService.translate({str: "Skip", lang: this.lang})) {
				existedFilesAction = 'skip';
			}
			if (action === this.langService.translate({str: "Replace", lang: this.lang})) {
				existedFilesAction = 'replace';
			}
		}
		
		if (existedFiles.length && existedFilesAction === 'stop') { return this; }
		for (const file of files) {
			if (!this.contextPath) { break; };			
			const path = join(this.contextPath, file.path);
			if (
				existedFiles.length
				&& existedFilesAction === 'skip'
				&& existedFiles.includes(file.path)
			) {
				continue;
			}
			await this.fileService.makeFile(path, file.buffer);
		}
		return this;
	};

	concatFiles = async (): Promise<ComponentAddHandle> => {
		const files = this.templateFiles.filter((file) => file.fileName.includes('{{concat}}'));
		for (const file of files) {
			if (!this.contextPath) { break; };
			const path = join(this.contextPath, file.path.replace('{{concat}}', '')).trim();
			if (!await this.fileService.isExistPath(path)) {
				await this.fileService.makeFile(path, file.buffer);
				continue;
			}
			const oldBuffer = await this.fileService.getFileBufferToString(path);
			if (oldBuffer.includes(file.buffer)) { continue; }
			await this.fileService.addToFile(path, file.buffer);
		}
		return this;
	};
};
