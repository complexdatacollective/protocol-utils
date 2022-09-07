import faker from '@faker-js/faker/locale/en_GB';
import { InputComponent, NcVariableDefinition, VariableType } from './protocol-types';

const mockCoord = () => faker.datatype.number({ min: 0, max: 1, precision: 0.000_001 });

const makeMockValue = (variable: NcVariableDefinition) => {
  const {
    type,
    name,
  } = variable;

  switch (type) {
    case VariableType.boolean:
      return faker.datatype.boolean();
    case VariableType.number:
      return faker.datatype.number({ min: 20, max: 100 });
    case VariableType.scalar:
      return faker.datatype.number({ min: 0, max: 1, precision: 0.001 });
    case VariableType.datetime:
      return faker.date.recent().toISOString().slice(0, 10);
    case VariableType.ordinal:
      return faker.random.arrayElement(variable.options).value;
    case VariableType.categorical:
      return [faker.random.arrayElement(variable.options).value];
    case VariableType.layout:
      return { x: mockCoord(), y: mockCoord() };
    case VariableType.text: {
      if (name.toLowerCase() === 'name' || name.toLowerCase().includes('name')) {
        return faker.name.findName();
      }

      if (variable.component && variable.component === InputComponent.TextArea) {
        return faker.lorem.paragraph();
      }

      return faker.random.word();
    }

    default:
      return faker.random.word();
  }
};

export default makeMockValue;
