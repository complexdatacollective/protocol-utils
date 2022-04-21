import {entityAttributesProperty, entityPrimaryKeyProperty} from '@codaco/shared-consts';

export type NcEntity = {
  [entityPrimaryKeyProperty]: string;
  [entityAttributesProperty]: Record<string, any>;
};

export type NcNode = NcEntity & {
  type: string;
  stageId?: string;
  promptIDs?: string[];
};

export type NcEdge = NcNode & {
  from: string;
  to: string;
};

export type NcEgo = NcEntity;
