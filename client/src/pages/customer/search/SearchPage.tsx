import "./SearchPage.css";
import { FiChevronLeft } from "react-icons/fi";
import { useNavigate } from "react-router";
import BarberCard from "../../../components/customer/Services/BarberCard/BarberCard";
import Search from "../../../components/search/Search";

function SearchPage() {
  const barbers = [
    {
      id: 1,
      name: "The Barber Shop",
      rating: 4.8,
      reviews: 156,
      city: "75002 Paris",
      distance: "1,2 km",
      image: "/src/assets/images/Afro.jpg",
    },

    {
      id: 2,
      name: "Le Barbier Paris",
      rating: 4.5,
      reviews: 84,
      city: "75011 Paris",
      distance: "1,6 km",
      image: "/src/assets/images/coiffeforall.jpg",
    },
    {
      id: 3,
      name: "La maison Barber",
      rating: 4.7,
      reviews: 70,
      city: "75017 Paris",
      distance: "2,1 km",
      image: "/src/assets/images/Barbe.jpg",
    },
  ];

  const navigate = useNavigate();

  return (
    <main className="search">
      <div className="search__header">
        <button
          type="button"
          className="search-back__button"
          onClick={() => navigate(-1)}
        >
          <FiChevronLeft />
        </button>
        <h2 className="search-page__title">Rechercher</h2>

        <div className="search__spacer" />
      </div>

      <div className="search__bar">
        <Search />
      </div>
      {barbers.map((barber) => (
        <BarberCard key={barber.id} barber={barber} />
      ))}
    </main>
  );
}

export default SearchPage;
