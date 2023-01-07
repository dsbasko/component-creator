[![](https://badgen.net/vs-marketplace/v/dsbasko.create-component-helper)](https://marketplace.visualstudio.com/items?itemName=dsbasko.create-component-helper)
[![](https://badgen.net/vs-marketplace/i/dsbasko.create-component-helper)](https://marketplace.visualstudio.com/items?itemName=dsbasko.create-component-helper)
[![](https://badgen.net/vs-marketplace/d/dsbasko.create-component-helper)](https://marketplace.visualstudio.com/items?itemName=dsbasko.create-component-helper)
[![](https://badgen.net/vs-marketplace/rating/dsbasko.create-component-helper)](https://marketplace.visualstudio.com/items?itemName=dsbasko.create-component-helper)

[![](https://badgen.net/github/stars/dsbasko/component-creator/#F9CA52)](https://github.com/dsbasko/component-creator)
[![](https://badgen.net/github/releases/dsbasko/component-creator)](https://github.com/dsbasko/component-creator)

Component Creator is an [open-source](https://github.com/dsbasko/component-creator) [extension](https://badgen.net/vs-marketplace/v/dsbasko.create-component-helper) for [Visual Studio Code](https://code.visualstudio.com), designed to easily creating components based on yours templates.


## Whats new in 2.2?

- Added a mask `{{concat}}` in the file name, indicating append buffer from template to this file;
- Added the ability to overwrite or ignore files that already exist in the selected path;
- Added Russian translation. You can choose in the extension settings.


## Features

- Creating a component in the selected directory 💥
- Creating your own templates 💥
- Any language support 💥
- Each project has its own setup 💥

![Demo](https://raw.githubusercontent.com/dsbasko/component-creator/main/assets/gif/intro.gif 'Demo') 


## Usage

1. Call an extension number, there are three ways to do this:
	- *Right-click on the directory in Project Explorer, then select the menu item “New component...”;*
	- *Select the text inside the file, right-click on the selected text and select the menu item “New component ...”. The selected text is automatically entered in the name of the component;*
	- *Run the command palette (`Cmd/Ctrl`+`Shift`+`P`), then type “>New component ...”. This method is the most undesirable, since it is important for it that at least some file is opened, otherwise the extension will not determine in which directory to create the component.*
2. Enter the name of the component. *If you enter a relative path in the component name, the extension will create the necessary directories. For example, if you specify `../components/multi select` in the component name, the extension will create a ”component” folder in the parent directory, and then create a “multi select” component there.*
3. Select a template from the list. *If you have only one template, the selection field will not be shown. If you don't have templates, the extension will offer to download one from the library. The template “! Example of all transform styles” will demonstrate all possible transforms of the component name.*

<br><br><br>

## Create template

1. A folder with the template name is created in the template directory. The default path is `./.vscode/cch-template`, can be changed in the settings.
2. Any structure of folders and files is created inside this directory. In order to insert a dynamic component name, you can use the template {{caseName}} (all transformations are listed below). For example, if you entered name `{{kebabCase}}.props.ts` in the file name, and then when creating the component, specify `Multi select` as the name, then the file `multi-select.props.ts` will be created as a result. It also works for the body of the file.
3. If you add `{{concat}}` to the beginning of the file name, then the contents of this file will be added to the existing file, and if this file is not exist, the file will be created.

	### For example.
	Let's say we create the file `{{concat}}index.ts` with this content:
	```typescript
	export * from'./{{pascalCase}};

	```
	Then, we create a template named `body`, but in the directory where the file “index.ts” should be loaded, there is already such a file with the contents:
	```typescript
	export * from'./Header';
	export * from'./Aside';
	
	```
	The {{concat}} flag will make it clear that the template content will need to be added to this file. In the example , you will get this content:
	```typescript
	export * from'./Header';
	export * from'./Aside';
	export * from'./Body';

	```
	
<br><br><br>

## Settings

### templateDirectory
The directory where the templates are stored.
If you specify the path using ./ the workspace directory will be selected
If you specify the path using ~/ the operating system user directory will be selected.
```json
{
  "componentCreatorHelper.templateDirectory": "./.vscode/cch-template",
}
```

### language
Extension language
Available: `en`, `ru`

```json
{
  "componentCreatorHelper.language": "en"
}
```

<br><br><br>

### Basic transforms

| Transform        | Example            | Result (component name: Color picker InPut) |
| ---------------- | ------------------ | ------------------------------------------- |
| Camel case       | {{camelCase}}      | colorPickerInPut                            |
| Pascal case      | {{pascalCase}}     | ColorPickerInPut                            |
| Snake case       | {{snakeCase}}      | color_picker_input                          |
| Upper snake case | {{upperSnakeCase}} | COLOR_PICKER_INPUT                          |
| Kebab case       | {{kebabCase}}      | color-picker-input                          |
| Upper kebab case | {{upperKebabCase}} | COLOR-PICKER-INPUT                          |
| Dot case         | {{dotCase}}        | color.picker.input                          |
| Upper dot case   | {{upperDotCase}}   | COLOR.PICKER.INPUT                          |

### All transform

| Transform                    | Example             | Result (component name: Color picker InPut) |
| ---------------------------- | ------------------- | ------------------------------------------- |
| Without transform            | {{none}}            | Color picker InPut                          |
| Without transform and spaces | {{normal}}          | ColorpickerInPut                            |
| Camel case                   | {{camelCase}}       | colorPickerInPut                            |
| Pascal case                  | {{pascalCase}}      | ColorPickerInPut                            |
| Upper case                   | {{upperCase}}       | COLORPICKERINPUT                            |
| Lower case                   | {{lowerCase}}       | colorpickerinput                            |
| With snake delimiter         | {{normalSnakeCase}} | Color_picker_InPut                          |
| Snake case                   | {{snakeCase}}       | color_picker_input                          |
| Camel snake case             | {{camelSnakeCase}}  | color_Picker_InPut                          |
| Pascal snake case            | {{pascalSnakeCase}} | Color_Picker_InPut                          |
| Upper snake case             | {{upperSnakeCase}}  | COLOR_PICKER_INPUT                          |
| Lower snake case             | {{lowerSnakeCase}}  | color_picker_input                          |
| With kebab delimiter         | {{normalKebabCase}} | Color-picker-InPut                          |
| Kebab case                   | {{kebabCase}}       | color-picker-input                          |
| Camel kebab case             | {{camelKebabCase}}  | color-Picker-InPut                          |
| Pascal kebab case            | {{pascalKebabCase}} | Color-Picker-InPut                          |
 Upper kebab case             | {{upperKebabCase}}  | COLOR-PICKER-INPUT                          |
| Lower kebab case             | {{lowerKebabCase}}  | color-picker-input                          |
| With dot delimiter           | {{normalDotCase}}   | Color.picker.InPut                          |
| Dot case                     | {{dotCase}}         | color.picker.input                          |
| Camel dot case               | {{camelDotCase}}    | color.Picker.InPut                          |
| Pascal dot case              | {{pascalDotCase}}   | Color.Picker.InPut                          |
| Upper dot case               | {{upperDotCase}}    | COLOR.PICKER.INPUT                          |
| Lower dot case               | {{lowerDotCase}}    | color.picker.input                          |

<br><br><br>

## Author

Dmitriy Basenko [GitHub](https://github.com/dsbasko/), [Twitter](https://twitter.com/dsbasko), [Telegram](https://t.me/dsbasko)

<br>

## Contributors 

[![Contributors](https://contrib.rocks/image?repo=dsbasko/component-creator 'Contributors')](https://github.com/dsbasko/component-creator/graphs/contributors)
