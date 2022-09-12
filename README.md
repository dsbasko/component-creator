# Create Component Helper

A simple plugin for creating components based on a templates.
![Demo](https://raw.githubusercontent.com/dsbasko/component-creator/main/assets/intro.gif 'Demo')

## Usage

Right-click on the required directory, select **Create Component**, and then enter the name of the component. If you have several templates, you will have to choose one of them.

## Settings

When the component is first created, the plugin automatically creates a directory `.vscode/cch-template/default`, which stores a simple component template. The template structure is arbitrary and is available for any languages and frameworks. You can also create as many templates as you want.

- In the name of the file, `TPL` will be replaced by the name of the component, also note that the file extension is indicated by the `:` symbol, this is important to take into account.
- In the body of the file, `%TPL%` will be replaced with the name of the component.

![Create custom template](https://raw.githubusercontent.com/dsbasko/component-creator/main/assets/custom-template.gif 'Create custom template')
