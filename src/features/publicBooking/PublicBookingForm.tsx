import CommonButton from "@/components/shared/CommonButton";
import SectionHeader from "@/components/shared/SectionHeader";
import { inputClass } from "../task/CreateDashboardForm";
import BookingList from "./BookingList";

const PublicBookingForm = () => {
  return (
    <div>
      <form className={inputClass.form}>
        <SectionHeader title="Create Public Booking" />

        <div>
          <label className={inputClass.label}>Package</label>
          <input
            type="text"
            placeholder="Enter name"
            className={inputClass.input}
          />
        </div>

        <div>
          <label className={inputClass.label}>Name</label>
          <input
            type="text"
            placeholder="Enter price"
            className={inputClass.input}
          />
        </div>

        <div>
          <label className={inputClass.label}>Booking limit</label>
          <input
            type="number"
            placeholder="Enter duration in minutes (e.g., 60)"
            className={inputClass.input}
          />
        </div>

        <div>
          <label className={inputClass.label}>Redirect</label>
          <input
            placeholder="Enter description"
            type="text"
            className={inputClass.input}
          />
        </div>

        <CommonButton>Create Link</CommonButton>
      </form>

      <BookingList />
    </div>
  );
};

export default PublicBookingForm;
