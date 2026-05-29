import "./BarberCard.css";
import { FiChevronRight, FiMapPin, FiStar } from "react-icons/fi";
import type { Barber } from "../../../../types/barber";

type BarberCardProps = {
  barber: Barber;
};

function BarberCard({ barber }: BarberCardProps) {
  return (
    <article className="barber-card">
      <img
        src={barber.image}
        alt={barber.name}
        className="barber-card__image"
      />
      <div className="barber-card__content">
        <div className="barber-card__info">
          <h3 className="barber-card__title">{barber.name}</h3>

          <div className="barber-card__rating">
            <FiStar className="barber-card__star" />

            <span>{barber.rating}</span>

            <span>({barber.reviews})</span>
          </div>
          <div className="barber-card__location">
            <FiMapPin />

            <span>{barber.city}</span>
          </div>

          <div className="barber-card__right">
            <span className="barber-card__distance">{barber.distance}</span>

            <FiChevronRight className="barber-card__arrow" />
          </div>
        </div>
      </div>
    </article>
  );
}

export default BarberCard;
