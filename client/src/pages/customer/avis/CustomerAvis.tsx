import { useState } from "react";
import { FaRegStar, FaStar, FaStarHalfAlt } from "react-icons/fa";
import { FiMoreVertical } from "react-icons/fi";
import "./customerAvis.css";

type SortOption = "best" | "worst" | "recent" | "oldest";
type Tab = "avis" | "commentaires";

const MOCK_REVIEWS = [
  {
    id: 1,
    name: "Thomas Laurent",
    rating: 5,
    prestation: "Coupe + Barbe",
    comment:
      "Excellent service ! Très professionnel et à l'écoute. Résultat impeccable, je recommande à 100%.",
    date: "12 Mai 2026",
    avatar: "https://i.pravatar.cc/150?img=11",
  },
  {
    id: 2,
    name: "Julien Moreau",
    rating: 5,
    prestation: "Coupe classique",
    comment:
      "Parfait comme toujours, rien à dire ! Je reviendrai sans hésiter.",
    date: "12 Mai 2026",
    avatar: "https://i.pravatar.cc/150?img=12",
  },
  {
    id: 3,
    name: "Antoine Girard",
    rating: 5,
    prestation: "Coloration",
    comment:
      "Très content de ma coloration, résultat au top ! Merci pour les conseils.",
    date: "09 Mai 2026",
    avatar: "https://i.pravatar.cc/150?img=13",
  },
  {
    id: 4,
    name: "Yanis Benali",
    rating: 4.5,
    prestation: "Dégradé + Barbe",
    comment:
      "Très satisfait de ma coupe, le dégradé est parfait. Ambiance agréable et coiffeur sympa.",
    date: "14 Mai 2026",
    avatar: "https://i.pravatar.cc/150?img=14",
  },
  {
    id: 5,
    name: "Karim Belkacem",
    rating: 4,
    prestation: "Soin capillaire",
    comment:
      "Bon accueil et soin de qualité. Juste un peu d'attente mais ça valait le coup.",
    date: "10 Mai 2026",
    avatar: "https://i.pravatar.cc/150?img=15",
  },
];

const DISTRIBUTION = [
  { star: 5, count: 96 },
  { star: 4, count: 24 },
  { star: 3, count: 6 },
  { star: 2, count: 1 },
  { star: 1, count: 1 },
];

const TOTAL = DISTRIBUTION.reduce((sum, d) => sum + d.count, 0);
const AVERAGE = 4.8;

const SORT_OPTIONS: { value: SortOption; label: string }[] = [
  { value: "best", label: "Meilleur au pire" },
  { value: "worst", label: "Pire au meilleur" },
  { value: "recent", label: "Plus récents" },
  { value: "oldest", label: "Plus anciens" },
];

function StarRating({ rating }: { rating: number }) {
  return (
    <span className="customer-avis__stars">
      {[1, 2, 3, 4, 5].map((i) => {
        if (rating >= i)
          return (
            <FaStar
              key={i}
              className="customer-avis__star customer-avis__star--full"
            />
          );
        if (rating >= i - 0.5)
          return (
            <FaStarHalfAlt
              key={i}
              className="customer-avis__star customer-avis__star--full"
            />
          );
        return (
          <FaRegStar
            key={i}
            className="customer-avis__star customer-avis__star--empty"
          />
        );
      })}
    </span>
  );
}

function CustomerAvis() {
  const [activeTab, setActiveTab] = useState<Tab>("avis");
  const [sort, setSort] = useState<SortOption>("best");
  const [sortOpen, setSortOpen] = useState(false);

  const sortedReviews = [...MOCK_REVIEWS].sort((a, b) => {
    if (sort === "best") return b.rating - a.rating;
    if (sort === "worst") return a.rating - b.rating;
    if (sort === "recent") return b.id - a.id;
    return a.id - b.id;
  });

  return (
    <div className="customer-avis">
      {/* Tabs */}
      <div className="customer-avis__tabs">
        <button
          type="button"
          className={`customer-avis__tab ${activeTab === "avis" ? "customer-avis__tab--active" : ""}`}
          onClick={() => setActiveTab("avis")}
        >
          Tous les avis
        </button>
        <button
          type="button"
          className={`customer-avis__tab ${activeTab === "commentaires" ? "customer-avis__tab--active" : ""}`}
          onClick={() => setActiveTab("commentaires")}
        >
          Commentaires
        </button>
      </div>

      {/* Note moyenne */}
      <div className="customer-avis__summary">
        <div className="customer-avis__average">
          <p className="customer-avis__average-label">Note moyenne</p>
          <p className="customer-avis__average-score">{AVERAGE}</p>
          <StarRating rating={AVERAGE} />
          <p className="customer-avis__average-total">Basée sur {TOTAL} avis</p>
        </div>
        <div className="customer-avis__distribution">
          {DISTRIBUTION.map((d) => (
            <div key={d.star} className="customer-avis__bar-row">
              <span className="customer-avis__bar-star">
                {d.star}{" "}
                <FaStar className="customer-avis__star customer-avis__star--full" />
              </span>
              <div className="customer-avis__bar-track">
                <div
                  className="customer-avis__bar-fill"
                  style={{ width: `${(d.count / TOTAL) * 100}%` }}
                />
              </div>
              <span className="customer-avis__bar-count">{d.count}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Tri */}
      <div className="customer-avis__recent-header">
        <h2 className="customer-avis__recent-title">Avis récents</h2>
        <div className="customer-avis__sort">
          <span className="customer-avis__sort-label">Trier par</span>
          <div className="customer-avis__sort-wrapper">
            <button
              type="button"
              className="customer-avis__sort-btn"
              onClick={() => setSortOpen((v) => !v)}
            >
              {SORT_OPTIONS.find((o) => o.value === sort)?.label}
              <span className="customer-avis__sort-arrow">⌄</span>
            </button>
            {sortOpen && (
              <ul className="customer-avis__sort-dropdown">
                {SORT_OPTIONS.map((o) => (
                  <li key={o.value}>
                    <button
                      type="button"
                      className={`customer-avis__sort-option ${sort === o.value ? "customer-avis__sort-option--active" : ""}`}
                      onClick={() => {
                        setSort(o.value);
                        setSortOpen(false);
                      }}
                    >
                      {o.label}
                      {sort === o.value && <span>✓</span>}
                    </button>
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>
      </div>

      {/* Liste des avis */}
      <ul className="customer-avis__list">
        {sortedReviews.map((review) => (
          <li key={review.id} className="customer-avis__item">
            <img
              src={review.avatar}
              alt={review.name}
              className="customer-avis__avatar"
            />
            <div className="customer-avis__content">
              <div className="customer-avis__item-header">
                <div>
                  <p className="customer-avis__name">{review.name}</p>
                  <div className="customer-avis__rating-row">
                    <StarRating rating={review.rating} />
                    <span className="customer-avis__rating-value">
                      {review.rating}
                    </span>
                  </div>
                  <p className="customer-avis__prestation">
                    {review.prestation}
                  </p>
                </div>
                <div className="customer-avis__meta">
                  <span className="customer-avis__date">{review.date}</span>
                  <button type="button" className="customer-avis__menu-btn">
                    <FiMoreVertical size={18} />
                  </button>
                </div>
              </div>
              <p className="customer-avis__comment">{review.comment}</p>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default CustomerAvis;
