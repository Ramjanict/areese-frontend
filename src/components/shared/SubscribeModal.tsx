import React, { useState } from "react";
import { GiCheckMark } from "react-icons/gi";
import { MdClose } from "react-icons/md";
import CommonButton from "./CommonButton";
import CommonHeader from "./CommonHeader";

interface SubscribeModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const SubscribeModal: React.FC<SubscribeModalProps> = ({ isOpen, onClose }) => {
  const [email, setEmail] = useState("");

  const handleSubscribe = () => {
    if (!email) return alert("Please enter your email!");
    alert(`Subscribed with ${email}`);
    setEmail("");
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 w-full p-4">
      <div className="bg-white rounded-lg shadow-lg p-6  w-full max-w-md relative">
        <button
          onClick={onClose}
          className="absolute top-3 right-3 text-text hover:text-danger cursor-pointer"
        >
          <MdClose />
        </button>

        <div className="flex flex-col items-center justify-center gap-1">
          <CommonHeader size="2xl" className="text-xl! sm:text-2xl!">
            {" "}
            DON'T FORGET
          </CommonHeader>
          <p className="flex items-center text-sm sm:text-base font-semibold text-center mb-2">
            <span className="mr-2 text-cta">
              <GiCheckMark />
            </span>
            DON'T FORGET TO SIGN UP NOW
          </p>
        </div>

        <p className="text-center text-xs sm:text-sm text-text mb-6">
          Stay updated with our latest features and never miss important
          updates!
        </p>

        <div className="flex justify-between rounded-lg overflow-hidden border border-border">
          <input
            type="email"
            placeholder="Enter your email... "
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className={"w-full pl-4 py-3 focus:outline-none"}
          />
          <CommonButton onClick={handleSubscribe} className="rounded-l-none!  ">
            Subscribe
          </CommonButton>
        </div>
      </div>
    </div>
  );
};

export default SubscribeModal;
