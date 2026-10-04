import React, { type ReactNode } from "react";
import { FiPlus } from "react-icons/fi";

interface CommonButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode;
  className?: string;
  variant?: "primary" | "secondary" | "add";
  type?: "button" | "submit" | "reset";
}

const CommonButton: React.FC<CommonButtonProps> = ({
  children,
  className = "",
  variant = "primary",
  type = "button",
  ...props
}) => {
  const baseClasses =
    "px-4  py-2 rounded-md font-medium transition text-sm sm:text-base  cursor-pointer whitespace-nowrap flex items-center justify-center gap-1  disabled:cursor-not-allowed    ";
  const variantClasses = {
    primary: "bg-cta hover:bg-late-accent text-white ",
    secondary: "bg-white border border-border text-text",
    add: "bg-cta hover:bg-late-accent text-white ",
  };

  return (
    <button
      type={type}
      className={`${baseClasses} ${variantClasses[variant]} ${className}`}
      {...props}
    >
      {variant === "add" && <FiPlus size={15} />}
      {children}
    </button>
  );
};

export default CommonButton;
