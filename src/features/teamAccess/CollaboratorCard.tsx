import CommonButton from "@/components/shared/CommonButton";
import SectionHeader from "@/components/shared/SectionHeader";
import { GiCheckMark } from "react-icons/gi";
import type { User } from "./TeamAccessPage";

interface Props {
  c: User;
  i: number;
  bgColor: string;
  inputClass: any;
  copyToClipboard: (text: string) => void;
}

const CollaboratorCard = ({
  c,
  i,
  bgColor,
  inputClass,
  copyToClipboard,
}: Props) => {
  return (
    <div className={`border rounded-xl p-4  relative ${bgColor}`}>
      <div className="flex items-center justify-between mb-2">
        <div className="flex items-center gap-1">
          <span className="bg-cta text-white w-6 h-6 flex items-center justify-center rounded-full text-sm">
            {i + 1}
          </span>
          <SectionHeader title="Collaborator Added" className="pb-0!" />
          <span className="text-cta">
            <GiCheckMark />
          </span>
        </div>
      </div>

      <div className="flex items-center gap-1">
        <p className="text-sm text-text">Name:</p>
        <p className="text-sm text-text">{c.name}</p>
      </div>

      <div className="flex items-center gap-1">
        <p className="text-sm text-text">Password:</p>
        <p className="text-sm text-text">{c.password}</p>
      </div>

      <div className="mt-2">
        <label className={inputClass.label}>Email</label>
        <input
          type="text"
          className={`${inputClass.input} cursor-text`}
          value={c.email}
          readOnly
        />
      </div>

      <div className="my-4">
        <CommonButton
          onClick={() =>
            copyToClipboard(
              `https://yourapp.com/login?email=${c.email}&tempPassword=${c.password}`,
            )
          }
        >
          Copy Login Link
        </CommonButton>
      </div>

      <p className="text-sm text-text ">
        Send the access link to {c.name} to log in.
      </p>
    </div>
  );
};

export default CollaboratorCard;
