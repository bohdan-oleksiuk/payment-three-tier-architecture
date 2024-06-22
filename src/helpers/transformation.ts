export class Transformation {
  static mapString(value: string | string[]): string[] | undefined {
    const explodedValues = typeof value === 'string' ? value.split(',') : value;
    const filteredValues = explodedValues.filter(String).map(String);

    return filteredValues.length > 0 ? filteredValues : undefined;
  }
}
