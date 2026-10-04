import CommonButton from "@/components/shared/CommonButton";
import SectionHeader from "@/components/shared/SectionHeader";
import { useState } from "react";
import { toast } from "react-toastify";
import { inputClass } from "../task/CreateDashboardForm";

import { brandColors } from "@/components/shared/StatCards";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import CollaboratorCard from "./CollaboratorCard";

export interface User {
  id: string;
  name: string;
  email: string;
  password: string;
}

const collaboratorSchema = z.object({
  name: z.string().min(1, "Full name is required"),
  email: z.string().email("Invalid email"),
  password: z.string().min(6, "Password must be at least 6 characters"),
});

type FormData = z.infer<typeof collaboratorSchema>;
export const copyToClipboard = (text: string) => {
  navigator.clipboard.writeText(text);
  toast.success("Copied");
};
export default function TeamAccessPage() {
  const [collaborators, setCollaborators] = useState<User[]>([]);

  const {
    register,
    handleSubmit,

    reset,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(collaboratorSchema),
  });

  const handleInvite = (data: FormData) => {
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

  return (
    <div className="space-y-6 relative">
      <div className="bg-white border rounded-2xl p-5 shadow">
        <SectionHeader
          title="Invite Collaborators"
          description=" Invite a new collaborator by entering their details."
          className="mb-2"
        />

        <form onSubmit={handleSubmit(handleInvite)}>
          <div className="space-y-3 grid grid-cols-1 sm:grid-cols-2 gap-4">
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
            </div>{" "}
          </div>

          <CommonButton type="submit" className="mt-4">
            Add Collaborator
          </CommonButton>
        </form>
      </div>

      <div className="mt-5 space-y-3 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
        {collaborators.map((c, i) => {
          const bgColor = brandColors[i % brandColors.length];

          return (
            <CollaboratorCard
              key={c.id}
              c={c}
              i={i}
              bgColor={bgColor}
              inputClass={inputClass}
              copyToClipboard={copyToClipboard}
            />
          );
        })}
      </div>
    </div>
  );
}
