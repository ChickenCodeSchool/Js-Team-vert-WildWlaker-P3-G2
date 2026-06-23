import { useEffect, useState } from "react";
import "./BookingForm.css";
import { FiCheckCircle, FiScissors } from "react-icons/fi";
import BarberCard from "../BarberCard/BarberCard";
import type { Booking, Prestation } from "./BookingTypes";

type AvailabilitySlot = {
  id_availability: number;
  start_time: string;
  end_time: string;
};

type Props = {
  booking: Booking;
  setBooking: React.Dispatch<React.SetStateAction<Booking>>;
  onNext: () => void;
};

const API_URL = import.meta.env.VITE_API_URL;

function BookingForm({ booking, setBooking, onNext }: Props) {
  const [prestations, setPrestations] = useState<Prestation[]>([]);
  const [availableSlots, setAvailableSlots] = useState<AvailabilitySlot[]>([]);
  const [loadingSlots, setLoadingSlots] = useState(false);

  const dates = Array.from({ length: 7 }, (_, i) => {
    const date = new Date();
    date.setDate(date.getDate() + i);
    return date;
  });

  useEffect(() => {
    fetch(`${API_URL}/api/prestations`)
      .then((res) => res.json())
      .then((data) => {
        setPrestations(data);
      })
      .catch((err) => console.error("Erreur chargement prestations", err));
  }, []);

  useEffect(() => {
    if (!booking.appointmentDate || !booking.barber) {
      setAvailableSlots([]);
      return;
    }
    setLoadingSlots(true);
    fetch(
      `${API_URL}/api/barbers/${booking.barber.id_user}/availability?date=${booking.appointmentDate}`,
    )
      .then((res) => res.json())
      .then((data: AvailabilitySlot[]) => {
        setAvailableSlots(data);
        setBooking((prev) => ({ ...prev, appointmentTime: undefined }));
      })
      .catch(() => setAvailableSlots([]))
      .finally(() => setLoadingSlots(false));
  }, [booking.appointmentDate, booking.barber, setBooking]);

  const formatSlotTime = (isoString: string) => {
    return new Date(isoString).toLocaleTimeString("fr-FR", {
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  return (
    <div className="booking-form">
      <h2 className="booking-form__title">Réserver </h2>
      {booking.barber && <BarberCard barber={booking.barber} />}

      <section className="booking-form__section">
        <h3 className="booking-form__section-title">1. Choisir un service</h3>

        <div className="booking-form__services">
          {prestations.map((prestation) => (
            <button
              type="button"
              key={prestation.id_prestation}
              className={`booking-form__service ${
                booking.prestation?.id_prestation === prestation.id_prestation
                  ? "booking-form__service--selected"
                  : ""
              }`}
              onClick={() =>
                setBooking({
                  ...booking,
                  prestation,
                })
              }
            >
              <div className="booking-form__service-left">
                <div className="booking-form__service-icon">
                  <FiScissors />
                </div>

                <div>
                  <h4 className="booking-form__service-title">
                    {prestation.name}
                  </h4>

                  <p className="booking-form__service-duration">
                    {prestation.duration_minutes} min
                  </p>
                </div>
              </div>

              <div className="booking-form__service-right">
                <span className="booking-form__service-price">
                  {prestation.price} €
                </span>

                {booking.prestation?.id_prestation ===
                prestation.id_prestation ? (
                  <FiCheckCircle />
                ) : (
                  <span className="booking-form__service-radio" />
                )}
              </div>
            </button>
          ))}
        </div>
      </section>

      <section className="booking-form__section">
        <h3 className="booking-form__section-title">2. Choisir une date</h3>

        <div className="booking-form__dates">
          {dates.map((date) => {
            const dateStr = date.toISOString().split("T")[0];
            const dayNum = date.getDate();
            const month = date.toLocaleDateString("fr-FR", { month: "short" });
            const weekday = date.toLocaleDateString("fr-FR", {
              weekday: "short",
            });

            return (
              <button
                type="button"
                key={dateStr}
                className={`booking-form__date ${
                  booking.appointmentDate === dateStr
                    ? "booking-form__date--selected"
                    : ""
                }`}
                onClick={() => {
                  setBooking({ ...booking, appointmentDate: dateStr });
                }}
              >
                <span>{weekday}</span>
                <strong>{dayNum}</strong>
                <span>{month}</span>
              </button>
            );
          })}
        </div>
      </section>

      <section className="booking-form__section">
        <h3 className="booking-form__section-title">3. Choisir une heure</h3>

        {loadingSlots ? (
          <p className="booking-form__slots-empty">Chargement des créneaux…</p>
        ) : availableSlots.length > 0 ? (
          <div className="booking-form__slots">
            {availableSlots.map((slot) => {
              const timeLabel = formatSlotTime(slot.start_time);
              return (
                <button
                  type="button"
                  key={slot.id_availability}
                  className={`booking-form__slot ${
                    booking.appointmentTime === timeLabel
                      ? "booking-form__slot--selected"
                      : ""
                  }`}
                  onClick={() => {
                    setBooking({ ...booking, appointmentTime: timeLabel });
                  }}
                >
                  {timeLabel}
                </button>
              );
            })}
          </div>
        ) : (
          <p className="booking-form__slots-empty">
            {booking.appointmentDate
              ? "Aucun créneau disponible ce jour."
              : "Sélectionnez une date pour voir les créneaux."}
          </p>
        )}
      </section>

      <button
        type="button"
        className="booking-form__button"
        onClick={onNext}
        disabled={!booking.prestation || !booking.appointmentDate}
      >
        Continuer
      </button>
    </div>
  );
}

export default BookingForm;
