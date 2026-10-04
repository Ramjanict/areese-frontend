import { inputClass } from "@/features/task/CreateDashboardForm";
import { zodResolver } from "@hookform/resolvers/zod";
import { X } from "lucide-react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import CommonButton from "./CommonButton";
import SectionHeader from "./SectionHeader";

interface ChangePasswordModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const changePasswordSchema = z
  .object({
    tempPassword: z.string().min(6, "Temporary password is required"),
    newPassword: z
      .string()
      .min(6, "New password must be at least 6 characters"),
    confirmNewPassword: z.string().min(6, "Confirm password is required"),
  })
  .refine((data) => data.newPassword === data.confirmNewPassword, {
    message: "Passwords do not match",
    path: ["confirmNewPassword"],
  });

type ChangePasswordFormData = z.infer<typeof changePasswordSchema>;

const ChangePasswordModal = ({ isOpen, onClose }: ChangePasswordModalProps) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ChangePasswordFormData>({
    resolver: zodResolver(changePasswordSchema),
  });

  const onSubmit = (data: ChangePasswordFormData) => {
    console.log(data);
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 m">
      <div className="bg-white rounded-lg w-full max-w-md m-4">
        <div className="relative pl-6 pt-6">
          <SectionHeader
            title="Change Password"
            description="You are required to change your temporary password."
          />
          <X
            onClick={onClose}
            className="absolute top-3 right-3 text-text hover:text-danger cursor-pointer"
          />
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-2 p-6">
          <div>
            <label className={inputClass.label}>Temporary Password</label>
            <input
              type="password"
              {...register("tempPassword")}
              className={inputClass.input}
            />
            {errors.tempPassword && (
              <p className={inputClass.error}>{errors.tempPassword.message}</p>
            )}
          </div>

          <div>
            <label className={inputClass.label}>New Password</label>
            <input
              type="password"
              {...register("newPassword")}
              className={inputClass.input}
            />
            {errors.newPassword && (
              <p className={inputClass.error}>{errors.newPassword.message}</p>
            )}
          </div>

          <div>
            <label className={inputClass.label}>Confirm New Password</label>
            <input
              type="password"
              {...register("confirmNewPassword")}
              className={inputClass.input}
            />
            {errors.confirmNewPassword && (
              <p className={inputClass.error}>
                {errors.confirmNewPassword.message}
              </p>
            )}
          </div>

          <div className="flex justify-end gap-2 mt-4">
            <CommonButton onClick={onClose} variant="secondary">
              Cancel
            </CommonButton>
            <CommonButton type="submit">Update Password</CommonButton>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ChangePasswordModal;
