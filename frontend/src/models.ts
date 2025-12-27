export type Topic = {
  name: string;
  description: string;
};

export type TopicRelationship = "precedes" | "follows" | "related_to";

export type Edge = {
  source: Topic;
  relation: TopicRelationship;
  target: Topic;
};

export type KnowledgeGraph = {
  nodes: Topic[];
  edges: Edge[];
};
