import { useMemo, useState } from "react";
import "./PlanningCalendar.css";

type ViewMode = "day" | "week" | "month";

type CalendarDay = {
  date: Date;
  day: number;
  isCurrentMonth: boolean;
};

type Props = {
  selectedDate: Date;
  onSelectDate: (date: Date) => void;
};

const weekDays = ["Lun", "Mar", "Mer", "Jeu", "Ven", "Sam", "Dim"];

function getMonthDays(year: number, month: number): CalendarDay[] {
  const firstDay = new Date(year, month, 1);
  const lastDay = new Date(year, month + 1, 0);

  const startDay = firstDay.getDay() === 0 ? 6 : firstDay.getDay() - 1;
  const days: CalendarDay[] = [];

  for (let i = startDay; i > 0; i--) {
    const date = new Date(year, month, 1 - i);

    days.push({
      date,
      day: date.getDate(),
      isCurrentMonth: false,
    });
  }

  for (let day = 1; day <= lastDay.getDate(); day++) {
    const date = new Date(year, month, day);

    days.push({
      date,
      day,
      isCurrentMonth: true,
    });
  }

  while (days.length % 7 !== 0) {
    const date = new Date(year, month, days.length - startDay + 1);

    days.push({
      date,
      day: date.getDate(),
      isCurrentMonth: false,
    });
  }

  return days;
}

function isSameDate(dateA: Date, dateB: Date) {
  return (
    dateA.getDate() === dateB.getDate() &&
    dateA.getMonth() === dateB.getMonth() &&
    dateA.getFullYear() === dateB.getFullYear()
  );
}

function PlanningCalendar({ selectedDate, onSelectDate }: Props) {
  const [viewMode, setViewMode] = useState<ViewMode>("month");

  const [currentMonth, setCurrentMonth] = useState(
    new Date(selectedDate.getFullYear(), selectedDate.getMonth(), 1),
  );

  const calendarDays = useMemo(() => {
    return getMonthDays(currentMonth.getFullYear(), currentMonth.getMonth());
  }, [currentMonth]);

  const monthLabel = currentMonth.toLocaleDateString("fr-FR", {
    month: "long",
    year: "numeric",
  });

  function handlePreviousMonth() {
    setCurrentMonth(
      new Date(currentMonth.getFullYear(), currentMonth.getMonth() - 1, 1),
    );
  }

  function handleNextMonth() {
    setCurrentMonth(
      new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1, 1),
    );
  }

  function handleSelectDay(date: Date) {
    onSelectDate(date);

    if (date.getMonth() !== currentMonth.getMonth()) {
      setCurrentMonth(new Date(date.getFullYear(), date.getMonth(), 1));
    }
  }

  return (
    <section className="planning-calendar">
      <header className="planning-topbar">
        <h2>Planning</h2>
      </header>

      <div className="planning-month-navigation">
        <button
          type="button"
          className="circle-button"
          onClick={handlePreviousMonth}
        >
          ‹
        </button>

        <div className="planning-month-label">
          <span>📅</span>
          <strong>{monthLabel}</strong>
        </div>

        <button
          type="button"
          className="circle-button"
          onClick={handleNextMonth}
        >
          ›
        </button>
      </div>

      <div className="planning-tabs">
        <button
          type="button"
          className={viewMode === "day" ? "active" : ""}
          onClick={() => setViewMode("day")}
        >
          Jour
        </button>

        <button
          type="button"
          className={viewMode === "week" ? "active" : ""}
          onClick={() => setViewMode("week")}
        >
          Semaine
        </button>

        <button
          type="button"
          className={viewMode === "month" ? "active" : ""}
          onClick={() => setViewMode("month")}
        >
          Mois
        </button>
      </div>

      <div className="calendar-weekdays">
        {weekDays.map((day) => (
          <span key={day}>{day}</span>
        ))}
      </div>

      <div className="calendar-grid">
        {calendarDays.map((item) => {
          const selected = isSameDate(item.date, selectedDate);

          return (
            <button
              key={item.date.toISOString()}
              type="button"
              onClick={() => handleSelectDay(item.date)}
              className={`calendar-day ${
                !item.isCurrentMonth ? "muted" : ""
              } ${selected ? "selected" : ""}`}
            >
              <span>{item.day}</span>
            </button>
          );
        })}
      </div>
    </section>
  );
}

export default PlanningCalendar;
