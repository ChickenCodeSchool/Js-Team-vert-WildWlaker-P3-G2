import { useEffect, useState } from "react";

const API_URL = import.meta.env.VITE_API_URL;

export type BarberAppointment = {
  id_appointment: number;
  appointment_date: string;
  status: string;
  customer_firstname: string;
  customer_lastname: string;
  customer_avatar: string;
  prestation_name: string;
  prestation_price: number;
  duration_minutes: number;
};

function useBarberAppointments(barberId: number, status?: string) {
  const [appointments, setAppointments] = useState<BarberAppointment[]>([]);

  useEffect(() => {
    const url = status
      ? `${API_URL}/api/appointments/barber/${barberId}?status=${encodeURIComponent(status)}`
      : `${API_URL}/api/appointments/barber/${barberId}`;

    fetch(url)
      .then((res) => res.json())
      .then((data) => setAppointments(data));
  }, [barberId, status]);

  return { appointments, setAppointments };
}

export default useBarberAppointments;
