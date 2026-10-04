import CommonButton from "@/components/shared/CommonButton";
import { useState } from "react";
import { inputClass } from "../task/CreateDashboardForm";

const BookingCapsPanel = () => {
  const [daily, setDaily] = useState(0);
  const [weekly, setWeekly] = useState(0);
  const [monthly, setMonthly] = useState(0);

  return (
    <div className="bg-white rounded-2xl border border-border shadow-sm p-6">
      <h3 className="font-bold text-text mb-1">Booking Limits</h3>
      <div className="w-full h-px bg-bg my-3" />
      <p className="text-sm text-text/50 mb-5">
        Prevent overbooking and manage workload with caps.
      </p>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
        <div>
          <label className={inputClass.label}>Daily limit</label>
          <input
            type="number"
            value={daily}
            onChange={(e) => setDaily(Number(e.target.value))}
            className={inputClass.input}
          />
        </div>
        <div>
          <label className={inputClass.label}>Weekly limit</label>
          <input
            type="number"
            value={weekly}
            onChange={(e) => setWeekly(Number(e.target.value))}
            className={inputClass.input}
          />
        </div>
      </div>
      <div className="mb-5">
        <label className={inputClass.label}>Monthly limit</label>
        <input
          type="number"
          value={monthly}
          onChange={(e) => setMonthly(Number(e.target.value))}
          className={inputClass.input}
        />
      </div>
      <CommonButton>Save Changes</CommonButton>
    </div>
  );
};

export default BookingCapsPanel;
