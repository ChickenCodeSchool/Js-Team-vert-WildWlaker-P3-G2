import { format, subDays } from "date-fns";
import { fr } from "date-fns/locale";
import { useEffect, useMemo, useState } from "react";
import { FiCalendar, FiEye, FiPause, FiUserPlus } from "react-icons/fi";

import AdminFilterBar from "../../../components/admin/adminFilterBar/AdminFilterBar";
import StatsCard from "../../../components/admin/statsCard/StatsCard";
import UserDataGrid, {
  type DataGridColumn,
} from "../../../components/admin/userDataGrid/UserDataGrid";
import UserProfilCard from "../../../components/admin/userProfilCard/UserProfilCard";

import "./Users.css";

const API_URL = import.meta.env.VITE_API_URL;

const today = new Date();
const thirtyDaysAgo = subDays(today, 30);
const thisMonthRange = {
  start: format(thirtyDaysAgo, "yyyy-MM-dd"),
  end: format(today, "yyyy-MM-dd"),
};
const params = `?startDate=${thisMonthRange.start}&endDate=${thisMonthRange.end}`;

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

interface Appointment {
  id_appointment: number;
  appointment_date: string;
  status: "pending" | "confirmed" | "completed" | "cancelled";
  location_type: string;
  id_prestation: number;
  id_user_barber: number;
  id_user_customer: number;
  barber_name: string;
  customer_firstname: string;
  customer_lastname: string;
  customer_avatar: string;
  prestation_name: string;
}

interface Review {
  id_review: number;
  rating: number;
  comment: string;
  reporting: number;
  created_at: string;
  id_appointment: number;
}

function Users() {
  const [customers, setCustomers] = useState<(Customer & { id: number })[]>([]);
  const [monthlyNewUsers, setMonthlyNewUsers] = useState<Customer[]>([]);
  const [monthlyAppointments, setMonthlyAppointments] = useState<Appointment[]>(
    [],
  );

  const [searchTerm, setSearchTerm] = useState("");
  const [departmentFilter, setDepartmentFilter] = useState("");
  const [dateSortOrder, setDateSortOrder] = useState<"asc" | "desc">("desc");

  const [selectedCustomer, setSelectedCustomer] = useState<
    (Customer & { id: number }) | null
  >(null);
  const [reviews, setReviews] = useState<Review[]>([]);

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
        if (formattedData.length > 0) {
          setSelectedCustomer(formattedData[0]);
        }
      })
      .catch((err) =>
        console.error("Erreur lors du chargement des clients :", err),
      );

    fetch(`${API_URL}/api/reviews`)
      .then((res) => res.json())
      .then((data: Review[]) => setReviews(data))
      .catch((err) => console.error("Erreur lors du fetch des avis :", err));

    fetch(`${API_URL}/api/customers${params}`)
      .then((res) => res.json())
      .then((data: Customer[]) => setMonthlyNewUsers(data))
      .catch((err) => console.error("Erreur lors du fetch mensuel:", err));

    fetch(`${API_URL}/api/appointments${params}`)
      .then((res) => res.json())
      .then((data: Appointment[]) => setMonthlyAppointments(data))
      .catch((err) => console.error("Erreur lors du fetch mensuel:", err));
  }, []);

  const selectedCustomerStats = useMemo(() => {
    if (!selectedCustomer) {
      return { total: 0, canceled: 0, reviewsCount: 0, reported: 0 };
    }
    const customerApps = monthlyAppointments.filter(
      (app: Appointment) => app.id_user_customer === selectedCustomer.id_user,
    );

    const total = customerApps.length;
    const canceled = customerApps.filter(
      (app: Appointment) => app.status === "cancelled",
    ).length;
    const customerAppIds = customerApps.map(
      (app: Appointment) => app.id_appointment,
    );
    const customerReviews = reviews.filter((rev: Review) =>
      customerAppIds.includes(rev.id_appointment),
    );
    const reviewsCount = customerReviews.length;
    const reported = customerReviews.filter(
      (rev: Review) => rev.reporting === 1,
    ).length;

    return { total, canceled, reviewsCount, reported };
  }, [selectedCustomer, monthlyAppointments, reviews]);

  const uniqueDepartments = useMemo(() => {
    const depts = customers
      .map((c) => (c.postal_code ? c.postal_code.substring(0, 2) : ""))
      .filter((dept) => dept.length === 2);
    return Array.from(new Set(depts)).sort();
  }, [customers]);

  const filteredCustomers = useMemo(() => {
    let result = [...customers];

    if (searchTerm.trim() !== "") {
      const lowerSearch = searchTerm.toLowerCase();
      result = result.filter(
        (c) =>
          c.firstname.toLowerCase().includes(lowerSearch) ||
          c.lastname.toLowerCase().includes(lowerSearch),
      );
    }

    if (departmentFilter !== "") {
      result = result.filter((c) => c.postal_code.startsWith(departmentFilter));
    }

    if (dateSortOrder === "desc") {
      result.sort(
        (a, b) =>
          new Date(b.create_time).getTime() - new Date(a.create_time).getTime(),
      );
    } else if (dateSortOrder === "asc") {
      result.sort(
        (a, b) =>
          new Date(a.create_time).getTime() - new Date(b.create_time).getTime(),
      );
    }

    return result;
  }, [customers, searchTerm, departmentFilter, dateSortOrder]);

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
      render: (customer) => (
        <div className="user-grid-actions-cell">
          <button
            type="button"
            className="user-grid-icon-btn"
            onClick={(e) => {
              e.stopPropagation();
              setSelectedCustomer(customer);
            }}
            title="Voir"
          >
            <FiEye />
          </button>
        </div>
      ),
    },
  ];

  return (
    <div className="admin-users-body">
      <div className="admin-users-header">
        <div className="admin-users-title">
          <FiUserPlus className="admin-users-title-icon" />
          <h1>Gestion des utilisateurs</h1>
        </div>
        <p>Gérez et suivez les utilisateurs de votre plateforme</p>
      </div>
      <main className="admin-users-main">
        <section className="admin-users-main-left">
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
          <AdminFilterBar
            searchTerm={searchTerm}
            setSearchTerm={setSearchTerm}
            departmentFilter={departmentFilter}
            setDepartmentFilter={setDepartmentFilter}
            dateSortOrder={dateSortOrder}
            setDateSortOrder={setDateSortOrder}
            departments={uniqueDepartments}
          />
          <div>
            <UserDataGrid
              columns={columns}
              data={filteredCustomers}
              onRowClick={(customer) => setSelectedCustomer(customer)}
              rowsPerPage={6}
            />
          </div>
        </section>
        <aside className="admin-users-main-aside">
          {selectedCustomer ? (
            <UserProfilCard
              avatar={selectedCustomer.avatar_url}
              name={`${selectedCustomer.firstname} ${selectedCustomer.lastname}`}
              createTime={format(
                new Date(selectedCustomer.create_time),
                "dd MMM yyyy",
                { locale: fr },
              )}
              email={selectedCustomer.email}
              city={selectedCustomer.city}
              postalcode={selectedCustomer.postal_code}
              phonenum="Non renseigné"
              reservationsCount={selectedCustomerStats.total}
              reservationsCanceledCount={selectedCustomerStats.canceled}
              reviewsCount={selectedCustomerStats.reviewsCount}
              repordedsCount={selectedCustomerStats.reported}
            />
          ) : (
            <div className="no-user-selected">
              <p>Sélectionnez un utilisateur pour voir son profil</p>
            </div>
          )}
        </aside>
      </main>
    </div>
  );
}

export default Users;
