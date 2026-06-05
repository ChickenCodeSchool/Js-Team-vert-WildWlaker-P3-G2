import type { Barber } from "../../../types/barber";

export type Prestation = {
  id_prestation: number;
  name: string;
  price: number;
  duration_minutes: number;
};

export type Booking = {
  barber?: Barber;
  prestation?: Prestation;
  appointmentDate?: string;
  appointmentTime?: string;
};
