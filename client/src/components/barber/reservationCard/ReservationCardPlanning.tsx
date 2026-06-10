import "./ReservationCardPlanning.css";

type ReservationStatus = "confirmed" | "pending" | "cancelled";

type Props = {
  avatar: string;
  time: string;
  customerName: string;
  service: string;
  duration: number;
  status: ReservationStatus;
};

function ReservationCardPlanning({
  avatar,
  time,
  customerName,
  service,
  duration,
  status,
}: Props) {
  const statusLabel = {
    confirmed: "Confirmé",
    pending: "En attente",
    cancelled: "Annulé",
  };

  return (
    <article className={`planning-reservation-card ${status}`}>
      <img
        src={avatar}
        alt={customerName}
        className="planning-reservation-card-avatar"
      />

      <span className="planning-reservation-card-time">{time}</span>

      <div className="planning-reservation-card-content">
        <h4>{customerName}</h4>
        <p>{service}</p>
      </div>

      <div className="planning-reservation-card-right">
        <span className={`planning-reservation-card-status ${status}`}>
          {statusLabel[status]}
        </span>

        <span className="planning-reservation-card-duration">
          {duration} min{" "}
        </span>
      </div>
    </article>
  );
}

export default ReservationCardPlanning;
