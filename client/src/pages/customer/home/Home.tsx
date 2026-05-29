import "./Home.css";
import Carrousel from "../../../components/carrousel/Carrousel";
import ServicesSection from "../../../components/customer/Services/Services/ServicesSection";

function Home() {
  return (
    <div className="home">
      <h1> red from Home</h1>
      <Carrousel />
      <ServicesSection />
    </div>
  );
}

export default Home;
