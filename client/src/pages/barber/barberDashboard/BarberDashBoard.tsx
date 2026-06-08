// import { useEffect, useState } from "react";
import StatsGraphCardBarber from "../../../components/barber/statsGraphCardBarber/StatsGraphCardBarber";
import "./BarberDashBoard.css";
import { FaRegCalendarAlt } from "react-icons/fa";
import { GoClock } from "react-icons/go";
import { PiStarThin } from "react-icons/pi";

// const icons = [FaRegCalendarAlt, GoClock, PiStarThin];

// type Stat = {
//   id: number;
//   value: number;
//   title: string;
//   cycle: string;
// };

function BarberDashBoard() {
  // const [stats, setStats] = useState<Stat[]>([]);

  // const API_URL = import.meta.env.VITE_API_URL;

  //   useEffect(() => {
  //     fetch(`${API_URL}/api/stats`)
  //       .then((res) => res.json())
  //       .then((data: Stat[]) => setStats(data))
  //       .catch((err) => console.error(err));
  //   }, [API_URL]);

  return (
    <div className="stats-cards-container">
      <StatsGraphCardBarber
        Icon={FaRegCalendarAlt}
        value={50}
        title={"RDV NOMBRE"}
        cycle={"mois"}
      />

      <StatsGraphCardBarber
        Icon={GoClock}
        value={60}
        title={" attent"}
        cycle={"avenir"}
      />
      <StatsGraphCardBarber
        Icon={PiStarThin}
        value={70}
        title={"avis"}
        cycle={"test"}
      />
    </div>
  );
}

export default BarberDashBoard;
