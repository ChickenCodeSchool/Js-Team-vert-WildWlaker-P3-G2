import type { Rows } from "../../../database/client";
import databaseClient from "../../../database/client";

type Notification = {
  id_notification: number;
  message: string;
  is_read: boolean;
  created_at: string;
  type: string;
  id_user: number;
  id_appointment: number | null;
};

class NotificationRepository {
  async create(
    userId: number,
    message: string,
    type: string,
    appointmentId?: number,
  ) {
    await databaseClient.query(
      "INSERT INTO notification (id_user, message, type, id_appointment) VALUES (?, ?, ?, ?)",
      [userId, message, type, appointmentId ?? null],
    );
  }

  async readByUser(userId: number) {
    const [rows] = await databaseClient.query<Rows>(
      "SELECT * FROM notification WHERE id_user = ? ORDER BY created_at DESC",
      [userId],
    );
    return rows as Notification[];
  }

  async markRead(id: number) {
    await databaseClient.query(
      "UPDATE notification SET is_read = TRUE WHERE id_notification = ?",
      [id],
    );
  }

  async markAllRead(userId: number) {
    await databaseClient.query(
      "UPDATE notification SET is_read = TRUE WHERE id_user = ?",
      [userId],
    );
  }
}

export default new NotificationRepository();
