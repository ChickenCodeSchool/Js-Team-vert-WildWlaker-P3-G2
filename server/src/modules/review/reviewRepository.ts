import type { Rows } from "../../../database/client";
import databaseClient from "../../../database/client";

type Review = {
  id_review: number;
  reporting: number;
  rating: number;
  comment: string;
  created_at: string;
  id_appointment: number;
};

type AdminReview = Review & {
  appointment_date: string;
  appointment_status: "en attente" | "confirmé" | "terminé" | "annulé" | string;
  appointment_location_type: string;
  barber_name: string;
  customer_firstname: string;
  customer_lastname: string;
  prestation_name: string;
  prestation_price: string;
  barber_phone: string | null;
  barber_email: string;
  barber_avatar_url: string;
  customer_phone: string | null;
  customer_email: string;
  customer_avatar_url: string;
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
  async readAllForAdmin(filters?: { startDate?: string; endDate?: string }) {
    const queryParams: string[] = [];
    let query = `
    SELECT r.* ,
    a.appointment_date AS appointment_date,
    a.status AS appointment_status,
    a.location_type AS appointment_location_type,
    b.name AS barber_name,
    c.firstname AS customer_firstname,
    c.lastname AS customer_lastname,
    p.name AS prestation_name,
    p.price AS prestation_price,
    ub.phone AS barber_phone,
    ub.email AS barber_email,
    ub.avatar_url  AS barber_avatar_url,
    uc.phone AS customer_phone,
    uc.email AS customer_email,
    uc.avatar_url  AS customer_avatar_url
    FROM review r
    JOIN appointment a ON r.id_appointment = a.id_appointment
    JOIN prestation p ON a.id_prestation = p.id_prestation
    JOIN barber b ON a.id_user_barber = b.id_user
    JOIN customer c ON a.id_user_customer = c.id_user
    JOIN users ub ON a.id_user_barber = ub.id_user
    JOIN users uc ON a.id_user_customer = uc.id_user
     `;
    if (filters?.startDate && filters?.endDate) {
      query += ` WHERE r.created_at BETWEEN ? AND ?`;
      queryParams.push(
        `${filters.startDate} 00:00:00`,
        `${filters.endDate} 23:59:59`,
      );
    }
    const [rows] = await databaseClient.query<Rows>(query, queryParams);
    // Return the array of reviews
    return rows as AdminReview[];
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
