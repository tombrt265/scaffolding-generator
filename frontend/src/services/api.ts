const API_URL = import.meta.env.VITE_API_BASE_URL;
import type { Topic, Edge } from "../models";

export async function extractStudyMaterial(
  formData: FormData
): Promise<{ text: string }> {
  const res = await fetch(`${API_URL}/extract-study-material`, {
    method: "POST",
    body: formData,
  });
  return res.json();
}

export async function createKnowledgeGraph(
  text: string
): Promise<{ nodes: Topic[]; edges: Edge[] }> {
  const res = await fetch(`${API_URL}/create-knowledge-graph`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ study_material: text }),
  });
  return res.json();
}
