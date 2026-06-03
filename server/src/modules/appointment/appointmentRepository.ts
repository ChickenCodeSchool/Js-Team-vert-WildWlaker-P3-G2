import type { Rows } from "../../../database/client";
import databaseClient from "../../../database/client";

type Appointment = {
  id_appointment: number;
  appointment_date: Date;
  status: string;
  location_type: string;
  id_prestation: number;
  id_user_barber: number;
  id_user_customer: number;
};
export type AppointmentWithDetails = Appointment & {
  barber_name: string;
  customer_firstname: string;
  customer_lastname: string;
};
class AppointmentRepository {
  // The C of CRUD - Create operation

  async readAll() {
    // Execute the SQL SELECT query to retrieve all Appointments from the "Appointment" table
    const query = `
      SELECT 
        a.*,
        b.name AS barber_name,
        c.firstname AS customer_firstname,
        c.lastname AS customer_lastname,
        u.avatar_url AS customer_avatar, 
        p.name AS prestation_name
      FROM appointment a
      JOIN barber b ON a.id_user_barber = b.id_user
      JOIN customer c ON a.id_user_customer = c.id_user
      JOIN users u ON c.id_user = u.id_user  
      JOIN prestation p ON a.id_prestation = p.id_prestation
    `;
    const [rows] = await databaseClient.query<Rows>(query);

    // Return the array of Appointments
    return rows as AppointmentWithDetails[];
  }

  // The U of CRUD - Update operation
  // TODO: Implement the update operation to modify an existing Appointment

  // async update(Appointment: Appointment) {
  //   ...
  // }

  // The D of CRUD - Delete operation
  // TODO: Implement the delete operation to remove an Appointment by its ID

  // async delete(id: number) {
  //   ...
  // }
}

export default new AppointmentRepository();
