import { type FieldError, type UseFormRegisterReturn } from "react-hook-form";
import { FaRegCalendarAlt } from "react-icons/fa";

interface DateTimeInputProps {
  label: string;
  register: UseFormRegisterReturn;
  error?: FieldError;
  placeholder?: string;
  className?: string;
  inputClass?: string;
  labelClass?: string;
  errorClass?: string;
}

const DateTimeInput: React.FC<DateTimeInputProps> = ({
  label,
  register,
  error,
  placeholder,
  className = "",
  inputClass = "",
  labelClass = "",
  errorClass = "",
}) => {
  return (
    <div className={className}>
      <label className={labelClass}>{label}</label>

      <div className="relative">
        <input
          {...register}
          type="datetime-local"
          placeholder={placeholder}
          className={`${inputClass} pr-10 
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

      {error && <p className={errorClass}>{error.message}</p>}
    </div>
  );
};

export default DateTimeInput;
