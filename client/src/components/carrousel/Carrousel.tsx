import "./Carrousel.css";
import { FaMapMarkerAlt } from "react-icons/fa";
import type { Barber } from "../../types/barber";

function Carrousel({ barbers }: { barbers: Barber[] }) {
  return (
    <section className="carrousel">
      <div className="carrousel__list">
        {barbers.map((barber) => (
          <article className="carrousel__card" key={barber.id_user}>
            <div className="carrousel__image-wrapper">
              <img
                className="carrousel__image"
                src={barber.avatar_url}
                alt={barber.name}
              />
            </div>

            <div className="carrousel__content">
              <h3 className="carrousel__name">{barber.name}</h3>

              <p className="carrousel__city">
                <FaMapMarkerAlt className="location-icon" />
                {barber.city}
              </p>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}

export default Carrousel;
