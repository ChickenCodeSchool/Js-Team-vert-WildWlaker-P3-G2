import { useState } from "react";
import { FaStar } from "react-icons/fa";
import { FiCalendar, FiPlus, FiX } from "react-icons/fi";
import { useParams } from "react-router";
import "./giveAvis.css";

const RATING_LABELS: Record<number, string> = {
  1: "Mauvais",
  2: "Passable",
  3: "Bien",
  4: "Très bien",
  5: "Excellent",
};

function GiveAvis() {
  const { appointmentId } = useParams();
  const [rating, setRating] = useState(0);
  const [hovered, setHovered] = useState(0);
  const [comment, setComment] = useState("");
  const [photos, setPhotos] = useState<string[]>([]);
  const [publishWithName, setPublishWithName] = useState(true);

  const activeRating = hovered || rating;

  function handlePhotoAdd(e: React.ChangeEvent<HTMLInputElement>) {
    const files = e.target.files;
    if (!files) return;
    const urls = Array.from(files).map((f) => URL.createObjectURL(f));
    setPhotos((prev) => [...prev, ...urls]);
  }

  function handlePhotoRemove(index: number) {
    setPhotos((prev) => prev.filter((_, i) => i !== index));
  }

  return (
    <div className="give-avis">
      {/* Header */}
      <div className="give-avis__header">
        <h1 className="give-avis__title">Donnez votre avis</h1>
      </div>

      <p className="give-avis__subtitle">
        Votre opinion compte ! Partagez votre expérience avec les autres
        clients.
      </p>

      {/* Barber card */}
      <div className="give-avis__barber-card">
        <img
          src="/default-avatar.png"
          alt="Barbier"
          className="give-avis__barber-avatar"
        />
        <div className="give-avis__barber-info">
          <p className="give-avis__barber-name">Rendez-vous #{appointmentId}</p>
          <p className="give-avis__barber-prestation">Coupe homme</p>
          <p className="give-avis__barber-date">
            <FiCalendar size={13} />
            12 mai 2025 à 14:00
          </p>
        </div>
      </div>

      {/* Star rating */}
      <div className="give-avis__rating-section">
        <p className="give-avis__rating-label">Votre note</p>
        <div className="give-avis__stars">
          {[1, 2, 3, 4, 5].map((i) => (
            <button
              key={i}
              type="button"
              className="give-avis__star-btn"
              onMouseEnter={() => setHovered(i)}
              onMouseLeave={() => setHovered(0)}
              onClick={() => setRating(i)}
            >
              <FaStar
                size={36}
                className={
                  i <= activeRating
                    ? "give-avis__star--active"
                    : "give-avis__star--empty"
                }
              />
            </button>
          ))}
        </div>
        {activeRating > 0 && (
          <p className="give-avis__rating-value">
            {activeRating}.0 — {RATING_LABELS[activeRating]}
          </p>
        )}
      </div>

      {/* Comment */}
      <div className="give-avis__comment-section">
        <label htmlFor="comment" className="give-avis__label">
          Votre avis
        </label>
        <textarea
          id="comment"
          className="give-avis__textarea"
          placeholder="Décrivez votre expérience..."
          maxLength={500}
          value={comment}
          onChange={(e) => setComment(e.target.value)}
        />
        <span className="give-avis__counter">{comment.length}/500</span>
      </div>

      {/* Photos */}
      <div className="give-avis__photos-section">
        <p className="give-avis__label">Ajouter des photos</p>
        <div className="give-avis__photos-grid">
          {photos.map((url, i) => (
            <div key={url} className="give-avis__photo-wrapper">
              <img
                src={url}
                alt={`Aperçu ${i + 1}`}
                className="give-avis__photo"
              />
              <button
                type="button"
                className="give-avis__photo-remove"
                onClick={() => handlePhotoRemove(i)}
              >
                <FiX size={12} />
              </button>
            </div>
          ))}
          <label className="give-avis__photo-add">
            <FiPlus size={20} className="give-avis__photo-add-icon" />
            <span>Ajouter</span>
            <input
              type="file"
              accept="image/*"
              multiple
              hidden
              onChange={handlePhotoAdd}
            />
          </label>
        </div>
      </div>

      {/* Toggle */}
      <div className="give-avis__toggle-row">
        <div className="give-avis__toggle-info">
          <p className="give-avis__toggle-label">
            Publier mon avis avec mon prénom
          </p>
          <p className="give-avis__toggle-name">Thomas L.</p>
        </div>
        <button
          type="button"
          role="switch"
          aria-checked={publishWithName}
          className={`give-avis__toggle ${publishWithName ? "give-avis__toggle--on" : ""}`}
          aria-label="Publier mon avis avec mon prénom"
          onClick={() => setPublishWithName((v) => !v)}
        >
          <span className="give-avis__toggle-thumb" />
        </button>
      </div>

      {/* Info */}
      <p className="give-avis__info">
        Votre avis sera visible publiquement après modération.
      </p>

      {/* Submit */}
      <button
        type="button"
        className="give-avis__submit"
        disabled={rating === 0}
      >
        Publier mon avis
      </button>
    </div>
  );
}

export default GiveAvis;
