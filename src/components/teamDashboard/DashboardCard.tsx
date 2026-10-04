import { FiUsers } from "react-icons/fi";
import ActionButton from "../shared/ActionButton";
import CommonButton from "../shared/CommonButton";
import CommonHeader from "../shared/CommonHeader";
import type { DashboardList } from "./schema/Schema";

interface DashboardCardProps {
  data: DashboardList;
  onEdit?: () => void;
  onDetails?: () => void;
  onUpdate?: () => void;
  onDelete?: () => void;
  collaboratorCount?: number;
  maxCollaborators?: number;
  progressPercentage?: number;
  role?: string;
  setIsCollaboratorOpen: (open: boolean) => void;
}

const DashboardCard: React.FC<DashboardCardProps> = ({
  data,
  onEdit,
  onDelete,
  onDetails,
  collaboratorCount = 2,
  maxCollaborators = 10,
  progressPercentage = 35,
  role = "Admin",
  setIsCollaboratorOpen,
}) => {
  return (
    <>
      <div className="bg-white border border-gray-200 rounded-lg p-6 shadow-sm hover:shadow-md transition-all">
        <div className="flex items-start justify-between mb-4">
          <div className="flex-1">
            <div className="flex items-center gap-2 mb-2">
              <span className="inline-block bg-teal-100 text-teal-700 text-xs font-semibold px-2.5 py-1 rounded-md">
                {role}
              </span>
              <span className="text-xs text-text/50">Project owner</span>
            </div>
            <CommonHeader size="lg">{data.projectName}</CommonHeader>
          </div>
          <div className="flex gap-2 ml-4">
            <ActionButton type="view" action={onDetails} />
            <ActionButton type="edit" action={onEdit} />
            <ActionButton type="reload" action={() => {}} />
            <ActionButton type="delete" action={onDelete} />
          </div>
        </div>

        {/* Progress Bar */}
        <div className="mb-6">
          <div className="w-full bg-bg rounded-full h-1.5 overflow-hidden">
            <div
              className="bg-cta h-full transition-all duration-300"
              style={{ width: `${progressPercentage}%` }}
            />
          </div>
          <p className="text-xs text-text/50 mt-1">
            {progressPercentage}% complete
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
          {/* Start Date */}
          <div className="bg-gray-50 rounded-lg p-4">
            <p className="text-xs font-medium text-text/50 mb-1">Start date</p>
            <p className="text-base font-semibold text-text">
              {data.startDate}
            </p>
          </div>

          {/* End Date */}
          <div className="bg-gray-50 rounded-lg p-4">
            <p className="text-xs font-medium text-text/50 mb-1">End date</p>
            <p className="text-base font-semibold text-text">{data.endDate}</p>
          </div>

          {/* Project Type */}
          <div className="bg-gray-50 rounded-lg p-4">
            <p className="text-xs font-medium text-text/50 mb-1">
              Project type
            </p>
            <p className="text-base font-semibold text-text">
              {data.projectType}
            </p>
          </div>

          <div className="bg-gray-50 rounded-lg p-4">
            <p className="text-xs font-medium text-text/50 mb-1">
              Collaborators
            </p>
            <p className="text-base font-semibold text-text">
              {collaboratorCount} of {maxCollaborators}
            </p>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row  md:items-center justify-between bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 gap-4">
          <div className="flex   ">
            <div
              onClick={() => setIsCollaboratorOpen(true)}
              className="cursor-pointer"
            >
              <p className="text-sm font-semibold text-text">
                Add Collaborators
              </p>
              <p className="text-xs text-text/50">
                You can add up to 10 collaborators
              </p>
            </div>
          </div>
          <div className=" w-full! sm:w-auto!">
            <CommonButton
              className=" w-full! sm:w-auto!"
              onClick={() => setIsCollaboratorOpen(true)}
            >
              <FiUsers size={12} />
              Add Collaborators
            </CommonButton>
          </div>
        </div>
      </div>
    </>
  );
};

export default DashboardCard;
