import { useEffect, useState } from "react";
import {
  Area,
  AreaChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import "./BigStatsGraphCard.css";

type BigStatsGraphCardProps = {
  title: string;
};

type FormattedData = {
  date: string;
  value: number;
};

type RawAppointment = {
  Id_appointement: number;
  appointment_date: string;
  status: string;
  location_type: string;
  Id_prestation: number;
  id_user_barber: number;
  id_user_customer: number;
};

function BigStatsGraphCard({ title }: BigStatsGraphCardProps) {
  const apiUrl = import.meta.env.VITE_API_URL;
  const [appointments, setAppointments] = useState<FormattedData[]>([]);

  useEffect(() => {
    function parseFrenchDate(dateStr: string): Date {
      const months: { [key: string]: number } = {
        janv: 0,
        févr: 1,
        mars: 2,
        avr: 3,
        mai: 4,
        juin: 5,
        juil: 6,
        août: 7,
        sept: 8,
        oct: 9,
        nov: 10,
        déc: 11,
      };

      const [day, monthStr] = dateStr.toLowerCase().replace(".", "").split(" ");
      const currentYear = new Date().getFullYear();
      const month = months[monthStr] !== undefined ? months[monthStr] : 0;

      return new Date(currentYear, month, Number.parseInt(day, 10));
    }

    fetch(`${apiUrl}/api/appointements`)
      .then((res) => res.json())
      .then((rawData: RawAppointment[]) => {
        const countsByDate = rawData.reduce<{ [key: string]: number }>(
          (acc, app) => {
            const dateObj = new Date(app.appointment_date);
            const formattedDate = dateObj.toLocaleDateString("fr-FR", {
              day: "numeric",
              month: "short",
            });

            acc[formattedDate] = (acc[formattedDate] || 0) + 1;

            return acc;
          },
          {},
        );

        const chartData: FormattedData[] = Object.keys(countsByDate).map(
          (date) => {
            return {
              date: date,
              value: countsByDate[date],
            };
          },
        );

        chartData.sort((a, b) => {
          const dateA = parseFrenchDate(a.date);
          const dateB = parseFrenchDate(b.date);
          return dateA.getTime() - dateB.getTime();
        });

        setAppointments(chartData);
      })
      .catch((err) => console.error("Erreur fetch appointments:", err));
  }, []);
  return (
    <div className="BigStatsGraphCard-main">
      <div className="BigStatsGraphCard-upper">
        <h2>{title}</h2>
      </div>

      <div className="BigStatsGraphCard-graph">
        <ResponsiveContainer width="100%" height={200}>
          <AreaChart
            data={appointments}
            margin={{ top: 10, right: 10, left: -20, bottom: 0 }}
          >
            <CartesianGrid vertical={false} stroke="var(--gray-100)" />

            <XAxis
              dataKey="date"
              tickLine={false}
              axisLine={false}
              dy={10}
              style={{ fontSize: "12px", fill: "var(--gray-300)" }}
            />

            <YAxis
              tickLine={false}
              axisLine={false}
              domain={[0, "dataMax + 2"]}
            />

            <Tooltip
              content={<CustomTooltip />}
              cursor={{
                stroke: "var(--gold)",
                strokeWidth: 1,
                strokeDasharray: "4 4",
              }}
            />

            <Area
              type="monotone"
              dataKey="value"
              stroke="var(--gold)"
              strokeWidth={2}
              fill="transparent"
              dot={{
                r: 4,
                stroke: "var(--gold)",
                strokeWidth: 2,
                fill: "var(--white)",
              }}
              activeDot={{
                r: 6,
                stroke: "var(--gold)",
                strokeWidth: 2,
                fill: "var(--gold)",
              }}
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}

type TooltipProps = {
  active?: boolean;
  payload?: Array<{ value: number; payload: { date: string } }>;
};

function CustomTooltip({ active, payload }: TooltipProps) {
  if (active && payload?.length) {
    return (
      <div className="BigStatsGraphCard-tooltip-box">
        <p className="BigStatsGraphCard-tooltip-date">
          {payload[0].payload.date}
        </p>
        <p className="BigStatsGraphCard-tooltip-value">
          <strong>{payload[0].value}</strong> réservations
        </p>
      </div>
    );
  }
  return null;
}

export default BigStatsGraphCard;
