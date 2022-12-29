import { FC } from 'react';
import { {{pascalCase}}Props } from '.';
import styles from './{{pascalCase}}.module.css';

export const {{pascalCase}}: FC<{{pascalCase}}Props> = (props) => {
  return <div className={styles.wrapper} {...props}></div>;
};
