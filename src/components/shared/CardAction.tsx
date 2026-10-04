import { FaRegEdit } from "react-icons/fa";
import { FiEye } from "react-icons/fi";
import { RiDeleteBinLine } from "react-icons/ri";

interface CardActionProps {
  onEdit?: () => void;
  onDelete?: () => void;
  onDetails?: () => void;
}
const CardAction: React.FC<CardActionProps> = ({
  onDetails,
  onDelete,
  onEdit,
}) => {
  return (
    <div className=" flex items-center text-xl  gap-2">
      {onDetails && (
        <span
          onClick={onDetails}
          className="text-warning p-1 rounded-md cursor-pointer border border-warning hover:bg-warning hover:text-white transition-all"
        >
          <FiEye />
        </span>
      )}

      {onEdit && (
        <span
          onClick={onEdit}
          className="text-info p-1 rounded-md cursor-pointer border border-info hover:bg-info hover:text-white transition-all"
        >
          <FaRegEdit />
        </span>
      )}
      {onDelete && (
        <span
          onClick={onDelete}
          className="text-danger p-1 rounded-md cursor-pointer border border-danger hover:bg-danger hover:text-white transition-all"
        >
          <RiDeleteBinLine />
        </span>
      )}
    </div>
  );
};

export default CardAction;
