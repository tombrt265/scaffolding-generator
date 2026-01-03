import { useState } from "react";
import Navbar from "@/components/navbar";
import CustomMonthCalendar from "@/components/custom-calender";

const Tabs = {
  overview: "Übersicht",
  calendar: "Kalender",
};

const events = {
  "2026-01-01": "Mathematik Session",
  "2026-01-10": "Physik Session",
  "2026-01-15": "Informatik Session",
};

export default function PlanPage() {
  const [activeTab, setActiveTab] = useState<keyof typeof Tabs>(
    Object.keys(Tabs)[0] as keyof typeof Tabs
  );

  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-gray-100">
        {/* Tabs */}
        <div className="flex flex-row items-center justify-center gap-6 py-6">
          {Tabs &&
            Object.keys(Tabs).map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab as keyof typeof Tabs)}
                className={`py-3 font-medium transition -mb-px ${
                  activeTab === tab
                    ? "text-blue-600"
                    : "text-gray-500 hover:text-gray-700"
                }`}
              >
                {Tabs[tab as keyof typeof Tabs]}
              </button>
            ))}
        </div>

        {/* Content */}
        <div className="w-full px-6 py-8">
          {activeTab === "overview" && (
            <div className="bg-white rounded-lg shadow p-6">
              <h2 className="text-xl font-semibold mb-2">Übersicht</h2>
              <p className="text-gray-600">
                Hier wird eine chronologische Übersicht deiner neuen
                Learning-Sessions angezeigt.
              </p>
            </div>
          )}

          {activeTab === "calendar" && (
            <div className="bg-white rounded-lg shadow p-6">
              <h2 className="text-xl font-semibold mb-2">Kalender</h2>
              <CustomMonthCalendar events={events} />
            </div>
          )}
        </div>
      </div>
    </>
  );
}
