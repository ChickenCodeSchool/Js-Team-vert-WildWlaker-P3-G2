import { Outlet } from "react-router";
import "./BordHair.css";
import NavBarHair from "../../components/hairdresser/NavBarHair";

function BordHair() {
  return (
    <div className="BordLayout-main">
      <NavBarHair />
      <Outlet />
    </div>
  );
}

export default BordHair;
