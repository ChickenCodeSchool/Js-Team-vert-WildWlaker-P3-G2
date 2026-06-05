import { format, subDays } from "date-fns";
import { fr } from "date-fns/locale";
import { useEffect, useState } from "react";
import { FiCalendar, FiPause, FiUserPlus } from "react-icons/fi";

import StatsCard from "../../../components/admin/statsCard/StatsCard";
import UserDataGrid, {
  type DataGridColumn,
} from "../../../components/admin/userDataGrid/UserDataGrid";

import "./Users.css";

const API_URL = import.meta.env.VITE_API_URL;

interface Customer {
  id_user: number;
  firstname: string;
  lastname: string;
  postal_code: string;
  city: string;
  adress: string;
  avatar_url: string;
  create_time: string;
  email: string;
}
const today = new Date();
const thirtyDaysAgo = subDays(today, 30);
const thisMonthRange = {
  start: format(thirtyDaysAgo, "yyyy-MM-dd"),
  end: format(today, "yyyy-MM-dd"),
};
const params = `?startDate=${thisMonthRange.start}&endDate=${thisMonthRange.end}`;

function Users() {
  const [customers, setCustomers] = useState<(Customer & { id: number })[]>([]);
  const [monthlyNewUsers, setMonthlyNewUsers] = useState([]);
  const [monthlyAppointments, setMonthlyAppointements] = useState([]);

  useEffect(() => {
    fetch(`${API_URL}/api/customers`)
      .then((res) => {
        if (!res.ok) throw new Error("Erreur réseau");
        return res.json();
      })
      .then((data: Customer[]) => {
        const formattedData = data.map((item) => ({
          ...item,
          id: item.id_user,
        }));
        setCustomers(formattedData);
      })
      .catch((err) =>
        console.error("Erreur lors du chargement des clients :", err),
      );

    fetch(`${API_URL}/api/customers${params}`)
      .then((res) => res.json())
      .then((data) => {
        setMonthlyNewUsers(data);
      })
      .catch((err) => console.error("Erreur lors du fetch mensuel:", err));

    fetch(`${API_URL}/api/appointments${params}`)
      .then((res) => res.json())
      .then((data) => {
        setMonthlyAppointements(data);
      })
      .catch((err) => console.error("Erreur lors du fetch mensuel:", err));
  }, []);

  const columns: DataGridColumn<Customer & { id: number }>[] = [
    {
      key: "name",
      header: "Utilisateur",
      render: (customer) => (
        <div className="user-grid-client-cell">
          <img
            src={`${customer.avatar_url}`}
            alt={`${customer.firstname} ${customer.lastname}`}
            className="user-grid-avatar"
          />
          <div className="user-grid-info">
            <span className="user-grid-fullname">
              {customer.firstname} {customer.lastname}
            </span>
          </div>
        </div>
      ),
    },
    {
      key: "email",
      header: "Email",
      render: (customer) => (
        <div className="user-grid-info">{customer.email}</div>
      ),
    },
    {
      key: "city",
      header: "Ville",
      render: (customer) => (
        <div className="user-grid-info">{customer.city}</div>
      ),
    },
    {
      key: "postal_code",
      header: "Code postal",
      render: (customer) => (
        <div className="user-grid-info">{customer.postal_code}</div>
      ),
    },
    {
      key: "create_time",
      header: "Date de création",
      render: (customer) => (
        <div className="user-grid-info">
          {format(new Date(customer.create_time), "dd MMM yyyy", {
            locale: fr,
          })}
        </div>
      ),
    },
    {
      key: "actions",
      header: "Actions",
      width: "60px",
      render: (customer) => (
        <button
          type="button"
          className="user-grid-action-btn"
          onClick={() => console.log("Ouvrir détails de", customer.id_user)}
        >
          ⋮
        </button>
      ),
    },
  ];

  return (
    <div className="admin-users-main">
      <div className="admin-users-header">
        <div className="admin-users-title">
          <FiUserPlus className="admin-users-title-icon" />
          <h1>Gestion des utilisateurs</h1>
        </div>
        <p>Gérez et suivez les utilisateurs de votre plateforme</p>
      </div>
      <div className="admin-users-body">
        <div className="admin-users-body-stats">
          <StatsCard
            Icon={FiUserPlus}
            title="utilisateurs"
            value={customers.length}
            cycle="Total"
          />
          <StatsCard
            Icon={FiUserPlus}
            iconColor="icon-success"
            title="Nouveaux utilisateurs"
            value={monthlyNewUsers.length}
            cycle="Les 30 derniers jours"
          />
          <StatsCard
            Icon={FiPause}
            iconColor="icon-warning"
            title="Comptes suspendus"
            value={25}
            cycle="Total"
          />
          <StatsCard
            Icon={FiCalendar}
            iconColor="icon-info"
            title="Réservations"
            value={monthlyAppointments.length}
            cycle="Les 30 derniers jours"
          />
        </div>
        <UserDataGrid columns={columns} data={customers} rowsPerPage={7} />
      </div>
    </div>
  );
}

export default Users;
