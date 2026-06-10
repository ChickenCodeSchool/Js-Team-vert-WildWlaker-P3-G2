import { useEffect, useState } from "react";
import ProfileActions from "../../../components/customer/Profile/ProfileActions";
// import EditProfileModal from "../../../components/customer/Profile/EditProfileModal";
import ProfileHeader from "../../../components/customer/Profile/ProfileHeader";
import ProfileInfo from "../../../components/customer/Profile/ProfileInfo";
import type { User } from "./../../../types/user";

function UserProfile() {
  const [user, setUser] = useState<User | null>(null);
  const API_URL = import.meta.env.VITE_API_URL;

  useEffect(() => {
    fetch(`${API_URL}/api/profile/2`)
      .then((res) => res.json())
      .then(setUser);
  }, []);

  if (!user) return <p>Chargement...</p>;

  return (
    <main className="profile-page">
      <ProfileHeader user={user} />
      <ProfileInfo user={user} />
      <ProfileActions />
    </main>
  );
}

export default UserProfile;
