import DashboardSearch from "@/components/shared/DashboardSearch";
import DashboardTopSection from "@/components/shared/DashboardTopSection";
import Pagination from "@/components/shared/Pagination";
import SectionHeader from "@/components/shared/SectionHeader";
import { useDebounce } from "@/components/shared/useDebounce";
import { useState } from "react";
import { LuExternalLink } from "react-icons/lu";
import { RxCopy } from "react-icons/rx";
import { tableDesign } from "../package/PackageList";
import AppointmentModal from "./AppointmentModal";

export interface Appointment {
  id: number;
  name: string;
  date: string;
  time: string;
  duration: string;
  status: "Scheduled" | "Completed" | "Cancelled" | "Pending";
  link?: string;
}

const tableHeaders = [
  { label: "#", align: "text-center hidden lg:table-cell" },
  { label: "Name", align: "text-left  " },
  { label: "Date", align: "text-left hidden md:table-cell " },
  { label: "Time", align: "text-left " },
  { label: "Duration", align: "text-left hidden md:table-cell" },
  { label: "Status", align: "text-left hidden md:table-cell" },
  { label: "Link", align: "text-left" },
];

const initialAppointments: Appointment[] = [
  {
    id: 1,
    name: "John Doe",
    date: "2026-03-07",
    time: "10:00",
    duration: "30 mins",
    status: "Scheduled",
    link: "https://example.com/john",
  },
  {
    id: 2,
    name: "Jane Smith",
    date: "2026-03-07",
    time: "11:00",
    duration: "1 hr",
    status: "Completed",
    link: "https://example.com/jane",
  },
  {
    id: 3,
    name: "Michael Johnson",
    date: "2026-03-08",
    time: "09:30",
    duration: "45 mins",
    status: "Pending",
  },
  {
    id: 4,
    name: "Emily Davis",
    date: "2026-03-08",
    time: "14:00",
    duration: "30 mins",
    status: "Cancelled",
  },
  {
    id: 5,
    name: "David Wilson",
    date: "2026-03-09",
    time: "16:00",
    duration: "1 hr",
    status: "Scheduled",
    link: "https://example.com/david",
  },
  {
    id: 6,
    name: "Sara Lee",
    date: "2026-03-10",
    time: "10:30",
    duration: "30 mins",
    status: "Scheduled",
  },
  {
    id: 7,
    name: "Chris Martin",
    date: "2026-03-10",
    time: "12:00",
    duration: "1 hr",
    status: "Completed",
    link: "https://example.com/chris",
  },
  {
    id: 8,
    name: "Anna Brown",
    date: "2026-03-11",
    time: "09:00",
    duration: "45 mins",
    status: "Pending",
  },
  {
    id: 9,
    name: "Robert King",
    date: "2026-03-11",
    time: "15:00",
    duration: "30 mins",
    status: "Cancelled",
    link: "https://example.com/robert",
  },
  {
    id: 10,
    name: "Laura White",
    date: "2026-03-12",
    time: "11:30",
    duration: "1 hr",
    status: "Scheduled",
  },
];

