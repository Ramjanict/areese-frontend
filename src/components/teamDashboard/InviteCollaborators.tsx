import { inputClass } from "@/features/task/CreateDashboardForm";
import { zodResolver } from "@hookform/resolvers/zod";
import { Plus } from "lucide-react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { FaRegCircleCheck } from "react-icons/fa6";
import { FiInfo, FiUserPlus } from "react-icons/fi";
import { MdArrowBack } from "react-icons/md";
import { RiLinksLine } from "react-icons/ri";
import { toast } from "react-toastify";
import { z } from "zod";
import CommonButton from "../shared/CommonButton";
import CommonHeader from "../shared/CommonHeader";
import SectionHeader from "../shared/SectionHeader";
import ListCollaborator from "./ListCollaborator";

export const collaboratorSchema = z.object({
  fullName: z.string().min(1, "Full name is required"),
  email: z.string().email("Enter a valid email"),
  tempPassword: z.string().min(4, "Minimum 4 characters"),
});

export type CollaboratorFormValues = z.infer<typeof collaboratorSchema>;

export interface Collaborator {
  id: string;
  fullName: string;
  email: string;
  tempPassword: string;
}

interface AddedCollaborator extends Collaborator {
  loginLink: string;
}

interface InviteCollaboratorsProps {
  setIsCollaboratorOpen: (open: boolean) => void;
}

