import DashboardSearch from "@/components/shared/DashboardSearch";
import DashboardTopSection from "@/components/shared/DashboardTopSection";
import Pagination from "@/components/shared/Pagination";
import SectionHeader from "@/components/shared/SectionHeader";
import { useDebounce } from "@/components/shared/useDebounce";
import CreatePackage from "@/features/package/CreatePackage";
import PackageList, {
  initialBookings,
  type Bookings,
} from "@/features/package/PackageList";
import { useState } from "react";
import { toast } from "react-toastify";

const BookingPackages = () => {
  const [isPackageOpen, setIsPackageOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const debouncedSearch = useDebounce(searchTerm, 500);
  const [bookings, setBookings] = useState(initialBookings);
  const [selectBooking, setSelectBooking] = useState<Bookings | null>(null);

  const filteredBookings = bookings.filter((booking) => {
    const keyword = debouncedSearch.toLowerCase();

    return (
      booking.name.toLowerCase().includes(keyword) ||
      booking.description.toLowerCase().includes(keyword) ||
      booking.durationNote.toLowerCase().includes(keyword) ||
      booking.description.toLowerCase().includes(keyword)
    );
  });
  const handleDelete = (id: number) => {
    setBookings((prev) => prev.filter((booking) => booking.id !== id));
    setSelectBooking(null);
    toast.success("Package deleted successfully");
  };

  const handleEdit = (plan: Bookings) => {
    setSelectBooking(plan);
    setIsPackageOpen(true);
  };
  type PlanInput = Omit<Bookings, "id">;
  const handleSave = (data: PlanInput) => {
    if (selectBooking) {
      setBookings((prev) =>
        prev.map((p) => (p.id === selectBooking.id ? { ...p, ...data } : p)),
      );
    } else {
      setBookings((prev) => [...prev, { id: Date.now(), ...data }]);
    }

    setSelectBooking(null);
    setIsPackageOpen(false);
  };

  const ITEMS_PER_PAGE = 5;
  const [currentPage, setCurrentPage] = useState(1);

  const totalPages = Math.ceil(filteredBookings.length / ITEMS_PER_PAGE);

  const paginatedBookings = filteredBookings.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE,
  );

  return (
    <div>
      {isPackageOpen ? (
        <CreatePackage
          onCancel={() => {
            setIsPackageOpen(false);
            setSelectBooking(null);
          }}
          onSave={handleSave}
          defaultValues={selectBooking}
          selectBooking={selectBooking}
        />
      ) : (
        <>
          <DashboardTopSection
            title="Booking Package"
            description="View and manage all your booking packages efficiently"
            buttonText="Create New Package"
            action={() => setIsPackageOpen(true)}
          />

          <div className="flex flex-col md:flex-row justify-between gap-2">
            <SectionHeader
              title="Booking Package List"
              description="Here the all package list will be shown"
            />
            <DashboardSearch
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <PackageList
            bookings={paginatedBookings}
            handleDelete={handleDelete}
            handleEdit={handleEdit}
          />

          <div className="my-6">
            <Pagination
              currentPage={currentPage}
              totalPages={totalPages}
              onPageChange={(page) => setCurrentPage(page)}
            />
          </div>
        </>
      )}
    </div>
  );
};

export default BookingPackages;
