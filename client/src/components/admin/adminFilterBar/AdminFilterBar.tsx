import { FiCalendar, FiFilter, FiSearch } from "react-icons/fi";

import "./AdminFilterBar.css";

interface TableFiltersProps {
  searchTerm: string;
  setSearchTerm: (value: string) => void;
  departmentFilter: string;
  setDepartmentFilter: (value: string) => void;
  statusFilter: string;
  setStatusFilter: (value: string) => void;
  dateSortOrder: "asc" | "desc";
  setDateSortOrder: (value: "asc" | "desc") => void;
  departments: string[];
  status: string[];
}

function AdminFilterBar({
  searchTerm,
  setSearchTerm,
  departmentFilter,
  setDepartmentFilter,
  statusFilter,
  setStatusFilter,
  dateSortOrder,
  setDateSortOrder,
  departments,
  status,
}: TableFiltersProps) {
  return (
    <div className="admin-users-filters-bar">
      <div className="search-input-wrapper">
        <FiSearch className="search-icon" />
        <input
          type="text"
          placeholder="Rechercher un utilisateur..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="filter-input search-input"
        />
      </div>

      <div className="filters-controls-wrapper">
        <div className="filter-select-wrapper">
          <FiFilter className="filter-icon" />
          <select
            value={departmentFilter}
            onChange={(e) => setDepartmentFilter(e.target.value)}
            className="filter-select"
          >
            <option value="">Tous les départements</option>
            {departments.map((dept) => (
              <option key={dept} value={dept}>
                {dept}
              </option>
            ))}
          </select>
        </div>

        <div className="filter-select-wrapper">
          <FiFilter className="filter-icon" />
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="filter-select"
          >
            <option value="">Tous les statuts</option>
            {status.map((stat) => (
              <option key={stat} value={stat}>
                {stat}
              </option>
            ))}
          </select>
        </div>

        <div className="filter-select-wrapper">
          <FiCalendar className="filter-icon" />
          <select
            value={dateSortOrder}
            onChange={(e) => setDateSortOrder(e.target.value as "asc" | "desc")}
            className="filter-select"
          >
            <option value="desc">Plus récent au plus ancien</option>
            <option value="asc">Plus ancien au plus récent</option>
          </select>
        </div>
      </div>
    </div>
  );
}

export default AdminFilterBar;
