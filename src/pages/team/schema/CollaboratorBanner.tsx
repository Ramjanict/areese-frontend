import CommonButton from "@/components/shared/CommonButton";
import { brandColors } from "@/components/shared/StatCards";
import { inputClass } from "@/features/task/CreateDashboardForm";
import CollaboratorCard from "@/features/teamAccess/CollaboratorCard";
import {
  copyToClipboard,
  type User,
} from "@/features/teamAccess/TeamAccessPage";
import { useState } from "react";
import { FiUsers } from "react-icons/fi";
import CollaboratorModal from "../../../components/teamDashboard/CollaboratorModal";
const CollaboratorBanner = () => {
  const [isCollaboratorOpen, setIsCollaboratorOpen] = useState(false);
  const [collaborators, setCollaborators] = useState<User[]>([]);

  return (
    <div>
      <div className="flex flex-col md:flex-row md:items-center justify-between bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 gap-4">
        <div className="flex  md:items-center md:gap-3 ">
          <div className="w-9 h-9 rounded-full bg-orange-50 flex items-center justify-center shrink-0">
            <FiUsers size={16} className="text-cta" />
          </div>
          <div>
            <p className="text-sm font-semibold text-slate-700">
              Add Collaborators{" "}
              <span className="font-normal text-text/50 text-xs">
                (After Saving)
              </span>
            </p>
            <p className="text-xs text-slate-500">
              You can add up to 10 collaborators after this dashboard is saved.
            </p>
          </div>
        </div>
        <div className=" md:text-right shrink-0 ml-4">
          <CommonButton onClick={() => setIsCollaboratorOpen(true)}>
            <FiUsers size={12} />
            Add Collaborators
          </CommonButton>

          <p className="text-xs text-text/50 mt-2">Available after save</p>
        </div>
      </div>

      {isCollaboratorOpen && (
        <CollaboratorModal
          setIsCollaboratorOpen={setIsCollaboratorOpen}
          setCollaborators={setCollaborators}
          collaborators={collaborators}
        />
      )}

      <div className="mt-5 space-y-3 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
        {collaborators.map((c, i) => {
          const bgColor = brandColors[i % brandColors.length];

          return (
            <CollaboratorCard
              key={c.id}
              c={c}
              i={i}
              bgColor={bgColor}
              inputClass={inputClass}
              copyToClipboard={copyToClipboard}
            />
          );
        })}
      </div>
    </div>
  );
};

export default CollaboratorBanner;
