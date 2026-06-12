import "./EditProfileModal.css";
import { useState } from "react";
import type { Customer } from "./../../../types/Customer";

type Props = {
  customer: Customer;
  onClose: () => void;
  onSave: (updatedCustomer: {
    firstname: string;
    lastname: string;
    email: string;
    city: string;
  }) => void;
  loadData: () => void;
};
const formatBirthday = (val: string | null | undefined): string | null => {
  if (!val) return null;
  return String(val).substring(0, 10);
};

function EditProfileModal({ customer, onClose, onSave, loadData }: Props) {
  const [firstname, setFirstname] = useState(customer.firstname);
  const [lastname, setLastname] = useState(customer.lastname);
  const [email, setEmail] = useState(customer.email);
  const [city, setCity] = useState(customer.city);
  const [isLoading, setIsLoading] = useState(false);
  const API_URL = import.meta.env.VITE_API_URL;

  const handleSave = async (e: React.FormEvent) => {
    setIsLoading(true);
    e.preventDefault();
    const updatedCustomer = {
      ...customer,
      firstname: firstname,
      lastname: lastname,
      email: email,
      city: city,
      birthday: formatBirthday(customer.birthday),
    };

    try {
      const res = await fetch(`${API_URL}/api/customers/${customer.id_user}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(updatedCustomer),
      });

      if (!res.ok) {
        const errorBody = await res.text();
        console.error("Status:", res.status);
        console.error("Body:", errorBody);
        throw new Error("Erreur lors de la mise à jour");
      }

      onSave(updatedCustomer);
      onClose();
      loadData();
    } catch (err) {
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  const hasChanges =
    firstname !== customer.firstname ||
    lastname !== customer.lastname ||
    email !== customer.email ||
    city !== customer.city;

  return (
    <div className="modal">
      <button
        type="button"
        className="modal__overlay"
        onClick={onClose}
        aria-label="Fermer la modale"
      />
      <div className="modal__content">
        <h2 className="modal-content__header">Modifier mon profil</h2>

        <input
          type="text"
          value={firstname}
          onChange={(e) => setFirstname(e.target.value)}
          className="modal-content__item"
        />

        <input
          type="text"
          value={lastname}
          onChange={(e) => setLastname(e.target.value)}
          className="modal-content__item"
        />

        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="modal-content__item"
        />

        <input
          type="text"
          value={city}
          onChange={(e) => setCity(e.target.value)}
          className="modal-content__item"
        />

        <div className="modal-actions">
          <button
            type="button"
            className="modal-actions__button"
            onClick={onClose}
          >
            Annuler
          </button>

          <button
            type="button"
            disabled={!hasChanges || isLoading}
            onClick={handleSave}
            className="modal-actions__button"
          >
            {isLoading ? "Enregistrement..." : "Enregistrer"}
          </button>
        </div>
      </div>
    </div>
  );
}
export default EditProfileModal;
