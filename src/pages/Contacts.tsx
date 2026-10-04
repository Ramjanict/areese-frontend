import DashboardTopSection from "@/components/shared/DashboardTopSection";
import ContactList from "@/features/contact/ContactList";

const Contacts = () => {
  return (
    <div>
      <DashboardTopSection
        title="Contact us"
        description="View and manage all your contacts efficiently"
      />
      <ContactList />
    </div>
  );
};

export default Contacts;
