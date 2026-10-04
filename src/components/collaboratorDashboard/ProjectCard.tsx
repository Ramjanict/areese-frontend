import CommonHeader from "@/components/shared/CommonHeader";
import type { RootState } from "@/store/store";
import { FaRegUser } from "react-icons/fa";
import { LiaCalendarAlt } from "react-icons/lia";
import { RiHandbagLine } from "react-icons/ri";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import ActionButton from "../shared/ActionButton";

const bgColors = [
  "bg-today-bg",
  "bg-late-bg",
  "bg-upcoming-bg",
  "bg-followup-bg ",
  "bg-completed-bg ",
];
const iconColors = [
  "bg-today-accent text-white",
  "bg-late-accent text-white",
  "bg-upcoming-accent text-white",
  "bg-followup-accent text-white ",
  "bg-completed-accent text-white ",
];
export interface project {
  id?: number;
  title: string;
  personName: string;
  role: string;
  keyPoints: string[];
  icon?: React.ReactNode;
  date: string;
  projectType?: string;
  startDate?: string;
  startTime?: string;
  endDate?: string;
  endTime?: string;
  resourceLink?: string;
  shortNote?: string;
  keypoints?: string[];
}

interface ProjectCardProps {
  task: project;
  i: number;
  action: () => void;
  onDelete?: (id: number) => void;
}
const titleColors = [
  "text-today-accent ",
  "text-late-accent ",
  "text-upcoming-accent ",
  "text-followup-accent  ",
  "text-completed-accent  ",
];
const ProjectCard: React.FC<ProjectCardProps> = ({
  task,
  i,
  action,
  onDelete,
}) => {
  const cfg = bgColors[i % bgColors.length];
  const navigate = useNavigate();
  const { role } = useSelector((state: RootState) => state.dashboard);

  console.log("role", role);

  return (
    <div key={i} className={`rounded-2xl p-4 w-full ${cfg} `}>
      <div className="flex flex-col sm:flex-row  justify-between items-start mb-3 gap-3">
        <div className="flex gap-3 items-center">
          <div
            className={`w-10 h-10 rounded-xl flex items-center justify-center text-white ${iconColors[i % iconColors.length]}`}
          >
            {task.icon}
          </div>

          <CommonHeader size="lg"> {task.title}</CommonHeader>
        </div>

        <div className="flex gap-2">
          <ActionButton
            type="view"
            action={() => {
              navigate("../project/team");
            }}
          />
          <ActionButton type="edit" action={action} />
          <ActionButton type="update" action={() => {}} />
          {role === "team" && (
            <>
              <ActionButton type="add" action={() => {}} />
              <ActionButton type="remove" action={() => {}} />
              <ActionButton
                type="delete"
                action={() => onDelete?.(task?.id as number)}
              />
            </>
          )}
        </div>
      </div>

      <div className="text-xs space-y-1 mb-3">
        <div>
          <FaRegUser className="inline-block mr-1 text-info text-sm" />
          <span className="font-medium text-info mr-1">Name:</span>
          {task.personName}
        </div>
        <div className="flex items-center">
          <RiHandbagLine className="inline-block mr-1 text-info text-sm" />
          <span className="font-medium text-info mr-1">Role:</span>
          {task.role}
        </div>
      </div>

      <div className="border-t border-black/10 my-2" />

      <div className="mt-2">
        <p
          className={`text-xs font-semibold mb-1 bg-transparent ${titleColors[i % titleColors.length]}`}
        >
          Key Points:
        </p>
        <ul className="list-disc pl-4 text-sm text-text space-y-1">
          {task.keyPoints.map((p, idx) => (
            <li key={idx}>{p}</li>
          ))}
        </ul>
      </div>

      <div className="flex items-center gap-2 text-xs text-text/50 mt-3">
        <LiaCalendarAlt className="text-xl" /> {task.date}
      </div>
    </div>
  );
};

export default ProjectCard;
