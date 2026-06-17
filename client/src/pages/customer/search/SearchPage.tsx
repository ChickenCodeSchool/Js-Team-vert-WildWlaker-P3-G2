import { useEffect, useState } from "react";
import { CiMapPin } from "react-icons/ci";
import { FiChevronLeft } from "react-icons/fi";
import { useNavigate } from "react-router";
import BarberCard from "../../../components/customer/BarberCard/BarberCard";
import Search from "../../../components/search/Search";
import type { Barber } from "../../../types/barber";
import "./SearchPage.css";

function SearchPage() {
  const navigate = useNavigate();
  const [barbers, setBarbers] = useState<Barber[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [filteredBarbers, setFilteredBarbers] = useState<Barber[]>([]);
  const [isNearMeActive, setIsNearMeActive] = useState(false);
  const API_URL = import.meta.env.VITE_API_URL;
  const handleNearMe = () => {
    navigator.geolocation.getCurrentPosition(
      async (position) => {
        // succès

        const { latitude, longitude } = position.coords;
        const response = await fetch(
          `https://nominatim.openstreetmap.org/reverse?lat=${latitude}&lon=${longitude}&format=json`,
        );
        const data = await response.json();
        const city = data.address.city;

        const nearbyBarbers = barbers.filter(
          (barber) => barber.city.toLowerCase() === city.toLowerCase(),
        );

        setFilteredBarbers(nearbyBarbers);
        setIsNearMeActive(true);
      },
      (error) => {
        console.error(error);
        alert("Impossible d'obtenir votre position.");
      },
    );
  };

  useEffect(() => {
    fetch(`${API_URL}/api/barbers`)
      .then((response) => {
        if (!response.ok) {
          throw new Error("Erreur lors du chargement des coiffeurs");
        }

        return response.json();
      })
      .then((data: Barber[]) => {
        setBarbers(data);
      })
      .catch(() => {
        setError("Impossible de charger les coiffeurs pour le moment.");
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, []);

  return (
    <main className="search">
      <label className="search-near__toggle">
        <input
          type="checkbox"
          checked={isNearMeActive}
          onChange={(e) => {
            const checked = e.target.checked;

            setIsNearMeActive(checked);

            if (checked) {
              handleNearMe();
            } else {
              setFilteredBarbers([]);
            }
          }}
        />

        <span className="search-near__slider" />
        <CiMapPin className="search-near__icon" />

        <span className="search-near__text">Près de chez moi</span>
      </label>

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

      {isNearMeActive && filteredBarbers.length === 0 && (
        <p className="search__empty">Aucun barber trouvé dans votre ville.</p>
      )}

      {!isLoading &&
        error == null &&
        (isNearMeActive ? filteredBarbers : barbers).map((barber) => (
          <BarberCard
            key={barber.id_user}
            barber={barber}
            onProfileClick={(selectedBarber) =>
              navigate("/booking", {
                state: {
                  barber: selectedBarber,
                },
              })
            }
          />
        ))}
    </main>
  );
}

export default SearchPage;
