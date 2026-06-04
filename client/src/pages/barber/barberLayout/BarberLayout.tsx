import { Outlet } from "react-router";
import BarberNavBar from "../../../components/barber/barberNavBar/BarberNavBar";
import "./BarberLayout.css";

function BarberLayout() {
  return (
    <div className="barberLayout-main">
      <Outlet />
      <BarberNavBar />
    </div>
  );
}

export default BarberLayout;
