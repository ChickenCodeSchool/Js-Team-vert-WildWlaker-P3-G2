import { useState } from "react";
import { FiCalendar, FiEdit2, FiInfo } from "react-icons/fi";
import "./barberDisponibilites.css";

type DaySchedule = {
  day: string;
  active: boolean;
  start: string;
  end: string;
};

const INITIAL_SCHEDULE: DaySchedule[] = [
  { day: "Lundi", active: true, start: "09:00", end: "18:00" },
  { day: "Mardi", active: true, start: "09:00", end: "18:00" },
  { day: "Mercredi", active: false, start: "09:00", end: "18:00" },
  { day: "Jeudi", active: true, start: "09:00", end: "18:00" },
  { day: "Vendredi", active: true, start: "09:00", end: "18:00" },
  { day: "Samedi", active: true, start: "10:00", end: "16:00" },
  { day: "Dimanche", active: false, start: "09:00", end: "18:00" },
];

function BarberDisponibilites() {
  const [schedule, setSchedule] = useState<DaySchedule[]>(INITIAL_SCHEDULE);
  const [editingDay, setEditingDay] = useState<string | null>(null);
  const [editForm, setEditForm] = useState({
    active: false,
    start: "",
    end: "",
  });

  function openEdit(day: DaySchedule) {
    setEditingDay(day.day);
    setEditForm({ active: day.active, start: day.start, end: day.end });
  }

  function saveEdit() {
    setSchedule((prev) =>
      prev.map((d) => (d.day === editingDay ? { ...d, ...editForm } : d)),
    );
    setEditingDay(null);
  }

  return (
    <div className="barber-dispo">
      {/* Header */}
      <div className="barber-dispo__header">
        <div>
          <h1 className="barber-dispo__title">Mes disponibilités</h1>
          <p className="barber-dispo__subtitle">
            Gérez vos horaires de travail et vos jours disponibles
          </p>
        </div>
        <button
          type="button"
          className="barber-dispo__btn-modifier"
          onClick={() => openEdit(schedule[0])}
        >
          <FiCalendar size={14} />
          Modifier mes disponibilités
        </button>
      </div>

      {/* Semaine type */}
      <div className="barber-dispo__section">
        <h2 className="barber-dispo__section-title">Semaine type</h2>
        <p className="barber-dispo__section-subtitle">
          Définissez vos horaires par jour de la semaine
        </p>

        <ul className="barber-dispo__list">
          {schedule.map((day) => (
            <li key={day.day} className="barber-dispo__row">
              <span className="barber-dispo__day">{day.day}</span>
              <span
                className={`barber-dispo__status ${day.active ? "barber-dispo__status--active" : "barber-dispo__status--inactive"}`}
              >
                <span className="barber-dispo__dot" />
                {day.active ? "Actif" : "Inactif"}
              </span>
              <span className="barber-dispo__hours">
                {day.active ? `${day.start} - ${day.end}` : "Fermé"}
              </span>
              <button
                type="button"
                className="barber-dispo__edit-btn"
                aria-label={`Modifier ${day.day}`}
                onClick={() => openEdit(day)}
              >
                <FiEdit2 size={15} />
              </button>
            </li>
          ))}
        </ul>
      </div>

      {/* Conseil */}
      <div className="barber-dispo__conseil">
        <FiInfo size={16} className="barber-dispo__conseil-icon" />
        <div>
          <p className="barber-dispo__conseil-title">Conseil SECARE</p>
          <p className="barber-dispo__conseil-text">
            Des horaires à jour vous permettent de recevoir plus de réservations
            et d'éviter les annulations.
          </p>
        </div>
      </div>

      {/* Edit modal */}
      {editingDay && (
        <div className="barber-dispo__modal-overlay">
          <div className="barber-dispo__modal">
            <h3 className="barber-dispo__modal-title">
              Modifier — {editingDay}
            </h3>

            <label className="barber-dispo__modal-label">
              <input
                type="checkbox"
                checked={editForm.active}
                onChange={(e) =>
                  setEditForm((f) => ({ ...f, active: e.target.checked }))
                }
              />
              Jour actif
            </label>

            {editForm.active && (
              <div className="barber-dispo__modal-times">
                <label className="barber-dispo__modal-label">
                  Début
                  <input
                    type="time"
                    value={editForm.start}
                    className="barber-dispo__modal-input"
                    onChange={(e) =>
                      setEditForm((f) => ({ ...f, start: e.target.value }))
                    }
                  />
                </label>
                <label className="barber-dispo__modal-label">
                  Fin
                  <input
                    type="time"
                    value={editForm.end}
                    className="barber-dispo__modal-input"
                    onChange={(e) =>
                      setEditForm((f) => ({ ...f, end: e.target.value }))
                    }
                  />
                </label>
              </div>
            )}

            <div className="barber-dispo__modal-actions">
              <button
                type="button"
                className="barber-dispo__modal-cancel"
                onClick={() => setEditingDay(null)}
              >
                Annuler
              </button>
              <button
                type="button"
                className="barber-dispo__modal-save"
                onClick={saveEdit}
              >
                Enregistrer
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default BarberDisponibilites;
