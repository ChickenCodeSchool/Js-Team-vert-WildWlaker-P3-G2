import type { Rows } from "../../../database/client";
import databaseClient from "../../../database/client";

const DAY_NAMES: Record<string, number> = {
  Dimanche: 0,
  Lundi: 1,
  Mardi: 2,
  Mercredi: 3,
  Jeudi: 4,
  Vendredi: 5,
  Samedi: 6,
};

type DaySchedule = {
  day: string;
  active: boolean;
  morningStart: string;
  morningEnd: string;
  afternoonStart: string;
  afternoonEnd: string;
};

function generateSlots(
  date: Date,
  startTime: string,
  endTime: string,
): { start: Date; end: Date }[] {
  const slots: { start: Date; end: Date }[] = [];
  const [startH, startM] = startTime.split(":").map(Number);
  const [endH, endM] = endTime.split(":").map(Number);

  const current = new Date(date);
  current.setHours(startH, startM, 0, 0);

  const endDate = new Date(date);
  endDate.setHours(endH, endM, 0, 0);

  while (current < endDate) {
    const slotStart = new Date(current);
    current.setMinutes(current.getMinutes() + 30);
    if (current <= endDate) {
      slots.push({ start: slotStart, end: new Date(current) });
    }
  }
  return slots;
}

class AvailabilityRepository {
  async saveWeeklySchedule(barberId: number, schedule: DaySchedule[]) {
    await databaseClient.query(
      "DELETE FROM barber_availability WHERE id_user = ? AND start_time > NOW() AND is_booked = FALSE",
      [barberId],
    );

    const allSlots: { start: Date; end: Date }[] = [];
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    for (let week = 0; week < 4; week++) {
      for (const daySchedule of schedule) {
        if (!daySchedule.active) continue;
        const targetDow = DAY_NAMES[daySchedule.day];
        if (targetDow === undefined) continue;

        const date = new Date(today);
        const todayDow = date.getDay();
        let diff = targetDow - todayDow + week * 7;
        if (diff < 0) diff += 7;
        date.setDate(date.getDate() + diff);

        if (daySchedule.morningStart && daySchedule.morningEnd) {
          allSlots.push(
            ...generateSlots(
              date,
              daySchedule.morningStart,
              daySchedule.morningEnd,
            ),
          );
        }
        if (daySchedule.afternoonStart && daySchedule.afternoonEnd) {
          allSlots.push(
            ...generateSlots(
              date,
              daySchedule.afternoonStart,
              daySchedule.afternoonEnd,
            ),
          );
        }
      }
    }

    if (allSlots.length === 0) return;

    const values = allSlots.map((slot) => [
      slot.start,
      slot.end,
      false,
      barberId,
    ]);

    await databaseClient.query(
      "INSERT INTO barber_availability (start_time, end_time, is_booked, id_user) VALUES ?",
      [values],
    );
  }

  async getByBarberAndDate(barberId: number, date: string) {
    const [rows] = await databaseClient.query<Rows>(
      `SELECT id_availability, start_time, end_time, is_booked
       FROM barber_availability
       WHERE id_user = ? AND DATE(start_time) = ? AND is_booked = FALSE
       ORDER BY start_time`,
      [barberId, date],
    );
    return rows as {
      id_availability: number;
      start_time: string;
      end_time: string;
      is_booked: boolean;
    }[];
  }
}

export default new AvailabilityRepository();
