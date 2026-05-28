import "./Carrousel.css";
import { FaMapMarkerAlt } from "react-icons/fa";
import { MdOutlineStar } from "react-icons/md";

type Barber = {
  id: number;
  name: string;
  rating: string;
  reviews: number;
  city: string;
  image: string;
};

const barbers: Barber[] = [
  {
    id: 1,
    name: "Fad’Luxe",
    rating: "4,8",
    reviews: 120,
    city: "Lyon",
    image: "/src/assets/images/Afro.jpg",
  },
  {
    id: 2,
    name: "Le Barbier ",
    rating: "4,6",
    reviews: 98,
    city: "Nogent",
    image: "/src/assets/images/Barbe.jpg",
  },
  {
    id: 3,
    name: "Hair Icon",
    rating: "4,5",
    reviews: 76,
    city: "Paris",
    image: "/src/assets/images/coiffeforall.jpg",
  },
  {
    id: 4,
    name: "The Cut Lab",
    rating: "4,7",
    reviews: 55,
    city: "Chelle",
    image: "/src/assets/images/espacecoiffeur.jpg",
  },
];

function Carrousel() {
  return (
    <section className="carrousel">
      <div className="carrousel__list">
        {barbers.map((barber) => (
          <article className="carrousel__card" key={barber.id}>
            <div className="carrousel__image-wrapper">
              <img
                className="carrousel__image"
                src={barber.image}
                alt={barber.name}
              />
            </div>

            <div className="carrousel__content">
              <h3 className="carrousel__name">{barber.name}</h3>

              <p className="carrousel__rating">
                <MdOutlineStar className="star-icon" />
                {barber.rating} ({barber.reviews})
              </p>

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
