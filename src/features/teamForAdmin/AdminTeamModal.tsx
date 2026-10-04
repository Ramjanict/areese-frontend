import type { project } from "@/components/collaboratorDashboard/ProjectCard";
import CommonButton from "@/components/shared/CommonButton";
import type { FC } from "react";

interface TaskModalProps {
  isOpen: boolean;
  onClose: () => void;
  selectedDashboard: project | null;
}

const AdminTeamModal: FC<TaskModalProps> = ({
  isOpen,
  onClose,
  selectedDashboard,
}) => {
  if (!isOpen || !selectedDashboard) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4">
      <div className="bg-white w-full max-w-md rounded-xl p-6 shadow-lg">
        <h2 className="text-lg font-semibold mb-4">Team Details</h2>

        <div className="space-y-3 text-sm">
          <div>
            <span className="font-medium">Title:</span>{" "}
            {selectedDashboard.title}
          </div>

          <div>
            <span className="font-medium">Person:</span>{" "}
            {selectedDashboard.personName}
          </div>

          <div>
            <span className="font-medium">Role:</span> {selectedDashboard.role}
          </div>

          <div>
            <span className="font-medium">Date:</span> {selectedDashboard.date}
          </div>

          <div>
            <span className="font-medium">Key Points:</span>
            <ul className="list-disc pl-5 mt-1">
              {selectedDashboard.keyPoints.map((point, index) => (
                <li key={index}>{point}</li>
              ))}
            </ul>
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

export default AdminTeamModal;
