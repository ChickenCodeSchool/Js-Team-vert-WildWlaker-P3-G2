import type { Result, Rows } from "../../../database/client";
import databaseClient from "../../../database/client";

type Prestation = {
  id_prestation: number;
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

  async readByBarber(barberId: number) {
    const [rows] = await databaseClient.query<Rows>(
      `SELECT 
      p.id_prestation,
      p.name,
      p.price,
      p.duration_minutes
      FROM prestation p  INNER JOIN propose pr ON pr.id_prestation = p.id_prestation
      WHERE pr.id_user = ?`,
      [barberId],
    );

    return rows as Prestation[];
  }

  async create(
    prestation: Omit<Prestation, "id_prestation"> & { id_user: number },
  ) {
    const [result] = await databaseClient.query<Result>(
      "INSERT INTO prestation (name, price, duration_minutes) VALUES (?, ?, ?)",
      [prestation.name, prestation.price, prestation.duration_minutes],
    );

    await databaseClient.query(
      "INSERT INTO propose (id_user, id_prestation) VALUES (?, ?)",
      [prestation.id_user, result.insertId],
    );

    return result.insertId;
  }

  async update(id: number, prestation: Omit<Prestation, "id_prestation">) {
    await databaseClient.query<Result>(
      "UPDATE prestation SET name = ?, price = ?, duration_minutes = ? WHERE id_prestation = ?",
      [prestation.name, prestation.price, prestation.duration_minutes, id],
    );
  }

  async delete(id: number) {
    await databaseClient.query<Result>(
      "DELETE FROM propose WHERE id_prestation = ?",
      [id],
    );
    await databaseClient.query<Result>(
      "DELETE FROM prestation WHERE id_prestation = ?",
      [id],
    );
  }
}

export default new PrestationRepository();
