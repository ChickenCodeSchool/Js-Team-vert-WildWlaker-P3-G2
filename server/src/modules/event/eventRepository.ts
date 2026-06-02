import type { Rows } from "../../../database/client";
import databaseClient from "../../../database/client";

type Event = {
  id_event: number;
  title: string;
  image_url: string;
  description: string;
  status: string;
  start_date: string;
  end_date: string;
  location: string;
};

class eventRepository {
  // The C of CRUD - Create operation

  async readAll() {
    // Execute the SQL SELECT query to retrieve all Events from the "Event" table
    const [rows] = await databaseClient.query<Rows>("select * from event");

    // Return the array of Events
    return rows as Event[];
  }

  // The U of CRUD - Update operation
  // TODO: Implement the update operation to modify an existing Event

  // async update(Event: Event) {
  //   ...
  // }

  // The D of CRUD - Delete operation
  // TODO: Implement the delete operation to remove an Event by its ID

  // async delete(id: number) {
  //   ...
  // }
}

export default new eventRepository();
