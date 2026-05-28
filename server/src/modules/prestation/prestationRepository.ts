import databaseClient from "../../../database/client";

import type { Rows } from "../../../database/client";

type Prestation = {
  Id_prestation: number;
  name: string;
  price: number;
  duration_minutes: number;
};

class PrestationRepository {
  // The C of CRUD - Create operation

  async readAll() {
    // Execute the SQL SELECT query to retrieve all Prestations from the "Prestation" table
    const [rows] = await databaseClient.query<Rows>("select * from prestation");

    // Return the array of Prestations
    return rows as Prestation[];
  }

  // The U of CRUD - Update operation
  // TODO: Implement the update operation to modify an existing Prestation

  // async update(Prestation: Prestation) {
  //   ...
  // }

  // The D of CRUD - Delete operation
  // TODO: Implement the delete operation to remove an Prestation by its ID

  // async delete(id: number) {
  //   ...
  // }
}

export default new PrestationRepository();
