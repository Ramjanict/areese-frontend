import CommonButton from "@/components/shared/CommonButton";
import type { FC } from "react";
import type { DashboardList } from "./schema/Schema";

interface ProjectDetailsModalProps {
  isOpen: boolean;
  onClose: () => void;
  project: DashboardList | null;
}

const ProjectDetailsModal: FC<ProjectDetailsModalProps> = ({
  isOpen,
  onClose,
  project,
}) => {
  if (!isOpen || !project) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4">
      <div className="bg-white w-full max-w-md rounded-xl p-6 shadow-lg">
        <h2 className="text-lg font-semibold mb-4">Project Details</h2>

        <div className="space-y-3 text-sm">
          <div>
            <span className="font-medium">Project Name:</span>{" "}
            {project.projectName}
          </div>

          <div>
            <span className="font-medium">Project Type:</span>{" "}
            {project.projectType}
          </div>

          <div>
            <span className="font-medium">Start Date:</span> {project.startDate}
          </div>

          <div>
            <span className="font-medium">Start Time:</span> {project.startTime}
          </div>

          <div>
            <span className="font-medium">End Date:</span> {project.endDate}
          </div>

          <div>
            <span className="font-medium">End Time:</span> {project.endTime}
          </div>

          <div>
            <span className="font-medium">Keypoints:</span>

            <ul className="list-disc pl-5 mt-1 space-y-1">
              {project.keypoints.map((item, index) => (
                <li key={index}>{item.value}</li>
              ))}
            </ul>
          </div>

          {project.shortNote && (
            <div>
              <span className="font-medium">Short Note:</span>{" "}
              {project.shortNote}
            </div>
          )}
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

export default ProjectDetailsModal;
