import type { Rows } from "../../../database/client";
import databaseClient from "../../../database/client";

type Appointement = {
  id_appointement: number;
  appointement_date: Date;
  status: string;
  location_type: string;
  id_prestation: number;
  id_user_barber: number;
  id_user_customer: number;
};

class AppointementRepository {
  // The C of CRUD - Create operation

  async readAll() {
    // Execute the SQL SELECT query to retrieve all Appointements from the "Appointement" table
    const [rows] = await databaseClient.query<Rows>(
      "select * from appointement",
    );

    // Return the array of Appointements
    return rows as Appointement[];
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
