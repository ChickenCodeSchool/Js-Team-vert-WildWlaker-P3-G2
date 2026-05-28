import type { IconType } from "react-icons";
import { Area, AreaChart, ResponsiveContainer } from "recharts";
import "./StatsGraphCard.css";

const data = [
  { value: 10 },
  { value: 25 },
  { value: 20 },
  { value: 75 },
  { value: 15 },
  { value: 40 },
  { value: 100 },
];
type StatsGraphCardProps = {
  Icon: IconType;
  title: string;
  value: string;
  evolution: string;
};
function StatsGraphCard({
  Icon,
  title,
  value,
  evolution,
}: StatsGraphCardProps) {
  return (
    <div className="StatsGraphCard-main">
      <div className="StatsGraphCard-upper">
        <Icon className="StatsGraphCard-icon" />
        <div className="StatsGraphCard-info">
          <h2>{title}</h2>
          <span className="StatsGraphCard-value">{value}</span>
          <span className="StatsGraphCard-evolution">{evolution}</span>
          <p>VS semaine précédente</p>
        </div>
      </div>

      <div className="StatsGraphCard-graph">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart
            data={data}
            margin={{ top: 0, right: 0, left: 0, bottom: 0 }}
          >
            <Area
              type="monotone"
              dataKey="value"
              stroke="var(--gold)"
              strokeWidth={1.5}
              fill="transparent"
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}

export default StatsGraphCard;
