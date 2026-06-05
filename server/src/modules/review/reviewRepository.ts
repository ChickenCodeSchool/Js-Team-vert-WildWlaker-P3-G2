import type { Rows } from "../../../database/client";
import databaseClient from "../../../database/client";

type Review = {
  id_review: number;
  reported: boolean;
  rating: number;
  comment: string;
  created_at: string;
  id_appointment: number;
};

class ReviewRepository {
  // The C of CRUD - Create operation

  async readAll(filters?: { startDate?: string; endDate?: string }) {
    const queryParams: string[] = [];
    let query = `SELECT * FROM review`;
    if (filters?.startDate && filters?.endDate) {
      query += ` WHERE created_at BETWEEN ? AND ?`;
      queryParams.push(
        `${filters.startDate} 00:00:00`,
        `${filters.endDate} 23:59:59`,
      );
    }
    const [rows] = await databaseClient.query<Rows>(query, queryParams);
    // Return the array of reviews
    return rows as Review[];
  }

  // The U of CRUD - Update operation
  // TODO: Implement the update operation to modify an existing Review

  // async update(Review: Review) {
  //   ...
  // }

  // The D of CRUD - Delete operation
  // TODO: Implement the delete operation to remove an Review by its ID

  // async delete(id: number) {
  //   ...
  // }
}

export default new ReviewRepository();
