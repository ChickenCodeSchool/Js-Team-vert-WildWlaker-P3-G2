import type { Rows } from "../../../database/client";
import databaseClient from "../../../database/client";

type Appointement = {
  id_appointement: number;
  appointment_date: Date;
  status: string;
  location_type: string;
  id_prestation: number;
  id_user_barber: number;
  id_user_customer: number;
};
export type AppointementWithDetails = Appointement & {
  barber_name: string;
  customer_firstname: string;
  customer_lastname: string;
};
class AppointementRepository {
  // The C of CRUD - Create operation

  async readAll(filters?: { startDate?: string; endDate?: string }) {
    // Execute the SQL SELECT query to retrieve all Appointements from the "Appointement" table
    let query = `
      SELECT 
        a.*,
        b.name AS barber_name,
        c.firstname AS customer_firstname,
        c.lastname AS customer_lastname,
        u.avatar_url AS customer_avatar, 
        p.name AS prestation_name
      FROM appointement a
      JOIN barber b ON a.id_user_barber = b.id_user
      JOIN customer c ON a.id_user_customer = c.id_user
      JOIN users u ON c.id_user = u.id_user  
      JOIN prestation p ON a.id_prestation = p.id_prestation
      `;
    const queryParams: string[] = [];

    if (filters?.startDate && filters?.endDate) {
      query += " WHERE a.appointment_date BETWEEN ? AND ?";
      queryParams.push(
        `${filters.startDate} 00:00:00`,
        `${filters.endDate} 23:59:59`,
      );
    }

    const [rows] = await databaseClient.query<Rows>(query, queryParams);

    // Return the array of Appointements
    return rows as AppointementWithDetails[];
  }

  // The U of CRUD - Update operation
  // TODO: Implement the update operation to modify an existing Appointement

  // async update(Appointement: Appointement) {
  //   ...
  // }

  // The D of CRUD - Delete operation
  // TODO: Implement the delete operation to remove an Appointement by its ID

  // async delete(id: number) {
  //   ...
  // }
}

export default new AppointementRepository();