const AppointmentList = () => {
  const [copyMessage, setCopyMessage] = useState<string | null>(null);
  const [isAppointmentModalOpen, setIsAppointmentModalOpen] = useState(false);

  const handleCopy = (link?: string) => {
    if (!link) return;
    navigator.clipboard.writeText(link);
    setCopyMessage("Link copied to clipboard!");
    setTimeout(() => setCopyMessage(null), 2000);
  };

  const handleOpenLink = (link?: string) => {
    if (!link) return;
    window.open(link, "_blank");
  };

  const [searchTerm, setSearchTerm] = useState("");
  const debouncedSearch = useDebounce(searchTerm, 500);
  const [appointments] = useState(initialAppointments);
  const [selectAppointment, setSelectAppointment] =
    useState<Appointment | null>(null);

  const handleClick = (appointment: Appointment) => {
    setIsAppointmentModalOpen(true);
    setSelectAppointment(appointment);
  };

  const filteredAppointments = appointments.filter((plan) => {
    const keyword = debouncedSearch.toLowerCase();

    return (
      plan.name.toLowerCase().includes(keyword) ||
      plan.date.toLowerCase().includes(keyword) ||
      plan.status.toLowerCase().includes(keyword) ||
      plan.time.toLowerCase().includes(keyword) ||
      plan.duration.toLowerCase().includes(keyword)
    );
  });

  // handle pagination
  const ITEMS_PER_PAGE = 5;
  const [currentPage, setCurrentPage] = useState(1);

  const totalPages = Math.ceil(filteredAppointments.length / ITEMS_PER_PAGE);

  const paginatedAppointments = filteredAppointments.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE,
  );
  return (
    <>
      <DashboardTopSection
        title="Appointments"
        description="View upcoming and past appointments with status and timing details.
        "
      />
      <>
        <div className="flex flex-col md:flex-row justify-between gap-2">
          <SectionHeader
            title="Appointments"
            description="Appointments with status and timing details"
          />
          <DashboardSearch
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>

        {copyMessage && (
          <div className="fixed top-4 right-4 bg-cta text-white p-2 rounded shadow-md z-50">
            {copyMessage}
          </div>
        )}

        <div className="bg-white rounded-xl border border-gray-200 overflow-hidden mt-6">
          <div className="block w-full overflow-x-auto">
            <table className={tableDesign.table}>
              <thead className={tableDesign.thead}>
                <tr className={tableDesign.tr}>
                  {tableHeaders.map((header, index) => (
                    <th
                      key={index}
                      className={`${header.align} ${tableDesign.th}`}
                    >
                      {header.label}
                    </th>
                  ))}
                </tr>
              </thead>

              <tbody className={tableDesign.tbody}>
                {paginatedAppointments.length === 0 ? (
                  <tr className={tableDesign.tr}>
                    <td colSpan={7} className={`text-center ${tableDesign.td}`}>
                      No appointments available
                    </td>
                  </tr>
                ) : (
                  paginatedAppointments.map((appt, index) => (
                    <tr key={appt.id} className={tableDesign.tr}>
                      <td className={`${tableDesign.td} hidden lg:table-cell`}>
                        {index + 1}
                      </td>

                      <td
                        onClick={() => handleClick(appt)}
                        className={` ${tableDesign.td} cursor-pointer`}
                      >
                        {appt.name}
                      </td>
                      <td className={` ${tableDesign.td} hidden md:table-cell`}>
                        {appt.date}
                      </td>
                      <td className={` ${tableDesign.td}`}>{appt.time}</td>
                      <td className={`hidden md:table-cell ${tableDesign.td}`}>
                        {appt.duration}
                      </td>
                      <td className={`hidden md:table-cell ${tableDesign.td}`}>
                        <span
                          className={`px-2 py-1 rounded-md text-white ${
                            appt.status === "Scheduled"
                              ? "bg-info"
                              : appt.status === "Completed"
                                ? "bg-completed-bg"
                                : appt.status === "Cancelled"
                                  ? "bg-danger"
                                  : "bg-cta"
                          }`}
                        >
                          {appt.status}
                        </span>
                      </td>

                      <td className={tableDesign.td}>
                        {appt.link ? (
                          <div className="flex gap-1">
                            <span
                              onClick={() => handleCopy(appt.link)}
                              className="text-today-accent p-1 rounded-md cursor-pointer border border-today-accent hover:bg-cta hover:text-white transition-all"
                            >
                              <RxCopy />
                            </span>
                            <span
                              onClick={() => handleOpenLink(appt.link)}
                              className="text-info p-1 rounded-md cursor-pointer border border-info hover:bg-info hover:text-white transition-all"
                            >
                              <LuExternalLink />
                            </span>
                          </div>
                        ) : (
                          "N/A"
                        )}
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>

        {paginatedAppointments.length > 0 && (
          <div className="my-6">
            <Pagination
              currentPage={currentPage}
              totalPages={totalPages}
              onPageChange={setCurrentPage}
            />
          </div>
        )}
      </>

      {isAppointmentModalOpen && (
        <AppointmentModal
          selectAppointment={selectAppointment}
          onClose={() => setIsAppointmentModalOpen(false)}
        />
      )}
    </>
  );
};

export default AppointmentList;
