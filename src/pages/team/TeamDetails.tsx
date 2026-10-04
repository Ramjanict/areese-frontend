import ActionButton from "@/components/shared/ActionButton";
import CommonHeader from "@/components/shared/CommonHeader";
import DashboardTopSection from "@/components/shared/DashboardTopSection";
import CreateDashboardForm from "@/features/task/CreateDashboardForm";
import TeamModal from "@/features/team/TeamModal";
import type { RootState } from "@/store/store";
import { useState } from "react";
import { IoIosArrowBack } from "react-icons/io";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const TeamDetails = () => {
  const dashboardsData = [
    {
      id: 1,
      title: "Admin Dashboard",
      role: "Role: Admin",
      bgColor: "bg-[#D4AF37]",
      borderColor: "border-[#D4AF37]",
      isAdmin: true,
    },
    {
      id: 2,
      title: "Collaborator 1 Dashboard",
      role: "Role: Collaborator",
      bgColor: "bg-[#9FD6D2]",
      borderColor: "border-[#9FD6D2]",
    },
    {
      id: 3,
      title: "Collaborator 2 Dashboard",
      role: "Role: Collaborator",
      bgColor: "bg-[#F6B8A6]",
      borderColor: "border-[#F6B8A6]",
    },
    {
      id: 4,
      title: "Collaborator 3 Dashboard",
      role: "Role: Collaborator",
      bgColor: "bg-[#A8D5BA]",
      borderColor: "border-[#A8D5BA]",
    },
    {
      id: 5,
      title: "Collaborator 4 Dashboard",
      role: "Role: Collaborator",
      bgColor: "bg-[#D291BC]",
      borderColor: "border-[#D291BC]",
    },
    {
      id: 6,
      title: "Collaborator 5 Dashboard",
      role: "Role: Collaborator",
      bgColor: "bg-[#C5B4E3]",
      borderColor: "border-[#C5B4E3]",
    },
    {
      id: 7,
      title: "Collaborator 6 Dashboard",
      role: "Role: Collaborator",
      bgColor: "bg-[#F4A7A7]",
      borderColor: "border-[#F4A7A7]",
    },
    {
      id: 8,
      title: "Collaborator 7 Dashboard",
      role: "Role: Collaborator",
      bgColor: "bg-[#F9E79F]",
      borderColor: "border-[#F9E79F]",
    },
    {
      id: 9,
      title: "Collaborator 8 Dashboard",
      role: "Role: Collaborator",
      bgColor: "bg-[#4DB6AC]",
      borderColor: "border-[#4DB6AC]",
    },
    {
      id: 10,
      title: "Collaborator 9 Dashboard",
      role: "Role: Collaborator",
      bgColor: "bg-[#D3D3E3]",
      borderColor: "border-[#D3D3E3]",
    },
    {
      id: 11,
      title: "Collaborator 10 Dashboard",
      role: "Role: Collaborator",
      bgColor: "bg-[#E0E0E0]",
      borderColor: "border-[#E0E0E0]",
    },
  ];

  const navigate = useNavigate();
  const [dashboards, setDashboards] = useState(dashboardsData);
  const [isTeamOpen, setIsTeamOpen] = useState(false);
  const [selectedDashboard, setSelectedDashboard] = useState(null);

  const handleDelete = (id: number) => {
    setDashboards((prev) => prev.filter((dashboard) => dashboard.id !== id));
  };

  const { team: selectedTeam } = useSelector(
    (state: RootState) => state.dashboard,
  );

  const [isDashboardOpen, setIsDashboardOpen] = useState(false);
  return (
    <div className="space-y-6">
      <DashboardTopSection
        title="View Teams"
        description="View and manage all your teams efficiently"
        icon={IoIosArrowBack}
        buttonText="Back to Teams"
        action={() => navigate(-1)}
      />
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 pb-6">
        {dashboards.map((dashboard) => (
          <div
            key={dashboard.id}
            className={`${dashboard.bgColor} ${dashboard.borderColor} border-2 rounded-xl p-6 hover:shadow-lg transition`}
          >
            <div className="mb-6">
              <CommonHeader size="lg">{dashboard.title}</CommonHeader>
              <CommonHeader size="sm">{dashboard.role}</CommonHeader>
            </div>

            <div className="flex gap-2 flex-wrap">
              <ActionButton type="view" action={() => setIsTeamOpen(true)} />
              <ActionButton
                type="edit"
                action={() => {
                  setIsDashboardOpen(true);
                  setSelectedDashboard(dashboard as any);
                }}
              />
              <ActionButton type="reload" action={() => {}} />

              {dashboard.isAdmin && (
                <>
                  <ActionButton
                    type="delete"
                    action={() => {
                      handleDelete(dashboard.id);
                    }}
                  />
                  <ActionButton
                    type="add"
                    action={() => {
                      {
                      }
                    }}
                  />
                  <ActionButton
                    type="remove"
                    action={() => {
                      {
                      }
                    }}
                  />
                  <ActionButton
                    type="extend"
                    action={() => {
                      setIsDashboardOpen(true);
                      setSelectedDashboard(dashboard as any);
                    }}
                  />
                </>
              )}
            </div>
          </div>
        ))}
      </div>
      {/* {isCollaboratorOpen && (
        <CollaboratorModal setIsCollaboratorOpen={setIsCollaboratorOpen} />
      )} */}
      {selectedTeam && (
        <TeamModal
          isOpen={isTeamOpen}
          onClose={() => setIsTeamOpen(false)}
          team={selectedTeam}
        />
      )}
      div
      {isDashboardOpen && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className=" p-6 w-full max-w-3xl">
            <CreateDashboardForm
              dashboard={selectedDashboard}
              onClose={() => setIsDashboardOpen(false)}
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default TeamDetails;
