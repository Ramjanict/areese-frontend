import ButtonWithLoading from "@/components/shared/ButtonWithLoading";
import CommonButton from "@/components/shared/CommonButton";
import SectionHeader from "@/components/shared/SectionHeader";
import { inputClass } from "@/features/task/CreateDashboardForm";
import type { User } from "@/features/teamAccess/TeamAccessPage";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState, type Dispatch, type SetStateAction } from "react";
import { useForm } from "react-hook-form";
import { IoClose } from "react-icons/io5";
import { toast } from "react-toastify";
import { z } from "zod";

const collaboratorSchema = z.object({
  name: z.string().min(1, "Full name is required"),
  email: z.string().email("Invalid email"),
  password: z.string().min(6, "Password must be at least 6 characters"),
});

type FormData = z.infer<typeof collaboratorSchema>;

interface CollaboratorModalProps {
  setIsCollaboratorOpen: (value: boolean) => void;
  setCollaborators?: Dispatch<SetStateAction<User[]>>;
  collaborators?: User[];
}
const CollaboratorModal: React.FC<CollaboratorModalProps> = ({
  setIsCollaboratorOpen,
  setCollaborators,
  collaborators,
}) => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(collaboratorSchema),
  });

  const handleInvite = (data: FormData) => {
    if (!setCollaborators || !collaborators) return;
    if (collaborators.length >= 10) {
      return toast.error("You can only add up to 10 collaborators");
    }
    const newUser = {
      id: Date.now().toString(),
      ...data,
    };

    setCollaborators((prev) => [...prev, newUser]);
    reset();
    toast.success(`${data.name} added`);
  };

  const [loading, setLoading] = useState(false);
  const handleSubmitCollaborator = async (data: FormData) => {
    try {
      setLoading(true);
      await new Promise((res) => setTimeout(res, 600));
      handleInvite(data);
      setIsCollaboratorOpen(false);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className=" fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4">
      <div className="bg-white rounded-lg p-6 space-y-4 relative max-w-2xl w-full">
        <span>
          <IoClose
            onClick={() => {
              setIsCollaboratorOpen(false);
              reset();
            }}
            className="absolute top-2 right-2 cursor-pointer"
          />
        </span>
        <SectionHeader
          title="Invite Collaborator"
          description=" Invite a new collaborator by entering their details."
          className="mb-2"
        />
        <div className="space-y-3 grid  gap-4 w-full">
          <div>
            <label className={inputClass.label}>Full Name</label>
            <input
              type="text"
              placeholder="Enter name"
              className={inputClass.input}
              {...register("name")}
            />
            {errors.name && (
              <p className={inputClass.error}>{errors.name.message}</p>
            )}
          </div>

          <div>
            <label className={inputClass.label}>Email Address</label>
            <input
              type="text"
              placeholder="Enter email"
              className={inputClass.input}
              {...register("email")}
            />
            {errors.email && (
              <p className={inputClass.error}>{errors.email.message}</p>
            )}
          </div>

          <div>
            <label className={inputClass.label}>Temporary Password</label>
            <input
              type="password"
              placeholder="Enter password"
              className={inputClass.input}
              {...register("password")}
            />
            {errors.password && (
              <p className={inputClass.error}>{errors.password.message}</p>
            )}
          </div>

          <CommonButton
            type="button"
            onClick={handleSubmit(handleSubmitCollaborator)}
          >
            {loading ? (
              <ButtonWithLoading title="Adding..." />
            ) : (
              "Add Collaborator"
            )}
          </CommonButton>
        </div>
      </div>
    </div>
  );
};

export default CollaboratorModal;
