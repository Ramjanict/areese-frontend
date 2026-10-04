import DashboardTopSection from "@/components/shared/DashboardTopSection";
import BookingLatest from "@/features/publicBooking/BookingLatest";

const PublicBooking = () => {
  return (
    <div>
      <DashboardTopSection
        title="Public Booking"
        description="Generate unique booking links with optional booking limits and post-booking redirects.
        "
      />
      <BookingLatest />
    </div>
  );
};

export default PublicBooking;
