import CommonSpace from "@/components/shared/CommonSpace";
import DashboardSearch from "@/components/shared/DashboardSearch";
import Pagination from "@/components/shared/Pagination";
import SectionHeader from "@/components/shared/SectionHeader";
import { useState } from "react";
import { LuExternalLink } from "react-icons/lu";
import { RxCopy } from "react-icons/rx";
import { tableDesign } from "../package/PackageList";

interface BookingRow {
  id: number;
  package: string;
  name: string;
  limit: "Unlimited" | number;
  bookings: number;
  shareLink: string;
  redirect: string;
}

const tableHeaders = [
  { label: "#", align: "text-center" },
  { label: "Package", align: "text-left hidden md:table-cell" },
  { label: "Name", align: "text-left hidden sm:table-cell" },
  { label: "Bookings", align: "text-left hidden sm:table-cell" },
  { label: "Share Link", align: "text-left" },
  { label: "Redirect", align: "text-left hidden lg:table-cell" },
];
interface BookingRow {
  id: number;
  package: string;
  name: string;
  limit: "Unlimited" | number;
  bookings: number;
  shareLink: string;
  redirect: string;
}

const bookingData: BookingRow[] = [
  {
    id: 1,
    package: "Starter Session",
    name: "Rafiq Ahmad",
    limit: "Unlimited",
    bookings: 0,
    shareLink: "https://getdontforget.net/book?link=MBmfkGHnMg",
    redirect: "N/A",
  },
  {
    id: 2,
    package: "Basic Consultation",
    name: "Uaid Rahman",
    limit: 4,
    bookings: 2,
    shareLink: "https://getdontforget.net/book?link=M7j5h4qm31",
    redirect: "N/A",
  },
  {
    id: 3,
    package: "Professional Session",
    name: "Jahid Hasan",
    limit: "Unlimited",
    bookings: 1,
    shareLink: "https://getdontforget.net/book?link=26xekJ5fI6",
    redirect: "N/A",
  },
  {
    id: 4,
    package: "Premium Coaching",
    name: "Nusrat Jahan",
    limit: 10,
    bookings: 5,
    shareLink: "https://getdontforget.net/book?link=hcouR1W04B",
    redirect: "N/A",
  },
  {
    id: 5,
    package: "VIP Strategy Call",
    name: "Sabbir Ahmed",
    limit: "Unlimited",
    bookings: 3,
    shareLink: "https://getdontforget.net/book?link=Rbq0n4BJaO",
    redirect: "N/A",
  },
  {
    id: 6,
    package: "Growth Consultation",
    name: "Mahmudul Islam",
    limit: 6,
    bookings: 4,
    shareLink: "https://getdontforget.net/book?link=oMUpbKETQM",
    redirect: "N/A",
  },
  {
    id: 7,
    package: "Business Strategy Session",
    name: "Farhana Akter",
    limit: "Unlimited",
    bookings: 2,
    shareLink: "https://getdontforget.net/book?link=Ey0aovC0q1",
    redirect: "N/A",
  },
];
const BookingList = () => {
  const [copyMessage, setCopyMessage] = useState<string | null>(null);

  const handleCopy = (link: string) => {
    navigator.clipboard.writeText(link);
    setCopyMessage("Link copied to clipboard!");
    setTimeout(() => setCopyMessage(null), 2000);
  };
  const handleOpenLink = (link: string) => {
    window.open(link, "_blank");
  };
  const [search, setSearch] = useState("");

  return (
    <>
      <CommonSpace>
        <div className="flex justify-between">
          <SectionHeader
            title="Package List"
            description="Create paid session packages that connect directly to your public booking page."
          />
          <DashboardSearch
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>

        {copyMessage && (
          <div className="fixed top-4 right-4 bg-cta text-white p-2 rounded shadow-md z-50">
            {copyMessage}
          </div>
        )}
        <div className=" bg-white rounded-xl border border-gray-200 overflow-hidden mt-6 ">
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
                {bookingData.length === 0 ? (
                  <tr className={tableDesign.tr}>
                    <td colSpan={7} className={`text-center ${tableDesign.td}`}>
                      No public booking data
                    </td>
                  </tr>
                ) : (
                  bookingData.map((assessment, index) => (
                    <tr key={assessment.id} className={tableDesign.tr}>
                      <td className={tableDesign.td}>{index + 1}</td>

                      <td className={`hidden md:table-cell ${tableDesign.td}`}>
                        {assessment.package}
                      </td>

                      <td className={`hidden sm:table-cell ${tableDesign.td}`}>
                        <div className="flex items-start gap-1">
                          {assessment.name}
                          <span className="bg-info px-1 rounded-md text-white">
                            {assessment.limit}
                          </span>
                        </div>
                      </td>

                      <td className={`hidden md:table-cell ${tableDesign.td}`}>
                        {assessment.bookings}
                      </td>

                      <td className={` ${tableDesign.td} `}>
                        <div className="w-full flex flex-col  items-start    gap-2">
                          <div>{assessment.shareLink}</div>

                          <div className="flex  gap-1 ">
                            <span
                              onClick={() => handleCopy(assessment.shareLink)}
                              className="text-today-accent p-1 rounded-md cursor-pointer border border-today-accent hover:bg-cta hover:text-white transition-all"
                            >
                              <RxCopy />
                            </span>
                            <span
                              onClick={() =>
                                handleOpenLink(assessment.shareLink)
                              }
                              className="text-info p-1 rounded-md cursor-pointer border border-info hover:bg-info hover:text-white transition-all"
                            >
                              <LuExternalLink />
                            </span>
                          </div>
                        </div>
                      </td>

                      <td className={`hidden lg:table-cell ${tableDesign.td}`}>
                        {assessment.redirect}
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>

        <div className="my-6">
          <Pagination currentPage={1} totalPages={10} onPageChange={() => {}} />
        </div>
      </CommonSpace>
    </>
  );
};

export default BookingList;
