import { useEffect, useState } from "react";
import { FiChevronLeft } from "react-icons/fi";
import { useNavigate } from "react-router";
import BarberCard from "../../../components/customer/Services/BarberCard/BarberCard";
import Search from "../../../components/search/Search";
import type { Barber } from "../../../types/barber";
import "./SearchPage.css";

function SearchPage() {
  const navigate = useNavigate();
  const [barbers, setBarbers] = useState<Barber[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const API_URL = import.meta.env.VITE_API_URL;
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

      {isLoading && <p>Chargement...</p>}

      {error != null && <p>{error}</p>}

      {!isLoading &&
        error == null &&
        barbers.map((barber) => (
          <BarberCard key={barber.id_user} barber={barber} />
        ))}
    </main>
  );
}

export default SearchPage;
