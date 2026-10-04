import { Edit2, Eye, Trash2 } from "lucide-react";
import { BsWindowPlus } from "react-icons/bs";
import { LuUserMinus, LuUserPlus } from "react-icons/lu";
import { TfiReload } from "react-icons/tfi";

type ActionType =
  | "view"
  | "edit"
  | "delete"
  | "add"
  | "remove"
  | "reload"
  | "update"
  | "extend";

interface ActionButtonProps {
  type: ActionType;
  action?: () => void;
}

const ActionButton: React.FC<ActionButtonProps> = ({ type, action }) => {
  const config = {
    view: {
      icon: <Eye />,
      className: "border-info/50 text-info",
      tooltip: "View",
    },
    edit: {
      icon: <Edit2 />,
      className: "border-info/50 text-info",
      tooltip: "Edit",
    },
    delete: {
      icon: <Trash2 />,
      className: "border-info/50 text-info",
      tooltip: "Delete",
    },
    add: {
      icon: <LuUserPlus />,
      className: "border-info/50 text-info",
      tooltip: "Add Collaborator",
    },
    remove: {
      icon: <LuUserMinus />,
      className: "border-info/50 text-info",
      tooltip: "Remove Collaborator",
    },
    reload: {
      icon: <TfiReload />,
      className: "border-completed-bg/50 text-completed-bg",
      tooltip: "Update",
    },
    update: {
      icon: <TfiReload />,
      className: "border-completed-bg/50 text-completed-bg",
      tooltip: "Update",
    },
    extend: {
      icon: <BsWindowPlus />,
      className: "border-info/50 text-info",
      tooltip: "Extend Deadline",
    },
  };

  return (
    <button
      onClick={action}
      title={config[type].tooltip}
      className={`border-[.5px] bg-white/10 flex items-center gap-1 p-2 font-medium rounded transition text-2xl cursor-pointer ${config[type].className}`}
    >
      {config[type].icon}
    </button>
  );
};

export default ActionButton;
