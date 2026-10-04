import CardAction from "@/components/shared/CardAction";
import CommonHeader from "@/components/shared/CommonHeader";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import { setDashboard } from "@/store/dashboardStore/dashboardSlice";
import { format } from "date-fns";
import { Clock } from "lucide-react";
import React, { useState } from "react";
import { LuCalendarDays, LuDot } from "react-icons/lu";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import DashboardDetailsModal from "./DashboardDetailsModal";

export interface DashboardType {
  id: string;
  type: "Due Today" | "late" | "Upcoming" | "Follow Up" | "Completed";
  title: string;
  description: string[];
  timestamp: Date;
  icon?: React.ReactNode;
  invitees: string;
  taskType: string;
  videoPlatform: string;
  endDate: string;
  resources: string;
  tags: string;
  repeat: string;
  reminder: string;
}

interface ActivityFeedProps {
  activities: DashboardType[];
  title?: string;
  onDelete?: (id: string) => void;
  setSelectedDashboardType: React.Dispatch<
    React.SetStateAction<DashboardType | null>
  >;
}

const iconColors: Record<DashboardType["type"], string> = {
  "Due Today": "bg-today-accent text-white",
  late: "bg-late-accent text-white",
  Upcoming: "bg-upcoming-accent text-white",
  "Follow Up": "bg-followup-accent text-white ",
  Completed: "bg-completed-accent text-white ",
};
const bgColors: Record<DashboardType["type"], string> = {
  "Due Today": "bg-today-bg",
  late: "bg-late-bg",
  Upcoming: "bg-upcoming-bg",
  "Follow Up": "bg-followup-bg ",
  Completed: "bg-completed-bg ",
};

const DashBoardCard: React.FC<ActivityFeedProps> = ({
  activities,
  onDelete,
  setSelectedDashboardType,
}) => {
  const navigate = useNavigate();

  const dispatch = useDispatch();

  const handleSelectDashboard = (Dashboard: DashboardType) => {
    dispatch(setDashboard(Dashboard));
    navigate("/admin/follow-ups");
  };
  const [selectedDashboard, setSelectedDashboard] =
    useState<DashboardType | null>(null);
  return (
    <div>
      {activities.length > 0 ? (
        <div className="space-y-4 grid grid-cols-1 md:grid-cols-2 gap-4">
          {activities.map((activity) => {
            return (
              <div
                key={activity.id}
                className={cn(
                  "rounded-lg p-4 transition-all border border-border  h-full",
                  bgColors[activity.type],
                )}
              >
                <div className="flex items-start gap-4">
                  <div
                    className={cn(
                      "mt-1 shrink-0 p-2 rounded-md flex items-center justify-center",
                      iconColors[activity.type],
                    )}
                  >
                    {activity.icon}
                  </div>

                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between gap-2">
                      <div className="flex-1">
                        <div className="flex items-center justify-between gap-2">
                          <CommonHeader size="md">
                            {activity.title}
                          </CommonHeader>
                          <div className="flex gap-2">
                            <CardAction
                              onEdit={() => setSelectedDashboardType(activity)}
                              onDelete={() => onDelete?.(activity.id)}
                              onDetails={() => setSelectedDashboard(activity)}
                            />

                            <button
                              onClick={() => handleSelectDashboard(activity)}
                              className="text-cta p-1 rounded-md cursor-pointer border border-cta hover:bg-cta hover:text-white transition-all"
                            >
                              F/U
                            </button>
                          </div>
                        </div>
                        <div className="py-4">
                          {activity.description.map((item, index) => (
                            <CommonHeader key={index} size="sm">
                              <span className="text-2xl">
                                <LuDot />
                              </span>
                              {item}
                            </CommonHeader>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="flex justify-between">
                  <div className="flex items-center shrink-0 gap-1 text-right">
                    <span>
                      <LuCalendarDays className="text-xl" />
                    </span>
                    <p className="text-xs font-medium text-text">
                      {format(activity.timestamp, "MMM dd, yyyy")}
                    </p>
                  </div>
                  <Badge
                    className={cn(
                      "text-xs font-medium border cursor-pointer",
                      iconColors[activity.type],
                    )}
                  >
                    {activity.type}
                  </Badge>
                </div>
              </div>
            );
          })}
        </div>
      ) : (
        <div className="py-8 text-center">
          <Clock className="mx-auto h-12 w-12 text-text/30" />
          <p className="mt-2 text-sm text-text/50">No dashboard found</p>
        </div>
      )}

      {
        <DashboardDetailsModal
          isOpen={!!selectedDashboard}
          onClose={() => {
            setSelectedDashboard(null);
          }}
          dashboard={selectedDashboard}
        />
      }
    </div>
  );
};

export default DashBoardCard;
