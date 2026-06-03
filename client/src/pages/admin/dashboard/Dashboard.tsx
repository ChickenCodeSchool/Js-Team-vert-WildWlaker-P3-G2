import { useEffect, useState } from "react";
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

function Dashboard() {
  const apiUrl = import.meta.env.VITE_API_URL;
  const [barbers, setBarbers] = useState([]);
  const [users, setUsers] = useState([]);
  const [appointments, setAppointments] = useState([]);
  const [reviews, setReviews] = useState<reviewItem[]>([]);

  useEffect(() => {
    fetch(`${apiUrl}/api/barbers`)
      .then((res) => res.json())
      .then((data) => setBarbers(data));
  }, []);

  useEffect(() => {
    fetch(`${apiUrl}/api/users`)
      .then((res) => res.json())
      .then((data) => setUsers(data));
  }, []);
  useEffect(() => {
    fetch(`${apiUrl}/api/appointments`)
      .then((res) => res.json())
      .then((data) => setAppointments(data));
  }, []);
  useEffect(() => {
    fetch(`${apiUrl}/api/reviews`)
      .then((res) => res.json())
      .then((data) => setReviews(data));
  }, []);

  return (
    <div className="dashboard-main">
      <header className="dashboard-header">
        <h1>Bonjour, Admin 👋</h1>
        <p>
          Bienvenue sur votre tableau de bord. Voici un aperçu de vos
          statistiques récentes :
        </p>
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
          value={appointments.length}
          evolution="↑ 15.7%"
        />
        <StatsGraphCard
          Icon={FiStar}
          title="Note moyenne"
          value={`${(reviews.reduce((acc, review) => acc + review.rating, 0) / reviews.length || 0).toFixed(1)}/5`}
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
