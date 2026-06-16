import { useCallback, useEffect, useState } from "react";
import { useNavigate } from "react-router";
import { useParams } from "react-router";
import EditProfileModal from "../../../components/customer/Profile/EditProfileModal";
import ProfileActions from "../../../components/customer/Profile/ProfileActions";
import ProfileHeader from "../../../components/customer/Profile/ProfileHeader";
import ProfileInfo from "../../../components/customer/Profile/ProfileInfo";
import type { Customer } from "./../../../types/Customer";

function UserProfile() {
  const [customer, setCustomer] = useState<Customer | null>(null);
  const navigate = useNavigate();
  const API_URL = import.meta.env.VITE_API_URL;
  const [isEditing, setIsEditing] = useState(false);
  const { id } = useParams<{ id: string }>();
  const handleSaveCustomer = (updatedCustomer: {
    firstname: string;
    lastname: string;
    email: string;
    city: string;
  }) => {
    setCustomer((prev) => (prev ? { ...prev, ...updatedCustomer } : prev));
  };

  const loadData = useCallback(() => {
    const userId = Number(id);
    fetch(`${API_URL}/api/customers/${userId}`)
      .then((res) => res.json())
      .then((data) => {
        const found = data.find((c: Customer) => c.id_user);
        setCustomer(found);
      });
  }, [id]);
  useEffect(() => {
    loadData();
  }, [loadData]);

  const handleDeleteAccount = async () => {
    try {
      const res = await fetch(`${API_URL}/api/customers/${customer?.id_user}`, {
        method: "DELETE",
      });

      if (!res.ok) throw new Error("Erreur lors de la suppression");

      navigate("/"); //
    } catch (err) {
      console.error(err);
    }
  };

  if (!customer) return <p>Chargement...</p>;

  return (
    <main className="profile-page">
      <ProfileHeader customer={customer} onEdit={() => setIsEditing(true)} />
      <ProfileInfo customer={customer} />
      <ProfileActions onDeleteConfirm={handleDeleteAccount} />

      {isEditing && (
        <EditProfileModal
          customer={customer}
          onClose={() => setIsEditing(false)}
          onSave={handleSaveCustomer}
          loadData={loadData}
        />
      )}
    </main>
  );
}
export default UserProfile;
