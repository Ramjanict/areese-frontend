import logo from "@/assets/images/woman.webp";
import CommonButton from "@/components/shared/CommonButton";
import CommonHeader from "@/components/shared/CommonHeader";
import CommonSelect from "@/components/shared/CommonSelect";
import type { RootState } from "@/store/store";
import { Copy } from "lucide-react";
import { useState } from "react";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";
import { inputClass } from "../task/CreateDashboardForm";
import { TimeInput } from "./TimeInput";

function OrangeCheckbox({
  checked,
  onChange,
}: {
  checked: boolean;
  onChange: () => void;
}) {
  return (
    <label className="cursor-pointer shrink-0">
      <input
        type="checkbox"
        checked={checked}
        onChange={onChange}
        className="sr-only"
      />
      <span
        className={`w-4 h-4 rounded flex items-center justify-center border-2 transition-all ${
          checked ? "bg-cta border-cta" : "bg-white border-gray-300"
        }`}
      >
        {checked && (
          <svg width="8" height="7" viewBox="0 0 10 8" fill="none">
            <path
              d="M1 4L3.5 6.5L9 1"
              stroke="white"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        )}
      </span>
    </label>
  );
}

interface DaySchedule {
  enabled: boolean;
  start: string;
  end: string;
  unavailable?: boolean;
}

const INITIAL_SCHEDULE: Record<string, DaySchedule> = {
  Monday: { enabled: true, start: "9:00 AM", end: "5:00 PM" },
  Tuesday: { enabled: true, start: "9:00 AM", end: "5:00 PM" },
  Wednesday: { enabled: true, start: "10:00 AM", end: "2:00 PM" },
  Thursday: {
    enabled: false,
    start: "9:00 AM",
    end: "5:00 PM",
    unavailable: true,
  },
  Friday: { enabled: true, start: "8:00 AM", end: "1:00 PM" },
  Saturday: { enabled: true, start: "10:00 AM", end: "12:00 PM" },
};

const TIMEZONE_OPTIONS = [
  { label: "EST – Eastern Standard Time", value: "EST" },
  { label: "CST – Central Standard Time", value: "CST" },
  { label: "MST – Mountain Standard Time", value: "MST" },
  { label: "PST – Pacific Standard Time", value: "PST" },
  { label: "GMT – Greenwich Mean Time", value: "GMT" },
  { label: "CET – Central European Time", value: "CET" },
];

const DURATION_OPTIONS = [
  { label: "15 minutes", value: "15" },
  { label: "30 minutes", value: "30" },
  { label: "45 minutes", value: "45" },
  { label: "1 hour", value: "60" },
  { label: "1.5 hours", value: "90" },
  { label: "2 hours", value: "120" },
];