const InviteCollaborators: React.FC<InviteCollaboratorsProps> = ({
  setIsCollaboratorOpen,
}) => {
  const [collaborators, setCollaborators] = useState<Collaborator[]>([]);
  const [addedCollaborators, setAddedCollaborators] = useState<
    AddedCollaborator[]
  >([]);
  const [copiedId, setCopiedId] = useState<string | null>(null);

  const MAX_COLLABORATORS = 10;

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<CollaboratorFormValues>({
    resolver: zodResolver(collaboratorSchema),
    defaultValues: {
      fullName: "",
      email: "",
      tempPassword: "",
    },
  });

  const onAddCollaborator = (data: CollaboratorFormValues) => {
    if (collaborators.length >= MAX_COLLABORATORS) return;

    const newCollaborator: Collaborator = {
      id: Date.now().toString(),
      ...data,
    };

    setCollaborators((prev) => [...prev, newCollaborator]);
    reset();
  };

  const handleRemoveCollaborator = (id: string) => {
    setCollaborators(collaborators.filter((c) => c.id !== id));
  };

  const handleInviteAll = () => {
    const newAdded = collaborators.map((c) => ({
      ...c,
      loginLink: `${c.email} - ${c.tempPassword}`,
    }));
    setAddedCollaborators(newAdded);

    setCollaborators([]);
  };

  const handleCopyLink = (collab: AddedCollaborator) => {
    navigator.clipboard.writeText(collab.loginLink);

    setCopiedId(collab.id);
    toast.success(collab.loginLink);

    setTimeout(() => setCopiedId(null), 2000);
  };
  return (
    <div className="w-full ">
      <div className="bg-white border rounded-2xl p-5 shadow">
        <SectionHeader
          title="Invite Collaborators"
          description="Add one or more collaborators to your team. You can invite up
          to 10 members."
          className="mb-2"
        />

        <div className=" w-full">
          <>
            <div className=" ">
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-full bg-purple-600 flex items-center justify-center">
                    <Plus className="w-5 h-5 text-white" />
                  </div>
                  <h2 className="text-lg font-semibold text-gray-900">
                    Add Collaborators
                  </h2>
                </div>
                <span className=" bg-bg py-1 px-2 rounded-md text-sm text-text">
                  {addedCollaborators.length + collaborators.length} of{" "}
                  {MAX_COLLABORATORS} added{" "}
                </span>
              </div>

              <div className="space-y-4 mb-6 w-full">
                {collaborators.map((collab) => (
                  <ListCollaborator
                    key={collab.id}
                    collab={collab}
                    handleRemoveCollaborator={handleRemoveCollaborator}
                  />
                ))}
              </div>

              <form
                onSubmit={handleSubmit(onAddCollaborator)}
                className=" mb-6 w-full"
              >
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6 w-full  bg-bg p-4 rounded-lg">
                  <div>
                    <label className={inputClass.label}>Full Name *</label>
                    <input
                      {...register("fullName")}
                      className={inputClass.input}
                      placeholder="Enter full name"
                    />
                    {errors.fullName && (
                      <p className={inputClass.error}>
                        {errors.fullName.message}
                      </p>
                    )}
                  </div>

                  <div>
                    <label className={inputClass.label}>Email Address *</label>
                    <input
                      {...register("email")}
                      className={inputClass.input}
                      placeholder="Enter email"
                    />
                    {errors.email && (
                      <p className={inputClass.error}>{errors.email.message}</p>
                    )}
                  </div>

                  <div>
                    <label className={inputClass.label}>
                      Temporary Password *
                    </label>
                    <input
                      {...register("tempPassword")}
                      className={inputClass.input}
                      placeholder="Enter password"
                    />
                    {errors.tempPassword && (
                      <p className={inputClass.error}>
                        {errors.tempPassword.message}
                      </p>
                    )}
                  </div>
                </div>
                <div className="border-2 border-dashed border-gray-300 p-6 text-center rounded-lg bg-followup-bg">
                  <button
                    disabled={collaborators.length >= MAX_COLLABORATORS}
                    type="submit"
                    className="inline-flex items-center gap-2 text-purple-600 hover:text-purple-700 font-medium mb-2 cursor-pointer disabled:cursor-not-allowed disabled:text-gray-400 disabled:hover:text-gray-400"
                  >
                    <Plus className="w-4 h-4" />
                    Add Another Collaborator
                  </button>

                  <p className="text-sm text-text/50">
                    You can add up to {MAX_COLLABORATORS} collaborators
                  </p>
                </div>
              </form>

              <div className="flex justify-center">
                <CommonButton
                  onClick={handleInviteAll}
                  disabled={collaborators.length === 0}
                  className="w-full! sm:w-auto!"
                >
                  <FiUserPlus className="w-5 h-5" />
                  Invite All Collaborators ({collaborators.length})
                </CommonButton>
              </div>
            </div>
          </>
        </div>
      </div>

      <>
        {addedCollaborators.length > 0 && (
          <div className="bg-today-bg/50 rounded-lg shadow-sm p-6 my-6">
            <div className="flex items-start gap-2 mb-6">
              <FaRegCircleCheck className="text-2xl text-today-accent mt-1 shrink-0 " />
              <div>
                <CommonHeader size="lg">
                  Collaborators Added Successfully
                </CommonHeader>

                <p className="text-text/50">
                  Share the login details below with your team members.
                </p>
              </div>
            </div>

            <div className="space-y-4 ">
              {addedCollaborators.map((collab, index) => (
                <div
                  key={collab.id}
                  className="flex flex-col md:flex-row  md:items-center md:justify-between gap-4 pb-4 border-b bg-bg rounded-lg p-4"
                >
                  <div className="flex gap-4 items-center">
                    <div className="w-8 h-8 rounded-full bg-cta flex items-center justify-center text-white ">
                      {index + 1}
                    </div>{" "}
                    <div className="flex-grow ">
                      <p className="font-semibold">{collab.fullName}</p>
                      <p className="text-sm">
                        Email (Username):{" "}
                        <span className="text-purple-600">{collab.email}</span>
                      </p>
                      <p className="text-sm">
                        Temporary Password :{" "}
                        <span className="text-purple-600">
                          {collab.tempPassword}
                        </span>
                      </p>
                    </div>
                  </div>
                  <button
                    onClick={() => handleCopyLink(collab)}
                    className="border px-3 py-1 text-today-accent border-today-accent rounded-md text-sm hover:bg-today-accent/10 transition-colors cursor-pointer flex items-center justify-center gap-1"
                  >
                    <RiLinksLine className="w-4 h-4" />
                    {copiedId === collab.id ? "Copied!" : "Copy Login Link"}
                  </button>
                </div>
              ))}
              <div className="bg-followup-bg rounded-md p-2  border border-border">
                <p className="text-xs text-text/50 flex items-center gap-1.5 pt-1">
                  <FiInfo size={20} className="text-followup-accent" />
                  Each collaborator will use their email as their username to
                  log in.
                </p>
              </div>
            </div>
          </div>
        )}
      </>

      <div className="mt-4">
        <button
          onClick={() => {
            setIsCollaboratorOpen(false);
            setAddedCollaborators([]);
          }}
          className="w-full p-4 gap-2 bg-white rounded-md items-center justify-center cursor-pointer flex"
        >
          <MdArrowBack className="text-xl" />
          Back to Dashboard
        </button>
      </div>
    </div>
  );
};

export default InviteCollaborators;
