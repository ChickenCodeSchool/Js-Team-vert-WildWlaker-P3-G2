import databaseClient from "../../../database/client";

import type { Rows } from "../../../database/client";

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

  async readAll() {
    // Execute the SQL SELECT query to retrieve all Barbers from the "Barber" table
    const [rows] = await databaseClient.query<Rows>("select * from barber");

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