const SubscriberPanel = () => {
  const { image } = useSelector((state: RootState) => state.dashboard);
  const [schedule, setSchedule] =
    useState<Record<string, DaySchedule>>(INITIAL_SCHEDULE);
  const [selectedPackage, setSelectedPackage] = useState("Consulting Session");
  const [timezone, setTimezone] = useState("EST");
  const [duration, setDuration] = useState("60");

  const [requirePayment, setRequirePayment] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState<"stripe" | "paypal">(
    "stripe",
  );
  const [bookingLink] = useState("https://book.example.com/tom-booking");

  const toggle = (day: string) =>
    setSchedule((s) => ({
      ...s,
      [day]: { ...s[day], enabled: !s[day].enabled },
    }));

  const updateTime = (day: string, field: "start" | "end", val: string) =>
    setSchedule((s) => ({ ...s, [day]: { ...s[day], [field]: val } }));

  const handleCopyLink = () => {
    navigator.clipboard.writeText(bookingLink).catch(() => {});
    toast.success("Copied");
  };

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-border p-5 w-full">
      <div className=" flex flex-col  gap-4 items-center pb-6">
        <div className="w-16 h-16 border border-border rounded-full">
          <img
            className="w-full h-full   object-cover rounded-full"
            src={image || logo}
            alt=""
          />
        </div>
        <div>
          <h2 className="text-center text-sm font-bold text-text/50 uppercase tracking-widest mb-1">
            Subscriber
          </h2>
          <CommonHeader size="lg" className="justify-center! ">
            Booking Setup
          </CommonHeader>
          <p className="text-center text-xs text-text/50 mb-5">
            Set Your Availability
          </p>
          <p className="text-center text-[10px] text-text/50 mb-4 -mt-3">
            Manage your booking hours
          </p>
        </div>
      </div>
      <div className="space-y-2.5">
        {Object.entries(schedule).map(([day, data]) => (
          <div key={day} className="flex items-center gap-2">
            <OrangeCheckbox
              checked={data.enabled}
              onChange={() => toggle(day)}
            />
            <span
              className={`w-24 text-xs font-semibold ${data.enabled ? "text-text" : "text-text/50"}`}
            >
              {day}
            </span>
            {data.unavailable && !data.enabled ? (
              <span className="text-xs text-text/50 italic">Unavailable</span>
            ) : data.enabled ? (
              <div className="flex items-center gap-1.5 flex-1 ">
                <TimeInput
                  value={data.start}
                  onChange={(v) => updateTime(day, "start", v)}
                />
                <span className="text-sm text-text/50">to</span>
                <TimeInput
                  value={data.end}
                  onChange={(v) => updateTime(day, "end", v)}
                />
              </div>
            ) : (
              <span className="text-xs text-text/50 italic">Unavailable</span>
            )}
          </div>
        ))}
      </div>

      <div className="mt-4 mb-3">
        <label className={inputClass.label}>Timezone:</label>
        <CommonSelect
          value={timezone}
          item={TIMEZONE_OPTIONS}
          onValueChange={setTimezone}
          className="w-full"
        />
      </div>

      <div className="mb-4">
        <label className={inputClass.label}>Session Duration:</label>
        <CommonSelect
          value={duration}
          item={DURATION_OPTIONS}
          onValueChange={setDuration}
          className="w-full"
        />
      </div>

      {/* Package */}
      <div className="mb-4">
        <label className={inputClass.label}>Select Package:</label>
        <CommonSelect
          value={selectedPackage}
          item={[
            { label: "Consulting Session", value: "Consulting Session" },
            { label: "1-Hour Coaching", value: "1-Hour Coaching" },
            { label: "30-Min Call", value: "30-Min Call" },
            { label: "Strategy Workshop", value: "Strategy Workshop" },
          ]}
          onValueChange={setSelectedPackage}
          className="w-full"
        />
      </div>

      {/* Payment Toggle */}
      <div className="mb-4 border border-border rounded-xl p-3 space-y-3">
        <div className="flex items-center justify-between">
          <span className="text-xs font-semibold text-text">
            Require Payment
          </span>
          <button
            type="button"
            onClick={() => setRequirePayment((v) => !v)}
            className={`w-10 h-5 rounded-full transition-all relative cursor-pointer ${
              requirePayment ? "bg-cta" : "bg-gray-200"
            }`}
          >
            <span
              className={`absolute top-0.5 w-4 h-4 bg-white rounded-full shadow transition-all ${
                requirePayment ? "left-5" : "left-0.5"
              }`}
            />
          </button>
        </div>

        {requirePayment && (
          <div className="space-y-2">
            <p className="text-[10px] text-text/50">
              Client must complete payment before booking is confirmed.
            </p>
            <div className="flex flex-col sm:flex-row  gap-2">
              <button
                type="button"
                onClick={() => setPaymentMethod("stripe")}
                className={`flex-1 py-1.5 rounded-lg text-xs cursor-pointer font-semibold border transition-all ${
                  paymentMethod === "stripe"
                    ? "bg-cta text-white border-cta"
                    : "bg-white text-text/60 border-border hover:bg-gray-50"
                }`}
              >
                Stripe
              </button>
              <button
                type="button"
                onClick={() => setPaymentMethod("paypal")}
                className={`flex-1 cursor-pointer py-1.5 rounded-lg text-xs font-semibold border transition-all ${
                  paymentMethod === "paypal"
                    ? "bg-cta text-white border-cta"
                    : "bg-white text-text/60 border-border hover:bg-gray-50"
                }`}
              >
                PayPal
              </button>
            </div>
            <p className="text-[10px] text-text/50">
              Connected via:{" "}
              <span className="text-cta font-semibold">
                {paymentMethod === "stripe" ? "Stripe" : "PayPal"}
              </span>
            </p>
          </div>
        )}
      </div>

      <div className="flex flex-col sm:flex-row gap-2 mt-8">
        <CommonButton>Save Changes</CommonButton>

        <CommonButton
          type="button"
          variant="secondary"
          onClick={handleCopyLink}
        >
          <Copy size={13} /> Copy Booking Link
        </CommonButton>
      </div>
    </div>
  );
};

export default SubscriberPanel;
