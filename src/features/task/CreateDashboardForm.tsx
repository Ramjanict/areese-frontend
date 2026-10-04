import ButtonWithIcon from "@/components/shared/ButtonWithIcon";
import CommonButton from "@/components/shared/CommonButton";
import CommonSelect from "@/components/shared/CommonSelect";
import CustomCheckbox from "@/components/shared/CustomCheckbox";
import DashboardTopSection from "@/components/shared/DashboardTopSection";
import SectionHeader from "@/components/shared/SectionHeader";
import { useState } from "react";
import { FaPlus } from "react-icons/fa6";
import { FiTrash2 } from "react-icons/fi";
import { useNavigate } from "react-router-dom";

import DateTimeInput from "@/components/shared/DateTimeInput";
import { zodResolver } from "@hookform/resolvers/zod";
import { useFieldArray, useForm } from "react-hook-form";
import { z } from "zod";
import type { DashboardType } from "../dashboard/DashBoardCard";

const months = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

const days = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];

export const inputClass = {
  form: "space-y-6 w-full border border-border rounded-md p-4 sm:p-6 bg-white ",
  label: "block text-sm text-text mb-2 font-semibold",
  input:
    "w-full border border-border bg-white rounded-md p-3.5 outline-none text-text text-xs",
  error: "text-red-500 text-sm mt-1",
};

const formSchema = z.object({
  title: z.string().min(1, "Task title is required"),
  invitees: z.string().optional(),
  taskType: z.string(),
  videoPlatform: z.string().optional(),
  endDate: z.string().min(1, "End date is required"),
  resources: z.string().optional(),
  tags: z.string().optional(),
  repeat: z.string(),
  reminder: z.string(),
  keypoints: z
    .array(
      z.object({
        value: z.string().min(1, "Keypoint cannot be empty"),
      }),
    )
    .min(1, "At least one keypoint required"),
});

type FormValues = z.infer<typeof formSchema>;

