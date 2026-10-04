import ButtonWithIcon from "@/components/shared/ButtonWithIcon";
import CommonButton from "@/components/shared/CommonButton";
import CommonSelect from "@/components/shared/CommonSelect";
import CustomCheckbox from "@/components/shared/CustomCheckbox";
import DashboardTopSection from "@/components/shared/DashboardTopSection";
import DateTimeInput from "@/components/shared/DateTimeInput";
import SectionHeader from "@/components/shared/SectionHeader";
import { inputClass } from "@/features/task/CreateDashboardForm";
import type { RootState } from "@/store/store";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { useFieldArray, useForm } from "react-hook-form";
import { FaPlus } from "react-icons/fa6";
import { FiTrash2 } from "react-icons/fi";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { z } from "zod";

const dashboardItems = [
  {
    value: "sales",
    label: "Sales Dashboard",
    month: "March",
    year: "2026",
  },
  {
    value: "client-discussion",
    label: "Client Project Discussion",
    month: "March",
    year: "2026",
  },
  {
    value: "invoice",
    label: "Send Invoice to Client ",
    month: "March",
    year: "2026",
  },
  {
    value: "sprint-planning",
    label: "Sprint Planning Meeting",
    month: "March",
    year: "2026",
  },
  {
    value: "marketing-review",
    label: "Marketing Campaign Review",
    month: "March",
    year: "2026",
  },
  {
    value: "db-maintenance",
    label: "Database Maintenance ",
    month: "March",
    year: "2026",
  },
  {
    value: "weekly-report",
    label: "Prepare Weekly Report",
    month: "March",
    year: "2026",
  },
  {
    value: "product-demo-1",
    label: "Product Demo Session",
    month: "March",
    year: "2026",
  },
  {
    value: "product-demo-2",
    label: "Product Demo Session ",
    month: "March",
    year: "2026",
  },
  {
    value: "update-landing",
    label: "Update Website Landing Page ",
    month: "March",
    year: "2026",
  },
  {
    value: "onboarding",
    label: "User Onboarding Session",
    month: "March",
    year: "2026",
  },
  {
    value: "support-followup",
    label: "Support Ticket Follow-Up ",
    month: "April",
    year: "2026",
  },
];

function ErrorMsg({ msg }: { msg?: string }) {
  return msg ? <p className="text-red-500 text-xs mt-1">{msg}</p> : null;
}

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

const MONTHS_LIST = [
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

const YEARS = ["2020", "2021", "2022", "2023", "2024", "2025", "2026"];
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
    .array(z.object({ value: z.string().min(1, "Keypoint cannot be empty") }))
    .min(1, "At least one keypoint required"),
});

type FormValues = z.infer<typeof formSchema>;

