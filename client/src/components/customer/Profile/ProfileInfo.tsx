import { FiMail, FiMapPin, FiPhone } from "react-icons/fi";
import type { User } from "../../../types/user";
import "./ProfileInfo.css";

type Props = {
  user: User;
};

function ProfileInfo({ user }: Props) {
  return (
    <section className="profile-info">
      <div className="profile-info__item">
        <FiMail />
        <span>{user.email}</span>
      </div>

      <div className="profile-info__item">
        <FiPhone />
        <span>Non renseigné</span>
      </div>

      <div className="profile-info__item">
        <FiMapPin />
        <span>Non renseigné</span>
      </div>
    </section>
  );
}
export default ProfileInfo;
