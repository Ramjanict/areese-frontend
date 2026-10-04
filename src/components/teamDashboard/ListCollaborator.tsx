import { inputClass } from "@/features/task/CreateDashboardForm";
import CardAction from "../shared/CardAction";
import type { Collaborator } from "./InviteCollaborators";

interface Props {
  collab: Collaborator;
  handleRemoveCollaborator: (id: string) => void;
}
const ListCollaborator: React.FC<Props> = ({
  collab,
  handleRemoveCollaborator,
}) => {
  return (
    <div
      key={collab.id}
      className="grid grid-cols-1 md:grid-cols-3 gap-4 items-end bg-bg p-4  w-full rounded-lg"
    >
      <div>
        <label className={inputClass.label}>Full Name *</label>
        <div className={inputClass.input}>{collab.fullName}</div>
      </div>
      <div>
        <label className={inputClass.label}>Email Address *</label>
        <div className={inputClass.input}>{collab.email}</div>
      </div>
      <div className="flex gap-5 w-full ">
        <div className="w-full">
          <label className={inputClass.label}>Temporary Password *</label>
          <div className="flex items-center gap-4">
            <div className={inputClass.input}>{collab.tempPassword}</div>{" "}
            <CardAction onDelete={() => handleRemoveCollaborator(collab.id)} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ListCollaborator;
