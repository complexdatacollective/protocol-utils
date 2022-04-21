import {edgeSourceProperty, edgeTargetProperty, entityAttributesProperty, entityPrimaryKeyProperty} from '@codaco/shared-consts';
import {has} from 'lodash';
import {v4 as uuid} from 'uuid';
import {NcVariableDefinition} from './protocol-types';
import make from './make-mock-value';
import {NcEdge, NcEntity, NcNode} from './entity-types';

export const makeEntity = (
  variables: Record<string, NcVariableDefinition> = {},
  promptAttributes: Record<string, NcVariableDefinition> = {},
): NcEntity => {
  const mockAttributes: Record<string, any> = {};

  for (const [uid, variable] of Object.entries(variables)) {
    if (has(promptAttributes, uid)) {
      break;
    }

    const mockVariable = make(variable);
    mockAttributes[uid] = mockVariable;
  }

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
  promptAttributes = {},
): NcNode => {
  const entity: NcEntity = makeEntity(variables, promptAttributes);

  const modelData = {
    promptIDs: ['mock'], // eslint-disable-line @typescript-eslint/naming-convention
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
  from: string,
  to: string,
  variables: Record<string, NcVariableDefinition> = {},
  promptAttributes: Record<string, NcVariableDefinition> = {},
): NcEdge => { // eslint-disable-line max-params
  const node: NcNode = makeNode(typeID, variables, promptAttributes);

  return {
    ...node,
    [edgeSourceProperty]: from,
    [edgeTargetProperty]: to,
  };
};

export const makeEgo = makeEntity;
