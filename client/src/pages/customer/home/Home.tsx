import "./Home.css";
import { FiScissors } from "react-icons/fi";
import SecareBarber from "../../../assets/images/SecareBarber.png";
import Carrousel from "../../../components/carrousel/Carrousel";
import ServicesSection from "../../../components/customer/Services/Services/ServicesSection";
import EventBanner from "../../../components/event/EventBanner";
import Search from "../../../components/search/Search";

function Home() {
  return (
    <div className="home_">
      <div className="Home_title">
        <h1>
          {" "}
          <FiScissors className="FiScissors" /> Secare{" "}
        </h1>
        <h2 className="home__title">
          Trouve ton <span className="home_span">coiffeur</span> idéal
        </h2>
      </div>
      <Search />
      <section className="home__banner">
        <EventBanner
          label="ÉVÉNEMENT"
          title="SECARE BARBER"
          subtitle="FESTIVAL 2026"
          description="Le plus grand événement "
          date="24 - 26 MAI 2026"
          location="Paris"
          image={SecareBarber}
        />
      </section>
      <div className="Carrousel_first">
        <h1>Coiffeur populaire</h1>
      </div>
      <div className="Carrousel_control">
        <Carrousel />
      </div>
      <ServicesSection />
    </div>
  );
}

export default Home;
