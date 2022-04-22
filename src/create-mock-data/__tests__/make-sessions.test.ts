/* eslint-env jest */
import {makeSession, makeSessions} from '../make-sessions';
import mockProtocol from './mockData/protocol.json';

describe('makeSession()', () => {
  it('returns a single valid network canvas session', () => {
    console.log(makeSession(mockProtocol));
    expect(makeSession(mockProtocol)).toBeTruthy();
  });

  it.todo('allows session properties to be specified via an options object');
});

describe('makeSessions()', () => {
  it('returns an array of valid network canvas sessions, according to sessionCount', () => {
    expect(makeSessions(mockProtocol, 10)).toHaveLength(10);
    expect(makeSessions(mockProtocol, 1)).toHaveLength(1);
    expect(makeSessions(mockProtocol, 0)).toHaveLength(0);
  });

  it.todo('allows session properties to be specified via an options object');
  it.todo('allows for a mask to be provided for case id generation');
});
