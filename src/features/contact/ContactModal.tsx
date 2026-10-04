import CommonButton from "@/components/shared/CommonButton";
import type { FC } from "react";

interface Contact {
  name: string;
  email: string;
  subject: string;
  message: string;
}

interface ContactModalProps {
  isOpen: boolean;
  onClose: () => void;
  contact: Contact | null;
}

const ContactModal: FC<ContactModalProps> = ({ isOpen, onClose, contact }) => {
  if (!isOpen || !contact) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
      <div className="bg-white w-full max-w-md rounded-xl p-6 shadow-lg">
        <h2 className="text-lg font-semibold mb-4">Contact Details</h2>

        <div className="space-y-3 text-sm">
          <div>
            <span className="font-medium">Name:</span> {contact.name}
          </div>

          <div>
            <span className="font-medium">Email:</span> {contact.email}
          </div>

          <div>
            <span className="font-medium">Subject:</span> {contact.subject}
          </div>

          <div>
            <span className="font-medium">Message:</span> {contact.message}
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

export default ContactModal;
