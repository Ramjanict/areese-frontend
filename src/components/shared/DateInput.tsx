import { inputClass } from "@/features/task/CreateDashboardForm";
import { FaRegCalendarAlt } from "react-icons/fa";

interface DateInputProps {
  label: string;
  value: string;
  onChange: (value: string) => void;
}

const DateInput: React.FC<DateInputProps> = ({ label, value, onChange }) => {
  return (
    <div>
      <label className="text-primary-gray text-xs sm:text-sm mb-1 block">
        {label}
      </label>

      <div className="relative">
        <input
          type="date"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className={`${inputClass.input} pr-10 
          [&::-webkit-calendar-picker-indicator]:opacity-0 
          [&::-webkit-calendar-picker-indicator]:absolute 
          [&::-webkit-calendar-picker-indicator]:right-0 
          [&::-webkit-calendar-picker-indicator]:w-10 
          [&::-webkit-calendar-picker-indicator]:h-full 
          [&::-webkit-calendar-picker-indicator]:cursor-pointer`}
        />

        <FaRegCalendarAlt
          className="absolute right-3 top-1/2 -translate-y-1/2 text-text pointer-events-none"
          size={16}
        />
      </div>
    </div>
  );
};

export default DateInput;
