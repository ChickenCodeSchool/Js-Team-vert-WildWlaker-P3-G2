import type React from "react";
import { useEffect, useState } from "react";
import {
  FiAlertTriangle,
  FiCalendar,
  FiCamera,
  FiEye,
  FiMessageSquare,
  FiPause,
  FiPlay,
  FiTrash2,
  FiX,
} from "react-icons/fi";

import type { Customer } from "../../../types/Customer";

import "./EditUserModal.css";

interface EditUserModalProps {
  isOpen: boolean;
  onClose: () => void;
  customer: (Customer & { id: number }) | null;
  onSave: (updatedData: Customer & { id: number }) => void;
  onToggleSuspend: (customer: Customer & { id: number }) => Promise<void>;
}

function EditUserModal({
  isOpen,
  onClose,
  customer,
  onSave,
  onToggleSuspend,
}: EditUserModalProps) {
  const [formData, setFormData] = useState({
    firstname: "",
    lastname: "",
    email: "",
    phone: "Non renseigné",
    create_time: "",
    city: "",
    postal_code: "",
    genre: "Homme",
    adress: "",
    status: "Actif",
    annotations: "",
    birthday: "",
  });

  useEffect(() => {
    if (customer) {
      setFormData({
        firstname: customer.firstname || "",
        lastname: customer.lastname || "",
        email: customer.email || "",
        phone: customer.phone || "Non renseigné",
        create_time: customer.create_time
          ? customer.create_time.split("T")[0]
          : "",
        city: customer.city || "",
        postal_code: customer.postal_code || "",
        genre: customer.genre || "Homme",
        status: customer.status || "Actif",
        annotations: customer.annotations || "",
        adress: customer.adress || "",
        birthday: customer.birthday ? customer.birthday.split("T")[0] : "",
      });
    }
  }, [customer]);

  if (!isOpen || !customer) return null;

  const isSuspended = formData.status?.toLowerCase() === "suspendu";

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >,
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave({
      ...customer,
      ...formData,
    });
  };

  return (
    <div className="editUserModal-modal-overlay">
      <div className="modal-container">
        <div className="modal-header">
          <div>
            <h2>Modifier l'utilisateur</h2>
            <p>Modifiez les informations de l'utilisateur ci-dessous.</p>
          </div>
          <button
            type="button"
            className="close-btn"
            onClick={onClose}
            aria-label="Fermer"
          >
            <FiX size={20} />
          </button>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="modal-body">
            <div className="modal-grid-top">
              <div className="avatar-section">
                <div className="avatar-wrapper">
                  <img
                    src={customer.avatar_url}
                    alt="Avatar de l'utilisateur"
                  />
                  <div className="camera-icon">
                    <FiCamera size={14} />
                  </div>
                </div>
                <button type="button" className="change-photo-btn">
                  Modifier la photo
                </button>
              </div>

              <div className="form-fields-top">
                <div className="form-group">
                  <label htmlFor="fullname">Nom complet</label>
                  <input
                    id="fullname"
                    type="text"
                    value={`${formData.firstname} ${formData.lastname}`}
                    disabled
                    className="disabled-input"
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="email">Email *</label>
                  <input
                    id="email"
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="phone">Téléphone *</label>
                  <div className="phone-input-container">
                    <span
                      className="flag-icon"
                      role="img"
                      aria-label="Drapeau Français"
                    ></span>
                    <input
                      id="phone"
                      type="text"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      required
                    />
                  </div>
                </div>

                <div className="form-group">
                  <label htmlFor="create_time">Date d'inscription</label>
                  <input
                    id="create_time"
                    type="date"
                    name="create_time"
                    value={formData.create_time}
                    onChange={handleChange}
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="city">Ville *</label>
                  <input
                    id="city"
                    type="text"
                    name="city"
                    value={formData.city}
                    onChange={handleChange}
                    placeholder="Ex: Paris"
                    required
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="status">Statut du compte *</label>
                  <select
                    id="status"
                    name="status"
                    value={formData.status}
                    onChange={handleChange}
                    required
                  >
                    <option value="Actif">🟢 Actif</option>
                    <option value="Suspendu">🟠 Suspendu</option>
                  </select>
                </div>
              </div>
            </div>

            <hr className="modal-divider" />

            <h3 className="section-title">Informations supplémentaires</h3>
            <div className="modal-grid-middle">
              <div className="form-group">
                <label htmlFor="birthday">Date de naissance</label>
                <input
                  id="birthday"
                  type="date"
                  name="birthday"
                  value={formData.birthday}
                  onChange={handleChange}
                />
              </div>

              <div className="form-group">
                <label htmlFor="genre">Genre</label>
                <select
                  id="genre"
                  name="genre"
                  value={formData.genre}
                  onChange={handleChange}
                >
                  <option value="Homme">Homme</option>
                  <option value="Femme">Femme</option>
                  <option value="Autre">Autre</option>
                </select>
              </div>

              <div className="form-group">
                <label htmlFor="postal_code">Code postal</label>
                <input
                  id="postal_code"
                  type="text"
                  name="postal_code"
                  value={formData.postal_code}
                  onChange={handleChange}
                  placeholder="Ex: 75001"
                />
              </div>

              <div className="form-group full-width">
                <label htmlFor="adress">Adresse</label>
                <input
                  id="adress"
                  type="text"
                  name="adress"
                  value={formData.adress}
                  onChange={handleChange}
                />
              </div>

              <div className="form-group full-width">
                <label htmlFor="annotations">Annotations / Notes privées</label>
                <textarea
                  id="annotations"
                  name="annotations"
                  value={formData.annotations}
                  onChange={handleChange}
                  placeholder="Ajouter des détails importants sur l'utilisateur (préférences, comportement...)"
                  rows={3}
                  style={{ resize: "vertical" }}
                />
              </div>
            </div>

            <hr className="modal-divider" />

            <h3 className="section-title">Actions rapides</h3>
            <div className="quick-actions-grid">
              <button type="button" className="action-btn">
                <FiEye /> Voir le profil public
              </button>
              <button type="button" className="action-btn">
                <FiCalendar /> Voir toutes les réservations
              </button>
              <button type="button" className="action-btn">
                <FiMessageSquare /> Voir les avis laissés
              </button>
              <button type="button" className="action-btn">
                <FiAlertTriangle /> Voir les signalements
              </button>

              <button
                type="button"
                className={`action-btn ${isSuspended ? "active-btn" : "suspend-btn"}`}
                onClick={async () => {
                  if (customer) {
                    await onToggleSuspend(customer);
                    onClose();
                  }
                }}
              >
                {isSuspended ? (
                  <>
                    <FiPlay /> Réactiver le compte
                  </>
                ) : (
                  <>
                    <FiPause /> Suspendre le compte
                  </>
                )}
              </button>

              <button type="button" className="action-btn delete-btn">
                <FiTrash2 /> Supprimer le compte
              </button>
            </div>
          </div>

          <div className="modal-footer">
            <button type="button" className="cancel-btn" onClick={onClose}>
              Annuler
            </button>
            <button type="submit" className="save-btn">
              Enregistrer les modifications
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default EditUserModal;
