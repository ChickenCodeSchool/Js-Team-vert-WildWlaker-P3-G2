import { useEffect, useState } from "react";
import { Pie, PieChart, ResponsiveContainer, Sector } from "recharts";
import "./ReservationsStatusGraph.css";
import { NavLink } from "react-router";

const API_URL = import.meta.env.VITE_API_URL;

interface StatusData {
  id: number;
  name: string;
  value: number;
  percentage: number;
  color: string;
}

type RawAppointment = {
  id_appointement: number;
  status: string;
  appointment_date: string;
};

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
  const [chartData, setChartData] = useState<StatusData[]>([]);
  const [totalReservations, setTotalReservations] = useState<number>(0);

  useEffect(() => {
    fetch(`${API_URL}/api/appointments`)
      .then((res) => res.json())
      .then((rawData: RawAppointment[]) => {
        const statusConfig: {
          [key: string]: { id: number; name: string; color: string };
        } = {
          confirmed: { id: 1, name: "Confirmées", color: "var(--success)" },
          pending: { id: 2, name: "En attente", color: "var(--warning)" },
          completed: { id: 3, name: "Terminées", color: "var(--info)" },
          cancelled: { id: 4, name: "Annulées", color: "var(--error)" },
        };

        const counts = rawData.reduce<{ [key: string]: number }>(
          (acc, app) => {
            if (acc[app.status] !== undefined) {
              acc[app.status]++;
            }
            return acc;
          },
          {
            confirmed: 0,
            pending: 0,
            completed: 0,
            cancelled: 0,
          },
        );

        const total = rawData.length;
        setTotalReservations(total);

        const formattedData: StatusData[] = Object.keys(statusConfig).map(
          (key) => {
            const count = counts[key];
            const percent = total > 0 ? Math.round((count / total) * 100) : 0;

            return {
              id: statusConfig[key].id,
              name: statusConfig[key].name,
              value: count,
              percentage: percent,
              color: statusConfig[key].color,
            };
          },
        );

        setChartData(formattedData);
      })
      .catch((err) => console.error("Erreur fetch graph statuts :", err));
  }, []);

  return (
    <div className="ReservationStatusGraph-card">
      <h3 className="ReservationStatusGraph-title">Réservations par statut</h3>

      <div className="ReservationStatusGraph-content">
        <div className="ReservationStatusGraph-wrapper">
          <ResponsiveContainer width="100%" height={200}>
            <PieChart>
              <Pie
                data={chartData}
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
            <span className="total-number">{totalReservations}</span>{" "}
            <span className="total-label">Total</span>
          </div>
        </div>

        <div className="ReservationStatusGraph-legend">
          {chartData.map((item) => (
            <div key={item.id} className="legend-item">
              <div className="legend-left">
                <span
                  className="legend-dot"
                  style={{ backgroundColor: item.color }}
                />
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
