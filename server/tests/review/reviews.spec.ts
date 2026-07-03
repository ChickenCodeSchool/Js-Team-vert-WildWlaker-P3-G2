import supertest from "supertest";
import type { Rows } from "../../database/client";
import databaseClient from "../../database/client";
import app from "../../src/app";

afterEach(() => {
  jest.restoreAllMocks();
});

// ─── GET /api/reviews ─────────────────────────────────────────────────────────

describe("GET /api/reviews", () => {
  it("should return all reviews", async () => {
    const rows = [
      {
        id_review: 1,
        rating: 5,
        comment: "Super !",
        reporting: 0,
        created_at: "2026-05-20",
        id_appointment: 1,
      },
      {
        id_review: 2,
        rating: 3,
        comment: "Correct.",
        reporting: 0,
        created_at: "2026-05-22",
        id_appointment: 3,
      },
    ] as Rows;

    jest
      .spyOn(databaseClient, "query")
      .mockImplementation(async () => [rows, []]);

    const response = await supertest(app).get("/api/reviews");

    expect(response.status).toBe(200);
    expect(response.body).toHaveLength(2);
  });

  it("should return an empty array when no reviews exist", async () => {
    jest
      .spyOn(databaseClient, "query")
      .mockImplementation(async () => [[] as Rows, []]);

    const response = await supertest(app).get("/api/reviews");

    expect(response.status).toBe(200);
    expect(response.body).toStrictEqual([]);
  });
});

// ─── GET /api/reviews/barber/:id ─────────────────────────────────────────────

describe("GET /api/reviews/barber/:id", () => {
  it("should return only reviews linked to the given barber", async () => {
    const rows = [
      {
        id_review: 1,
        rating: 5,
        comment: "Super !",
        reporting: 0,
        created_at: "2026-05-20",
        id_appointment: 1,
      },
    ] as Rows;

    jest
      .spyOn(databaseClient, "query")
      .mockImplementation(async () => [rows, []]);

    const response = await supertest(app).get("/api/reviews/barber/4");

    expect(response.status).toBe(200);
    expect(response.body).toHaveLength(1);
    expect(response.body[0].id_review).toBe(1);
  });

  it("should return an empty array when barber has no reviews", async () => {
    jest
      .spyOn(databaseClient, "query")
      .mockImplementation(async () => [[] as Rows, []]);

    const response = await supertest(app).get("/api/reviews/barber/99");

    expect(response.status).toBe(200);
    expect(response.body).toStrictEqual([]);
  });
});
