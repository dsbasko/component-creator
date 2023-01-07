export class StringService {
	private static instance: StringService;
	public static getInstance(): StringService {
		if (!StringService.instance) {
			StringService.instance = new StringService();
		}
		return StringService.instance;
	};

	private camelCase = (str: string): string => {
		return str.replace(/(?:^\w|[A-Z]|\b\w)/g, (letter, index) =>
		  index === 0 ? letter.toLowerCase() : letter.toUpperCase()
		).replace(/\s+/g, ' ');
	};

	private pascalCase = (str: string): string => {
		return str
				.replace(/(?:^\w|[A-Z]|\b\w)/g, (letter) => letter.toUpperCase())
				.replace(/\s+/g, ' ');
	};

	private upperCase = (str: string): string => {
		return str.toUpperCase();
	};

	private lowerCase = (str: string): string => {
		return str.toLowerCase();
	};

	private spaceTo = (str: string, to: 'empty' | 'snake' | 'kebab' | 'dot' | 'path'): string => {
		return str.replace(/\s+/g,
			to === 'snake' ? '_'
			: to === 'kebab' ? '-'
			: to === 'dot' ? '.'
			: to === 'path' ? '/'
			: ''
		);
	};

	replace = (str: string, replaceTo: string): string => {
		return (
		  str
			// Normal
			.replace(/{{[ ]?none[ ]?}}/g, replaceTo)
			.replace(/{{[ ]?normal[ ]?}}|{{[ ]? normal [ ]?}}/g, this.spaceTo(replaceTo, 'empty'))
			.replace(/{{[ ]?normalDotCase[ ]?}}/g, this.spaceTo(replaceTo, 'dot'))
			.replace(/{{[ ]?normalKebabCase[ ]?}}/g, this.spaceTo(replaceTo, 'kebab'))
			.replace(/{{[ ]?normalSnakeCase[ ]?}}/g, this.spaceTo(replaceTo, 'snake'))
	
			// Delimiters
			.replace(/{{[ ]?dotCase[ ]?}}/g, this.spaceTo(this.lowerCase(replaceTo), 'dot'))
			.replace(/{{[ ]?kebabCase[ ]?}}/g, this.spaceTo(this.lowerCase(replaceTo), 'kebab'))
			.replace(/{{[ ]?snakeCase[ ]?}}/g, this.spaceTo(this.lowerCase(replaceTo), 'snake'))
	
			// Camel Case
			.replace(/{{[ ]?camelCase[ ]?}}/g, this.spaceTo(this.camelCase(replaceTo), 'empty'))
			.replace(/{{[ ]?camelDotCase[ ]?}}/g, this.spaceTo(this.camelCase(replaceTo), 'dot'))
			.replace(/{{[ ]?camelKebabCase[ ]?}}/g, this.spaceTo(this.camelCase(replaceTo), 'kebab'))
			.replace(/{{[ ]?camelSnakeCase[ ]?}}/g, this.spaceTo(this.camelCase(replaceTo), 'kebab'))
	
			// Pascal Case
			.replace(/{{[ ]?pascalCase[ ]?}}/g, this.spaceTo(this.pascalCase(replaceTo), 'empty'))
			.replace(/{{[ ]?pascalDotCase[ ]?}}/g, this.spaceTo(this.pascalCase(replaceTo), 'dot'))
			.replace(/{{[ ]?pascalKebabCase[ ]?}}/g, this.spaceTo(this.pascalCase(replaceTo), 'kebab'))
			.replace(/{{[ ]?pascalSnakeCase[ ]?}}/g, this.spaceTo(this.pascalCase(replaceTo), 'snake'))
	
			// Upper Case
			.replace(/{{[ ]?upperCase[ ]?}}/g, this.spaceTo(this.upperCase(replaceTo), 'empty'))
			.replace(/{{[ ]?upperDotCase[ ]?}}/g, this.spaceTo(this.upperCase(replaceTo), 'dot'))
			.replace(/{{[ ]?upperKebabCase[ ]?}}/g, this.spaceTo(this.upperCase(replaceTo), 'kebab'))
			.replace(/{{[ ]?upperSnakeCase[ ]?}}/g, this.spaceTo(this.upperCase(replaceTo), 'snake'))
	
			// Lower Case
			.replace(/{{[ ]?lowerCase[ ]?}}/g, this.spaceTo(this.lowerCase(replaceTo), 'empty'))
			.replace(/{{[ ]?lowerDotCase[ ]?}}/g, this.spaceTo(this.lowerCase(replaceTo), 'dot'))
			.replace(/{{[ ]?lowerKebabCase[ ]?}}/g, this.spaceTo(this.lowerCase(replaceTo), 'kebab'))
			.replace(/{{[ ]?lowerSnakeCase[ ]?}}/g, this.spaceTo(this.lowerCase(replaceTo), 'snake'))
		);
	 };
};
