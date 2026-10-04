import React from "react";

interface CommonSpaceProps {
  className?: string;
  children: React.ReactNode;
}
const CommonSpace: React.FC<CommonSpaceProps> = ({ children, className }) => {
  return <div className={`py-10 ${className}`}>{children}</div>;
};

export default CommonSpace;
