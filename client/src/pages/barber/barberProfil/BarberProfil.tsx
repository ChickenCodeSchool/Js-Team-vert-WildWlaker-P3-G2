import { useEffect, useRef, useState } from "react";
import {
  FiCamera,
  FiDownload,
  FiImage,
  FiMenu,
  FiPlus,
  FiTrash2,
  FiUser,
} from "react-icons/fi";
import AfroImg from "../../../assets/images/Afro.jpg";
import type { Barber } from "../../../types/barber";
import "./BarberProfil.css";

type Photo = { id: number; src: string };

const INITIAL_PHOTOS: Photo[] = [
  { id: 1, src: AfroImg },
  { id: 2, src: AfroImg },
  { id: 3, src: AfroImg },
  { id: 4, src: AfroImg },
  { id: 5, src: AfroImg },
  { id: 6, src: AfroImg },
  { id: 7, src: AfroImg },
  { id: 8, src: AfroImg },
  { id: 9, src: AfroImg },
  { id: 10, src: AfroImg },
  { id: 11, src: AfroImg },
  { id: 12, src: AfroImg },
];

const API_URL = import.meta.env.VITE_API_URL;

// On récupère et décode proprement le "user" de Giogi tout en haut
const userString = localStorage.getItem("user");
const loggedUser = userString ? JSON.parse(userString) : null;
const BARBER_ID = loggedUser?.id ? Number(loggedUser.id) : 4;

