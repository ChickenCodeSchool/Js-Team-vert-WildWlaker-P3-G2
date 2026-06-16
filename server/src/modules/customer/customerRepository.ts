import type { Rows } from "../../../database/client";
import databaseClient from "../../../database/client";

type Customer = {
  id_user: number;
  firstname: string;
  lastname: string;
  postal_code: string;
  city: string;
  adress: string;
  status?: string;
  avatar_url: string;
  create_time: string;
  email: string;
  phone?: string;
  birthday?: string;
  genre?: string;
  annotations?: string;
};

class CustomerRepository {
  // The C of CRUD - Create operation
  async readAll() {
    // Execute the SQL SELECT query to retrieve all Customers from the "Customer" table
    const query = `
      SELECT 
        c.*,
        u.avatar_url AS avatar_url, 
        u.create_time AS create_time,
        u.email AS email,
        u.phone AS phone,
        u.birthday AS birthday,
        u.genre AS genre, 
        u.annotations AS annotations 
      FROM customer c
      JOIN users u ON c.id_user = u.id_user
    `;
    const [rows] = await databaseClient.query<Rows>(query);

    // Return the array of Customers
    return rows as Customer[];
  }
  async read(id: number) {
    // Execute the SQL SELECT query to retrieve all Customers from the "Customer" table
    const query = `
      SELECT 
        c.*,
        u.avatar_url AS avatar_url, 
        u.create_time AS create_time,
        u.email AS email,
        u.phone AS phone,
        u.birthday AS birthday,
        u.genre AS genre, 
        u.annotations AS annotations 
      FROM customer c
      JOIN users u ON c.id_user = u.id_user
      WHERE c.id_user = ? 
    `;
    const [rows] = await databaseClient.query<Rows>(query, [id]);

    // Return the array of Customers
    return rows as Customer[];
  }

  // The U of CRUD - Update operation
  // TODO: Implement the update operation to modify an existing Customer
  async update(customer: Customer) {
    // 1. Mise à jour des infos dans la table 'customer'
    const customerQuery = `
    UPDATE customer 
    SET firstname = ?, lastname = ?, postal_code = ?, city = ?, adress = ?, status = ?
    WHERE id_user = ?`;
    await databaseClient.query(customerQuery, [
      customer.firstname,
      customer.lastname,
      customer.postal_code,
      customer.city,
      customer.adress,
      customer.status,
      customer.id_user,
    ]);

    // 2. Mise à jour des infos dans la table 'users' (si email ou avatar modifiés)
    const usersQuery = `
    UPDATE users 
    SET email = ?, avatar_url = ?, phone = ?, birthday = ?, genre = ?, annotations = ?
    WHERE id_user = ?`;
    await databaseClient.query(usersQuery, [
      customer.email,
      customer.avatar_url,
      customer.phone,
      customer.birthday,
      customer.genre,
      customer.annotations,
      customer.id_user,
    ]);

    return true;
  }

  // async update(Customer: Customer) {
  //   ...
  // }

  // The D of CRUD - Delete operation
  // TODO: Implement the delete operation to remove an Customer by its ID

  // async delete(id: number) {
  //   ...
  // }
}

export default new CustomerRepository();
