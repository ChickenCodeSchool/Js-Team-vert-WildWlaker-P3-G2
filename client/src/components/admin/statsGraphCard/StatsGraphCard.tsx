import { FiUsers } from "react-icons/fi";

import "./StatsGraphCard.css";

function StatsGraphCard() {
  return (
    <div className="StatsGraphCard-main">
      <div className="StatsGraphCard-upper">
        <FiUsers className="StatsGraphCard-icon" />
        <div className="StatsGraphCard-info">
          <h2>Utilisateurs</h2>
          <span className="StatsGraphCard-indice">1245</span>
          <span className="StatsGraphCard-evolution">↑ 12.5%</span>
          <p>VS semaine précédente</p>
        </div>
      </div>
    </div>
  );
}

export default StatsGraphCard;
