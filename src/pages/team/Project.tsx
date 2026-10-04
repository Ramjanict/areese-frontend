import CommonHeader from "@/components/shared/CommonHeader";
import DashboardTopSection from "@/components/shared/DashboardTopSection";
import Pagination from "@/components/shared/Pagination";
import { setTeam } from "@/store/dashboardStore/dashboardSlice";
import { ChevronRight } from "lucide-react";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";

export interface Team {
  id: string;
  name: string;
  description: string;
  members: number;
  startDate: string;
  endDate: string;
  color: string;
}

const colors = [
  "#D4AF37",
  "#9FD6D2",
  "#F6B8A6",
  "#A8D5BA",
  "#D291BC",
  "#C5B4E3",
  "#F4A7A7",
  "#F9E79F",
  "#4DB6AC",
  "#D3D3E3",
  "#E0E0E0",
];

const teams: Team[] = Array.from({ length: 20 }, (_, i) => ({
  id: String(i + 1),
  name: i === 0 ? "Admin Team Dashboard" : `Collaborator ${i} Team Dashboard`,
  description: "Manage tasks, collaboration, and project tracking efficiently.",
  members: Math.floor(Math.random() * 10) + 3,
  startDate: "Apr 1, 2026",
  endDate: "Jun 30, 2026 at 5:00 PM",
  color: colors[i % colors.length],
}));

interface TeamsListProps {
  buttonText?: string;
}
const Project: React.FC<TeamsListProps> = ({
  buttonText = "View Team Archive",
}) => {
  const [currentPage, setCurrentPage] = useState(1);

  const itemsPerPage = 6;
  const totalPages = Math.ceil(teams.length / itemsPerPage);

  const startIndex = (currentPage - 1) * itemsPerPage;
  const currentTeams = teams.slice(startIndex, startIndex + itemsPerPage);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleTeam = (team: Team) => {
    dispatch(setTeam(team));
  };
  return (
    <div className="space-y-6">
      <DashboardTopSection
        title="View Teams"
        description="Click the project you want to view."
        buttonText={buttonText}
        action={() => navigate("/admin/team-archive")}
      />

      <div className="space-y-4">
        {currentTeams.map((team) => (
          <Link
            to={`../project/team/${team.id}`}
            onClick={() => handleTeam(team)}
            key={team.id}
            style={{ backgroundColor: team.color }}
            className="rounded-lg border border-border p-6 flex items-center justify-between cursor-pointer"
          >
            <div className=" grid grid-cols-5  w-full gap-1 md:gap-6">
              <div className="col-span-3 sm:col-span-2  space-y-1 md:border-r-2 border-text/10">
                <CommonHeader size="lg"> {team.name}</CommonHeader>
                <CommonHeader size="sm">{team.description}</CommonHeader>
              </div>

              <div className="space-y-1 md:border-r-2 border-text/10 hidden sm:block">
                <p className="text-text/50">Members</p>
                <p className="font-semibold text-gray-900">
                  {team.members} Members
                </p>
                <button className="text-info  font-medium text-xs mt-1">
                  View Team
                </button>
              </div>

              <div className="space-y-1 md:border-r-2 border-text/10">
                <p className="text-text/50">Start Date</p>
                <CommonHeader>{team.startDate}</CommonHeader>
              </div>
              <div className="flex justify-between  ">
                <div className="space-y-1">
                  <p className="text-text/50">End Date</p>
                  <CommonHeader>{team.endDate}</CommonHeader>
                </div>
                <div className="ml-6 shrink-0  self-center hidden md:block">
                  <ChevronRight className="w-6 h-6 text-text/50" />
                </div>
              </div>
            </div>
          </Link>
        ))}

        {currentTeams.length > 0 && (
          <div className="py-6">
            <Pagination
              currentPage={currentPage}
              totalPages={totalPages}
              onPageChange={setCurrentPage}
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default Project;
