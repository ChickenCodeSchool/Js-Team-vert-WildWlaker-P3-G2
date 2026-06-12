import { useCallback, useEffect, useState } from "react";
import EditProfileModal from "../../../components/customer/Profile/EditProfileModal";
import ProfileActions from "../../../components/customer/Profile/ProfileActions";
import ProfileHeader from "../../../components/customer/Profile/ProfileHeader";
import ProfileInfo from "../../../components/customer/Profile/ProfileInfo";
import type { Customer } from "./../../../types/Customer";

function UserProfile() {
  const [customer, setCustomer] = useState<Customer | null>(null);
  const API_URL = import.meta.env.VITE_API_URL;
  const [isEditing, setIsEditing] = useState(false);
  const handleSaveCustomer = (updatedCustomer: {
    firstname: string;
    lastname: string;
    email: string;
    city: string;
  }) => {
    setCustomer((prev) => (prev ? { ...prev, ...updatedCustomer } : prev));
  };

  const loadData = useCallback(() => {
    fetch(`${API_URL}/api/customers/`)
      .then((res) => res.json())
      .then((data) => {
        const found = data.find((c: Customer) => c.id_user === 18);
        setCustomer(found);
      });
  }, []);
  useEffect(() => {
    loadData();
  }, [loadData]);

  if (!customer) return <p>Chargement...</p>;

  return (
    <main className="profile-page">
      <ProfileHeader customer={customer} onEdit={() => setIsEditing(true)} />
      <ProfileInfo customer={customer} />
      <ProfileActions />

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
