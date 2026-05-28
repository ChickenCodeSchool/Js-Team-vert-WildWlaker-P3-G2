import { Outlet } from "react-router";

import "./AdminLayout.css";
import AdminNavBar from "../../../components/admin/adminNavBar/AdminNavBar";

function AdminLayout() {
  return (
    <div className="adminLayout-main">
      <AdminNavBar />
      <Outlet />
    </div>
  );
}

export default AdminLayout;
