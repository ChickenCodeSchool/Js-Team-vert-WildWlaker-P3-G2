import { FiChevronLeft, FiEdit2 } from "react-icons/fi";
import type { Customer } from "./../../../types/Customer";
import "./ProfileHeader.css";

type Props = {
  customer: Customer;
  onEdit: () => void;
};

function ProfileHeader({ customer, onEdit }: Props) {
  return (
    <section className="profile-header">
      <FiChevronLeft />
      <button
        type="button"
        className="profile-page__edit-button"
        onClick={onEdit}
      >
        <FiEdit2 />
      </button>
      <h1 className="profile-header__title">Profil d'utilisateur</h1>
      <img
        src={customer.avatar_url}
        alt={`Avatar de ${customer.email}`}
        className="profile-header__avatar"
      />

      <h1 className="profile-header__title">
        {customer.firstname} {customer.lastname}
      </h1>
    </section>
  );
}
export default ProfileHeader;
