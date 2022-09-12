export interface IConfigResponse {
  // Client
  componentName: string;
  rootPath: string;
  componentPath: string;

  // Config
  language?: 'ts' | 'js' | 'tsx' | 'jsx';
  widthStyles?: boolean;
  stylesType?: 'css' | 'scss';
  widthIndex?: boolean;
  widthProps?: boolean;
  widthStories?: boolean;
  templatePath?: string;
}
