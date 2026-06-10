import type { User } from "./../../../types/user";
import "./ProfileHeader.css";

type Props = {
  user: User;
};

function ProfileHeader({ user }: Props) {
  return (
    <section>
      <img src={user.avatar_url} alt={`Avatar de ${user.email}`} />
    </section>
  );
}
export default ProfileHeader;
