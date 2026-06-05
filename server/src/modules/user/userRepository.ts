import type { Rows } from "../../../database/client";
import databaseClient from "../../../database/client";

type user = {
  id_user: number;
  email: string;
  password: string;
  forget_password: string;
  user_type: string;
  avatrar_url: string;
  created_time: Date;
};

class UserRepository {
  // The C of CRUD - Create operation

  async readAll(filters?: { startDate?: string; endDate?: string }) {
    let query = "SELECT * FROM users";
    const queryParams: string[] = [];
    if (filters?.startDate && filters?.endDate) {
      query += " WHERE create_time BETWEEN ? AND ?";
      queryParams.push(
        `${filters.startDate} 00:00:00`,
        `${filters.endDate} 23:59:59`,
      );
    }
    // Execute the SQL SELECT query to retrieve all users from the "user" table
    const [rows] = await databaseClient.query<Rows>(query, queryParams);

    // Return the array of users
    return rows as user[];
  }

  // The U of CRUD - Update operation
  // TODO: Implement the update operation to modify an existing user

  // async update(user: user) {
  //   ...
  // }

  // The D of CRUD - Delete operation
  // TODO: Implement the delete operation to remove an user by its ID

  // async delete(id: number) {
  //   ...
  // }
}

export default new UserRepository();
