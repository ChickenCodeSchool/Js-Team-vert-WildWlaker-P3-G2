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

const data = [
  { date: "20 Mai", value: 38 },
  { date: "21 Mai", value: 28 },
  { date: "22 Mai", value: 42 },
  { date: "23 Mai", value: 35 },
  { date: "24 Mai", value: 62 },
  { date: "25 Mai", value: 45 },
  { date: "26 Mai", value: 55 },
];

type BigStatsGraphCardProps = {
  title: string;
};

function BigStatsGraphCard({ title }: BigStatsGraphCardProps) {
  return (
    <div className="BigStatsGraphCard-main">
      <div className="BigStatsGraphCard-upper">
        <h2>{title}</h2>
      </div>

      <div className="BigStatsGraphCard-graph">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart
            data={data}
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
              domain={[0, "dataMax + 20"]}
              style={{ fontSize: "12px", fill: "var(--gray-300)" }}
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
