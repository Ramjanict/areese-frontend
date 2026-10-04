import CommonHeader from "./CommonHeader";

interface FormHeaderProps {
  title: string;
  description?: string;
  className?: string;
}
const SectionHeader: React.FC<FormHeaderProps> = ({
  title,
  description,
  className,
}) => {
  return (
    <div className={`pb-2 ${className} space-y-.5`}>
      {title && <CommonHeader size="lg">{title}</CommonHeader>}
      {description && <CommonHeader size="sm">{description}</CommonHeader>}
    </div>
  );
};

export default SectionHeader;
