interface TimeInputProps {
  value: string;
  onChange: (v: string) => void;
}

function to24Hour(time12: string): string {
  const [time, modifier] = time12.split(" ");
  let [hours, minutes] = time.split(":").map(Number);
  if (modifier === "AM") {
    if (hours === 12) hours = 0;
  } else {
    if (hours !== 12) hours += 12;
  }
  return `${String(hours).padStart(2, "0")}:${String(minutes).padStart(2, "0")}`;
}

function to12Hour(time24: string): string {
  const [h, m] = time24.split(":").map(Number);
  const modifier = h >= 12 ? "PM" : "AM";
  const hours = h % 12 || 12;
  return `${hours}:${String(m).padStart(2, "0")} ${modifier}`;
}

export function TimeInput({ value, onChange }: TimeInputProps) {
  const inputValue = to24Hour(value);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.value) {
      onChange(to12Hour(e.target.value));
    }
  };

  return (
    <div className="relative">
      <input
        type="time"
        value={inputValue}
        onChange={handleChange}
        className={` w-full border border-border bg-white rounded-md p-1.5 sm:p-3.5 outline-none text-text text-xs`}
      />
    </div>
  );
}
