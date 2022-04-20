import { entityPrimaryKeyProperty, entityAttributesProperty } from '@codaco/shared-consts';
import { has } from 'lodash';
import { v4 as uuid } from 'uuid';
import { makeMockValue } from './makeMockValue';
import { NCVariableDefinition } from './makeNetwork';

export type NCEntity = {
  [entityPrimaryKeyProperty]: string;
  [entityAttributesProperty]: {
    [key: string]: any;
  };
};

export type NCNode = NCEntity & {
  type: string;
  stageId?: string;
  promptIDs?: string[];
};

export type NCEdge = NCNode & {
  from: string;
  to: string;
};

export type NCEgo = NCEntity;

export const makeEntity = (
  variables: { [key: string]: NCVariableDefinition } = {},
  promptAttributes = {},
): NCEntity => {
  const mockAttributes = Object.entries(variables).reduce(
    (acc, [variableId, variable]) => {
      if (!has(promptAttributes, variableId)) {
        acc[variableId] = makeMockValue(variable);
      }
      return acc;
    }, {},
  );

  return {
    [entityPrimaryKeyProperty]: uuid(),
    [entityAttributesProperty]: {
      ...mockAttributes,
    },
  };
};

export const makeNode = (
  typeID: string,
  variables = {},
  promptAttributes = {}
): NCNode => {
  const entity: NCEntity = makeEntity(variables, promptAttributes);

  const modelData = {
    promptIDs: ['mock'],
    stageId: 'mock',
    type: typeID,
  };

  return {
    ...entity,
    ...modelData,
  };
};

export const makeEdge = (
  typeID: string,
  variables = {},
  promptAttributes = {},
  from: string,
  to: string,
): NCEdge => {
  const node: NCNode = makeNode(typeID, variables, promptAttributes);

  return {
    ...node,
    from,
    to,
  };
};

export const makeEgo = makeEntity;

export default { makeEntity, makeNode, makeEdge, makeEgo };
