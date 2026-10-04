import ButtonWithIcon from "@/components/shared/ButtonWithIcon";
import ButtonWithLoading from "@/components/shared/ButtonWithLoading";
import CommonButton from "@/components/shared/CommonButton";
import DeleteButton from "@/components/shared/DeleteButton";
import { inputClass } from "@/features/task/CreateDashboardForm";
import { setDashboardList } from "@/store/dashboardStore/dashboardSlice";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRef, useState } from "react";
import { useFieldArray, useForm } from "react-hook-form";
import { FaPlus, FaRegCalendarAlt, FaRegClock } from "react-icons/fa";
import { FiInfo, FiSave, FiUsers, FiX } from "react-icons/fi";
import { HiOutlineDocumentDuplicate } from "react-icons/hi";
import { IoAlertCircleOutline } from "react-icons/io5";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import type { project } from "../collaboratorDashboard/ProjectCard";
import DashboardTopSection from "../shared/DashboardTopSection";
import { formSchema, type DashboardList } from "./schema/Schema";

type SubmitStatus = "idle" | "loading" | "success" | "error";

interface Props {
  setIsCollaboratorOpen?: (open: boolean) => void;
  onClose?: () => void;
  selectedDashboard?: project | null;
}
const DashboardCreationForm: React.FC<Props> = ({
  setIsCollaboratorOpen,
  onClose,
  selectedDashboard,
}) => {
  const [submitStatus, setSubmitStatus] = useState<SubmitStatus>("idle");
  const [isDraft, setIsDraft] = useState(false);

  const [tags, setTags] = useState<string[]>([]);
  const [tagInput, setTagInput] = useState("");
  const [tagError, setTagError] = useState("");
  const tagInputRef = useRef<HTMLInputElement>(null);

  const addTag = (raw: string) => {
    const value = raw.trim().replace(/,+$/, "").trim();
    if (!value) return;
    if (tags.length >= 10) {
      setTagError("Max 10 tags allowed");
      return;
    }
    if (tags.map((t) => t.toLowerCase()).includes(value.toLowerCase())) {
      setTagError("Tag already added");
      return;
    }
    setTags((prev) => [...prev, value]);
    setTagInput("");
    setTagError("");
  };

  const removeTag = (index: number) => {
    setTags((prev) => prev.filter((_, i) => i !== index));
    setTagError("");
  };

  const handleTagKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" || e.key === ",") {
      e.preventDefault();
      addTag(tagInput);
    }
    if (e.key === "Backspace" && tagInput === "" && tags.length > 0) {
      setTags((prev) => prev.slice(0, -1));
      setTagError("");
    }
  };

  const handleTagInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value;
    // Auto-add when comma is typed
    if (val.endsWith(",")) {
      addTag(val);
    } else {
      setTagInput(val);
      setTagError("");
    }
  };

  const {
    register,
    handleSubmit,
    watch,
    control,
    reset,
    formState: { errors },
  } = useForm<DashboardList>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      projectName: selectedDashboard?.title || "",
      projectType: selectedDashboard?.projectType || "",
      startDate: selectedDashboard?.startDate || "",
      startTime: selectedDashboard?.startTime || "",
      endDate: selectedDashboard?.endDate || "",
      endTime: selectedDashboard?.endTime || "",
      resourceLink: selectedDashboard?.resourceLink || "",
      shortNote: selectedDashboard?.shortNote || "",
      keypoints: selectedDashboard?.keyPoints?.map((kp) => ({
        value: kp,
      })) ?? [{ value: "" }],
    },
  });

  const { fields, append, remove } = useFieldArray({
    control,
    name: "keypoints",
  });

  const projectNameVal = watch("projectName") || "";
  const resourceLinkVal = watch("resourceLink") || "";
  const shortNoteVal = watch("shortNote") || "";
  const keypointValues = watch("keypoints") || [];

  const handleAppendKeypoint = () => {
    const lastValue = keypointValues[keypointValues.length - 1]?.value?.trim();
    if (!lastValue) return;
    if (fields.length >= 10) return;
    append({ value: "" });
  };

  const dispatch = useDispatch();

  const navigate = useNavigate();
  const processSubmit = async (data: DashboardList, draft: boolean) => {
    setSubmitStatus("loading");
    setIsDraft(draft);
    const payload = { ...data, tags, isDraft: draft };
    console.log("DASHBOARD PAYLOAD:", payload);

    dispatch(setDashboardList(data));
    try {
      await new Promise((res) => setTimeout(res, 1200));
      setSubmitStatus("success");
      navigate("../project");
      onClose?.();
    } catch {
      setSubmitStatus("error");
    }
  };

  const onSubmit = (data: DashboardList) => processSubmit(data, false);
  const onDraft = () => handleSubmit((data) => processSubmit(data, true))();

  const handleCancel = () => {
    reset();
    setTags([]);
    setTagInput("");
    setTagError("");
    setSubmitStatus("idle");
    selectedDashboard ? onClose?.() : navigate("/admin/dashboard");
  };

  return (
    <div className="space-y-6">
      <DashboardTopSection
        title="Create Team Dashboard (Admin)"
        description="Set up your team's project dashboard. You can invite collaborators after saving."
      />

      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm space-y-5">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className={inputClass.label}>
                Project (Dashboard) Name{" "}
                <span className="text-orange-500">*</span>
              </label>
              <input
                {...register("projectName")}
                className={inputClass.input}
                placeholder="Enter project name"
                maxLength={80}
              />
              <div className="flex justify-between items-center mt-1">
                {errors.projectName ? (
                  <p className={inputClass.error}>
                    {errors.projectName.message}
                  </p>
                ) : (
                  <span />
                )}
                <span className="text-xs text-text/50">
                  {projectNameVal.length}/80
                </span>
              </div>
            </div>

            <div>
              <label className={inputClass.label}>
                Project Type <span className="text-orange-500">*</span>
              </label>
              <input
                {...register("projectType")}
                className={inputClass.input}
                placeholder="Max 30 characters"
                maxLength={30}
              />
              {errors.projectType && (
                <p className={inputClass.error}>{errors.projectType.message}</p>
              )}
            </div>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className={inputClass.label}>
                Project Start Date &amp; Time{" "}
                <span className="text-orange-500">*</span>
              </label>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                <div className="relative">
                  <FaRegCalendarAlt
                    className="absolute left-3 top-1/2 -translate-y-1/2 text-text/50 pointer-events-none"
                    size={13}
                  />
                  <input
                    {...register("startDate")}
                    type="date"
                    className={`${inputClass.input} pl-9`}
                  />
                </div>
                <div className="relative">
                  <FaRegClock
                    className="absolute left-3 top-1/2 -translate-y-1/2 text-text/50 pointer-events-none"
                    size={13}
                  />
                  <input
                    {...register("startTime")}
                    type="time"
                    className={`${inputClass.input} pl-9`}
                  />
                </div>
              </div>
              {(errors.startDate || errors.startTime) && (
                <p className={inputClass.error}>
                  {errors.startDate?.message || errors.startTime?.message}
                </p>
              )}
            </div>

            <div>
              <label className={inputClass.label}>
                Project End Date &amp; Time{" "}
                <span className="text-orange-500">*</span>
              </label>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                <div className="relative">
                  <FaRegCalendarAlt
                    className="absolute left-3 top-1/2 -translate-y-1/2 text-text/50 pointer-events-none"
                    size={13}
                  />
                  <input
                    {...register("endDate")}
                    type="date"
                    className={`${inputClass.input} pl-9`}
                  />
                </div>
                <div className="relative">
                  <FaRegClock
                    className="absolute left-3 top-1/2 -translate-y-1/2 text-text/50 pointer-events-none"
                    size={13}
                  />
                  <input
                    {...register("endTime")}
                    type="time"
                    className={`${inputClass.input} pl-9`}
                  />
                </div>
              </div>
              {(errors.endDate || errors.endTime) && (
                <p className={inputClass.error}>
                  {errors.endDate?.message || errors.endTime?.message}
                </p>
              )}
            </div>
          </div>
          <div>
            <label className={`${inputClass.label} flex items-center gap-1.5`}>
              Key Points
              <IoAlertCircleOutline size={16} className="text-text/50" />
            </label>

            <div className="flex flex-col gap-2">
              {fields.map((field, index) => (
                <div
                  key={field.id}
                  className="flex flex-col sm:flex-row items-start gap-2"
                >
                  <input
                    {...register(`keypoints.${index}.value`)}
                    className={inputClass.input}
                    placeholder="Enter keypoint"
                  />

                  {errors.keypoints?.[index]?.value && (
                    <p className={inputClass.error}>
                      {errors.keypoints[index]?.value?.message}
                    </p>
                  )}

                  {fields.length > 1 && (
                    <DeleteButton onClick={() => remove(index)} />
                  )}

                  {index === fields.length - 1 && (
                    <ButtonWithIcon
                      type="button"
                      icon={FaPlus}
                      className="rounded-md! flex-shrink-0"
                      onClick={handleAppendKeypoint}
                      disabled={
                        fields.length >= 10 ||
                        !keypointValues[
                          keypointValues.length - 1
                        ]?.value?.trim()
                      }
                    >
                      Add Key Point
                    </ButtonWithIcon>
                  )}
                </div>
              ))}
            </div>

            {errors.keypoints && !Array.isArray(errors.keypoints) && (
              <p className={inputClass.error}>
                {(errors.keypoints as { message?: string }).message}
              </p>
            )}

            {keypointValues.some((kp) => kp.value.trim() !== "") && (
              <div className="mt-3 flex flex-wrap gap-2">
                {keypointValues
                  .filter((kp) => kp.value.trim() !== "")
                  .map((kp, i) => (
                    <span
                      key={i}
                      className="inline-flex items-center gap-1.5 bg-orange-50 text-orange-700 border border-orange-100 text-xs px-3 py-1 rounded-full"
                    >
                      {kp.value}
                    </span>
                  ))}
              </div>
            )}

            <p className="text-xs text-text/50 text-right mt-1">
              {fields.length}/10 key points
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className={`${inputClass.label} flex items-center gap-1`}>
                Resource Link (URL)
              </label>
              <input
                {...register("resourceLink")}
                className={inputClass.input}
                placeholder="Enter resource link"
                maxLength={200}
              />
              <div className="flex justify-between items-center mt-1">
                {errors.resourceLink ? (
                  <p className={inputClass.error}>
                    {errors.resourceLink.message}
                  </p>
                ) : (
                  <span />
                )}
                <span className="text-xs text-text/50">
                  {resourceLinkVal.length}/200
                </span>
              </div>
            </div>

            <div>
              <label className={`${inputClass.label} flex items-center gap-1`}>
                Tags
              </label>

              <div
                className={`flex flex-wrap gap-1.5 items-center min-h-[42px] w-full border rounded-md px-2.5 py-1.5 cursor-text transition-all duration-150 ${
                  tagError ? "border-cta ring-2 ring-red-100" : "border-border "
                } bg-white`}
                onClick={() => tagInputRef.current?.focus()}
              >
                {tags.map((tag, i) => (
                  <span
                    key={i}
                    className="inline-flex items-center gap-1 bg-orange-50 text-orange-700 border border-orange-100 text-xs px-2.5 py-0.5 rounded-full"
                  >
                    {tag}
                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        removeTag(i);
                      }}
                      className="hover:text-orange-900 transition-colors ml-0.5"
                    >
                      <FiX size={10} />
                    </button>
                  </span>
                ))}

                {tags.length < 10 && (
                  <input
                    ref={tagInputRef}
                    type="text"
                    value={tagInput}
                    onChange={handleTagInputChange}
                    onKeyDown={handleTagKeyDown}
                    onBlur={() => {
                      if (tagInput.trim()) addTag(tagInput);
                    }}
                    placeholder={
                      tags.length === 0 ? "Type and press Enter or comma" : ""
                    }
                    className="flex-1 min-w-[120px] outline-none bg-transparent text-xs text-text placeholder:text-text/40 py-0.5"
                  />
                )}
              </div>

              <div className="flex justify-between items-center mt-1">
                {tagError ? (
                  <p className={inputClass.error}>{tagError}</p>
                ) : (
                  <p className="text-xs text-text/50">
                    Press{" "}
                    <kbd className="px-1 py-0.5 rounded bg-slate-100 text-slate-500 text-[10px] font-mono">
                      Enter
                    </kbd>{" "}
                    or{" "}
                    <kbd className="px-1 py-0.5 rounded bg-slate-100 text-slate-500 text-[10px] font-mono">
                      ,
                    </kbd>{" "}
                    to add
                  </p>
                )}
                <span className="text-xs text-text/50">{tags.length}/10</span>
              </div>
            </div>
          </div>
          <div>
            <label className={`${inputClass.label} flex items-center gap-1.5`}>
              Short Note (Optional)
              <IoAlertCircleOutline size={16} className="text-text/50" />
            </label>
            <textarea
              {...register("shortNote")}
              className={`${inputClass.input} resize-none`}
              rows={3}
              placeholder="Add a short note about this project..."
              maxLength={150}
            />
            <div className="flex justify-between items-center mt-1">
              {errors.shortNote ? (
                <p className={inputClass.error}>{errors.shortNote.message}</p>
              ) : (
                <span />
              )}
              <span className="text-xs text-text/50">
                {shortNoteVal.length}/150
              </span>
            </div>
          </div>

          {!selectedDashboard && (
            <div className="flex flex-col md:flex-row md:items-center justify-between bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 gap-4">
              <div className="flex  md:items-center md:gap-3 ">
                <div className="w-9 h-9 rounded-full bg-orange-50 flex items-center justify-center shrink-0">
                  <FiUsers size={16} className="text-cta" />
                </div>
                <div>
                  <p className="text-sm font-semibold text-slate-700">
                    Add Collaborators{" "}
                    <span className="font-normal text-text/50 text-xs">
                      (After Saving)
                    </span>
                  </p>
                  <p className="text-xs text-slate-500">
                    You can add up to 10 collaborators after this dashboard is
                    saved.
                  </p>
                </div>
              </div>
              <div className=" md:text-right shrink-0 ml-4">
                <CommonButton onClick={() => setIsCollaboratorOpen?.(true)}>
                  <FiUsers size={12} />
                  Add Collaborators
                </CommonButton>

                <p className="text-xs text-text/50 mt-2">
                  Available after save
                </p>
              </div>
            </div>
          )}
        </div>
        <div className="flex flex-wrap gap-2 pt-1 w-auto md:w-full my-5">
          <CommonButton type="submit" className=" w-full md:w-auto">
            <FiSave size={14} />
            {submitStatus === "loading" && !isDraft ? (
              <ButtonWithLoading title="Saving..." />
            ) : submitStatus === "loading" && isDraft ? (
              "Update Dashboard"
            ) : (
              "Save Dashboard"
            )}
          </CommonButton>
          <CommonButton
            variant="secondary"
            type="button"
            onClick={onDraft}
            disabled={submitStatus === "loading"}
            className=" w-full md:w-auto border border-info hover:bg-info text-info! hover:text-white! transition-all group "
          >
            <HiOutlineDocumentDuplicate className="text-info group-hover:text-white" />
            {submitStatus === "loading" && isDraft ? (
              <ButtonWithLoading title="Saving..." />
            ) : (
              "Save as Draft"
            )}
          </CommonButton>

          <CommonButton
            variant="secondary"
            type="button"
            onClick={handleCancel}
            className=" w-full md:w-auto"
          >
            Cancel
          </CommonButton>
        </div>
        <div className="bg-followup-bg rounded-md p-2  border border-border">
          <p className="text-xs text-text/50 flex items-center gap-1.5 pt-1">
            <FiInfo size={20} className="text-followup-accent" />
            After saving, you can view, edit, update or delete this dashboard
            from your dashboard list.
          </p>
        </div>
      </form>
    </div>
  );
};

export default DashboardCreationForm;
