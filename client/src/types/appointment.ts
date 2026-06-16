export type Appointment = {
  id_appointment: number;
  appointment_date: string;
  status: "en attente" | "confirmé" | "terminé" | "annulé";
  location_type: string;
  id_prestation: number;
  id_user_barber: number;
  id_user_customer: number;
  barber_name: string;
  customer_firstname: string;
  customer_lastname: string;
  customer_avatar: string;
  prestation_name: string;
  customer_adress: string;
  duration_minutes: number;
};
