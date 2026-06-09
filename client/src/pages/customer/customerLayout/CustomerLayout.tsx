import { Outlet } from "react-router";

import "./CustomerLayout.css";
import CustomerNavBar from "../../../components/customer/Navbar/CustomerNavBar";

function CustomerLayout() {
  return (
    <div className="customerLayout-main">
      <Outlet />
      <CustomerNavBar />
    </div>
  );
}

export default CustomerLayout;
