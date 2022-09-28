# Create Component Helper

A plugin for simple creating components based on yours templates.

## Features

- Creating a component in the selected directory 💥
- Creating your own templates 💥
- Using multiple templates 💥
- Each project has its own setup 💥
- Support for recursive directories 💥
- Template library 💥

![Demo](https://raw.githubusercontent.com/dsbasko/component-creator/main/assets/gif/intro.gif 'Demo')

## Whats new in 2.1.1?

- Added Angular templates to library
- Added Vue templates to library

<br><br><br>

## Usage

Right-click on the required directory, select `New component 🧩`, and then enter the name of the component. If you have several templates, you will have to choose one of them.

<br><br><br>

## Settings

If, when creating a component, a folder with templates is not found, the plugin will offer to download one from the library and put it on the path `.vscode/cch-template`. The template structure is arbitrary and is available for any languages and frameworks. You can also create as many templates as you want.

## Download template

In order to download one of several library templates, you need to press `Cmd/Ctrl` + `Shift` + `P` on the keyboard and select `Component Creator: Download Template`. Then, select a template from the list and rename it if necessary.

If you want to add some template to the standard library, create an issue or pull request on github.

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
| With snake delimiter         | {{normalSnake}}     | Color_picker_InPut                          |
| Snake case                   | {{snakeCase}}       | color_picker_input                          |
| Camel snake case             | {{camelSnakeCase}}  | color_Picker_InPut                          |
| Pascal snake case            | {{pascalSnakeCase}} | Color_Picker_InPut                          |
| Upper snake case             | {{upperSnakeCase}}  | COLOR_PICKER_INPUT                          |
| Lower snake case             | {{lowerSnakeCase}}  | color_picker_input                          |
| With kebab delimiter         | {{normalKebab}}     | Color-picker-InPut                          |
| Kebab case                   | {{kebabCase}}       | color-picker-input                          |
| Camel kebab case             | {{camelKebabCase}}  | color-Picker-InPut                          |
| Pascal kebab case            | {{pascalKebabCase}} | Color-Picker-InPut                          |
| Upper kebab case             | {{upperKebabCase}}  | COLOR-PICKER-INPUT                          |
| Lower kebab case             | {{lowerKebabCase}}  | color-picker-input                          |
| With dot delimiter           | {{normalDot}}       | Color.picker.InPut                          |
| Dot case                     | {{dotCase}}         | color.picker.input                          |
| Camel dot case               | {{camelDotCase}}    | color.Picker.InPut                          |
| Pascal dot case              | {{pascalDotCase}}   | Color.Picker.InPut                          |
| Upper dot case               | {{upperDotCase}}    | COLOR.PICKER.INPUT                          |
| Lower dot case               | {{lowerDotCase}}    | color.picker.input                          |

<br><br><br>

## Demo of template editing

![Create your template](https://raw.githubusercontent.com/dsbasko/component-creator/main/assets/gif/custom-template.gif 'Create your template')
