import supertest from "supertest";
import type { Result, Rows } from "../../database/client";
import databaseClient from "../../database/client";
import app from "../../src/app";

afterEach(() => {
  jest.restoreAllMocks();
});

// ─── GET /api/barbers/:id/availability ───────────────────────────────────────

describe("GET /api/barbers/:id/availability", () => {
  it("should return available slots for a given date", async () => {
    const rows = [
      {
        id_availability: 1,
        start_time: "2026-07-10 09:00:00",
        end_time: "2026-07-10 09:30:00",
        is_booked: 0,
      },
      {
        id_availability: 2,
        start_time: "2026-07-10 09:30:00",
        end_time: "2026-07-10 10:00:00",
        is_booked: 0,
      },
    ] as Rows;

    jest
      .spyOn(databaseClient, "query")
      .mockImplementation(async () => [rows, []]);

    const response = await supertest(app).get(
      "/api/barbers/4/availability?date=2026-07-10",
    );

    expect(response.status).toBe(200);
    expect(response.body).toHaveLength(2);
    expect(response.body[0].start_time).toBe("2026-07-10 09:00:00");
  });

  it("should return an empty array when no slots are available", async () => {
    const rows = [] as Rows;

    jest
      .spyOn(databaseClient, "query")
      .mockImplementation(async () => [rows, []]);

    const response = await supertest(app).get(
      "/api/barbers/4/availability?date=2026-07-09",
    );

    expect(response.status).toBe(200);
    expect(response.body).toStrictEqual([]);
  });

  it("should return 400 when date parameter is missing", async () => {
    const response = await supertest(app).get("/api/barbers/4/availability");

    expect(response.status).toBe(400);
    expect(response.body).toHaveProperty("message");
  });
});

// ─── PUT /api/barbers/:id/schedule ───────────────────────────────────────────

const validSchedule = [
  {
    day: "Lundi",
    active: true,
    morningStart: "09:00",
    morningEnd: "12:00",
    afternoonStart: "14:00",
    afternoonEnd: "17:00",
  },
  {
    day: "Mardi",
    active: false,
    morningStart: "09:00",
    morningEnd: "12:00",
    afternoonStart: "14:00",
    afternoonEnd: "17:00",
  },
  {
    day: "Mercredi",
    active: false,
    morningStart: "09:00",
    morningEnd: "12:00",
    afternoonStart: "14:00",
    afternoonEnd: "17:00",
  },
  {
    day: "Jeudi",
    active: false,
    morningStart: "09:00",
    morningEnd: "12:00",
    afternoonStart: "14:00",
    afternoonEnd: "17:00",
  },
  {
    day: "Vendredi",
    active: false,
    morningStart: "09:00",
    morningEnd: "12:00",
    afternoonStart: "14:00",
    afternoonEnd: "17:00",
  },
  {
    day: "Samedi",
    active: false,
    morningStart: "09:00",
    morningEnd: "12:00",
    afternoonStart: "14:00",
    afternoonEnd: "17:00",
  },
  {
    day: "Dimanche",
    active: false,
    morningStart: "09:00",
    morningEnd: "12:00",
    afternoonStart: "14:00",
    afternoonEnd: "17:00",
  },
];

describe("PUT /api/barbers/:id/schedule", () => {
  it("should generate slots and return the count", async () => {
    const result = { affectedRows: 0 } as Result;

    jest
      .spyOn(databaseClient, "query")
      .mockImplementation(async () => [result, []]);

    const response = await supertest(app)
      .put("/api/barbers/4/schedule")
      .send({ schedule: validSchedule });

    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty("message");
    expect(response.body).toHaveProperty("count");
    expect(typeof response.body.count).toBe("number");
  });

  it("should return 400 when schedule is missing", async () => {
    const response = await supertest(app)
      .put("/api/barbers/4/schedule")
      .send({});

    expect(response.status).toBe(400);
    expect(response.body).toHaveProperty("message");
  });

  it("should return 400 when schedule is not an array", async () => {
    const response = await supertest(app)
      .put("/api/barbers/4/schedule")
      .send({ schedule: "invalid" });

    expect(response.status).toBe(400);
    expect(response.body).toHaveProperty("message");
  });
});
