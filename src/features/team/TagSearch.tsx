import { cn } from "@/lib/utils";
import { Search } from "lucide-react";

interface DashboardSearchProps {
  className?: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}
const TagSearch: React.FC<DashboardSearchProps> = ({
  className,
  value,
  onChange,
}) => {
  return (
    <div className={`relative w-full ${className}`}>
      <div
        className={cn(
          "flex items-center w-full gap-1 border border-border rounded-md bg-background px-3 transition-shadow duration-200 outline-none",
        )}
      >
        <input
          type="text"
          placeholder="Enter tag name..."
          className="w-full outline-none bg-transparent text-text py-2 placeholder:text-text/50"
          value={value}
          onChange={onChange}
        />
        <span className="flex items-center justify-center text-text rounded-full transition-colors duration-200">
          <Search className="h-4 w-4" />
        </span>
      </div>
    </div>
  );
};

export default TagSearch;
