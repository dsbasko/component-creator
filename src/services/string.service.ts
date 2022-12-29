export const camelCase = (str: string): string =>
  str
    .replace(/(?:^\w|[A-Z]|\b\w)/g, (letter, index) =>
      index === 0 ? letter.toLowerCase() : letter.toUpperCase()
    )
    .replace(/\s+/g, ' ');

export const pascalCase = (str: string): string =>
  str
    .replace(/(?:^\w|[A-Z]|\b\w)/g, (letter) => letter.toUpperCase())
    .replace(/\s+/g, ' ');

export const upperCase = (str: string): string => str.toUpperCase();
export const lowerCase = (str: string): string => str.toLowerCase();

export const spaceTo = (
  str: string,
  to: 'empty' | 'snake' | 'kebab' | 'dot' | 'path'
): string => {
  return str.replace(
    /\s+/g,
    to === 'snake'
      ? '_'
      : to === 'kebab'
      ? '-'
      : to === 'dot'
      ? '.'
      : to === 'path'
      ? '/'
      : ''
  );
};

export const replace = (str: string, name: string): string => {
  return (
    str
      // Normal
      .replace(/{{[ ]?none[ ]?}}/g, name)
      .replace(/{{[ ]?normal[ ]?}}|{{[ ]? normal [ ]?}}/g, spaceTo(name, 'empty'))
      .replace(/{{[ ]?normalDotCase[ ]?}}/g, spaceTo(name, 'dot'))
      .replace(/{{[ ]?normalKebabCase[ ]?}}/g, spaceTo(name, 'kebab'))
      .replace(/{{[ ]?normalSnakeCase[ ]?}}/g, spaceTo(name, 'snake'))

      // Delimiters
      .replace(/{{[ ]?dotCase[ ]?}}/g, spaceTo(lowerCase(name), 'dot'))
      .replace(/{{[ ]?kebabCase[ ]?}}/g, spaceTo(lowerCase(name), 'kebab'))
      .replace(/{{[ ]?snakeCase[ ]?}}/g, spaceTo(lowerCase(name), 'snake'))

      // Camel Case
      .replace(/{{[ ]?camelCase[ ]?}}/g, spaceTo(camelCase(name), 'empty'))
      .replace(/{{[ ]?camelDotCase[ ]?}}/g, spaceTo(camelCase(name), 'dot'))
      .replace(/{{[ ]?camelKebabCase[ ]?}}/g, spaceTo(camelCase(name), 'kebab'))
      .replace(/{{[ ]?camelSnakeCase[ ]?}}/g, spaceTo(camelCase(name), 'kebab'))

      // Pascal Case
      .replace(/{{[ ]?pascalCase[ ]?}}/g, spaceTo(pascalCase(name), 'empty'))
      .replace(/{{[ ]?pascalDotCase[ ]?}}/g, spaceTo(pascalCase(name), 'dot'))
      .replace(/{{[ ]?pascalKebabCase[ ]?}}/g, spaceTo(pascalCase(name), 'kebab'))
      .replace(/{{[ ]?pascalSnakeCase[ ]?}}/g, spaceTo(pascalCase(name), 'snake'))

      // Upper Case
      .replace(/{{[ ]?upperCase[ ]?}}/g, spaceTo(upperCase(name), 'empty'))
      .replace(/{{[ ]?upperDotCase[ ]?}}/g, spaceTo(upperCase(name), 'dot'))
      .replace(/{{[ ]?upperKebabCase[ ]?}}/g, spaceTo(upperCase(name), 'kebab'))
      .replace(/{{[ ]?upperSnakeCase[ ]?}}/g, spaceTo(upperCase(name), 'snake'))

      // Lower Case
      .replace(/{{[ ]?lowerCase[ ]?}}/g, spaceTo(lowerCase(name), 'empty'))
      .replace(/{{[ ]?lowerDotCase[ ]?}}/g, spaceTo(lowerCase(name), 'dot'))
      .replace(/{{[ ]?lowerKebabCase[ ]?}}/g, spaceTo(lowerCase(name), 'kebab'))
      .replace(/{{[ ]?lowerSnakeCase[ ]?}}/g, spaceTo(lowerCase(name), 'snake'))
  );
};
