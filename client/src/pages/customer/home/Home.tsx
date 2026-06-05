import "./Home.css";
import { FiScissors } from "react-icons/fi";
import Carrousel from "../../../components/carrousel/Carrousel";
import ServicesSection from "../../../components/customer/Services/Services/ServicesSection";
import EventBanner from "../../../components/event/EventBanner";
import Search from "../../../components/search/Search";
import useBarbers from "../../../hooks/useBarbers";
import useEvents from "../../../hooks/useEvents";

function Home() {
  const events = useEvents();
  const event = events[0];
  const barbers = useBarbers();

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
        {event && (
          <EventBanner
            label="ÉVÉNEMENT"
            title={event.title}
            subtitle=""
            description={event.description}
            date={event.start_date}
            location={event.location}
            image={event.image_url}
          />
        )}
      </section>
      <div className="Carrousel_first">
        <h1>Coiffeur populaire</h1>
      </div>
      <div className="Carrousel_control">
        <Carrousel barbers={barbers} />
      </div>
      <ServicesSection />
    </div>
  );
}

export default Home;
