import { useState } from "react";
import CheckRow from "./CheckRow";

const NotificationsPanel = () => {
  const [reminders, setReminders] = useState(true);
  const [payments, setPayments] = useState(false);
  const [overdue, setOverdue] = useState(false);

  return (
    <div className="bg-brand rounded-2xl border border-border shadow-sm p-6">
      <h3 className="font-bold text-text mb-1">Platform Notifications</h3>
      <div className="w-full h-px text-text/50 my-3" />
      <p className="text-sm text-text mb-4">
        In-app notifications only. No SMS or email.
      </p>
      <div className="flex flex-col gap-3">
        <CheckRow
          label="Show reminders"
          checked={reminders}
          onChange={setReminders}
        />
        <CheckRow
          label="Show payment alerts"
          checked={payments}
          onChange={setPayments}
        />
        <CheckRow
          label="Show task overdue warning"
          checked={overdue}
          onChange={setOverdue}
        />
      </div>
    </div>
  );
};

export default NotificationsPanel;
