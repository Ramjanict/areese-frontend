import CommonButton from "@/components/shared/CommonButton";
import type { Appointment } from "./AppointmentList";

interface AppointmentModalProps {
  selectAppointment: Appointment | null;
  onClose: () => void;
}

const AppointmentModal: React.FC<AppointmentModalProps> = ({
  selectAppointment: appointment,
  onClose,
}) => {
  if (!appointment) return null;

  const statusColor = {
    Scheduled: "bg-blue-100 text-blue-600",
    Completed: "bg-green-100 text-green-600",
    Pending: "bg-yellow-100 text-yellow-600",
    Cancelled: "bg-red-100 text-red-600",
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
      <div className="bg-white w-full max-w-md rounded-xl p-6 shadow-lg">
        <h2 className="text-lg font-semibold mb-4">Appointment Details</h2>

        <div className="space-y-3 text-sm">
          <div>
            <span className="font-medium">Client:</span> {appointment.name}
          </div>

          <div>
            <span className="font-medium">Date:</span> {appointment.date}
          </div>

          <div>
            <span className="font-medium">Time:</span> {appointment.time}
          </div>

          <div>
            <span className="font-medium">Duration:</span>{" "}
            {appointment.duration}
          </div>

          <div>
            <span className="font-medium">Status:</span>{" "}
            <span
              className={`ml-2 px-2 py-1 rounded text-xs font-medium ${
                statusColor[appointment.status as keyof typeof statusColor]
              }`}
            >
              {appointment.status}
            </span>
          </div>

          <div>
            <span className="font-medium">Meeting Link:</span>{" "}
            {appointment.link ? (
              <a
                href={appointment.link}
                target="_blank"
                className="text-blue-500 underline ml-1"
              >
                Join
              </a>
            ) : (
              <span className="text-gray-400 ml-1">N/A</span>
            )}
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

export default AppointmentModal;
