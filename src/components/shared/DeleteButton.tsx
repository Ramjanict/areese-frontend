import { FiTrash2 } from "react-icons/fi";

type DeleteButtonProps = {
  onClick: () => void;
  className?: string;
};

const DeleteButton: React.FC<DeleteButtonProps> = ({
  onClick,
  className = "",
}) => {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`border border-slate-200 hover:bg-red-500 hover:text-white hover:border-red-500 text-text/50 p-2.5 rounded-lg transition-colors shrink-0 cursor-pointer ${className}`}
    >
      <FiTrash2 size={13} />
    </button>
  );
};

export default DeleteButton;
