import { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import EditProfileModal from "../../../components/customer/Profile/EditProfileModal";
import ProfileActions from "../../../components/customer/Profile/ProfileActions";
import ProfileHeader from "../../../components/customer/Profile/ProfileHeader";
import ProfileInfo from "../../../components/customer/Profile/ProfileInfo";
import type { Customer } from "./../../../types/Customer";

const API_URL = import.meta.env.VITE_API_URL;

function UserProfile() {
  const [customer, setCustomer] = useState<Customer | null>(null);
  const navigate = useNavigate();
  const [isEditing, setIsEditing] = useState(false);
  const handleSaveCustomer = (updatedCustomer: {
    firstname: string;
    lastname: string;
    email: string;
    city: string;
  }) => {
    setCustomer((prev) => (prev ? { ...prev, ...updatedCustomer } : prev));
  };

  const user = JSON.parse(localStorage.getItem("user") || "null");
  const userId = user?.id;

  useEffect(() => {
    if (!userId) {
      navigate("/login");
      return;
    }

    fetch(`${API_URL}/api/customers/${userId}`)
      .then((res) => res.json())
      .then((data) => {
        if (!data) {
          localStorage.removeItem("user");
          navigate("/login");
          return;
        }

        setCustomer(data);
      })
      .catch((err) => {
        console.error(err);
        navigate("/login");
      });
  }, [userId, navigate]);

  const loadData = async () => {
    if (!userId) return;

    const res = await fetch(`${API_URL}/api/customers/${userId}`);
    const data = await res.json();

    setCustomer(data);
  };
  const handleDeleteAccount = async () => {
    try {
      const res = await fetch(`${API_URL}/api/users/${customer?.id_user}`, {
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
