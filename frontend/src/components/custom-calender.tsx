import { useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

/**
 * Props:
 * events: {
 *   "2026-01-01": "Neujahr",
 *   "2026-01-10": "Deadline"
 * }
 */

interface CustomMonthCalendarProps {
  events: { [date: string]: string };
}

export default function CustomMonthCalendar({
  events,
}: CustomMonthCalendarProps) {
  const [currentDate, setCurrentDate] = useState(new Date());

  const year = currentDate.getFullYear();
  const month = currentDate.getMonth(); // 0-indexed

  const firstDayOfMonth = new Date(year, month, 1);
  const lastDayOfMonth = new Date(year, month + 1, 0);

  const startWeekday =
    firstDayOfMonth.getDay() === 0 ? 6 : firstDayOfMonth.getDay() - 1; // Monday start
  const daysInMonth = lastDayOfMonth.getDate();

  const prevMonth = () => setCurrentDate(new Date(year, month - 1, 1));
  const nextMonth = () => setCurrentDate(new Date(year, month + 1, 1));

  const days = [];

  // Empty cells before month start
  for (let i = 0; i < startWeekday; i++) {
    days.push(null);
  }

  // Month days
  for (let d = 1; d <= daysInMonth; d++) {
    const dateKey = `${year}-${String(month + 1).padStart(2, "0")}-${String(
      d
    ).padStart(2, "0")}`;
    days.push({
      day: d,
      title: events[dateKey],
    });
  }

  const monthLabel = currentDate.toLocaleDateString("de-DE", {
    month: "long",
    year: "numeric",
  });

  return (
    <div className="w-full max-w-none">
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <button
          onClick={prevMonth}
          className="p-2 rounded-lg hover:bg-gray-100"
        >
          <ChevronLeft />
        </button>
        <h2 className="text-xl font-semibold capitalize">{monthLabel}</h2>
        <button
          onClick={nextMonth}
          className="p-2 rounded-lg hover:bg-gray-100"
        >
          <ChevronRight />
        </button>
      </div>

      {/* Weekdays */}
      <div className="grid grid-cols-7 gap-2 mb-2 text-sm font-medium text-center">
        {["Mo", "Di", "Mi", "Do", "Fr", "Sa", "So"].map((d) => (
          <div key={d}>{d}</div>
        ))}
      </div>

      {/* Calendar Grid */}
      <div className="grid grid-cols-7 gap-2">
        {days.map((cell, idx) => (
          <div
            key={idx}
            className="min-h-35 rounded-xl border p-3 flex flex-col"
          >
            {cell && (
              <>
                <span className="text-sm font-semibold">{cell.day}</span>
                {cell.title && (
                  <span className="mt-1 text-sm text-gray-600 break-words">
                    {cell.title}
                  </span>
                )}
              </>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
