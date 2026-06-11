import "./EditProfileModal.css";
import type { Customer } from "./../../../types/Customer";

type Props = {
  customer: Customer;
  onClose: () => void;
};

function EditProfileModal({ customer, onClose }: Props) {
  return (
    <div className="modal">
      <div className="modal__content">
        <h2 className="modal-content__header">Modifier mon profil</h2>

        <input
          type="text"
          className="modal-content__item"
          defaultValue={customer.firstname}
        />

        <input
          type="text"
          className="modal-content__item"
          defaultValue={customer.lastname}
        />

        <input
          type="email"
          className="modal-content__item"
          defaultValue={customer.email}
        />

        <input
          type="text"
          className="modal-content__item"
          defaultValue={customer.city}
        />

        <div className="modal-actions">
          <button
            type="button"
            className="modal-actions__button"
            onClick={onClose}
          >
            Annuler
          </button>

          <button type="submit" className="modal-actions__button">
            Enregistrer
          </button>
        </div>
      </div>
    </div>
  );
}
export default EditProfileModal;