const FollowUps = () => {
  const [taskType, setTaskType] = useState("Regular");
  const [repeat, setRepeat] = useState("Daily");
  const [reminder, setReminder] = useState("5min");
  const [videoPlatform, setVideoPlatform] = useState("Google Meet");
  const [selectedMonths, setSelectedMonths] = useState<string[]>([]);
  const [selectedDays, setSelectedDays] = useState<string[]>([]);
  const [selectDashboard, setSelectDashboard] = useState("");
  const [inviteeInput, setInviteeInput] = useState("");
  const [filterMonth, setFilterMonth] = useState("");
  const [filterYear, setFilterYear] = useState("");

  const { dashboard: selectedDashboardData } = useSelector(
    (state: RootState) => state.dashboard,
  );

  const [invitees, setInvitees] = useState<string[]>(
    selectedDashboardData?.invitees
      ? selectedDashboardData.invitees
          .split(",")
          .map((e) => e.trim())
          .filter(Boolean)
      : [],
  );

  const filteredDashboards = dashboardItems.filter((item) => {
    const matchMonth = filterMonth ? item.month === filterMonth : true;
    const matchYear = filterYear ? item.year === filterYear : true;
    return matchMonth && matchYear;
  });

  const selectedDashboard = dashboardItems.find(
    (item) => item.value === selectDashboard,
  );

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
    defaultValues: selectedDashboardData
      ? {
          title: selectedDashboardData.title,
          invitees: selectedDashboardData.invitees,
          taskType: selectedDashboardData.taskType,
          videoPlatform: selectedDashboardData.videoPlatform,
          endDate: selectedDashboardData.endDate,
          resources: selectedDashboardData.resources,
          tags: selectedDashboardData.tags,
          repeat: selectedDashboardData.repeat,
          reminder: selectedDashboardData.reminder,
          keypoints: selectedDashboardData.description.map((item: string) => ({
            value: item,
          })),
        }
      : { keypoints: [{ value: "" }] },
  });

  const { fields, append, remove } = useFieldArray({
    control,
    name: "keypoints",
  });

  const toggleDay = (day: string, checked: boolean) =>
    setSelectedDays((p) =>
      checked ? [...p, day] : p.filter((d) => d !== day),
    );

  const toggleMonth = (month: string, checked: boolean) =>
    setSelectedMonths((p) =>
      checked ? [...p, month] : p.filter((m) => m !== month),
    );

  const onSubmit = (data: FormValues) => {
    console.log("FORM DATA", {
      ...data,
      invitees: invitees.join(","),
      selectedMonths,
      selectedDays,
      taskType,
      repeat,
      reminder,
      videoPlatform,
    });
  };

  const navigate = useNavigate();

  return (
    <div className="">
      <DashboardTopSection
        title="Follow Ups"
        description="Manage your follow up page"
      />
      <form
        onSubmit={handleSubmit(onSubmit)}
        className={"w-full border border-border rounded-md p-4 sm:p-6 bg-white"}
      >
        <div className="flex flex-col md:flex-row justify-between gap-4">
          <SectionHeader
            title="Create a Follow-Up"
            description="Add a follow-up connected to an existing dashboard."
          />
        </div>

        <div className="pt-2">
          <label className={inputClass.label}>Select Dashboard</label>

          <div className="grid grid-cols-2 gap-3 mb-2">
            <CommonSelect
              item={[
                { value: "all", label: "All Months" },
                ...MONTHS_LIST.map((m) => ({ value: m, label: m })),
              ]}
              value={filterMonth || "all"}
              onValueChange={(val) => {
                setFilterMonth(val === "all" ? "" : val);
                setSelectDashboard("");
              }}
              placeholder="Filter by month"
              className="w-full"
            />

            <CommonSelect
              item={[
                { value: "all", label: "All Years" },
                ...YEARS.map((y) => ({ value: y, label: y })),
              ]}
              value={filterYear || "all"}
              onValueChange={(val) => {
                setFilterYear(val === "all" ? "" : val);
                setSelectDashboard("");
              }}
              placeholder="Filter by year"
              className="w-full"
            />
          </div>

          {/* Dashboard Select */}
          <CommonSelect
            item={
              filteredDashboards.length > 0
                ? filteredDashboards.map((d) => ({
                    value: d.value,
                    label: d.label,
                  }))
                : [{ value: "none", label: "No dashboards found" }]
            }
            value={selectDashboard || ""}
            onValueChange={(val) => {
              if (val !== "none") setSelectDashboard(val);
            }}
            placeholder="Select a dashboard"
            className="w-full"
          />

          {/* Selected Dashboard Card */}
          {selectedDashboard && (
            <div className="mt-3 border border-border rounded-md p-4 bg-gray-50 flex items-start justify-between gap-3">
              <div>
                <p className="text-sm font-semibold text-text">
                  {selectedDashboard.label}
                </p>
                <p className="text-xs text-gray-400 mt-0.5">
                  {selectedDashboard.month} · {selectedDashboard.year}
                </p>
              </div>
              <button
                type="button"
                onClick={() => setSelectDashboard("")}
                className="text-gray-400 hover:text-red-500 transition-colors cursor-pointer mt-0.5"
              >
                <FiTrash2 size={15} />
              </button>
            </div>
          )}
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-3">
          <div>
            <label className={inputClass.label}>Follow-Up Title</label>
            <input
              {...register("title")}
              type="text"
              placeholder="Enter follow-up title..."
              className={inputClass.input}
            />
            <ErrorMsg msg={errors.title?.message} />
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
              placeholder="Select type"
              className="w-full"
            />
          </div>

          {taskType === "Video" && (
            <div className="flex flex-col gap-4">
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

          <div>
            <label className={inputClass.label}>
              Add Keypoints To This Task
            </label>
            <div className="space-y-2">
              {fields.map((field, index) => (
                <div key={field.id} className="flex gap-2">
                  <input
                    {...register(`keypoints.${index}.value`)}
                    placeholder="Enter keypoint"
                    className={inputClass.input}
                  />
                  {fields.length > 1 && (
                    <button
                      type="button"
                      onClick={() => remove(index)}
                      className="border border-border cursor-pointer hover:bg-late-accent hover:text-white px-3 rounded-md h-[42px]"
                    >
                      <FiTrash2 size={15} />
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
            </div>
            <ErrorMsg msg={errors.keypoints?.message as string} />
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
              value={repeat}
              onValueChange={setRepeat}
              className="w-full"
              placeholder="Select repeat"
            />

            {repeat === "Monthly" && (
              <div className="mt-4">
                <p className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-3">
                  Select Months
                </p>
                <div className="grid grid-cols-2 gap-y-3 gap-x-6">
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
              <div className="mt-4">
                <p className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-3">
                  Select Days
                </p>
                <div className="grid grid-cols-2 gap-y-3 gap-x-6">
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
          </div>

          <div>
            <label className={inputClass.label}>Resources Link</label>
            <div>
              <input
                {...register("resources")}
                placeholder="Enter resources link"
                className={inputClass.input}
              />
            </div>
          </div>

          <div>
            <label className={inputClass.label}>Video Platform</label>
            <CommonSelect
              item={[
                { value: "Google Meet", label: "Google Meet" },
                { value: "Zoom", label: "Zoom" },
                { value: "Teams", label: "Teams" },
              ]}
              value={videoPlatform}
              onValueChange={setVideoPlatform}
              className="w-full"
            />
          </div>

          <div>
            <label className={inputClass.label}>Tags</label>
            <input
              {...register("tags")}
              placeholder="Enter tags"
              className={inputClass.input}
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
                { value: "1day", label: "1 Day" },
              ]}
              value={reminder}
              onValueChange={setReminder}
              className="w-full"
            />
          </div>
        </div>

        <div className="flex justify-end gap-2 mt-6">
          <CommonButton>Create Follow-Up</CommonButton>
          <CommonButton variant="secondary" onClick={() => navigate(-1)}>
            Cancel
          </CommonButton>
        </div>
      </form>
    </div>
  );
};

export default FollowUps;
