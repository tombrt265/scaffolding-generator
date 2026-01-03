import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { extractStudyMaterial, createStudyPlan } from "../services/api";
import type { StudyPlan } from "../models/study-plan-model";
import { Calendar25 } from "@/components/date-picker";
import Navbar from "@/components/navbar";

export default function CreatePlanPage() {
  const navigate = useNavigate();

  const [file, setFile] = useState<File | null>(null);
  const [studyMaterial, setStudyMaterial] = useState("");
  const [studyPlan, setStudyPlan] = useState<StudyPlan | string>("");
  const [loading, setLoading] = useState(false);
  const [planLoading, setPlanLoading] = useState(false);
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(undefined);

  const handleDateUpload = (date: Date | undefined) => {
    setSelectedDate(date);
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFile(e.target.files[0]);
      setStudyMaterial("");
    }
  };

  const handleUpload = async () => {
    if (!file) return;

    setLoading(true);
    setStudyMaterial("");

    const formData = new FormData();
    formData.append("file", file);

    try {
      const res = await extractStudyMaterial(formData);
      setStudyMaterial(res.text ?? "Kein Text zurückgegeben.");
    } catch {
      setStudyMaterial("Fehler beim Extrahieren.");
    } finally {
      setLoading(false);
    }
  };

  const handleCreatePlan = async () => {
    if (!studyMaterial || !selectedDate) return;

    setPlanLoading(true);

    try {
      const res = await createStudyPlan(studyMaterial, selectedDate);
      setStudyPlan(res ?? "Kein Study Plan zurückgegeben.");

      // 🔁 Nach erfolgreichem Request zu /plan wechseln
      navigate("/plan", { replace: true });
    } catch {
      setStudyPlan("Fehler beim Erstellen des Study Plans.");
    } finally {
      setPlanLoading(false);
    }
  };

  return (
    <>
      <Navbar />
      <div className="w-full h-screen flex flex-col justify-center items-center bg-gray-50">
        <div className="px-6 py-12 bg-white rounded-lg shadow-md font-sans">
          <h1 className="text-3xl font-bold text-center mb-4">
            study planner v1
          </h1>
          <div className="w-full flex flex-col justify-center items-center">
            <Calendar25 onSelect={(date) => handleDateUpload(date)} />
          </div>
          <label
            htmlFor="fileUpload"
            className="flex items-center justify-center gap-3 p-4 border-2 border-dashed border-gray-300 rounded-lg cursor-pointer hover:bg-gray-50 transition"
          >
            <span className="text-gray-700">
              {file ? file.name : "PDF auswählen"}
            </span>
          </label>
          <input
            id="fileUpload"
            type="file"
            accept="application/pdf"
            onChange={handleFileChange}
            className="hidden"
          />
          <button
            onClick={handleUpload}
            disabled={!file || loading}
            className={`w-full mt-4 py-3 rounded-lg font-semibold text-white transition
        ${
          file && !loading
            ? "bg-green-600 hover:bg-green-700"
            : "bg-gray-400 cursor-not-allowed"
        }`}
          >
            {loading ? "Verarbeite..." : "PDF hochladen"}
          </button>
          <div className="text-center my-4 text-gray-500">oder</div>
          <textarea
            value={studyMaterial}
            onChange={(e) => setStudyMaterial(e.target.value)}
            placeholder="Gib hier deinen Test-Text ein..."
            className="w-full h-48 p-3 border rounded-lg border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
          <button
            onClick={handleCreatePlan}
            disabled={!studyMaterial || planLoading || !selectedDate}
            className={`w-full mt-4 py-3 rounded-lg font-semibold text-white transition
        ${
          studyMaterial && !planLoading && selectedDate
            ? "bg-blue-600 hover:bg-blue-700"
            : "bg-gray-400 cursor-not-allowed"
        }`}
          >
            {planLoading ? "Erstelle Study Plan..." : "Study Plan erstellen"}
          </button>
        </div>
      </div>
    </>
  );
}
