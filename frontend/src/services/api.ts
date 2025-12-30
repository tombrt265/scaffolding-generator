const API_URL = import.meta.env.VITE_API_BASE_URL;
import type { StudyPlan } from "../models";

export async function extractStudyMaterial(
  formData: FormData
): Promise<{ text: string }> {
  const res = await fetch(`${API_URL}/extract-study-material`, {
    method: "POST",
    body: formData,
  });
  return res.json();
}

export async function createStudyPlan(
  material: string,
  date: Date
): Promise<StudyPlan> {
  const res = await fetch(`${API_URL}/create-study-plan`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      study_material: material,
      date: date.toISOString().slice(0, 10), // Format date as YYYY-MM-DD
    }),
  });
  return res.json();
}