interface CreateDashboardFormProps {
  dashboard?: DashboardType | null;
  onClose?: () => void;
}
const CreateDashboardForm: React.FC<CreateDashboardFormProps> = ({
  dashboard,
  onClose,
}) => {
  const navigate = useNavigate();

  const [taskType, setTaskType] = useState("Regular");
  const [repeat, setRepeat] = useState("Daily");
  const [reminder, setReminder] = useState("5min");
  const [videoPlatform, setVideoPlatform] = useState("Google Meet");

  const [selectedMonths, setSelectedMonths] = useState<string[]>([]);
  const [selectedDays, setSelectedDays] = useState<string[]>([]);

  const [inviteeInput, setInviteeInput] = useState("");
  const [invitees, setInvitees] = useState<string[]>(
    dashboard?.invitees
      ? dashboard.invitees
          .split(",")
          .map((e) => e.trim())
          .filter(Boolean)
      : [],
  );

  // Helper to add email
  const addInvitee = () => {
    const email = inviteeInput.trim();
    if (!email) return;
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) return;
    if (invitees.length >= 10) return;
    if (invitees.includes(email)) return;
    setInvitees((prev) => [...prev, email]);
    setInviteeInput("");
  };

  const removeInvitee = (email: string) => {
    setInvitees((prev) => prev.filter((e) => e !== email));
  };

  const {
    register,
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: dashboard?.title || "",
      invitees: dashboard?.invitees || "",
      taskType: dashboard?.taskType || "Regular",
      videoPlatform: dashboard?.videoPlatform || "Google Meet",
      endDate: dashboard?.endDate || "",
      resources: dashboard?.resources || "",
      tags: dashboard?.tags || "",
      repeat: dashboard?.repeat || "Daily",
      reminder: dashboard?.reminder || "5min",

      keypoints: dashboard?.description
        ? dashboard.description.map((item) => ({
            value: item,
          }))
        : [{ value: "" }],
    },
  });

  const { fields, append, remove } = useFieldArray({
    control,
    name: "keypoints",
  });

  const toggleDay = (day: string, checked: boolean) => {
    if (checked) {
      setSelectedDays((prev) => [...prev, day]);
    } else {
      setSelectedDays((prev) => prev.filter((d) => d !== day));
    }
  };

  const toggleMonth = (month: string, checked: boolean) => {
    if (checked) {
      setSelectedMonths((prev) => [...prev, month]);
    } else {
      setSelectedMonths((prev) => prev.filter((m) => m !== month));
    }
  };

  const onSubmit = (data: FormValues) => {
    const payload = {
      ...data,
      invitees: invitees.join(","),
      keypoints: data.keypoints.map((item) => item.value),
      selectedMonths,
      selectedDays,
      taskType,
      repeat,
      reminder,
      videoPlatform,
    };

    console.log("FORM DATA", payload);
    navigate("/admin/dashboard");
    onClose?.();
  };

  return (
    <div className="w-full">
      {!dashboard && (
        <DashboardTopSection
          title="Create A Dashboard"
          description="Add a new dashboard to your dashboard list"
        />
      )}

      <form onSubmit={handleSubmit(onSubmit)} className={inputClass.form}>
        <div>
          <SectionHeader
            title={`${dashboard ? "Update" : "Create"}  a dashboard`}
            description={`${dashboard ? "Update" : "Create"} a new dashboard to your dashboard list`}
          />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className={inputClass.label}>Dashboard Title</label>
            <input
              {...register("title")}
              className={inputClass.input}
              type="text"
              placeholder="Enter dashboard title"
            />
            {errors.title && (
              <p className={inputClass.error}>{errors.title.message}</p>
            )}
          </div>
          <div>
            <label className={inputClass.label}>Invitees (max 10)</label>
            <input
              className={inputClass.input}
              type="email"
              placeholder="Enter email and press Enter"
              value={inviteeInput}
              onChange={(e) => setInviteeInput(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  e.preventDefault();
                  addInvitee();
                }
              }}
              disabled={invitees.length >= 10}
            />
            {invitees.length > 0 && (
              <div className="flex flex-wrap gap-2 mt-2">
                {invitees.map((email) => (
                  <span
                    key={email}
                    className="flex items-center gap-1.5 bg-white border border-border rounded-md px-2.5 py-1 text-xs text-text"
                  >
                    {email}
                    <button
                      type="button"
                      onClick={() => removeInvitee(email)}
                      className="text-text hover:text-red-500 transition-colors cursor-pointer"
                    >
                      <FiTrash2 size={12} />
                    </button>
                  </span>
                ))}
              </div>
            )}
            {invitees.length >= 10 && (
              <p className="text-xs text-text mt-1 opacity-60">
                Maximum of 10 invitees reached
              </p>
            )}
          </div>
          <DateTimeInput
            label="Time & Date"
            register={register("endDate")}
            error={errors.endDate}
            inputClass={inputClass.input}
            labelClass={inputClass.label}
            errorClass={inputClass.error}
          />
          {/* <div>
            <label className={inputClass.label}>Time & Date</label>
            <div className="relative">
              <input
                {...register("endDate")}
                className={`${inputClass.input} pr-10 [&::-webkit-calendar-picker-indicator]:opacity-0 [&::-webkit-calendar-picker-indicator]:absolute [&::-webkit-calendar-picker-indicator]:right-0 [&::-webkit-calendar-picker-indicator]:w-10 [&::-webkit-calendar-picker-indicator]:h-full [&::-webkit-calendar-picker-indicator]:cursor-pointer`}
                type="datetime-local"
              />
              <FaRegCalendarAlt
                className="absolute right-3 top-1/2 -translate-y-1/2 text-text pointer-events-none"
                size={16}
              />
            </div>
            {errors.endDate && (
              <p className={inputClass.error}>{errors.endDate.message}</p>
            )}
          </div> */}

          <div>
            <label className={inputClass.label}>Task Type</label>
            <CommonSelect
              item={[
                { value: "Regular", label: "Regular" },
                { value: "Video", label: "Video" },
                { value: "Phone", label: "Phone" },
                { value: "Note", label: "Note" },
              ]}
              value={taskType}
              onValueChange={setTaskType}
              placeholder="Select an option"
              className="w-full"
            />
          </div>

          {taskType === "Video" && (
            <div className="space-y-4">
              <div>
                <label className={inputClass.label}>Video Platform</label>
                <CommonSelect
                  item={[
                    { value: "Google Meet", label: "Google Meet" },
                    { value: "Zoom", label: "Zoom" },
                  ]}
                  onValueChange={setVideoPlatform}
                  value={videoPlatform}
                  className="w-full"
                  placeholder="Select an option"
                />
              </div>
              <div>
                <label className={inputClass.label}>Video link</label>
                <input
                  {...register("invitees")}
                  className={inputClass.input}
                  type="text"
                  placeholder="Enter video link"
                />
              </div>
            </div>
          )}

          <div className="flex flex-col ">
            <label className={inputClass.label}>
              Add Keypoints To This Task
            </label>

            {fields.map((field, index) => (
              <div
                key={field.id}
                className="flex flex-col md:flex-row items-start gap-2"
              >
                <input
                  {...register(`keypoints.${index}.value`)}
                  className={inputClass.input}
                  placeholder="Enter keypoints"
                />

                {fields.length > 1 && (
                  <button
                    type="button"
                    onClick={() => remove(index)}
                    className="border border-border cursor-pointer hover:bg-late-accent hover:text-white px-3 rounded-md h-[42px]"
                  >
                    <FiTrash2 />
                  </button>
                )}

                {index === fields.length - 1 && (
                  <ButtonWithIcon
                    type="button"
                    icon={FaPlus}
                    className="rounded-md!"
                    onClick={() => append({ value: "" })}
                  >
                    Add KeyPoints
                  </ButtonWithIcon>
                )}
              </div>
            ))}

            {errors.keypoints && (
              <p className={inputClass.error}>
                {errors.keypoints.message as string}
              </p>
            )}
          </div>
          <div>
            <label className={inputClass.label}>Repeat</label>
            <CommonSelect
              item={[
                { value: "Daily", label: "Daily" },
                { value: "Weekly", label: "Weekly" },
                { value: "Monthly", label: "Monthly" },
                { value: "Yearly", label: "Yearly" },
              ]}
              onValueChange={setRepeat}
              value={repeat}
              placeholder="Select an option"
              className="w-full"
            />
          </div>
          {repeat === "Monthly" && (
            <div className="p-6 rounded-lg w-full max-w-md">
              <div className="grid grid-cols-2 gap-y-3 gap-x-10">
                {months.map((month) => (
                  <CustomCheckbox
                    key={month}
                    label={month}
                    checked={selectedMonths.includes(month)}
                    onChange={(checked) => toggleMonth(month, checked)}
                  />
                ))}
              </div>
            </div>
          )}
          {repeat === "Weekly" && (
            <div className="p-6 rounded-lg max-w-md">
              <div className="grid grid-cols-2 gap-y-3 gap-x-10">
                {days.map((day) => (
                  <CustomCheckbox
                    key={day}
                    label={day}
                    checked={selectedDays.includes(day)}
                    onChange={(checked) => toggleDay(day, checked)}
                  />
                ))}
              </div>
            </div>
          )}
          <div>
            <label className={inputClass.label}>Resources Link</label>
            <input
              {...register("resources")}
              className={inputClass.input}
              placeholder="Enter resources link"
            />
          </div>
          <div>
            <label className={inputClass.label}>Tags</label>
            <input
              {...register("tags")}
              className={inputClass.input}
              placeholder="Enter tags"
            />
          </div>
          <div>
            <label className={inputClass.label}>Reminder</label>
            <CommonSelect
              item={[
                { value: "5min", label: "5 Minutes" },
                { value: "15min", label: "15 Minutes" },
                { value: "30min", label: "30 Minutes" },
                { value: "1hour", label: "1 Hour" },
                { value: "2hour", label: "2 Hours" },
                { value: "1day", label: "1 Day" },
              ]}
              value={reminder}
              onValueChange={setReminder}
              placeholder="Select an option"
              className="w-full"
            />
          </div>
        </div>

        <div className="flex flex-col sm:flex-row justify-end gap-2 mt-6">
          <CommonButton type="submit" variant="primary">
            {dashboard ? "Update Dashboard" : "Create Dashboard"}
          </CommonButton>

          <CommonButton type="button" variant="secondary">
            Save as Draft
          </CommonButton>
          <CommonButton
            type="button"
            onClick={() => {
              if (onClose) {
                onClose();
              } else {
                navigate(-1);
              }
            }}
            variant="secondary"
          >
            Cancel
          </CommonButton>
        </div>
      </form>
    </div>
  );
};

export default CreateDashboardForm;
