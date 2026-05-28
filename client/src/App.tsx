import { Outlet } from "react-router";
import "./App.css";
import CustomerNavBar from "./components/customer/CustomerNavBar";

function App() {
  return (
    <main>
      <Outlet />
      <CustomerNavBar />
    </main>
  );
}

export default App;
