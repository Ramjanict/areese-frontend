import CommonButton from "@/components/shared/CommonButton";
import SectionHeader from "@/components/shared/SectionHeader";
import React, { useState, type FC } from "react";
import { inputClass } from "../task/CreateDashboardForm";

interface ProfileFormState {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  businessName: string;
  accountType: string;
  memberSince: string;
  currentPassword: string;
  newPassword: string;
  confirmPassword: string;
}

const ProfileSettingsForm: FC = () => {
  const [form, setForm] = useState<ProfileFormState>({
    firstName: "Admin",
    lastName: "Ali",
    email: "admin@email.com",
    phone: "",
    businessName: "",
    accountType: "",
    memberSince: "",
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });

  const handleChange = (field: keyof ProfileFormState, value: string) => {
    setForm((prev) => ({ ...prev, [field]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Profile data:", form);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="space-y-6 w-full border border-border rounded-md p-4 sm:p-6 bg-white ">
        <SectionHeader
          title="Basic Information"
          description="Leave blank if you do not want to change the details.
"
        />
        <div className=" w-full  grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className={inputClass.label}>First Name</label>
            <input
              type="text"
              value={form.firstName}
              onChange={(e) => handleChange("firstName", e.target.value)}
              placeholder="Enter fist name"
              className={inputClass.input}
            />
          </div>
          <div>
            <label className={inputClass.label}>Last Name</label>
            <input
              type="text"
              value={form.lastName}
              onChange={(e) => handleChange("lastName", e.target.value)}
              placeholder="Enter last name"
              className={inputClass.input}
            />
          </div>
          <div>
            <label className={inputClass.label}>Email</label>
            <input
              type="email"
              value={form.email}
              onChange={(e) => handleChange("email", e.target.value)}
              placeholder="Enter email"
              className={inputClass.input}
            />
          </div>

          <div className="flex items-center gap-4 col-span-full">
            <CommonButton type="submit" variant="primary">
              Save Changes
            </CommonButton>
          </div>
        </div>
      </div>
      <div className="space-y-6 w-full border border-border rounded-md p-4 sm:p-6 bg-white ">
        <SectionHeader
          title="Password"
          description="Leave blank if you do not want to change the password."
        />

        <div className="w-full  grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className={inputClass.label}>Current Password</label>
            <input
              type="password"
              value={form.currentPassword}
              onChange={(e) => handleChange("currentPassword", e.target.value)}
              placeholder="Enter current password"
              className={inputClass.input}
            />
          </div>
          <div>
            <label className={inputClass.label}>New Password</label>
            <input
              type="password"
              value={form.newPassword}
              onChange={(e) => handleChange("newPassword", e.target.value)}
              placeholder="Enter new password"
              className={inputClass.input}
            />
          </div>

          <div>
            <label className={inputClass.label}>Confirm Password</label>
            <input
              type="password"
              value={form.confirmPassword}
              onChange={(e) => handleChange("confirmPassword", e.target.value)}
              placeholder="Enter confirm password"
              className={inputClass.input}
            />
          </div>

          <div className="flex items-center gap-4  col-span-full">
            <CommonButton type="submit" variant="primary">
              Update Password
            </CommonButton>
          </div>
        </div>
      </div>
      <div className="space-y-6 w-full border border-border rounded-md p-4 sm:p-6 bg-white ">
        <SectionHeader
          title="Account Information"
          description="Leave blank if you do not want to change the details.
        "
        />
        <div className="w-full grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className={inputClass.label}>
              Account Type (Subscriber)
            </label>
            <input
              type="text"
              value={form.accountType}
              onChange={(e) => handleChange("accountType", e.target.value)}
              placeholder="Enter account type"
              className={inputClass.input}
            />
          </div>
          <div>
            <label className={inputClass.label}>Member Since</label>
            <input
              type="text"
              value={form.memberSince}
              onChange={(e) => handleChange("memberSince", e.target.value)}
              placeholder="Enter member since"
              className={inputClass.input}
            />
          </div>
          <div className="flex items-center gap-4 col-span-full">
            <CommonButton type="submit" variant="primary">
              Save Changes
            </CommonButton>
          </div>
        </div>
      </div>
    </form>
  );
};

export default ProfileSettingsForm;
