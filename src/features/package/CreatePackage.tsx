import SectionHeader from "@/components/shared/SectionHeader";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

import ButtonWithLoading from "@/components/shared/ButtonWithLoading";
import CommonButton from "@/components/shared/CommonButton";
import { toast } from "react-toastify";
import { z } from "zod";
import { inputClass } from "../task/CreateDashboardForm";
import type { Bookings } from "./PackageList";

const packageSchema = z.object({
  name: z.string().min(1, "Name is required"),

  duration: z.number().min(1, "Duration must be at least 1"),

  durationNote: z.string().optional(),

  description: z.string().min(1, "Description is required"),

  serviceFee: z.number().optional(),
});
type FormData = z.infer<typeof packageSchema>;

interface PackageItem {
  onCancel: () => void;
  onSave: (data: any) => void;
  defaultValues?: any;
  selectBooking: Bookings | null;
}
const CreatePackage: React.FC<PackageItem> = ({
  onCancel,
  onSave,
  selectBooking,
  defaultValues,
}) => {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<FormData>({
    resolver: zodResolver(packageSchema),
    defaultValues: defaultValues || {
      name: "",
      duration: 0,
      durationNote: "",
      description: "",
      serviceFee: 0,
    },
  });

  const onSubmit = async (data: FormData) => {
    await new Promise((res) => setTimeout(res, 600));
    const payload = {
      ...data,
      serviceFee: data.serviceFee ?? null,
      durationNote: data.durationNote || null,
    };
    if (selectBooking) {
      toast.success("Package updated successfully");
    } else {
      toast.success("Package created successfully");
    }

    onSave(payload);
  };

  return (
    <div>
      <form className={inputClass.form} onSubmit={handleSubmit(onSubmit)}>
        <SectionHeader
          title={
            selectBooking ? "Update booking package" : "Create booking package"
          }
        />

        <div>
          <label className={inputClass.label}>Name</label>
          <input
            {...register("name")}
            type="text"
            placeholder="Enter name"
            className={inputClass.input}
          />
          {errors.name && (
            <p className="text-red-500 text-xs">{errors.name.message}</p>
          )}
        </div>

        <div>
          <label className={inputClass.label}>Duration (min)</label>
          <input
            {...register("duration", { valueAsNumber: true })}
            type="number"
            placeholder="Enter duration (e.g., 60)"
            className={inputClass.input}
          />
          {errors.duration && (
            <p className="text-red-500 text-xs">{errors.duration.message}</p>
          )}
        </div>

        <div>
          <label className={inputClass.label}>Duration Note (Optional)</label>
          <input
            {...register("durationNote")}
            type="text"
            placeholder="e.g., Depends on service type"
            className={inputClass.input}
          />
        </div>

        <div>
          <label className={inputClass.label}>Service Fee (Optional)</label>
          <input
            {...register("serviceFee", { valueAsNumber: true })}
            type="number"
            placeholder="Enter additional fee (optional)"
            className={inputClass.input}
          />
          {errors.serviceFee && (
            <p className="text-red-500 text-xs">{errors.serviceFee.message}</p>
          )}
        </div>

        <div>
          <label className={inputClass.label}>Description</label>
          <textarea
            {...register("description")}
            rows={3}
            placeholder="Enter description"
            className={inputClass.input}
          />
          {errors.description && (
            <p className="text-red-500 text-xs">{errors.description.message}</p>
          )}
        </div>

        <div className="flex justify-end items-center gap-2">
          <CommonButton onClick={onCancel} variant="secondary" type="button">
            Cancel
          </CommonButton>
          <CommonButton type="submit" disabled={isSubmitting}>
            {isSubmitting ? (
              <ButtonWithLoading
                title={selectBooking ? "Updating..." : "Creating..."}
              />
            ) : selectBooking ? (
              "Update package"
            ) : (
              "Create package"
            )}
          </CommonButton>
        </div>
      </form>
    </div>
  );
};

export default CreatePackage;
