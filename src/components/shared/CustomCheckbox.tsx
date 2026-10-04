import { FaCheck } from "react-icons/fa";

interface CheckboxProps {
  label: string;
  checked: boolean;
  onChange: (checked: boolean) => void;
}

export default function CustomCheckbox({
  label,
  checked,
  onChange,
}: CheckboxProps) {
  return (
    <label className="flex items-center gap-2.5 cursor-pointer select-none">
      <input
        type="checkbox"
        checked={checked}
        onChange={(e) => onChange(e.target.checked)}
        className="sr-only"
      />

      <span
        className={`w-[18px] h-[18px] rounded-md border-2 flex items-center justify-center shrink-0 transition-all duration-150 ${
          checked
            ? "bg-today-accent border-today-accent shadow-sm shadow-today-bg"
            : "bg-bg border-border"
        }`}
      >
        {checked && <FaCheck className="text-white" />}
      </span>

      <span
        className={`text-sm transition-colors ${checked ? "text-text font-semibold" : "text-text/50"}`}
      >
        {label}
      </span>
    </label>
  );
}
