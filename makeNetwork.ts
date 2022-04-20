import { times, omit } from 'lodash';
import { entityAttributesProperty, entityPrimaryKeyProperty, Color } from '@codaco/shared-consts';
import { NCNode, NCEdge, NCEgo, makeEntity, makeNode, makeEgo, makeEdge } from "./makeEntities";

export type NCNetwork = {
  nodes: NCNode[];
  edges: NCEdge[];
  ego: NCEgo;
};

enum InputComponent {
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
};

enum VariableType {
  boolean,
  text,
  number,
  datetime,
  ordinal,
  scalar,
  categorical,
  layout,
  location,
};

export type NCVariableDefinition = {
  name: string;
  component?: InputComponent,
  type: VariableType,
  validation?: {
    [key: string]: any;
  },
}

export type NCEntityTypeDefinition = {
  variables: {
    [key: string]: NCVariableDefinition;
  },
}

export type NCNodeTypeDefinition = NCEntityTypeDefinition & {
  name: string;
  color: Color,
  iconVariant: string,
}

export type NCEdgeTypeDefinition = NCNodeTypeDefinition;

export type NCCodebook = {
  node?: {
    [key: string]: NCEntityTypeDefinition;
  };
  edge?: {
    [key: string]: NCEdgeTypeDefinition;
  };
  ego?: NCEntityTypeDefinition;
}

export type NCStageDefinition = {
  id: string;
  type: string;
}

export type NCProtocol = {
  description: string;
  lastModified: string;
  schemaVersion: string;
  codebook: NCCodebook;
  assetManifest?: object;
  stages: Array<NCStageDefinition>;
}

export const makeNetwork = (protocol: NCProtocol): NCNetwork => {
  const codebookNodeTypes = Object.keys(protocol.codebook.node || {});
  const codebookEdgeTypes = Object.keys(protocol.codebook.edge || {});

  // Generate nodes
  const nodes = [];
  const networkMaxNodes = 20;
  const networkMinNodes = 2;

  codebookNodeTypes.forEach((nodeType: string) => {
    const numberOfNodesOfThisType = Math.round(
      Math.random() * ((networkMaxNodes - networkMinNodes) + networkMinNodes),
    );
    nodes.push(...[...Array(numberOfNodesOfThisType)].map(() => makeNode(
      nodeType,
      protocol.codebook.node[nodeType].variables,
    )));
  });

  const ego = makeEgo(null, (protocol.codebook.ego || {}).variables);

  const edges = [];
  const networkMaxEdges = 20;
  const networkMinEdges = 1;
  const pickNodeUid = () => nodes[
    Math.floor(Math.random() * nodes.length)
  ][entityPrimaryKeyProperty];

  codebookEdgeTypes.forEach((edgeType) => {
    const edgesOfThisType = Math.round(
      Math.random() * ((networkMaxEdges - networkMinEdges) + networkMinEdges),
    );

    edges.push(...[...Array(edgesOfThisType)].map(() => makeEdge(
      edgeType,
      protocol.codebook.edge[edgeType].variables,
      null,
      pickNodeUid(),
      pickNodeUid(),
    )));
  });

  return {
    nodes,
    edges,
    ego,
  };
};

export default { makeNetwork };
