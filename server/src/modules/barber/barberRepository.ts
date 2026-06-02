import type { Rows } from "../../../database/client";
import databaseClient from "../../../database/client";

type Barber = {
  id: number;
  name: string;
  rating: number;
  reviews: number;
  city: string;
  distance: string;
  image: string;
};

class BarberRepository {
  async readAll() {
    const [rows] = await databaseClient.query<Rows>(
      `select
        barber.id_user as id,
        barber.name,
        cast(coalesce(round(avg(review.rating), 1), 0) as double) as rating,
        count(distinct review.Id_review) as reviews,
        concat(barber.postal_code, ' ', barber.city) as city,
        concat(barber.delivery_radius, ' km') as distance,
        case
          when barber.id_user = 4 then '/src/assets/images/Afro.jpg'
          when barber.id_user = 5 then '/src/assets/images/coiffeforall.jpg'
          else '/src/assets/images/Barbe.jpg'
        end as image
      from barber
      left join appointement on appointement.id_user_barber = barber.id_user
      left join review on review.Id_appointement = appointement.Id_appointement
      where barber.status = 'active'
      group by
        barber.id_user,
        barber.name,
        barber.postal_code,
        barber.city,
        barber.delivery_radius
      order by barber.name`,
    );

    return rows as Barber[];
  }
}

export default new BarberRepository();
