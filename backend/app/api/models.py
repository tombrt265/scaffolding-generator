from enum import Enum
from pydantic import BaseModel, Field

class StudyMaterial(BaseModel):
    study_material: str

class Topic(BaseModel):
    name: str
    description: str

class TopicRelationship(Enum):
    PRECEDES = "precedes"
    FOLLOWS = "follows"
    RELATED_TO = "related_to"

class Edge(BaseModel):
    from_topic: str
    relationship: TopicRelationship
    to_topic: str

class KnowledgeGraph(BaseModel):
    nodes: list[Topic] = Field(description="A list of topics extracted from the study material")
    edges: list[Edge] = Field(description="A list of edges representing relationships between topics")