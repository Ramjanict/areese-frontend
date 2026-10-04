import CommonButton from "@/components/shared/CommonButton";
import DontForgetHeader from "@/components/shared/DontForgetHeader";
import SectionHeader from "@/components/shared/SectionHeader";
import { inputClass } from "@/features/task/CreateDashboardForm";
import React, { useState, type FC } from "react";
import { useNavigate } from "react-router-dom";

interface SignupFormState {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  businessName: string;
  password: string;
  confirmPassword: string;
}

const Signup: FC = () => {
  const [form, setForm] = useState<SignupFormState>({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    businessName: "",
    password: "",
    confirmPassword: "",
  });

  const handleChange = (field: keyof SignupFormState, value: string) => {
    setForm((prev) => ({ ...prev, [field]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (form.password !== form.confirmPassword) {
      alert("Passwords do not match");
      return;
    }
  };

  const navigate = useNavigate();
  return (
    <div className="min-h-screen flex flex-col bg-bg ">
      <DontForgetHeader />
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-4xl mx-auto space-y-6 py-10 px-4"
      >
        <div className="space-y-6 border border-border rounded-md p-4 sm:p-6 bg-white">
          <SectionHeader
            title="Create Account"
            description="Fill in your details to create a new account."
          />

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {/* First Name */}
            <div>
              <label className={inputClass.label}>First Name</label>
              <input
                type="text"
                value={form.firstName}
                onChange={(e) => handleChange("firstName", e.target.value)}
                placeholder="Enter first name"
                className={inputClass.input}
              />
            </div>

            {/* Last Name */}
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

            {/* Email */}
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

            {/* Phone */}
            <div>
              <label className={inputClass.label}>Phone</label>
              <input
                type="text"
                value={form.phone}
                onChange={(e) => handleChange("phone", e.target.value)}
                placeholder="Enter phone number"
                className={inputClass.input}
              />
            </div>

            {/* Business Name */}
            <div className="sm:col-span-2">
              <label className={inputClass.label}>Business Name</label>
              <input
                type="text"
                value={form.businessName}
                onChange={(e) => handleChange("businessName", e.target.value)}
                placeholder="Enter business name"
                className={inputClass.input}
              />
            </div>
          </div>
        </div>

        <div className="space-y-6 border border-border rounded-md p-4 sm:p-6 bg-white">
          <SectionHeader
            title="Security"
            description="Set your account password."
          />

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className={inputClass.label}>Password</label>
              <input
                type="password"
                value={form.password}
                onChange={(e) => handleChange("password", e.target.value)}
                placeholder="Enter password"
                className={inputClass.input}
              />
            </div>

            <div>
              <label className={inputClass.label}>Confirm Password</label>
              <input
                type="password"
                value={form.confirmPassword}
                onChange={(e) =>
                  handleChange("confirmPassword", e.target.value)
                }
                placeholder="Confirm password"
                className={inputClass.input}
              />
            </div>
          </div>

          <div className="flex items-center gap-4">
            <CommonButton type="submit" variant="primary">
              Create Account
            </CommonButton>
            <CommonButton onClick={() => navigate(-1)} variant="secondary">
              Back
            </CommonButton>
          </div>
        </div>
      </form>
    </div>
  );
};

export default Signup;
