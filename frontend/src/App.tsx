import { BrowserRouter, Routes, Route } from "react-router-dom";
import CreatePlanPage from "./pages/CreatePlanPage";
import PlanPage from "./pages/PlanPage";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<CreatePlanPage />} />
        <Route path="/plan" element={<PlanPage />} />
      </Routes>
    </BrowserRouter>
  );
}
