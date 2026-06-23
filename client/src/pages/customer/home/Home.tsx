import { useState } from "react";
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

  const [searchValue, setSearchValue] = useState("");

  const filteredBarbers = barbers.filter((barber) => {
    const search = searchValue.toLowerCase();

    return (
      barber.name.toLowerCase().includes(search) ||
      barber.city.toLowerCase().includes(search)
    );
  });

  return (
    <div className="home">
      <div className="home__hero">
        <h1 className="home__brand">
          <FiScissors className="FiScissors" /> Secare
        </h1>

        <h2 className="home__subtitle">
          Trouve ton <span className="home_span">coiffeur</span> idéal
        </h2>
        <div className="home_search">
          <Search value={searchValue} onChange={setSearchValue} />
        </div>
      </div>

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

      <div className="home__section">
        <h2 className="home__section-title">Coiffeurs populaires</h2>
        <Carrousel barbers={filteredBarbers} />
      </div>

      <ServicesSection />
    </div>
  );
}

export default Home;
