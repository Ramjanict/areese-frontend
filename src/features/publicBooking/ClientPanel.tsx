import CommonHeader from "@/components/shared/CommonHeader";
import CommonSelect from "@/components/shared/CommonSelect";
import { CheckCircle, ChevronLeft, ChevronRight } from "lucide-react";
import { useState } from "react";
import { inputClass } from "../task/CreateDashboardForm";

function getDaysInMonth(year: number, month: number) {
  return new Date(year, month + 1, 0).getDate();
}
function getFirstDayOfMonth(year: number, month: number) {
  return new Date(year, month, 1).getDay();
}

const MONTH_NAMES = [
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
const DAY_LABELS = ["SUN", "MON", "TUE", "WED", "THU", "FRI", "SAT"];

const UNAVAILABLE_DATES = [1, 2, 8, 15, 22, 29];
const HIGHLIGHTED_DATES = [13, 20, 27];

function CalendarWidget({
  selectedDate,
  onSelect,
}: {
  selectedDate: number | null;
  onSelect: (d: number) => void;
}) {
  const [month, setMonth] = useState(5);
  const [year] = useState(2024);

  const daysInMonth = getDaysInMonth(year, month);
  const firstDay = getFirstDayOfMonth(year, month);
  const cells = Array(firstDay)
    .fill(null)
    .concat(Array.from({ length: daysInMonth }, (_, i) => i + 1));

  return (
    <div>
      <div className="flex items-center justify-between mb-3">
        <button
          onClick={() => setMonth((m) => Math.max(0, m - 1))}
          className="w-6 h-6 rounded-full hover:bg-gray-100 flex items-center justify-center transition-colors cursor-pointer"
        >
          <ChevronLeft size={14} className="text-text/50" />
        </button>
        <span className="text-sm font-bold text-gray-700">
          {MONTH_NAMES[month]} {year}
        </span>
        <button
          onClick={() => setMonth((m) => Math.min(11, m + 1))}
          className="w-6 h-6 rounded-full hover:bg-gray-100 flex items-center justify-center transition-colors cursor-pointer"
        >
          <ChevronRight size={14} className="text-text/50" />
        </button>
      </div>

      <div className="grid grid-cols-7 mb-1">
        {DAY_LABELS.map((d) => (
          <div
            key={d}
            className="text-center text-[9px] font-bold text-text/50 py-1"
          >
            {d}
          </div>
        ))}
      </div>

      <div className="grid grid-cols-7 gap-y-1">
        {cells.map((day, i) => {
          if (!day) return <div key={`empty-${i}`} />;
          const isUnavailable = UNAVAILABLE_DATES.includes(day);
          const isHighlighted = HIGHLIGHTED_DATES.includes(day);
          const isSelected = selectedDate === day;
          const isToday = day === 13;

          return (
            <button
              key={day}
              type="button"
              disabled={isUnavailable}
              onClick={() => !isUnavailable && onSelect(day)}
              className={`
                w-7 h-7 mx-auto rounded-lg text-xs font-semibold transition-all cursor-pointer
                ${
                  isSelected
                    ? "bg-cta text-white shadow-sm"
                    : isHighlighted
                      ? "bg-orange-100 text-orange-600"
                      : isToday
                        ? "bg-cta text-white"
                        : isUnavailable
                          ? "bg-gray-100 text-gray-300 cursor-not-allowed"
                          : "hover:bg-orange-50 text-text"
                }
              `}
            >
              {day}
            </button>
          );
        })}
      </div>

      <div className="flex items-center gap-1.5 mt-3">
        <span className="w-3 h-3 rounded bg-gray-200 inline-block" />
        <span className="text-[9px] text-text/50">Unavailable</span>
      </div>
    </div>
  );
}

const TIME_SLOTS = ["9:00 AM", "10:00 AM", "11:00 AM", "1:00 PM", "2:00 PM"];
const UNAVAILABLE_SLOTS = ["3:00 PM"];

const HOST_REQUIRES_PAYMENT = true;

type Step = "details" | "payment" | "confirmed";

const ClientPanel = () => {
  const [service, setService] = useState("Consulting Session");
  const [selectedDate, setSelectedDate] = useState<number | null>(13);
  const [selectedTime, setSelectedTime] = useState<string | null>("9:00 AM");

  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [comment, setComment] = useState("");

  const [step, setStep] = useState<Step>("details");

  const [paymentProcessing, setPaymentProcessing] = useState(false);

  const wordCount =
    comment.trim() === "" ? 0 : comment.trim().split(/\s+/).length;
  const commentValid = wordCount <= 25;
  const formValid =
    name.trim() !== "" &&
    phone.trim() !== "" &&
    email.trim() !== "" &&
    commentValid &&
    selectedDate !== null &&
    selectedTime !== null;

  const handleConfirmClick = () => {
    if (!formValid) return;
    if (HOST_REQUIRES_PAYMENT) {
      setStep("payment");
    } else {
      setStep("confirmed");
    }
  };

  const handlePayment = () => {
    setPaymentProcessing(true);
    setTimeout(() => {
      setPaymentProcessing(false);
      setStep("confirmed");
    }, 1500);
  };

  if (step === "confirmed") {
    return (
      <div className="bg-white rounded-2xl shadow-sm border border-border p-5 w-full flex flex-col items-center justify-center gap-4 min-h-[400px]">
        <CheckCircle size={48} className="text-cta" />
        <CommonHeader size="lg" className="justify-center!">
          Booking Confirmed!
        </CommonHeader>
        <p className="text-sm text-text/50 text-center">
          Your appointment with{" "}
          <span className="font-semibold text-text">Tom</span> has been
          confirmed.
        </p>
        <div className="bg-orange-50 border border-orange-100 rounded-xl p-4 w-full space-y-1 text-xs text-text">
          <p>
            <span className="font-semibold">Name:</span> {name}
          </p>
          <p>
            <span className="font-semibold">Email:</span> {email}
          </p>
          <p>
            <span className="font-semibold">Phone:</span> {phone}
          </p>
          <p>
            <span className="font-semibold">Service:</span> {service}
          </p>
          <p>
            <span className="font-semibold">Date:</span> June {selectedDate},
            2024
          </p>
          <p>
            <span className="font-semibold">Time:</span> {selectedTime}
          </p>
          {comment.trim() && (
            <p>
              <span className="font-semibold">Note:</span> {comment}
            </p>
          )}
        </div>
        <p className="text-[10px] text-text/50 text-center">
          A confirmation has been sent to {email}
        </p>
      </div>
    );
  }

  if (step === "payment") {
    return (
      <div className="bg-white rounded-2xl shadow-sm border border-border p-5 w-full ">
        <h2 className="text-center text-sm font-bold text-text/50 uppercase tracking-widest mb-1">
          Client
        </h2>
        <CommonHeader size="lg" className="justify-center!">
          Complete Payment
        </CommonHeader>
        <p className="text-sm text-center text-text/50 mb-5">
          Payment is required to confirm your booking
        </p>

        <div className="bg-orange-50 border border-orange-100 rounded-xl p-3 mb-5 space-y-1 text-xs text-text">
          <p>
            <span className="font-semibold">Service:</span> {service}
          </p>
          <p>
            <span className="font-semibold">Date:</span> June {selectedDate},
            2024 at {selectedTime}
          </p>
          <p>
            <span className="font-semibold">Host:</span> Tom
          </p>
        </div>

        <div className="space-y-3 mb-5">
          <div>
            <label className={inputClass.label}>Card Number</label>
            <input
              type="text"
              placeholder="4242 4242 4242 4242"
              className={inputClass.input}
              maxLength={19}
            />
          </div>
          <div className="flex gap-3">
            <div className="flex-1">
              <label className={inputClass.label}>Expiry</label>
              <input
                type="text"
                placeholder="MM/YY"
                className={inputClass.input}
                maxLength={5}
              />
            </div>
            <div className="flex-1">
              <label className={inputClass.label}>CVC</label>
              <input
                type="text"
                placeholder="123"
                className={inputClass.input}
                maxLength={3}
              />
            </div>
          </div>
        </div>

        <div className="flex gap-2">
          <button
            onClick={() => setStep("details")}
            className="flex-1 py-2.5 bg-white border border-border hover:bg-gray-50 text-gray-600 text-xs font-semibold rounded-xl transition-all active:scale-95 cursor-pointer"
          >
            Back
          </button>
          <button
            onClick={handlePayment}
            disabled={paymentProcessing}
            className="flex-1 py-2.5 bg-cta hover:bg-orange-500 disabled:opacity-60 text-white text-xs font-bold rounded-xl transition-all active:scale-95 shadow-sm shadow-orange-200 cursor-pointer"
          >
            {paymentProcessing ? "Processing…" : "Pay & Confirm"}
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-border p-5 w-full">
      <h2 className="text-center text-sm font-bold text-text/50 uppercase tracking-widest mb-1">
        Client
      </h2>

      <CommonHeader size="lg" className="justify-center! ">
        Public Booking Page
      </CommonHeader>

      <p className="text-sm text-center text-text/50 mb-3">
        Book a Session with Tom
      </p>

      <div className="mb-4">
        <label className={inputClass.label}>Select a Service:</label>
        <CommonSelect
          value={service}
          item={[
            { label: "Consulting Session", value: "Consulting Session" },
            { label: "1-Hour Coaching", value: "1-Hour Coaching" },
            { label: "30-Min Call", value: "30-Min Call" },
          ]}
          onValueChange={setService}
          className="w-full"
        />
      </div>

      <div className="flex flex-col sm:flex-row gap-4">
        <div className="flex-1">
          <p className="text-xs font-bold text-text mb-2">Choose a Date:</p>
          <CalendarWidget
            selectedDate={selectedDate}
            onSelect={setSelectedDate}
          />
        </div>

        <div className="w-full  sm:w-28">
          <p className="text-xs font-bold text-text mb-2">Select a Time:</p>
          <div className="space-y-2  ">
            {TIME_SLOTS.map((slot) => (
              <button
                key={slot}
                type="button"
                onClick={() => setSelectedTime(slot)}
                className={`w-full p-2 rounded-lg text-xs font-bold transition-all active:scale-95 cursor-pointer ${
                  selectedTime === slot
                    ? "bg-cta text-white shadow-sm shadow-orange-200"
                    : "bg-orange-100 text-orange-600 hover:bg-orange-200"
                }`}
              >
                {slot}
              </button>
            ))}
            {UNAVAILABLE_SLOTS.map((slot) => (
              <button
                key={slot}
                disabled
                className="w-full p-2 rounded-lg text-xs font-semibold bg-bg text-text/50 cursor-not-allowed"
              >
                {slot}
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className=" grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label className={inputClass.label}>Full Name *</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Jane Smith"
            className={inputClass.input}
          />
        </div>
        <div>
          <label className={inputClass.label}>Phone Number *</label>
          <input
            type="tel"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            placeholder="+1 (555) 000-0000"
            className={inputClass.input}
          />
        </div>

        <div>
          <label className={inputClass.label}>Email Address *</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="jane@example.com"
            className={inputClass.input}
          />
        </div>
        <div>
          <div className="flex items-center justify-between mb-1">
            <label className={inputClass.label} style={{ marginBottom: 0 }}>
              Purpose of Meeting (max 25 words)
            </label>
            <span
              className={`text-[10px] ${wordCount > 25 ? "text-red-400" : "text-text/40"}`}
            >
              {wordCount}/25
            </span>
          </div>
          <textarea
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            rows={2}
            placeholder="Briefly describe the purpose of your meeting…"
            className={`${inputClass.input} resize-none`}
          />
          {!commentValid && (
            <p className="text-[10px] text-red-400 mt-0.5">
              Please keep to 25 words or fewer.
            </p>
          )}
        </div>
      </div>

      {HOST_REQUIRES_PAYMENT && (
        <p className="text-[10px] text-orange-500 mt-3 text-center">
          ⚡ Payment required — you'll be taken to checkout before your booking
          is confirmed.
        </p>
      )}

      <button
        onClick={handleConfirmClick}
        disabled={!formValid}
        className="w-full mt-4 py-2.5 bg-cta hover:bg-orange-500 disabled:opacity-50 disabled:cursor-not-allowed text-white text-sm font-bold rounded-xl transition-all active:scale-95 shadow-sm shadow-orange-200 cursor-pointer"
      >
        {HOST_REQUIRES_PAYMENT ? "Continue to Payment" : "Confirm Booking"}
      </button>
    </div>
  );
};

export default ClientPanel;
