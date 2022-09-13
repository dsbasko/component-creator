# Create Component Helper

A plugin for simple creating components based on yours templates.

![Demo](https://raw.githubusercontent.com/dsbasko/component-creator/main/assets/intro.gif 'Demo')

## Features

- Creating a component in the selected directory 💥
- Creating your own templates 💥
- Using multiple templates 💥
- Each project has its own setup 💥
- Support for recursive directories 💥

## Usage

Right-click on the required directory, select **Create Component**, and then enter the name of the component. If you have several templates, you will have to choose one of them.

## Settings

When the component is first created, the plugin automatically creates a directory `.vscode/cch-template/default`, which stores a simple component template. The template structure is arbitrary and is available for any languages and frameworks. You can also create as many templates as you want.

- In the name of the file, `TPL` will be replaced by the name of the component;
- In the body of the file, `%TPL%` will be replaced with the name of the component.

![Create your template](https://raw.githubusercontent.com/dsbasko/component-creator/main/assets/your-template.gif 'Create your template')
