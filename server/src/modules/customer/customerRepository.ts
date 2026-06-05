import type { Rows } from "../../../database/client";
import databaseClient from "../../../database/client";

type Customer = {
  id_user: number;
  firstname: string;
  lastname: string;
  postal_code: string;
  city: string;
  adress: string;
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
          u.email AS email
        FROM customer c
        JOIN users u ON c.id_user = u.id_user
      `;
    const [rows] = await databaseClient.query<Rows>(query);

    // Return the array of Customers
    return rows as Customer[];
  }

  // The U of CRUD - Update operation
  // TODO: Implement the update operation to modify an existing Customer

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
