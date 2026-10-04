interface StatCardProps {
  data: {
    label: string;
    value: number;
  };

  bgColor: string;
}

const StatCard: React.FC<StatCardProps> = ({ data, bgColor }) => {
  return (
    <div className={` rounded-xl border border-border p-4 ${bgColor}`}>
      <p className="text-xs text-text mb-2">{data.label}</p>
      <p className={`text-2xl font-bold`}>{data.value}</p>
    </div>
  );
};

export default StatCard;
