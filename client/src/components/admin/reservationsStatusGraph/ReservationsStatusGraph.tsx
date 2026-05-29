import { Pie, PieChart, ResponsiveContainer, Sector } from "recharts";
import "./ReservationsStatusGraph.css";
import { NavLink } from "react-router";

interface StatusData {
  id: number;
  name: string;
  value: number;
  percentage: number;
  color: string;
}

const data: StatusData[] = [
  {
    id: 1,
    name: "Confirmées",
    value: 178,
    percentage: 52,
    color: "var(--success)",
  },
  {
    id: 2,
    name: "En attente",
    value: 78,
    percentage: 23,
    color: "var(--warning)",
  },
  { id: 3, name: "Terminées", value: 54, percentage: 16, color: "var(--info)" },
  { id: 4, name: "Annulées", value: 22, percentage: 9, color: "var(--error)" },
];

const TOTAL_RESERVATIONS = 342;

interface RenderPieShapeProps {
  cx: number;
  cy: number;
  innerRadius: number;
  outerRadius: number;
  startAngle: number;
  endAngle: number;
  payload: StatusData;
}

const RenderPieShape = (props: Partial<RenderPieShapeProps>) => {
  const { cx, cy, innerRadius, outerRadius, startAngle, endAngle, payload } =
    props;

  if (!payload) return null;

  return (
    <Sector
      cx={cx}
      cy={cy}
      innerRadius={innerRadius}
      outerRadius={outerRadius}
      startAngle={startAngle}
      endAngle={endAngle}
      fill={payload.color}
    />
  );
};

function ReservationStatusGraph() {
  return (
    <div className="ReservationStatusGraph-card">
      <h3 className="ReservationStatusGraph-title">Réservations par statut</h3>

      <div className="ReservationStatusGraph-content">
        <div className="ReservationStatusGraph-wrapper">
          <ResponsiveContainer width="100%" height={200}>
            <PieChart>
              <Pie
                data={data}
                cx="50%"
                cy="50%"
                innerRadius={60}
                outerRadius={80}
                paddingAngle={3}
                dataKey="value"
                shape={<RenderPieShape />}
              />
            </PieChart>
          </ResponsiveContainer>

          <div className="ReservationStatusGraph-center-text">
            <span className="total-number">{TOTAL_RESERVATIONS}</span>
            <span className="total-label">Total</span>
          </div>
        </div>

        <div className="ReservationStatusGraph-legend">
          {data.map((item) => (
            <div key={item.id} className="legend-item">
              <div className="legend-left">
                <span
                  className="legend-dot"
                  style={{ backgroundColor: item.color }}
                ></span>
                <span className="legend-name">{item.name}</span>
              </div>
              <span className="legend-stats">
                {item.value}{" "}
                <span className="legend-percent">({item.percentage}%)</span>
              </span>
            </div>
          ))}
        </div>
      </div>

      <NavLink
        to="/admin/reservations"
        className="ReservationStatusGraph-footer-btn"
      >
        Voir toutes les réservations
      </NavLink>
    </div>
  );
}
export default ReservationStatusGraph;
