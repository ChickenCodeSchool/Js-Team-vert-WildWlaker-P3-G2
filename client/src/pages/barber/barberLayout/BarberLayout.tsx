import { Outlet } from "react-router";
import BarberNavBar from "../../../components/barber/barberNavBar/BarberNavBar";
import "./BarberLayout.css";

function BarberLayout() {
  return (
    <div className="barberLayout-main">
      <BarberNavBar />
      <Outlet />
    </div>
  );
}

export default BarberLayout;
