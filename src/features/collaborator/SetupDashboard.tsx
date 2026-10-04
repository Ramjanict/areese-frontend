import type { project } from "@/components/collaboratorDashboard/ProjectCard";
import ButtonWithLoading from "@/components/shared/ButtonWithLoading";
import CommonButton from "@/components/shared/CommonButton";
import DashboardTopSection from "@/components/shared/DashboardTopSection";
import DeleteButton from "@/components/shared/DeleteButton";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { useFieldArray, useForm } from "react-hook-form";
import { FaRegCalendarAlt } from "react-icons/fa";
import { FiSave } from "react-icons/fi";
import { HiOutlineDocumentDuplicate } from "react-icons/hi";
import { IoIosArrowBack } from "react-icons/io";
import { LuCircleAlert } from "react-icons/lu";
import { useNavigate } from "react-router-dom";
import { z } from "zod";
import { inputClass } from "../task/CreateDashboardForm";

const formSchema = z.object({
  name: z.string().min(1, "Name is required").max(80, "Max 80 characters"),
  role: z.string().min(1, "Role is required").max(80, "Max 80 characters"),
  keypoints: z.array(z.object({ value: z.string() })).optional(),
  notes: z
    .array(
      z.object({
        value: z.string().max(500, "Note cannot exceed 500 characters"),
      }),
    )
    .optional(),
});

type FormValues = z.infer<typeof formSchema>;

const CalendarHint = ({ label }: { label: string }) => (
  <div className="flex items-center gap-1.5 mt-2 text-[11.5px] text-[#aaa]">
    <FaRegCalendarAlt size={12} />
    <span>{label}</span>
  </div>
);

type SubmitStatus = "idle" | "loading" | "success" | "error";

interface SetupDashboardProps {
  onClose?: () => void;
  selectedDashboard?: project | null;
}

