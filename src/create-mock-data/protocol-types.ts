import {Color} from '@codaco/shared-consts';
import {NcEdge, NcEgo, NcNode} from './entity-types';

export type NcNetwork = {
  nodes: NcNode[];
  edges: NcEdge[];
  ego: NcEgo;
};

export enum InputComponent {
  TextInput,
  TextArea,
  NumberInput,
  CheckboxGroup,
  Toggle,
  RadioGroup,
  ToggleButtonGroup,
  LikertScale,
  VisualAnalogScale,
  DatePicker,
  RelativeDatePicker,
  BooleanChoice,
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
  value: string | number;
};

export type NcVariableDefinition = {
  name: string;
  component?: InputComponent;
  options?: NcOptionsOption[];
  type: VariableType;
  validation?: Record<string, any>;
};

export type NcEntityTypeDefinition = {
  variables: Record<string, NcVariableDefinition>;
};

export type NcNodeTypeDefinition = NcEntityTypeDefinition & {
  name: string;
  color: Color;
  iconVariant: string;
};

export type NcEdgeTypeDefinition = NcNodeTypeDefinition;

export type NcCodebook = {
  node?: Record<string, NcEntityTypeDefinition>;
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
  schemaVersion: string;
  codebook: NcCodebook;
  assetManifest?: Record<string, unknown>;
  stages: NcStageDefinition[];
};
