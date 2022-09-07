/* eslint-env jest */
import { makeNetwork } from '../make-network';
import mockProtocol from './mockData/protocol.json';

describe('makeNetwork()', () => {
  it('returns a valid NcNetwork from a valid protocol', () => {
    // Replace with validation once that is implemented
    expect(makeNetwork(mockProtocol)).toBeTruthy();
  });

  it.todo('handles protocols with no nodes');
  it.todo('handles protocols with no edges');
  it.todo('handles protocols with no ego');

  it.todo('accepts a seed value to allow deterministic reproducibility');
  it.todo('allows customising the frequency distribution of network entities');
  it.todo('allows passing options to configure network properties');
});
