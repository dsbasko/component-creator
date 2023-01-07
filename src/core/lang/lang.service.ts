import ru from './dictionaries/ru';
import { LangTranslateT } from '.';

export class LangService {
	private static instance: LangService;
	public static getInstance() {
		if (!LangService.instance) {
			LangService.instance = new LangService();
		}
		return LangService.instance;
	};

	translate = ({ lang, str }: LangTranslateT): string => {
		if (lang === 'ru') { return ru.get(str) || str; }
		return str;
	};
};
