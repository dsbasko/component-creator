import { OutputService } from "./core";
import { ComponentAddHandle } from "./handler";
import { ContextT } from "./extension";

export class App {
	private readonly outputService: OutputService;

	constructor() {
		this.outputService = OutputService.getInstance();
	};

	componentAdd = async (context: ContextT) => {
		const app = new ComponentAddHandle(context);
		try {
			await app.verifyTemplates();
			await app.setComponentName();
			await app.setTemplateDirectory();
			await app.getFilesBuffer();
			await app.replaceTemplateMask();
			await app.writeFile();
			await app.concatFiles();
		} catch (err: any) {
			this.error(err.message);
		}
	};

	error = (message: string): void => {
		this.outputService.error({ message });
	};
};
