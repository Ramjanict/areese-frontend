import ClientPanel from "./ClientPanel";
import SubscriberPanel from "./SubscriberPanel";

const BookingLatest = () => {
  return (
    <div className="grid grid-cols-1 xl:grid-cols-2 gap-6 pb-6">
      <SubscriberPanel />
      <ClientPanel />
    </div>
  );
};
export default BookingLatest;
