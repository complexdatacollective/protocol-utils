/* eslint-env jest */
import makeMockValue from '../make-mock-value';
import {VariableType} from '../protocol-types';

jest.mock('faker', () => ({
  datatype: {
    number: jest.fn(() => 10),
  },
}));

describe('make mock values for variable type...', () => {
  it('number', () => {
    const variable = {
      type: VariableType.number,
      name: 'My number variable',
    };

    expect(makeMockValue(variable)).toEqual(10);
  });
});
