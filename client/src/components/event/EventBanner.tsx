import "./EventBanner.css";
import { FaRegCalendarAlt } from "react-icons/fa";
import { FaMapLocation } from "react-icons/fa6";

type EventBannerProps = {
  label: string;
  title: string;
  subtitle: string;
  description: string;
  date: string;
  location: string;
  image: string;
};

function EventBanner(props: EventBannerProps) {
  return (
    <section className="event_banner">
      <img src={props.image} alt={props.title} className="event_image" />

      <div className="event-banner_control">
        <div className="event_content">
          <span className="event_label">{props.label}</span>

          <h2 className="event_title">
            {props.title}
            <span> {props.subtitle}</span>
          </h2>
          <p className="event_description">{props.description}</p>
          <div className="event-banner__infos">
            <p>
              {" "}
              <FaRegCalendarAlt /> {props.date}
            </p>
            <p>
              {" "}
              <FaMapLocation /> {props.location}
            </p>
          </div>
          <button type="button" className="event-banner__button">
            Voir l'événement
          </button>
        </div>
      </div>
    </section>
  );
}
export default EventBanner;
