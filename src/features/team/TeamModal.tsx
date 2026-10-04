import CommonButton from "@/components/shared/CommonButton";
import type { Team } from "@/pages/team/Project";
import type { FC } from "react";

interface TeamModalProps {
  isOpen: boolean;
  onClose: () => void;
  team: Team | null;
}

const TeamModal: FC<TeamModalProps> = ({ isOpen, onClose, team }) => {
  if (!isOpen || !team) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4">
      <div className="bg-white w-full max-w-md rounded-xl p-6 shadow-lg">
        <h2 className="text-lg font-semibold mb-4">Team Details</h2>

        <div className="space-y-3 text-sm">
          <div>
            <span className="font-medium">Name:</span> {team.name}
          </div>

          <div>
            <span className="font-medium">Description:</span> {team.description}
          </div>

          <div>
            <span className="font-medium">Members:</span> {team.members}
          </div>

          <div>
            <span className="font-medium">Start Date:</span> {team.startDate}
          </div>

          <div>
            <span className="font-medium">End Date:</span> {team.endDate}
          </div>
        </div>

        <div className="mt-6 flex justify-end">
          <CommonButton onClick={onClose} variant="secondary">
            Close
          </CommonButton>
        </div>
      </div>
    </div>
  );
};

export default TeamModal;
