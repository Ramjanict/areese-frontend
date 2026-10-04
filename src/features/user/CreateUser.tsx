import CommonButton from "@/components/shared/CommonButton";
import CommonSelect from "@/components/shared/CommonSelect";
import SectionHeader from "@/components/shared/SectionHeader";
import type { FC } from "react";
import { useForm } from "react-hook-form";
import { inputClass } from "../task/CreateDashboardForm";

import ButtonWithLoading from "@/components/shared/ButtonWithLoading";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "react-toastify";
import { z } from "zod";
import type { User } from "./UserList";

export const userSchema = z
  .object({
    name: z.string().min(1, "Full name is required"),
    email: z
      .string()
      .min(1, "Email is required")
      .email("Invalid email address"),
    password: z.string().min(6, "Password must be at least 6 characters"),
    confirmPassword: z.string().min(1, "Confirm password is required"),
    role: z.string().min(1, "Role is required"),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });

export type UserFormValues = z.infer<typeof userSchema>;
interface CreatePlanProps {
  onCancel: () => void;
  defaultValues?: any;
  onSave: (data: any) => void;
  selectUser: User | null;
}

const CreateUser: FC<CreatePlanProps> = ({
  onCancel,
  defaultValues,
  onSave,
  selectUser,
}) => {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
    setValue,
    watch,
  } = useForm<UserFormValues>({
    resolver: zodResolver(userSchema),
    defaultValues: defaultValues || {
      name: "",
      email: "",
      password: "",
      confirmPassword: "",
      role: "admin",
    },
  });

  const onSubmit = async (data: UserFormValues) => {
    await new Promise((res) => setTimeout(res, 600));

    if (selectUser) {
      toast.success("User updated successfully");
    } else {
      toast.success("User created successfully");
    }
    onSave(data);
    reset();
  };

  return (
    <div>
      <form className={inputClass.form} onSubmit={handleSubmit(onSubmit)}>
        <SectionHeader
          title={selectUser ? "Update user" : "Create user"}
          description={selectUser ? "Update a user" : "Add a new user"}
        />

        <div className="space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className={inputClass.label}>Full Name</label>
              <input
                type="text"
                placeholder="Enter name"
                className={inputClass.input}
                {...register("name")}
              />
              {errors.name && (
                <p className={inputClass.error}>{errors.name.message}</p>
              )}
            </div>

            <div>
              <label className={inputClass.label}>Email</label>
              <input
                type="text"
                placeholder="Enter email"
                className={inputClass.input}
                {...register("email")}
              />
              {errors.email && (
                <p className={inputClass.error}>{errors.email.message}</p>
              )}
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className={inputClass.label}>Password</label>
              <input
                type="password"
                placeholder="Enter password..."
                className={inputClass.input}
                {...register("password")}
              />
              {errors.password && (
                <p className={inputClass.error}>{errors.password.message}</p>
              )}
            </div>

            <div>
              <label className={inputClass.label}>Confirm Password *</label>
              <input
                type="password"
                placeholder="Enter confirm password..."
                className={inputClass.input}
                {...register("confirmPassword")}
              />
              {errors.confirmPassword && (
                <p className={inputClass.error}>
                  {errors.confirmPassword.message}
                </p>
              )}
            </div>
          </div>

          <div className="mb-8">
            <label className={inputClass.label}>Role</label>

            <CommonSelect
              value={watch("role")}
              item={[
                { label: "Super Admin", value: "super-admin" },
                { label: "Admin", value: "admin" },
                { label: "Manager", value: "manager" },
                { label: "Assistant", value: "assistant" },
              ]}
              onValueChange={(val) => setValue("role", val)}
            />

            {errors.role && (
              <p className={inputClass.error}>{errors.role.message}</p>
            )}
          </div>
        </div>

        <div className="flex items-center gap-4">
          <CommonButton type="submit" disabled={isSubmitting}>
            {isSubmitting ? (
              <ButtonWithLoading
                title={selectUser ? "Updating..." : "Creating..."}
              />
            ) : selectUser ? (
              "Update user"
            ) : (
              "Create user"
            )}
          </CommonButton>

          <CommonButton onClick={onCancel} variant="secondary">
            Cancel
          </CommonButton>
        </div>
      </form>
    </div>
  );
};

export default CreateUser;