function BarberProfil() {
  const [activeTab, setActiveTab] = useState("informations");
  const [photos, setPhotos] = useState<Photo[]>(INITIAL_PHOTOS);
  const [deleteMode, setDeleteMode] = useState(false);
  const [selectedIds, setSelectedIds] = useState<number[]>([]);

  // États pour stocker le barbier dynamique et gérer le chargement
  const [barberData, setBarberData] = useState<Barber | null>(null);
  const [loading, setLoading] = useState(true);

  const [currentAvatar, setCurrentAvatar] = useState(AfroImg);
  const [uploading, setUploading] = useState(false);
  const [uploadError, setUploadError] = useState("");

  const fileInputRef = useRef<HTMLInputElement>(null);
  const avatarInputRef = useRef<HTMLInputElement>(null);

  // Fetch automatique au montage avec le bon BARBER_ID
  useEffect(() => {
    const fetchBarberProfile = async () => {
      try {
        const res = await fetch(`${API_URL}/api/barbers/${BARBER_ID}`);
        if (!res.ok) throw new Error("Impossible de charger le profil");
        const data = (await res.json()) as Barber;
        setBarberData(data);

        if (data.avatar_url) {
          setCurrentAvatar(`${API_URL}${data.avatar_url}`);
        }
      } catch (err) {
        console.error("Erreur lors de la récupération des données :", err);
      } finally {
        setLoading(false);
      }
    };

    fetchBarberProfile();
  }, []);

  const handleAvatarUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const formData = new FormData();
    formData.append("avatar", file);

    setUploading(true);
    setUploadError("");

    try {
      const res = await fetch(`${API_URL}/api/barbers/${BARBER_ID}/avatar`, {
        method: "POST",
        body: formData,
      });
      if (!res.ok) throw new Error("Échec de l'upload");
      const data = (await res.json()) as { avatar_url: string };
      setCurrentAvatar(`${API_URL}${data.avatar_url}`);
    } catch {
      setUploadError("Erreur lors de l'upload de la photo.");
    } finally {
      setUploading(false);
      e.target.value = "";
    }
  };

  const handleAddPhoto = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files) return;
    const newPhotos: Photo[] = Array.from(files).map((file, i) => ({
      id: Date.now() + i,
      src: URL.createObjectURL(file),
    }));
    setPhotos((prev) => [...prev, ...newPhotos]);
    e.target.value = "";
  };

  const toggleSelect = (id: number) => {
    setSelectedIds((prev) =>
      prev.includes(id) ? prev.filter((s) => s !== id) : [...prev, id],
    );
  };

  const handleDeleteConfirm = () => {
    setPhotos((prev) => prev.filter((p) => !selectedIds.includes(p.id)));
    setSelectedIds([]);
    setDeleteMode(false);
  };

  if (loading) {
    return <div className="barber-profil__loading">Chargement du profil…</div>;
  }

  return (
    <div className="barber-profil">
      <div className="barber-profil__header">
        <FiMenu className="barber-profil__menu-icon" />
        <h2 className="barber-profil__title">Mon profil</h2>
      </div>

      <div className="barber-profil__tabs">
        <button
          type="button"
          className={`barber-profil__tab ${activeTab === "informations" ? "barber-profil__tab--active" : ""}`}
          onClick={() => setActiveTab("informations")}
        >
          <FiUser className="barber-profil__tab-icon" />
          Informations
        </button>

        <button
          type="button"
          className={`barber-profil__tab ${activeTab === "galerie" ? "barber-profil__tab--active" : ""}`}
          onClick={() => setActiveTab("galerie")}
        >
          <FiImage className="barber-profil__tab-icon" />
          Galerie
        </button>
      </div>

      {activeTab === "informations" && (
        <div className="barber-profil__content">
          <p className="barber-profil__photo-label">Photo de profil</p>

          <div className="barber-profil__avatar-wrapper">
            <img
              className="barber-profil__avatar"
              src={currentAvatar}
              alt="Avatar du coiffeur"
            />
            <button
              type="button"
              className="barber-profil__avatar-overlay"
              onClick={() => avatarInputRef.current?.click()}
              aria-label="Changer la photo de profil"
            >
              <FiCamera className="barber-profil__camera-icon" />
            </button>
          </div>

          <input
            ref={avatarInputRef}
            type="file"
            accept="image/jpeg,image/png,image/webp"
            className="barber-profil__file-input"
            onChange={handleAvatarUpload}
          />

          <button
            type="button"
            className="barber-profil__change-photo"
            onClick={() => avatarInputRef.current?.click()}
            disabled={uploading}
          >
            <FiDownload className="barber-profil__download-icon" />
            {uploading ? "Envoi en cours…" : "Changer la photo"}
          </button>
          {uploadError && (
            <span className="barber-profil__upload-error">{uploadError}</span>
          )}
          <span className="barber-profil__photo-hint">
            JPG, PNG ou WEBP. Max 5 Mo.
          </span>

          <h3 className="barber-profil__section-title">
            Informations personnelles
          </h3>

          <div className="barber-profil__infos">
            <div className="barber-profil__info-row">
              <span className="barber-profil__info-label">Nom complet</span>
              <span className="barber-profil__info-value">
                {barberData?.name || "Non renseigné"}
              </span>
            </div>
            <div className="barber-profil__info-row">
              <span className="barber-profil__info-label">Téléphone</span>
              <span className="barber-profil__info-value">
                {barberData?.phone || "Non renseigné"}
              </span>
            </div>
            <div className="barber-profil__info-row">
              <span className="barber-profil__info-label">Email</span>
              <span className="barber-profil__info-value">
                {barberData?.email || "Non renseigné"}
              </span>
            </div>
            <div className="barber-profil__info-row">
              <span className="barber-profil__info-label">
                Date de naissance
              </span>
              <span className="barber-profil__info-value">
                {barberData?.birthday
                  ? new Date(barberData.birthday).toLocaleDateString("fr-FR")
                  : "Non renseignée"}
              </span>
            </div>
          </div>

          <button type="button" className="barber-profil__save-btn">
            Enregistrer les modifications
          </button>
        </div>
      )}

      {activeTab === "galerie" && (
        <div className="barber-profil__galerie">
          <div className="barber-profil__grid">
            {photos.map((photo) => (
              <button
                key={photo.id}
                type="button"
                className={`barber-profil__grid-item-wrapper ${selectedIds.includes(photo.id) ? "barber-profil__grid-item-wrapper--selected" : ""}`}
                onClick={() => deleteMode && toggleSelect(photo.id)}
              >
                <img
                  src={photo.src}
                  alt={`Réalisation ${photo.id}`}
                  className="barber-profil__grid-item"
                />
              </button>
            ))}
          </div>

          <div className="barber-profil__galerie-actions">
            <button
              type="button"
              className="barber-profil__add-btn"
              onClick={() => fileInputRef.current?.click()}
            >
              <FiPlus /> Ajouter une photo
            </button>
            <input
              ref={fileInputRef}
              type="file"
              accept="image/jpeg,image/png,image/webp"
              multiple
              className="barber-profil__file-input"
              onChange={handleAddPhoto}
            />
            {deleteMode ? (
              <button
                type="button"
                className="barber-profil__delete-btn barber-profil__delete-btn--confirm"
                onClick={handleDeleteConfirm}
              >
                <FiTrash2 /> Confirmer ({selectedIds.length})
              </button>
            ) : (
              <button
                type="button"
                className="barber-profil__delete-btn"
                onClick={() => setDeleteMode(true)}
              >
                <FiTrash2 /> Supprimer des photos
              </button>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

export default BarberProfil;
