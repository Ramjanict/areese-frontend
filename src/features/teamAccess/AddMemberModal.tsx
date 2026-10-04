import CommonButton from "@/components/shared/CommonButton";
import CommonSelect from "@/components/shared/CommonSelect";
import { AlertCircle, X } from "lucide-react";
import { useState } from "react";
import { inputClass } from "../task/CreateDashboardForm";

interface props {
  onClose: () => void;
}
const AddMemberModal: React.FC<props> = ({ onClose }) => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [role, setRole] = useState<"admin" | "manager" | "assistant">("admin");
  const [errors, setErrors] = useState<{ name?: string; email?: string }>({});

  return (
    <div className="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-lg">
        <div className="flex items-center justify-between px-6 py-4 border-b border-border">
          <div>
            <h2 className="text-base font-extrabold text-text">
              Add Team Member
            </h2>
            <p className="text-xs text-text/50mt-0.5">8 remaining</p>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full hover:bg-gray-100 cursor-pointer flex items-center justify-center transition-colors"
          >
            <X size={16} className="text-text/50" />
          </button>
        </div>

        <div className="px-6 py-5 space-y-4">
          <div className="flex gap-2.5 bg-bg border border-today-accent/80 rounded-xl p-3">
            <AlertCircle size={15} className="text-amber-500 shrink-0 mt-0.5" />
            <p className="text-xs text-amber-700 leading-relaxed">
              The team member will log in using their email and create their own
              password inside the platform{" "}
              <strong>No email invitation is sent.</strong>
            </p>
          </div>

          <div>
            <label className={inputClass.label}>Full Name</label>
            <input
              value={name}
              onChange={(e) => {
                setName(e.target.value);
                setErrors((p) => ({ ...p, name: undefined }));
              }}
              placeholder="e.g. Sarah Mitchell"
              className={inputClass.input}
            />
            {errors.name && <p className={inputClass.error}>{errors.name}</p>}
          </div>

          <div>
            <label className={inputClass.label}>Email Address</label>
            <input
              type="email"
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
                setErrors((p) => ({ ...p, email: undefined }));
              }}
              placeholder="e.g. sarah@company.com"
              className={inputClass.input}
            />
            {errors.email && <p className={inputClass.error}>{errors.email}</p>}
          </div>
          <div>
            <label className={inputClass.label}>Assign Role</label>
            <CommonSelect
              value={role}
              item={[
                { label: "Assistant", value: "assistant" },
                { label: "Admin", value: "admin" },
                { label: "Manager", value: "manager" },
              ]}
              onValueChange={(val) => setRole(val)}
              className="w-full"
            />
          </div>
        </div>

        <div className="flex gap-2 px-6 pb-5">
          <CommonButton className="flex-1!">Add Member</CommonButton>
          <CommonButton variant="secondary" onClick={onClose}>
            Cancel
          </CommonButton>
        </div>
      </div>
    </div>
  );
};

export default AddMemberModal;
