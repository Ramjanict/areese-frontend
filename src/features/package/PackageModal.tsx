import CommonButton from "@/components/shared/CommonButton";
import type { Bookings } from "./PackageList";

interface PackageModalProps {
  data: Bookings | null;
  onClose: () => void;
}

const PackageModal = ({ data, onClose }: PackageModalProps) => {
  if (!data) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
      <div className="bg-white w-full max-w-md rounded-xl p-6 shadow-lg">
        <h2 className="text-lg font-semibold mb-4">Package Details</h2>

        <div className="space-y-3 text-sm">
          <div>
            <span className="font-medium">Package Name:</span> {data.name}
          </div>

          <div>
            <span className="font-medium">Price:</span> ${data.price}
          </div>

          <div>
            <span className="font-medium">Duration:</span> {data.duration} min
          </div>
          <div>
            <span className="font-medium">Duration Note:</span>
            {data.durationNote}
          </div>
          <div>
            <span className="font-medium">Service Fee:</span> ${data.serviceFee}
          </div>
        </div>

        <div className="mt-6 flex justify-end">
          <CommonButton onClick={onClose} variant="secondary">
            Close
          </CommonButton>
        </div>
      </div>
    </div>
  );
};

export default PackageModal;
