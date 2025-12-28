from fastapi import APIRouter, UploadFile, File
from app.api.pdf_utils import extract_text_from_pdf
from app.api.models import StudyMaterial
from app.api.agents import generate_study_plan, generate_knowledge_graph
router = APIRouter()

@router.post("/extract-study-material")
async def extract_study_material(file: UploadFile = File(...)):
    content = await file.read()
    return {"text": extract_text_from_pdf(content)}

# unusable
@router.post("/create-knowledge-graph")
async def create_knowledge_graph(request: StudyMaterial):
    graph = await generate_knowledge_graph(request)
    return {"nodes": graph.nodes, "edges": graph.edges}

# unusable
@router.post("/schedule-study-material")
async def schedule_study_plan_endpoint(graph: dict):
    from app.api.models import KnowledgeGraph, Topic, TopicRelationship, Edge

    nodes = [Topic(**node) for node in graph.get("nodes", [])]
    edges = [
        Edge(
            from_topic=edge["from_topic"],
            relationship=TopicRelationship(edge["relationship"]),
            to_topic=edge["to_topic"]
        ) for edge in graph.get("edges", [])
    ]
    knowledge_graph = KnowledgeGraph(nodes=nodes, edges=edges)
    plan = await generate_study_plan(knowledge_graph)
    return {"study_plan": plan}

@router.post("/create-study-plan")
async def create_study_plan(material: StudyMaterial):
    plan = await generate_study_plan(material)
    return {"study_plan": plan}