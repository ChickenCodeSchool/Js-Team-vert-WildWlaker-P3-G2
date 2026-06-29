import { useEffect, useState } from "react";
import { useLocation, useParams } from "react-router";
import { useNavigate } from "react-router";
import EditProfileModal from "../../../components/customer/Profile/EditProfileModal";
import ProfileActions from "../../../components/customer/Profile/ProfileActions";
import ProfileHeader from "../../../components/customer/Profile/ProfileHeader";
import ProfileInfo from "../../../components/customer/Profile/ProfileInfo";
import type { Customer } from "./../../../types/Customer";

const API_URL = import.meta.env.VITE_API_URL;

function UserProfile() {
  const location = useLocation();
  const params = useParams();
  console.log("LOCATION =", location.pathname);
  console.log("PARAMS =", params);
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
  console.log("USER:", user);
  console.log("USER ID:", userId);
  useEffect(() => {
    console.log("useEffect UserProfile");
    fetch(`${API_URL}/api/customers/${userId}`)
      .then(async (res) => {
        if (!res.ok) {
          throw new Error("Utilisateur introuvable");
        }

        return res.json();
      })
      .then((data) => {
        setCustomer(data);
      })
      .catch((err) => {
        console.error(err);
        navigate("/login");
      });
  });

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
