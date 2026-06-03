import { addWeeks, endOfWeek, format, startOfWeek } from "date-fns";
import { fr } from "date-fns/locale";
import { useEffect, useMemo, useState } from "react";
import {
  FiCalendar,
  FiFlag,
  FiScissors,
  FiStar,
  FiUsers,
} from "react-icons/fi";

import ApprovalCard from "../../../components/admin/approvalCard/ApprovalCard";
import BigStatsGraphCard from "../../../components/admin/bigStatsGraphCard/BigStatsGraphCard";
import LatestReservationsCard from "../../../components/admin/lastestReservationsCard/LastestReservationCard";
import RecentActivityCard from "../../../components/admin/recentActivityCard/RecentActivityCard";
import ReservationStatusGraph from "../../../components/admin/reservationsStatusGraph/ReservationsStatusGraph";
import StatsGraphCard from "../../../components/admin/statsGraphCard/StatsGraphCard";
import UpcomingEventCard from "../../../components/admin/upcomingEventCard/UpcomingEventCard";
import "./Dashboard.css";

type reviewItem = {
  reported: boolean;
  rating: number;
};

const generateDynamicWeeks = () => {
  const options = [];
  const now = new Date();

  const currentMonday = startOfWeek(now, { weekStartsOn: 1 });

  for (let i = -4; i <= 4; i++) {
    const monday = addWeeks(currentMonday, i);
    const sunday = endOfWeek(monday, { weekStartsOn: 1 });
    const startISO = format(monday, "yyyy-MM-dd");
    const endISO = format(sunday, "yyyy-MM-dd");
    const labelStart = format(monday, "dd MMMM yyyy", { locale: fr });
    const labelEnd = format(sunday, "dd MMMM yyyy", { locale: fr });
    const formattedLabel = `${labelStart} - ${labelEnd}`;

    options.push({
      value: `week-${startISO}`,
      label: i === 0 ? `${formattedLabel} (Cette semaine)` : formattedLabel,
      start: startISO,
      end: endISO,
      isCurrent: i === 0,
    });
  }
  return options;
};

function Dashboard() {
  const apiUrl = import.meta.env.VITE_API_URL;
  const [barbers, setBarbers] = useState([]);
  const [users, setUsers] = useState([]);
  const [appointements, setAppointements] = useState([]);
  const [reviews, setReviews] = useState<reviewItem[]>([]);
  const weekOptions = useMemo(() => generateDynamicWeeks(), []);
  const defaultWeek = weekOptions.find((w) => w.isCurrent) || weekOptions[4];
  const [selectedWeek, setSelectedWeek] = useState(defaultWeek.value);
  const currentPeriod =
    weekOptions.find((w) => w.value === selectedWeek) || defaultWeek;

  useEffect(() => {
    const params = `?startDate=${currentPeriod.start}&endDate=${currentPeriod.end}`;

    fetch(`${apiUrl}/api/barbers${params}`)
      .then((res) => res.json())
      .then((data) => setBarbers(data));

    fetch(`${apiUrl}/api/users${params}`)
      .then((res) => res.json())
      .then((data) => setUsers(data));

    fetch(`${apiUrl}/api/appointements${params}`)
      .then((res) => res.json())
      .then((data) => setAppointements(data));

    fetch(`${apiUrl}/api/reviews${params}`)
      .then((res) => res.json())
      .then((data) => setReviews(data));
  }, [currentPeriod.start, currentPeriod.end]);

  return (
    <div className="dashboard-main">
      <header className="dashboard-header">
        <div>
          <h1>Bonjour, Admin 👋</h1>
          <p>
            Bienvenue sur votre tableau de bord. Voici un aperçu de vos
            statistiques récentes :
          </p>
        </div>

        <div className="week-selector-container">
          <FiCalendar className="icon" />
          <select
            className="week-selector-select"
            value={selectedWeek}
            onChange={(e) => setSelectedWeek(e.target.value)}
          >
            {weekOptions.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        </div>
      </header>

      <div className="dashboard-content-graphs">
        <StatsGraphCard
          Icon={FiUsers}
          title="Utilisateurs"
          value={users.length}
          evolution="↑ 12.5%"
        />
        <StatsGraphCard
          Icon={FiScissors}
          title="Coiffeurs"
          value={barbers.length}
          evolution="↑ 8.3%"
        />
        <StatsGraphCard
          Icon={FiCalendar}
          title="Réservations"
          value={appointements.length}
          evolution="↑ 15.7%"
        />
        <StatsGraphCard
          Icon={FiStar}
          title="Note moyenne"
          value={`${(
            reviews.reduce((acc, review) => acc + review.rating, 0) /
              reviews.length || 0
          ).toFixed(1)}/5`}
          evolution="↑ 2.1%"
        />
        <StatsGraphCard
          Icon={FiFlag}
          title="Avis signalés"
          value={reviews.filter((review) => review.reported).length}
          evolution="↑ 4.2%"
        />
      </div>
      <div className="dashboard-body">
        <div className="dashboard-content-big-graphs">
          <div className="dashboard-content-big-graphs-upper">
            <BigStatsGraphCard title="Evolution des réservations" />
            <ReservationStatusGraph />
          </div>
          <LatestReservationsCard />
        </div>
        <div className="dashboard-body-side">
          <ApprovalCard />
          <UpcomingEventCard />
          <RecentActivityCard />
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
