import { Outlet } from "react-router";

import "./CustomerLayout.css";
import CustomerNavBar from "../../../components/customer/Services/Navbar/CustomerNavBar";

function CustomerLayout() {
  return (
    <div className="customerLayout-main">
      <CustomerNavBar />
      <Outlet />
    </div>
  );
}

export default CustomerLayout;
