import CommonButton from "@/components/shared/CommonButton";
import { brandColors } from "@/components/shared/StatCards";
import StatCard from "./StatCard";

const cards = [
  {
    title: "Daily Snapshot",
    updated: "09/01/2026, 12:26:16",
    stats: [
      { label: "Total Tasks Created Today", value: 0 },
      { label: "Tasks Completed Today", value: 0 },
      { label: "Tasks Due Today", value: 0 },
      { label: "Tasks Marked Late Today", value: 0 },
      { label: "Follow-ups Created Today", value: 0 },
    ],
  },
  {
    title: "Weekly Summary",
    updated: "01/01/2026, 12:26:16",
    stats: [
      {
        label: "Total Tasks Created This Week",
        value: 1,
      },
      {
        label: "Total Tasks Completed This Week",
        value: 0,
      },
      { label: "Total Overdue Tasks This Week", value: 1 },
      {
        label: "Total Follow-ups Created This Week",
        value: 0,
      },
    ],
  },
  {
    title: "Monthly Overview",
    updated: "07/07/2026, 05:34:12",
    stats: [
      {
        label: "Total Tasks Created This Month",
        value: 2,
      },
      {
        label: "Total Tasks Completed This Month",
        value: 0,
      },
      { label: "Total Overdue Tasks This Month", value: 1 },
      {
        label: "Total Follow-ups Created This Month",
        value: 0,
      },
    ],
  },
  {
    title: "Yearly Overview",
    updated: "05/05/2026, 05:34:12",
    stats: [
      {
        label: "Total Tasks Created This Year",
        value: 12,
      },
      {
        label: "Total Tasks Completed This Year",
        value: 10,
      },
      { label: "Total Overdue Tasks This Year", value: 1 },
      {
        label: "Total Follow-ups Created This Year",
        value: 50,
      },
    ],
  },
];
const AnalyticsPanel = () => {
  return (
    <div className="space-y-6">
      <div className="bg-brand rounded-2xl border border-border shadow-sm p-6">
        <p className="text-sm text-text mb-4">
          On-demand only: click "Refresh" buttons to update metrics. No
          auto-refresh to save bandwidth.
        </p>
        <div className="flex flex-col sm:flex-row gap-3 ">
          <CommonButton>Refresh All Analytics</CommonButton>
          <CommonButton>Print All Reports</CommonButton>
        </div>
      </div>

      {cards.map((section) => {
        return (
          <div
            key={section.title}
            className="bg-white rounded-2xl border border-border shadow-sm p-6"
          >
            <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-4 gap-2">
              <h3 className="font-bold text-text">{section.title}</h3>
              <div className="flex gap-2">
                <CommonButton>Print</CommonButton>
                <CommonButton>Refresh</CommonButton>
              </div>
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
              {section.stats.map((s, i) => {
                const bgColor = brandColors[i % brandColors.length];

                return <StatCard key={s.label} data={s} bgColor={bgColor} />;
              })}
            </div>
            <p className="text-xs text-text mt-3">
              Last updated: {section.updated}
            </p>
          </div>
        );
      })}
    </div>
  );
};

export default AnalyticsPanel;
