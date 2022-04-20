import faker from '@faker-js/faker';
import { NCVariableDefinition } from "./makeNetwork";

const mockCoord = () => faker.random.number({ min: 0, max: 1, precision: 0.000001 });

// Todo: make these mock values reflect validation
export const makeMockValue = (variable: NCVariableDefinition) => {
  switch (variable.type) {
    case 'boolean':
      return faker.random.boolean();
    case 'number':
      return faker.random.number({ min: 20, max: 100 });
    case 'scalar':
      return faker.random.number({ min: 0, max: 1, precision: 0.001 });
    case 'datetime':
      return faker.date.recent().toISOString().slice(0, 10);
    case 'ordinal':
      return faker.random.arrayElement(variable.options).value;
    case 'categorical':
      return [faker.random.arrayElement(variable.options).value];
    case 'layout':
      return { x: mockCoord(), y: mockCoord() };
    case 'text': {
      if (variable.name.toLowerCase() === 'name' || variable.name.toLowerCase().includes('name')) {
        return faker.name.findName();
      }

      if (variable.component && variable.component === 'TextArea') {
        return faker.lorem.paragraph();
      }
      return faker.random.word();
    }
    default:
      return faker.random.word();
  }
};

export default { makeMockValue };
