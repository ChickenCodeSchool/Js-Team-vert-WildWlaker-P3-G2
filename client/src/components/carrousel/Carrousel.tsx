import "./Carrousel.css";
import { FaMapMarkerAlt } from "react-icons/fa";
import type { Barber } from "../../types/barber";

type CarrouselProps = {
  barbers: Barber[];
  selectedBarber?: Barber;
  onSelectBarber?: (barber: Barber) => void;
};

function Carrousel({
  barbers,
  selectedBarber,
  onSelectBarber,
}: CarrouselProps) {
  return (
    <section className="carrousel">
      <div className="carrousel__list">
        {barbers.slice(3, 14).map((barber) => (
          <button
            type="button"
            key={barber.id_user}
            className={`carrousel__card ${selectedBarber?.id_user === barber.id_user
                ? "carrousel__card--selected"
                : ""
              }`}
            onClick={() => onSelectBarber?.(barber)}
          >
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
          </button>
        ))}
      </div>
    </section>
  );
}

export default Carrousel;