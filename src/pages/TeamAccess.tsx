import DashboardCreationForm from "@/components/teamDashboard/DashboardCreationForm";
import InviteCollaborators from "@/components/teamDashboard/InviteCollaborators";
import { useState } from "react";

const TeamAccess = () => {
  const [isCollaboratorOpen, setIsCollaboratorOpen] = useState(false);

  return (
    <div className="space-y-6 w-full ">
      <div>
        {!isCollaboratorOpen ? (
          <DashboardCreationForm
            setIsCollaboratorOpen={setIsCollaboratorOpen}
          />
        ) : (
          <InviteCollaborators setIsCollaboratorOpen={setIsCollaboratorOpen} />
        )}
      </div>
    </div>
  );
};

export default TeamAccess;
