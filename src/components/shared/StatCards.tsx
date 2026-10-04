import { cn } from "@/lib/utils";
import React from "react";

export interface StatCard {
  id: string;
  label: string;
  value: string | number;
  trend?: {
    value: number;
    isPositive: boolean;
  };
  icon?: React.ReactNode;
  iconBg?: string;
  iconColor?: string;
}

interface StatCardsProps {
  stats: StatCard[];
}

export const brandColors = [
  "bg-today-bg",
  "bg-followup-bg",
  "bg-late-bg",
  "bg-upcoming-bg",
];
export const StatCards: React.FC<StatCardsProps> = ({ stats }) => {
  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
      {stats.map((stat, i) => {
        const bgColor = brandColors[i % brandColors.length];
        return (
          <div
            key={stat.id}
            className={`group relative overflow-hidden rounded-xl border border-border ${bgColor}  p-6 transition-all `}
          >
            <div
              className={cn(
                "absolute right-0 top-0 h-24 w-24 rounded-full opacity-10 transition-transform",
                "group-hover:scale-110",
              )}
            />

            <div className="relative z-10">
              <div className="flex items-start justify-between">
                {stat.icon && (
                  <div
                    className={`rounded-lg p-3 ${stat.iconBg} ${stat.iconColor} `}
                  >
                    <div className={cn("h-5 w-5")}>{stat.icon}</div>
                  </div>
                )}
              </div>

              <div className="mt-4">
                <p className="text-sm font-medium text-text">{stat.label}</p>
                <p className="mt-2 text-3xl font-bold text-text">
                  {stat.value}
                </p>
              </div>

              <p className="mt-4 text-xs text-text">vs. last month</p>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default StatCards;
