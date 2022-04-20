import { v4 as uuid } from 'uuid';
import { makeNetwork, NCNetwork, NCProtocol } from './makeNetwork';

// TODO: convert keys to use @codaco/shared-consts
export type NCSession = {
  protocolUID: string;
  promptIndex: number;
  stageIndex: number;
  caseId: string;
  network: NCNetwork;
  startedAt: number;
  updatedAt: number;
  finishedAt: number;
  exportedAt: number;
}

export const makeSession = (protocol: NCProtocol): NCSession => {
  const network: NCNetwork = makeNetwork(protocol);

  return {
    protocolUID: uuid,
    promptIndex: 0,
    stageIndex: 0,
    caseId: 'mock',
    network,
    startedAt: 0,
    updatedAt: 0,
    finishedAt: 0,
    exportedAt: 0,
  };
}

export const makeSessions = (
  protocol: NCProtocol,
  sessionCount: number,
): Array<NCSession> => [
  ...Array(sessionCount)
].map((_, index) => makeSession(protocol));

export default { makeSessions, makeSession };
