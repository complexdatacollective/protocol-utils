import {Color} from '@codaco/shared-consts';
import {NcEdge, NcEgo, NcNode} from './entity-types';

export type NcNetwork = {
  nodes: NcNode[];
  edges: NcEdge[];
  ego: NcEgo;
};

export enum InputComponent {
  Text = 'Text',
  TextArea = 'TextArea',
  Number = 'Number',
  CheckboxGroup = 'CheckboxGroup',
  Toggle = 'Toggle',
  RadioGroup = 'RadioGroup',
  ToggleButtonGroup = 'ToggleButtonGroup',
  LikertScale = 'LikertScale',
  VisualAnalogScale = 'VisualAnalogScale',
  DatePicker = 'DatePicker',
  RelativeDatePicker = 'RelativeDatePicker',
  BooleanChoice = 'BooleanChoice',
}

export enum VariableType {
  boolean,
  text,
  number,
  datetime,
  ordinal,
  scalar,
  categorical,
  layout,
  location,
}

export type NcOptionsOption = {
  label: string;
  value: string | number | boolean;
};

// Some of these types need to allow 'strings', since typescript has
// no way to infer types from json: https://github.com/microsoft/TypeScript/issues/32063
export type NcVariableDefinition = {
  name: string;
  component?: InputComponent | string;
  options?: NcOptionsOption[];
  type: VariableType | string;
  validation?: Record<string, any>;
};

export type NcEntityTypeDefinition = {
  variables: Record<string, NcVariableDefinition>;
};

export type NcNodeTypeDefinition = NcEntityTypeDefinition & {
  name: string;
  color: Color | string;
  iconVariant?: string;
};

export type NcEdgeTypeDefinition = NcNodeTypeDefinition;

export type NcCodebook = {
  node?: Record<string, NcNodeTypeDefinition>;
  edge?: Record<string, NcEdgeTypeDefinition>;
  ego?: NcEntityTypeDefinition;
};

export type NcStageDefinition = {
  id: string;
  type: string;
};

export type NcProtocol = {
  description: string;
  lastModified: string;
  schemaVersion: number;
  codebook: NcCodebook;
  assetManifest?: Record<string, unknown>;
  stages: NcStageDefinition[];
};
