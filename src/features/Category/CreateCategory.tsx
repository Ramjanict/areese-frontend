import CommonButton from "@/components/shared/CommonButton";
import SectionHeader from "@/components/shared/SectionHeader";
import type { FC } from "react";
import { z } from "zod";
import { inputClass } from "../task/CreateDashboardForm";
import type { Category } from "./CategoryList";

import ButtonWithLoading from "@/components/shared/ButtonWithLoading";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

export const userSchema = z.object({
  name: z.string().min(1, "Name is required"),
  status: z.string().min(1, "Status is required"),
});

export type UserFormValues = z.infer<typeof userSchema>;

interface CreatePlanProps {
  onCancel: () => void;
  defaultValues?: any;
  onSave: (data: any) => void;
  selectCategory: Category | null;
}

const CreateCategory: FC<CreatePlanProps> = ({
  onCancel,
  onSave,
  selectCategory,
  defaultValues,
}) => {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<UserFormValues>({
    resolver: zodResolver(userSchema),
    defaultValues: defaultValues || {
      name: "",
      status: "",
    },
  });

  const onSubmit = async (data: UserFormValues) => {
    await new Promise((res) => setTimeout(res, 500)); // simulate API
    onSave(data);
    reset();
  };

  return (
    <div>
      <form className={inputClass.form} onSubmit={handleSubmit(onSubmit)}>
        <SectionHeader
          title={selectCategory ? "Update category" : "Create category"}
          description={
            selectCategory ? "Update a category" : "Add a new category"
          }
        />

        <div className="space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className={inputClass.label}>Name</label>
              <input
                type="text"
                placeholder="Enter name"
                className={inputClass.input}
                {...register("name")}
              />
              {errors.name && (
                <p className="text-red-500 text-xs mt-1">
                  {errors.name.message}
                </p>
              )}
            </div>

            <div>
              <label className={inputClass.label}>Status</label>
              <input
                type="text"
                placeholder=" Enter status"
                className={inputClass.input}
                {...register("status")}
              />
              {errors.status && (
                <p className="text-red-500 text-xs mt-1">
                  {errors.status.message}
                </p>
              )}
            </div>
          </div>
        </div>

        <div className="flex items-center gap-4">
          <CommonButton type="submit" disabled={isSubmitting}>
            {isSubmitting ? (
              <ButtonWithLoading
                title={selectCategory ? "Updating..." : "Creating..."}
              />
            ) : selectCategory ? (
              "Update category"
            ) : (
              "Create category"
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

export default CreateCategory;
