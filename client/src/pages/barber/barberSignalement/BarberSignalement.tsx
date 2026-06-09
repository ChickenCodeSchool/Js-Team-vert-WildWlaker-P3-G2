import { useState } from "react";
import "./barberSignalement.css";

const REPORT_TYPES = [
  {
    id: "comportement",
    label: "Comportement inapproprié",
    description: "Insultes, harcèlement, menace...",
    icon: "⚠️",
    disabled: false,
  },
  {
    id: "non-presentation",
    label: "Non-présentation",
    description: "Client ne s'est pas présenté sans prévenir",
    icon: "📅",
    disabled: false,
  },
  {
    id: "paiement",
    label: "Problème de paiement",
    description: "Paiement refusé, fausse information...",
    icon: "💳",
    disabled: true,
  },
  {
    id: "message",
    label: "Message inapproprié",
    description: "Contenu offensant ou déplacé",
    icon: "💬",
    disabled: true,
  },
  {
    id: "avis",
    label: "Avis abusif",
    description: "Avis injustifié ou malveillant",
    icon: "⭐",
    disabled: false,
  },
  {
    id: "autre",
    label: "Autre",
    description: "Autre raison",
    icon: "•••",
    disabled: false,
  },
];

function BarberSignalement() {
  const [target, setTarget] = useState<"client" | "salon">("client");
  const [reportType, setReportType] = useState("");
  const [description, setDescription] = useState("");

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
  }

  return (
    <div className="barber-signalement">
      <p className="barber-signalement__subtitle">
        Signalez un problème ou un comportement inapproprié.
        <br />
        Votre signalement est confidentiel.
      </p>

      <section className="barber-signalement__section">
        <h2 className="barber-signalement__section-title">
          Qui souhaitez-vous signaler ?
        </h2>
        <div className="barber-signalement__target-grid">
          <button
            type="button"
            className={`barber-signalement__target-card ${target === "client" ? "barber-signalement__target-card--selected" : ""}`}
            onClick={() => setTarget("client")}
          >
            <span className="barber-signalement__target-icon">👤</span>
            <div>
              <p className="barber-signalement__target-label">Un client</p>
              <p className="barber-signalement__target-desc">
                Signalement concernant un client
              </p>
            </div>
            <span className="barber-signalement__radio" />
          </button>
          <button
            type="button"
            className={`barber-signalement__target-card ${target === "salon" ? "barber-signalement__target-card--selected" : ""}`}
            onClick={() => setTarget("salon")}
          >
            <span className="barber-signalement__target-icon">🏪</span>
            <div>
              <p className="barber-signalement__target-label">Un salon</p>
              <p className="barber-signalement__target-desc">
                Signalement concernant un salon
              </p>
            </div>
            <span className="barber-signalement__radio" />
          </button>
        </div>
      </section>

      <section className="barber-signalement__section">
        <h2 className="barber-signalement__section-title">
          Type de signalement
        </h2>
        <div className="barber-signalement__type-grid">
          {REPORT_TYPES.map((type) => (
            <button
              key={type.id}
              type="button"
              disabled={type.disabled}
              className={`barber-signalement__type-card ${type.disabled ? "barber-signalement__type-card--disabled" : ""} ${reportType === type.id ? "barber-signalement__type-card--selected" : ""}`}
              onClick={() => !type.disabled && setReportType(type.id)}
            >
              <span className="barber-signalement__type-icon">{type.icon}</span>
              <div className="barber-signalement__type-content">
                <p className="barber-signalement__type-label">{type.label}</p>
                <p className="barber-signalement__type-desc">
                  {type.description}
                </p>
              </div>
              <span className="barber-signalement__radio" />
            </button>
          ))}
        </div>
      </section>

      <form className="barber-signalement__form" onSubmit={handleSubmit}>
        <section className="barber-signalement__section">
          <h2 className="barber-signalement__section-title">Description</h2>
          <div className="barber-signalement__textarea-wrapper">
            <textarea
              className="barber-signalement__textarea"
              placeholder="Décrivez le problème en détail..."
              maxLength={500}
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
            <span className="barber-signalement__char-count">
              {description.length}/500
            </span>
          </div>
        </section>

        <section className="barber-signalement__section">
          <h2 className="barber-signalement__section-title">
            Preuves (optionnel)
          </h2>
          <p className="barber-signalement__proof-subtitle">
            Ajoutez des captures d'écran, photos ou documents utiles.
          </p>
          <label className="barber-signalement__file-upload">
            <span className="barber-signalement__file-icon">⬆️</span>
            <div>
              <p className="barber-signalement__file-label">
                Ajouter des fichiers
              </p>
              <p className="barber-signalement__file-desc">
                Formats : JPG, PNG, PDF (Max. 5 Mo)
              </p>
            </div>
            <span className="barber-signalement__file-arrow">›</span>
            <input type="file" accept=".jpg,.jpeg,.png,.pdf" hidden />
          </label>
        </section>

        <button type="submit" className="barber-signalement__submit-btn">
          ✉️ Envoyer le signalement
        </button>
        <p className="barber-signalement__footer">
          🔒 Vos informations sont sécurisées et confidentielles.
        </p>
      </form>
    </div>
  );
}

export default BarberSignalement;
