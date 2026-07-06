import { useState } from "react";
import { useLocation } from "react-router";

import Carrousel from "../../../components/carrousel/Carrousel";
import BookingConfirmation from "../../../components/customer/Booking/BookingConfirmation";
import BookingForm from "../../../components/customer/Booking/BookingForm";
import BookingSummary from "../../../components/customer/Booking/BookingSummary";
import type { Booking } from "../../../components/customer/Booking/BookingTypes";
import Stepper from "../../../components/customer/Booking/Stepper";
import { useAuth } from "../../../context/AuthContext";
import useBarbers from "../../../hooks/useBarbers";
import usePrestations from "../../../hooks/usePrestations";

import "./BookingPage.css";

const API_URL = import.meta.env.VITE_API_URL;

function BookingPage() {
  const [step, setStep] = useState(1);
  const location = useLocation();
  const { user } = useAuth();
  const barbers = useBarbers();

  const [booking, setBooking] = useState<Booking>({
    barber: location.state?.barber,
  });
  const prestations = usePrestations(booking.barber?.id_user);

  const handleConfirm = async () => {
    if (
      !booking.barber ||
      !booking.prestation ||
      !booking.appointmentDate ||
      !booking.appointmentTime ||
      !user?.id
    ) {
      return;
    }
    const appointmentDatetime = `${booking.appointmentDate} ${booking.appointmentTime}:00`;
    await fetch(`${API_URL}/api/appointments`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
      body: JSON.stringify({
        appointment_date: appointmentDatetime,
        id_prestation: booking.prestation.Id_prestation,
        id_user_barber: booking.barber.id_user,
        id_user_customer: user.id,
        location_type: "domicile",
      }),
    });
    setStep(3);
  };

  return (
    <main className="reservation-page">
      <div className="reservation-page__container">
        <Stepper currentStep={step} />

        <div className="reservation-page__content">
          {step === 1 && (
            <>
              <div className="Carrousel_mouve">
                <Carrousel
                  barbers={barbers}
                  selectedBarber={booking.barber}
                  onSelectBarber={(barber) =>
                    setBooking((previousBooking) => ({
                      ...previousBooking,
                      barber,
                    }))
                  }
                />
              </div>
              <div className="booking-form-wrapper">
                <BookingForm
                  booking={booking}
                  setBooking={setBooking}
                  prestations={prestations}
                  onNext={() => setStep(2)}
                />
              </div>
            </>
          )}

          {step === 2 && (
            <BookingSummary
              booking={booking}
              onBack={() => setStep(1)}
              onNext={handleConfirm}
            />
          )}

          {step === 3 && <BookingConfirmation booking={booking} />}
        </div>
      </div>
    </main>
  );
}

export default BookingPage;
