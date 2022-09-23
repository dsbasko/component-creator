export const camelCase = (str: string) => {
  return str.replace(/(?:^\w|[A-Z]|\b\w)/g, function (word, index) {
    return index === 0 ? word.toLowerCase() : word.toUpperCase();
  });
};

export const pascalCase = (str: string) => {
  return str.replace(/(?:^\w|[A-Z]|\b\w)/g, function (word, index) {
    return word.toUpperCase();
  });
};

export const upperCase = (str: string) => str.toUpperCase();

export const lowerCase = (str: string) => str.toLowerCase();

export const spaceTo = (str: string, to: 'empty' | 'snake' | 'kebab') => {
  return str.replace(/\s+/g, to === 'snake' ? '_' : to === 'kebab' ? '-' : '');
};
