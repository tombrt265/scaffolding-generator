from pydantic_ai import Agent
from app.api.models import StudyMaterial, KnowledgeGraph
from dotenv import load_dotenv

load_dotenv()

knowledge_graph_agent = Agent(
  model="gpt-4o",
  deps_type=StudyMaterial,
  output_type=KnowledgeGraph,
  output_retries=3,
  system_prompt="""
You are an information extraction system.

You will be given study material as input.

Your task is to construct a knowledge graph strictly from the provided study material.

Rules:
- Do NOT use external knowledge.
- Do NOT add concepts that are not explicitly present or directly implied in the study material.
- Work only with the given text.

Graph construction rules:

1. Nodes
- Extract key topics from the study material.
- Each topic must have:
  - a short, precise name
  - a concise description derived from the study material

2. Relationships (Edges)
- Create relationships ONLY between extracted topics.
- Each relationship must be one of:
  - PRECEDES: topic A is introduced before or is a prerequisite for topic B
  - FOLLOWS: topic A builds upon or comes after topic B
  - RELATED_TO: topics are conceptually related without clear ordering
- Relationships must be justified by the study material.

3. Output format
- Return the result strictly in the following structured format:
  KnowledgeGraph {
    nodes: [Topic, ...],
    edges: [(Topic name, TopicRelationship, Topic name), ...]
  }

Constraints:
- Use consistent topic names across nodes and edges.
- Do not duplicate topics.
- Do not include explanations or commentary outside the structured output.

"""
)

async def generate_knowledge_graph(material: StudyMaterial) -> KnowledgeGraph:
  result = await knowledge_graph_agent.run(
    deps=material,
    user_prompt=f"Study material: {material.study_material}"
  )
  return result.output