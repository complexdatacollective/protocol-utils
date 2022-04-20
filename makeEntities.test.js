/* eslint-env jest */
import { makeEntity } from '../makeEntity';

describe('makeEntity', () => {
  it('should return an object', () => {
    const result = makeEntity('test', {});
    expect(result).toBeInstanceOf(Object);
  });
});