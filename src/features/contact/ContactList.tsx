import CardAction from "@/components/shared/CardAction";
import DashboardSearch from "@/components/shared/DashboardSearch";
import Pagination from "@/components/shared/Pagination";
import SectionHeader from "@/components/shared/SectionHeader";
import { useDebounce } from "@/components/shared/useDebounce";
import { Contact } from "lucide-react";
import { useState } from "react";
import { toast } from "react-toastify";
import ContactModal from "./ContactModal";
export const tableDesign = {
  table:
    "w-full border-separate border-spacing-0 border border-[#EEF2FF] rounded-lg overflow-hidden",
  thead: "bg-[#EEF2FF] text-black",
  tbody: "text-[#101828]",
  tr: "border-b last:border-b-0 border-[#EEF2FF] ",
  th: " text-center! py-3 px-4 text-sm font-bold text-black border-b border-r border-[#EEF2FF] first:rounded-tl-lg last:rounded-tr-lg",
  td: "text-center! py-3 px-4 text-sm text-[#101828] border-b border-r border-[#EEF2FF] last:border-r-0",
};
const tableHeaders = [
  { label: "#", align: "text-center hidden xl:table-cell" },
  { label: "Name", align: "text-left " },
  { label: "Email", align: "text-left hidden lg:table-cell" },
  { label: "Subject", align: "text-left" },
  { label: "Message", align: "text-left hidden md:table-cell" },
  { label: "Delete", align: "text-left " },
];

interface Contact {
  id: number;
  name: string;
  email: string;
  subject: string;
  message: string;
}
const data: Contact[] = [
  {
    id: 1,
    name: "John Doe",
    email: "john.doe@example.com",
    subject: "Account Setup Help",
    message:
      "Hi, I need assistance setting up my account. Could you guide me through the process?",
  },
  {
    id: 2,
    name: "Jane Smith",
    email: "jane.smith@example.com",
    subject: "Billing Question",
    message:
      "I have a question regarding my latest invoice. Can you please check it?",
  },
  {
    id: 3,
    name: "Michael Brown",
    email: "michael.brown@example.com",
    subject: "Feature Request",
    message:
      "It would be great if you could add dark mode support to the dashboard.",
  },
  {
    id: 4,
    name: "Emily Davis",
    email: "emily.davis@example.com",
    subject: "Login Issue",
    message: "I am unable to log into my account since yesterday. Please help.",
  },
  {
    id: 5,
    name: "Chris Wilson",
    email: "chris.wilson@example.com",
    subject: "Plan Upgrade",
    message:
      "I would like to upgrade my current plan. Can you tell me the steps?",
  },
  {
    id: 6,
    name: "Sophia Taylor",
    email: "sophia.taylor@example.com",
    subject: "Technical Support",
    message:
      "The application crashes when I upload large files. Please investigate.",
  },
  {
    id: 7,
    name: "Daniel Martinez",
    email: "daniel.martinez@example.com",
    subject: "Integration Question",
    message: "Do you support integration with third-party CRM tools?",
  },
  {
    id: 8,
    name: "Olivia Anderson",
    email: "olivia.anderson@example.com",
    subject: "Password Reset",
    message: "I forgot my password and the reset link is not working.",
  },
  {
    id: 9,
    name: "William Thomas",
    email: "william.thomas@example.com",
    subject: "Feedback",
    message: "Great platform! I really like the UI and ease of use.",
  },
  {
    id: 10,
    name: "Ava Jackson",
    email: "ava.jackson@example.com",
    subject: "General Inquiry",
    message: "Can you provide more details about your enterprise plans?",
  },
];
export const ContactList = () => {
  const [contactList, setContactList] = useState(data);
  const [searchTerm, setSearchTerm] = useState("");
  const debouncedSearch = useDebounce(searchTerm, 500);

  const filteredContact = contactList.filter((contact) => {
    const keyword = debouncedSearch.toLowerCase();

    return (
      contact.name.toLowerCase().includes(keyword) ||
      contact.email.toLowerCase().includes(keyword) ||
      contact.subject.toLowerCase().includes(keyword) ||
      contact.message.toLowerCase().includes(keyword)
    );
  });

  const ITEMS_PER_PAGE = 5;
  const [currentPage, setCurrentPage] = useState(1);

  const totalPages = Math.ceil(filteredContact.length / ITEMS_PER_PAGE);

  const paginatedContact = filteredContact.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE,
  );
  const handleDelete = (id: number) => {
    setContactList((prev) => prev.filter((contact) => contact.id !== id));
    toast.success("Contact deleted successfully");
  };

  const [isContactModalOpen, setIsContactModalOpen] = useState(false);
  const [selectedContact, setSelectedContact] = useState<Contact | null>(null);
  const handleContactClick = (contact: Contact) => {
    setSelectedContact(contact);
    setIsContactModalOpen(true);
  };
  return (
    <>
      <div className="flex flex-col md:flex-row justify-between gap-2">
        <SectionHeader
          title="Contact List"
          description="Here the all contact list will be shown"
        />
        <DashboardSearch
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      <div className=" bg-white rounded-xl border border-border overflow-hidden mt-6 ">
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
              {paginatedContact.length === 0 ? (
                <tr className={tableDesign.tr}>
                  <td colSpan={7} className={`text-center ${tableDesign.td}`}>
                    No data
                  </td>
                </tr>
              ) : (
                paginatedContact.map((assessment, index) => (
                  <tr key={assessment.message} className={tableDesign.tr}>
                    <td className={` hidden xl:table-cell ${tableDesign.td} `}>
                      <span
                        className={`px-3 py-1 w-fit mx-auto rounded-full text-xs font-medium hidden md:block `}
                      >
                        {index + 1}
                      </span>
                    </td>

                    <td
                      onClick={() => handleContactClick(assessment)}
                      className={` cursor-pointer ${tableDesign.td}  `}
                    >
                      {assessment.name}
                    </td>

                    <td className={` ${tableDesign.td} hidden lg:table-cell  `}>
                      {assessment.email}
                    </td>
                    <td className={` ${tableDesign.td}   `}>
                      {assessment.subject}
                    </td>
                    <td className={` ${tableDesign.td} hidden md:table-cell  `}>
                      {assessment.message}
                    </td>

                    <td className={` ${tableDesign.td}  `}>
                      <div className="flex justify-center">
                        <CardAction
                          onDelete={() => handleDelete(assessment.id)}
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
      {paginatedContact.length > 0 && (
        <div className="my-6">
          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={(page) => setCurrentPage(page)}
          />
        </div>
      )}
      {selectedContact && (
        <ContactModal
          contact={selectedContact}
          isOpen={isContactModalOpen}
          onClose={() => setIsContactModalOpen(false)}
        />
      )}
    </>
  );
};
export default ContactList;
