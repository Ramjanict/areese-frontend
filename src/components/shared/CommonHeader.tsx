import clsx from "clsx";
import React, { type ReactNode } from "react";

interface CommonHeaderProps extends React.HTMLAttributes<HTMLHeadingElement> {
  children: ReactNode;
  className?: string;
  size?: "xs" | "sm" | "md" | "lg" | "xl" | "2xl" | "3xl" | "4xl";
}

const CommonHeader: React.FC<CommonHeaderProps> = ({
  children,
  className = "",
  size = "md",
  ...props
}) => {
  const baseStyles = "text-text flex items-center";

  const sizeStyles: Record<typeof size, string> = {
    xs: "text-xs leading-4 ",
    sm: "text-sm leading-5 font-normal ",
    md: "text-base leading-6 font-medium ",
    lg: "text-sm sm:text-lg leading-5 sm:leading-7 font-bold",
    xl: "text-xl leading-8 font-bold",
    "2xl": "text-2xl leading-9 font-bold",
    "3xl":
      " text-xl sm:text-2xl md:text-3xl lg:text-4xl leading-8 md:leading-10 font-bold",
    "4xl": "text-4xl leading-[3rem] font-bold",
  };

  return (
    <h2 className={clsx(baseStyles, sizeStyles[size], className)} {...props}>
      {children}
    </h2>
  );
};

export default CommonHeader;
