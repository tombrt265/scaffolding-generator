const API_URL = import.meta.env.VITE_API_BASE_URL;

export async function extractStudyMaterial(
  formData: FormData
): Promise<{ text: string }> {
  const res = await fetch(`${API_URL}/extract-study-material`, {
    method: "POST",
    body: formData,
  });
  return res.json();
}
