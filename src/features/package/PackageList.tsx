import CardAction from "@/components/shared/CardAction";
import { useState } from "react";
import PackageModal from "./PackageModal";
export const tableDesign = {
  table:
    "w-full border-separate border-spacing-0 border border-border rounded-lg overflow-hidden",
  thead: "bg-[#EEF2FF] text-black",
  tbody: "text-[#101828]",
  tr: "border-b last:border-b-0 border-border ",
  th: " text-center! py-3 px-4 text-sm font-bold text-black border-b border-r border-border first:rounded-tl-lg last:rounded-tr-lg",
  td: "text-center! py-3 px-4 text-sm text-[#101828] border-b border-r border-border last:border-r-0",
};
const tableHeaders = [
  { label: "#", align: "text-center hidden md:table-cell" },
  { label: "Name", align: "text-left  " },
  { label: "Price", align: "text-left hidden  sm:table-cell" },
  { label: "Duration (min)", align: "text-left hidden md:table-cell" },
  { label: "Duration Note", align: "text-left hidden md:table-cell" },
  { label: "Service Fee", align: "text-left hidden md:table-cell" },
  { label: "Edit", align: "text-left " },
  { label: "Delete", align: "text-left " },
];
export interface Bookings {
  id: number;
  name: string;
  price: number;
  duration: number;
  durationNote: string;
  description: string;
  serviceFee?: number; // optional
}

export const initialBookings: Bookings[] = [
  {
    id: 1,
    name: "Starter Session",
    price: 100,
    duration: 15,
    durationNote: "Quick intro session",
    serviceFee: 10,
    description: "Short session for quick guidance",
  },
  {
    id: 2,
    name: "Basic Consultation",
    price: 200,
    duration: 30,
    durationNote: "Standard consultation",
    serviceFee: 20,
    description: "Basic consultation with client",
  },
  {
    id: 3,
    name: "Professional Session",
    price: 300,
    duration: 45,
    durationNote: "Depends on complexity",
    serviceFee: 0,
    description: "Detailed professional session",
  },
  {
    id: 4,
    name: "Premium Coaching",
    price: 400,
    duration: 60,
    durationNote: "Flexible timing available",
    serviceFee: 50,
    description: "Advanced coaching package",
  },
  {
    id: 5,
    name: "VIP Strategy Call",
    price: 500,
    duration: 90,
    durationNote: "Can extend if needed",
    serviceFee: 100,
    description: "High-level strategy session",
  },
  {
    id: 6,
    name: "Express Help",
    price: 120,
    duration: 20,
    durationNote: "Fast problem solving",
    serviceFee: 5,
    description: "Quick support for urgent issues",
  },
  {
    id: 7,
    name: "Standard Coaching",
    price: 250,
    duration: 40,
    durationNote: "Best for regular users",
    serviceFee: 15,
    description: "Balanced session for most clients",
  },
  {
    id: 8,
    name: "Deep Dive Session",
    price: 350,
    duration: 75,
    durationNote: "In-depth analysis",
    serviceFee: 30,
    description: "Detailed and comprehensive session",
  },
  {
    id: 9,
    name: "Business Strategy",
    price: 600,
    duration: 120,
    durationNote: "Custom based on needs",
    serviceFee: 80,
    description: "Strategy planning for businesses",
  },
  {
    id: 10,
    name: "Ultimate VIP Package",
    price: 1000,
    duration: 180,
    durationNote: "Fully flexible duration",
    serviceFee: 150,
    description: "Complete premium experience",
  },
];

interface BookingsListProps {
  bookings: Bookings[];
  handleDelete: (id: number) => void;
  handleEdit: (user: Bookings) => void;
}
export const PackageList: React.FC<BookingsListProps> = ({
  bookings,
  handleDelete,
  handleEdit,
}) => {
  const [isPackageModalOpen, setIsPackageModalOpen] = useState(false);
  const [selectedPackage, setSelectedPackage] = useState<Bookings | null>(null);
  const handleClick = (booking: Bookings) => {
    setIsPackageModalOpen(true);
    setSelectedPackage(booking);
  };
  return (
    <>
      <div className=" bg-white rounded-xl border border-border overflow-hidden  mt-6 ">
        <div className="block w-full overflow-x-auto">
          <table className={tableDesign.table}>
            <thead className={tableDesign.thead}>
              <tr className={tableDesign.tr}>
                {tableHeaders.map((header, index) => (
                  <th
                    key={index}
                    className={` ${header.align} ${tableDesign.th} `}
                  >
                    {header.label}
                  </th>
                ))}
              </tr>
            </thead>

            <tbody className={tableDesign.tbody}>
              {bookings.length === 0 ? (
                <tr className={tableDesign.tr}>
                  <td colSpan={7} className={`text-center ${tableDesign.td}`}>
                    No data
                  </td>
                </tr>
              ) : (
                bookings.map((packageData, index) => (
                  <tr key={packageData.id} className={tableDesign.tr}>
                    <td className={` hidden md:table-cell ${tableDesign.td} `}>
                      <span
                        className={`px-3 py-1 w-fit mx-auto rounded-full text-xs font-medium hidden md:block `}
                      >
                        {index + 1}
                      </span>
                    </td>

                    <td
                      onClick={() => handleClick(packageData)}
                      className={` ${tableDesign.td}  cursor-pointer `}
                    >
                      {packageData.name}
                    </td>

                    <td className={` ${tableDesign.td}  hidden  sm:table-cell`}>
                      ${packageData.price}
                    </td>
                    <td className={` ${tableDesign.td} hidden md:table-cell  `}>
                      {packageData.duration}
                    </td>

                    <td className={` ${tableDesign.td} hidden md:table-cell  `}>
                      {packageData.durationNote}
                    </td>
                    <td className={` ${tableDesign.td} hidden md:table-cell  `}>
                      ${packageData.serviceFee}
                    </td>
                    <td className={` ${tableDesign.td}`}>
                      <div className="flex justify-center">
                        <CardAction
                          onEdit={() => {
                            handleEdit(packageData);
                          }}
                        />
                      </div>
                    </td>
                    <td className={` ${tableDesign.td}  `}>
                      <div className="flex justify-center">
                        <CardAction
                          onDelete={() => {
                            handleDelete(packageData.id);
                          }}
                        />
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {isPackageModalOpen && (
        <PackageModal
          data={selectedPackage}
          onClose={() => setIsPackageModalOpen(false)}
        />
      )}
    </>
  );
};
export default PackageList;
