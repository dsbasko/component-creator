# Create Component Helper

A plugin for simple creating components based on yours templates.

![Demo](https://raw.githubusercontent.com/dsbasko/component-creator/main/assets/intro.gif 'Demo')

## Features

- Creating a component in the selected directory 💥
- Creating your own templates 💥
- Using multiple templates 💥
- Each project has its own setup 💥
- Support for recursive directories 💥

<br><br><br>

## Usage

Right-click on the required directory, select **Create Component**, and then enter the name of the component. If you have several templates, you will have to choose one of them.

<br><br><br>

## Settings

When the component is first created, the plugin automatically creates a directory `.vscode/cch-template/default`, which stores a simple component template. The template structure is arbitrary and is available for any languages and frameworks. You can also create as many templates as you want.

<br><br><br>

## Filename template

| Template | Description        | Example          | Result (component name: Color picker Input)      |
| -------- | ------------------ | ---------------- | ------------------------------------------------ |
| `TPL`    | Without conversion | `TPL.props.ts`   | `./ColorpickerInput/ColorpickerInput.props.ts`   |
| `%tPl`   | Camel Case         | `%tPl.props.ts`  | `./ColorpickerInput/colorPickerInput.props.ts`   |
| `%TpL`   | Pascal Case        | `%TpL.props.ts`  | `./ColorpickerInput/ColorPickerInput.props.ts`   |
| `%tpl`   | Lower Case         | `%tpl.props.ts`  | `./ColorpickerInput/colorpickerinput.props.ts`   |
| `%TPL`   | Upper Case         | `%TPL.props.ts`  | `./ColorpickerInput/COLORPICKERINPUT.props.ts`   |
| `%_TpL`  | Pascal Snake Case  | `%_TpL.props.ts` | `./ColorpickerInput/Color_Picker_Input.props.ts` |
| `%_tpl`  | Lower Snake Case   | `%_tpl.props.ts` | `./ColorpickerInput/color_picker_input.props.ts` |
| `%_TPL`  | Upper Snake Case   | `%_TPL.props.ts` | `./ColorpickerInput/COLOR_PICKER_INPUT.props.ts` |
| `%-TpL`  | Pascal Kebab Case  | `%-TpL.props.ts` | `./ColorpickerInput/Color-Picker-Input.props.ts` |
| `%-tpl`  | Lower Kebab Case   | `%-tpl.props.ts` | `./ColorpickerInput/color-picker-input.props.ts` |
| `%-TPL`  | Upper Kebab Case   | `%-TPL.props.ts` | `./ColorpickerInput/COLOR-PICKER-INPUT.props.ts` |

<br><br><br>

## Content template

| Template  | Description        | Example                          | Result (component name: Color picker Input)  |
| --------- | ------------------ | -------------------------------- | -------------------------------------------- |
| `%TPL%`   | Without conversion | `export * from './%TPL%.props'`  | `export * from './ColorpickerInput.props'`   |
| `%%tPl%`  | Camel Case         | `export * from './%tPl%.props'`  | `export * from './colorPickerInput.props'`   |
| `%%TpL%`  | Pascal Case        | `export * from './%TpL%.props'`  | `export * from './ColorPickerInput.props'`   |
| `%%tpl%`  | Lower Case         | `export * from './%tpl%.props'`  | `export * from './colorpickerinput.props'`   |
| `%%TPL%`  | Upper Case         | `export * from './%TPL%.props'`  | `export * from './COLORPICKERINPUT.props'`   |
| `%%_TpL%` | Pascal Snake Case  | `export * from './%_TpL%.props'` | `export * from './Color_Picker_Input.props'` |
| `%%_tpl%` | Lower Snake Case   | `export * from './%_tpl%.props'` | `export * from './color_picker_input.props'` |
| `%%_TPL%` | Upper Snake Case   | `export * from './%_TPL%.props'` | `export * from './COLOR_PICKER_INPUT.props'` |
| `%%-TpL%` | Pascal Kebab Case  | `export * from './%-TpL%.props'` | `export * from './Color-Picker-Input.props'` |
| `%%-tpl%` | Lower Kebab Case   | `export * from './%-tpl%.props'` | `export * from './color-picker-input.props'` |
| `%%-TPL%` | Upper Kebab Case   | `export * from './%-TPL%.props'` | `export * from './COLOR-PICKER-INPUT.props'` |

<br><br><br>

## Demo of template creation

![Create your template](https://raw.githubusercontent.com/dsbasko/component-creator/main/assets/your-template.gif 'Create your template')
