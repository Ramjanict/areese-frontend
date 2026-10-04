import type { ComponentType } from "react";
import { FaPlus } from "react-icons/fa6";
import ButtonWithIcon from "./ButtonWithIcon";
import CommonHeader from "./CommonHeader";

interface ManagementHeaderProps {
  title: string;
  description?: string;
  className?: string;
  buttonText?: string;
  action?: () => void;
  descriptionClassName?: string;
  icon?: ComponentType<{ className?: string }>;
}

const DashboardTopSection: React.FC<ManagementHeaderProps> = ({
  title,
  description,
  className,
  buttonText,
  descriptionClassName,
  action,
  icon = FaPlus,
}) => {
  return (
    <div
      className={`flex flex-col lg:flex-row items-start lg:items-end justify-between gap-6 pb-6   ${className} `}
    >
      <div className="space-y-1 ">
        {title && <CommonHeader size="3xl">{title}</CommonHeader>}
        {description && (
          <div className="w-full ">
            <CommonHeader size="md" className={`${descriptionClassName} `}>
              {description}
            </CommonHeader>
          </div>
        )}
      </div>

      <div onClick={action} className="flex gap-4.5 items-center">
        {buttonText && (
          <ButtonWithIcon
            icon={icon}
            className="w-full lg:w-auto flex justify-center  shrink-0 "
          >
            <p>{buttonText}</p>
          </ButtonWithIcon>
        )}
      </div>
    </div>
  );
};
export default DashboardTopSection;
