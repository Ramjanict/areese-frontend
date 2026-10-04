import CommonButton from "@/components/shared/CommonButton";
import type { DashboardType } from "@/features/dashboard/DashBoardCard";
import type { FC } from "react";

interface DashboardDetailsModalProps {
  isOpen: boolean;
  onClose: () => void;
  dashboard: DashboardType | null;
}

const DashboardDetailsModal: FC<DashboardDetailsModalProps> = ({
  isOpen,
  onClose,
  dashboard,
}) => {
  if (!isOpen || !dashboard) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4">
      <div className="bg-white w-full max-w-md rounded-xl p-6 shadow-lg">
        <h2 className="text-lg font-semibold mb-4">Dashboard Details</h2>

        <div className="space-y-3 text-sm">
          <div>
            <span className="font-medium">Title:</span> {dashboard.title}
          </div>

          <div>
            <span className="font-medium">Type:</span> {dashboard.type}
          </div>

          <div>
            <span className="font-medium">Task Type:</span> {dashboard.taskType}
          </div>

          <div>
            <span className="font-medium">Invitees:</span> {dashboard.invitees}
          </div>

          <div>
            <span className="font-medium">Video Platform:</span>{" "}
            {dashboard.videoPlatform}
          </div>

          <div>
            <span className="font-medium">End Date:</span> {dashboard.endDate}
          </div>

          <div>
            <span className="font-medium">Resources:</span>{" "}
            <a
              href={dashboard.resources}
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-500 underline break-all"
            >
              {dashboard.resources}
            </a>
          </div>

          <div>
            <span className="font-medium">Tags:</span> {dashboard.tags}
          </div>

          <div>
            <span className="font-medium">Repeat:</span> {dashboard.repeat}
          </div>

          <div>
            <span className="font-medium">Reminder:</span> {dashboard.reminder}
          </div>

          <div>
            <span className="font-medium">Description:</span>

            <ul className="list-disc pl-5 mt-1 space-y-1">
              {dashboard.description.map((item, index) => (
                <li key={index}>{item}</li>
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

export default DashboardDetailsModal;