const SetupDashboard: React.FC<SetupDashboardProps> = ({
  selectedDashboard,
  onClose,
}) => {
  const [submitStatus, setSubmitStatus] = useState<SubmitStatus>("idle");
  const [isDraft, setIsDraft] = useState(false);
  const [savedData, setSavedData] = useState<
    (FormValues & { isDraft: boolean }) | null
  >(null);

  console.log("savedData", savedData);
  const {
    register,
    handleSubmit,
    watch,
    control,
    reset,
    formState: { errors },
  } = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: selectedDashboard?.title || "",
      role: selectedDashboard?.role || "",
      keypoints: selectedDashboard?.keyPoints.map((kp) => ({ value: kp })) || [
        { value: "" },
      ],
      notes: [{ value: "" }],
    },
  });

  const {
    fields: keypointFields,
    append: appendKeypoint,
    remove: removeKeypoint,
  } = useFieldArray({ control, name: "keypoints" });

  const {
    fields: noteFields,
    append: appendNote,
    remove: removeNote,
  } = useFieldArray({ control, name: "notes" });

  const nameVal = watch("name") || "";
  const roleVal = watch("role") || "";
  const keypointValues = watch("keypoints") || [];
  const noteValues = watch("notes") || [];

  const handleAddKeypoint = () => {
    const last = keypointValues[keypointValues.length - 1]?.value?.trim();
    if (!last) return;
    if (keypointFields.length >= 10) return;
    appendKeypoint({ value: "" });
  };

  const handleAddNote = () => {
    const last = noteValues[noteValues.length - 1]?.value?.trim();
    if (!last) return;
    if (noteFields.length >= 10) return;
    appendNote({ value: "" });
  };

  const processSubmit = async (data: FormValues, draft: boolean) => {
    setSubmitStatus("loading");
    setIsDraft(draft);
    const payload = { ...data, isDraft: draft };
    console.log("SET UP ROLE PAYLOAD:", payload);

    try {
      await new Promise((res) => setTimeout(res, 1200));
      setSubmitStatus("success");
      setSavedData(payload);
      reset();
      navigate("/collaborator/project");
      onClose?.();
    } catch {
      setSubmitStatus("error");
    }
  };

  const onSubmit = (data: FormValues) => processSubmit(data, false);
  const onDraft = () => handleSubmit((data) => processSubmit(data, true))();

  const handleCancel = () => {
    reset();
    setSubmitStatus("idle");
    setSavedData(null);
    onClose?.();
  };

  const navigate = useNavigate();
  return (
    <div className="space-y-6 ">
      {selectedDashboard ? (
        <DashboardTopSection
          title=" Update Up Your Role"
          description="Define your role and share your updates with your team."
        />
      ) : (
        <DashboardTopSection
          title=" Set Up Your Role"
          description="Define your role and share your updates with your team."
          buttonText="Back to View Teams"
          icon={IoIosArrowBack}
          action={() => {
            navigate("/collaborator/project");
          }}
        />
      )}
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm space-y-5">
          <div>
            <label className={inputClass.label}>
              Your Name <span className="text-orange-500">*</span>
            </label>
            <input
              {...register("name")}
              className={inputClass.input}
              placeholder="Enter your name"
              maxLength={80}
            />
            <div className="flex justify-between items-center mt-1">
              {errors.name ? (
                <p className={inputClass.error}>{errors.name.message}</p>
              ) : (
                <span />
              )}
              <span className="text-[11.5px] text-text/50 ml-auto">
                {nameVal.length}/80
              </span>
            </div>
          </div>

          <div>
            <label className={inputClass.label}>
              Your Role <span className="text-orange-500">*</span>
            </label>
            <input
              {...register("role")}
              className={inputClass.input}
              placeholder="Enter your role (e.g. Designer, Project Manager, Developer, etc.)"
              maxLength={80}
            />
            <div className="flex justify-between items-center mt-1">
              {errors.role ? (
                <p className={inputClass.error}>{errors.role.message}</p>
              ) : (
                <span />
              )}
              <span className="text-[11.5px] text-text/50 ml-auto">
                {roleVal.length}/80
              </span>
            </div>
          </div>

          <div>
            <div className="flex items-start justify-between mb-2">
              <div>
                <p className={inputClass.label}>
                  Key Points{" "}
                  <span className="font-normal text-text/50 text-[12px]">
                    (Optional)
                  </span>
                </p>
                <p className="text-text/50 text-[12px]">
                  Add key points to highlight your progress, updates or
                  priorities.
                </p>
              </div>
              <CommonButton
                onClick={handleAddKeypoint}
                variant="add"
                disabled={
                  keypointFields.length >= 10 ||
                  !keypointValues[keypointValues.length - 1]?.value?.trim()
                }
              >
                Add Key Point
              </CommonButton>
            </div>

            <div className="flex flex-col gap-2">
              {keypointFields.map((field, index) => (
                <div key={field.id} className="flex items-center gap-2">
                  <input
                    {...register(`keypoints.${index}.value`)}
                    className={inputClass.input}
                    placeholder="Type your key point..."
                  />
                  {keypointFields.length > 1 && (
                    <DeleteButton onClick={() => removeKeypoint(index)} />
                  )}
                </div>
              ))}
            </div>

            {keypointValues.some((k) => k.value.trim()) && (
              <div className="mt-3 flex flex-wrap gap-2">
                {keypointValues
                  .filter((k) => k.value.trim())
                  .map((k, i) => (
                    <span
                      key={i}
                      className="inline-flex items-center gap-1.5 bg-orange-50 text-orange-700 border border-orange-100 text-[11.5px] px-3 py-1 rounded-full"
                    >
                      {k.value}
                    </span>
                  ))}
              </div>
            )}

            <div className="flex items-center justify-between mt-1.5">
              <CalendarHint label="Date & time will be recorded when you add this key point." />
              <span className="text-[11.5px] text-text/50">
                {keypointFields.length}/10
              </span>
            </div>
          </div>

          <div>
            <div className="flex items-start justify-between mb-2">
              <div>
                <p className={inputClass.label}>
                  Notes{" "}
                  <span className="font-normal text-text/50 text-[12px]">
                    (Optional)
                  </span>
                </p>
                <p className="text-text/50 text-[12px]">
                  Add any additional notes for your team.
                </p>
              </div>
              <CommonButton
                onClick={handleAddNote}
                variant="add"
                disabled={
                  noteFields.length >= 10 ||
                  !noteValues[noteValues.length - 1]?.value?.trim()
                }
              >
                Add Note
              </CommonButton>
            </div>

            <div className="flex flex-col gap-3">
              {noteFields.map((field, index) => (
                <div key={field.id} className="flex items-start gap-2">
                  <textarea
                    {...register(`notes.${index}.value`)}
                    className={`${inputClass.input} resize-none`}
                    rows={3}
                    placeholder="Type your note..."
                    maxLength={500}
                  />
                  {errors.notes?.[index]?.value && (
                    <p className={inputClass.error}>
                      {errors.notes[index]?.value?.message}
                    </p>
                  )}
                  <div className="flex justify-end mt-1">
                    <span className="text-[11.5px] text-text/50">
                      {watch(`notes.${index}.value`)?.length || 0}/500
                    </span>
                  </div>
                  {noteFields.length > 1 && (
                    <DeleteButton onClick={() => removeNote(index)} />
                  )}
                </div>
              ))}
            </div>

            <div className="flex items-center justify-between mt-1.5">
              <CalendarHint label="Date & time will be recorded when you add this note." />
              <span className="text-[11.5px] text-text/50">
                {noteFields.length}/10
              </span>
            </div>
          </div>

          <div className="flex flex-wrap gap-2.5 pt-1 w-full">
            <CommonButton
              type="button"
              onClick={handleCancel}
              variant="secondary"
              disabled={submitStatus === "loading"}
              className=" w-full! md:w-auto!"
            >
              Cancel
            </CommonButton>

            <CommonButton
              type="button"
              onClick={onDraft}
              disabled={submitStatus === "loading"}
              className="bg-info w-full! md:w-auto!"
            >
              <HiOutlineDocumentDuplicate size={15} />
              {submitStatus === "loading" && isDraft ? (
                <ButtonWithLoading title="Drafting..." />
              ) : (
                "Save as Draft"
              )}
            </CommonButton>
            <CommonButton
              type="submit"
              disabled={submitStatus === "loading"}
              className="w-full! md:w-auto!"
            >
              <FiSave size={14} />

              {submitStatus === "loading" && !isDraft ? (
                <ButtonWithLoading title="Saving..." />
              ) : selectedDashboard ? (
                "Update Dashboard"
              ) : (
                "Save Dashboard"
              )}
            </CommonButton>
          </div>

          <p className="text-[11.5px] text-text/50 flex items-center gap-1.5 pt-0.5">
            <LuCircleAlert size={11} />
            After saving, you can view, edit, update or delete this dashboard
            from your dashboard list.
          </p>
        </div>
      </form>

      <div className="flex items-start gap-3 bg-upcoming/10 border border-[#dde4ff] rounded-2xl px-4 py-4">
        <div className="text-2xl  text-info">
          <LuCircleAlert className="" />
        </div>
        <div>
          <p className="text-[13px] font-semibold text-[#1a1a2e] mb-0.5">
            Please note
          </p>
          <p className="text-[12.5px] text-text/70 leading-relaxed">
            This is a one-time setup. You can always update your dashboard
            later.
            <br />
            Your team will be able to view your updates once you save.
          </p>
        </div>
      </div>
    </div>
  );
};

export default SetupDashboard;
