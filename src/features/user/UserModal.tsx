import CommonButton from "@/components/shared/CommonButton";
import type { FC } from "react";
import type { User } from "./UserList";

interface UserModalProps {
  isOpen: boolean;
  onClose: () => void;
  user: User | null;
}

const UserModal: FC<UserModalProps> = ({ isOpen, onClose, user }) => {
  if (!isOpen || !user) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
      <div className="bg-white w-full max-w-md rounded-xl p-6 shadow-lg">
        <h2 className="text-lg font-semibold mb-4">User Details</h2>

        <div className="space-y-3 text-sm">
          <div>
            <span className="font-medium">Name:</span> {user.name}
          </div>

          <div>
            <span className="font-medium">Email:</span> {user.email}
          </div>

          <div>
            <span className="font-medium">Role:</span> {user.role}
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

export default UserModal;
