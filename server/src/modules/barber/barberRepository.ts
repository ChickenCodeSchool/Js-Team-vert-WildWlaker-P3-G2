import type { Rows } from "../../../database/client";
import databaseClient from "../../../database/client";

type Barber = {
  id_user: number;
  name: string;
  description: string;
  postal_code: string;
  city: string;
  adress: string;
  delivery_radius: number;
  status: string;
};

class BarberRepository {
  // The C of CRUD - Create operation

  async readAll(filters?: { startDate?: string; endDate?: string }) {
    let query = `
    SELECT 
      b.*,
      u.avatar_url AS avatar_url, 
      u.create_time AS create_time
    FROM barber b
    JOIN users u ON b.id_user = u.id_user
  `;
    const queryParams: string[] = [];
    if (filters?.startDate && filters?.endDate) {
      query += ` WHERE u.create_time BETWEEN ? AND ?`;
      queryParams.push(
        `${filters.startDate} 00:00:00`,
        `${filters.endDate} 23:59:59`,
      );
    }
    const [rows] = await databaseClient.query<Rows>(query, queryParams);
    // Return the array of Barbers
    return rows as Barber[];
  }

  // The U of CRUD - Update operation
  // TODO: Implement the update operation to modify an existing Barber

  // async update(Barber: Barber) {
  //   ...
  // }

  // The D of CRUD - Delete operation
  // TODO: Implement the delete operation to remove an Barber by its ID

  // async delete(id: number) {
  //   ...
  // }
}

export default new BarberRepository();
