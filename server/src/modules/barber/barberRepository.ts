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
  create_time: string;
  avatar_url: string;
  email: string;
  phone?: string;
  birthday?: string;
  genre?: string;
  annotations?: string;
};

class BarberRepository {
  // The R of CRUD - Read All operation
  async readAll(filters?: { startDate?: string; endDate?: string }) {
    let query = `
    SELECT 
      b.*,
      u.avatar_url AS avatar_url, 
      u.create_time AS create_time,
      u.email AS email,
      u.phone AS phone,
      u.birthday AS birthday,
      u.genre AS genre, 
      u.annotations AS annotations 
    FROM barber b
    JOIN users u ON b.id_user = u.id_user
  `;
    const queryParams: string[] = [];
    if (filters?.startDate && filters?.endDate) {
      query += " WHERE u.create_time BETWEEN ? AND ?";
      queryParams.push(
        `${filters.startDate} 00:00:00`,
        `${filters.endDate} 23:59:59`,
      );
    }
    const [rows] = await databaseClient.query<Rows>(query, queryParams);
    return rows as Barber[];
  }

  // The R of CRUD - Read One operation (C'est celle-ci qu'on ajoute !)
  async read(id: number) {
    const query = `
    SELECT 
      b.*,
      u.avatar_url AS avatar_url, 
      u.create_time AS create_time,
      u.email AS email,
      u.phone AS phone,
      u.birthday AS birthday,
      u.genre AS genre, 
      u.annotations AS annotations 
    FROM barber b
    JOIN users u ON b.id_user = u.id_user
    WHERE b.id_user = ?
  `;

    const [rows] = await databaseClient.query<Rows>(query, [id]);
    // On retourne le premier élément du tableau (le barbier trouvé) ou null s'il n'existe pas
    return rows[0] as Barber | undefined;
  }

  // The U of CRUD - Update operation
  async update(barber: Barber) {
    const barberQuery = `
    UPDATE barber 
    SET  name = ?, description = ? ,postal_code = ?, city = ?, adress = ?, status = ?, delivery_radius = ?
    WHERE id_user = ?`;
    await databaseClient.query(barberQuery, [
      barber.name,
      barber.description,
      barber.postal_code,
      barber.city,
      barber.adress,
      barber.status,
      barber.delivery_radius,
      barber.id_user,
    ]);

    const usersQuery = `
    UPDATE users 
    SET email = ?, avatar_url = ?, phone = ?, birthday = ?, genre = ?, annotations = ?
    WHERE id_user = ?`;
    await databaseClient.query(usersQuery, [
      barber.email,
      barber.avatar_url,
      barber.phone,
      barber.birthday,
      barber.genre,
      barber.annotations,
      barber.id_user,
    ]);

    return true;
  }
}

export default new BarberRepository();
