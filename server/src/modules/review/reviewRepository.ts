import type { Rows } from "../../../database/client";
import databaseClient from "../../../database/client";

type Review = {
  id_review: number;
  reported: boolean;
  rating: number;
  comment: string;
  create_at: string;
  Id_appointement: number;
};

class ReviewRepository {
  // The C of CRUD - Create operation

  async readAll() {
    const [rows] = await databaseClient.query<Rows>("SELECT * FROM review");
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
