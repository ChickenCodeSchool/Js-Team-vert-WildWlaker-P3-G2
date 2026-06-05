import { useState } from "react";
import { useLocation } from "react-router";
import BookingConfirmation from "../../../components/customer/Booking/BookingConfirmation";
import BookingForm from "../../../components/customer/Booking/BookingForm";
import BookingSummary from "../../../components/customer/Booking/BookingSummary";
import type { Booking } from "../../../components/customer/Booking/BookingTypes";
import Stepper from "../../../components/customer/Booking/Stepper";
import "./BookingPage.css";

function BookingPage() {
  const [step, setStep] = useState(1);
  const location = useLocation();
  const [booking, setBooking] = useState<Booking>({
    barber: location.state?.barber,
  });

  return (
    <main className="reservation-page">
      <div className="reservation-page__container">
        <Stepper currentStep={step} />

        <div className="reservation-page__content">
          {step === 1 && (
            <BookingForm
              booking={booking}
              setBooking={setBooking}
              onNext={() => setStep(2)}
            />
          )}

          {step === 2 && (
            <BookingSummary
              booking={booking}
              onBack={() => setStep(1)}
              onNext={() => setStep(3)}
            />
          )}

          {step === 3 && <BookingConfirmation booking={booking} />}
        </div>
      </div>
    </main>
  );
}

export default BookingPage;
