import CommonButton from "@/components/shared/CommonButton";
import CommonHeader from "@/components/shared/CommonHeader";
import DontForgetHeader from "@/components/shared/DontForgetHeader";
import { inputClass } from "@/features/task/CreateDashboardForm";
import { Eye, EyeOff, Lock, Mail } from "lucide-react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

import ButtonWithLoading from "@/components/shared/ButtonWithLoading";
import { setRole } from "@/store/dashboardStore/dashboardSlice";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";
import { z } from "zod";

const loginSchema = z.object({
  email: z.string().email("Invalid email"),
  password: z.string().min(6, "Password must be at least 6 characters"),
});

type LoginFormValues = z.infer<typeof loginSchema>;

const USERS = [
  {
    email: "admin@gmail.com",
    password: "Admin@12345",
    role: "admin",
  },
  {
    email: "collaborator@gmail.com",
    password: "Collaborator@12345",
    role: "collaborator",
  },
];

const Login = () => {
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const {
    register,
    handleSubmit,
    setError,
    formState: { errors, isSubmitting },
  } = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
  });

  const onSubmit = async (data: LoginFormValues) => {
    await new Promise((resolve) => setTimeout(resolve, 1200));

    const user = USERS.find(
      (u) => u.email === data.email && u.password === data.password,
    );

    if (!user) {
      setError("root", {
        message: "Invalid email or password",
      });
      toast.error("Invalid email or password");
      return;
    }

    localStorage.setItem("token", "fake-token");
    localStorage.setItem("role", user.role);

    dispatch(setRole(user.role));

    if (user.role === "admin") {
      navigate("/admin/dashboard");
    } else if (user.role === "collaborator") {
      navigate("/collaborator/dashboard");
    }

    toast.success("Logged in successfully");
  };

  return (
    <div className="min-h-screen flex flex-col bg-brand sm:bg-brand/95">
      <DontForgetHeader />

      <div className="flex flex-1 items-center justify-center px-4 py-10">
        <div className="w-full max-w-md bg-background rounded-2xl shadow-xl p-6 sm:p-8">
          <div className="flex flex-col items-center text-center mb-6">
            <CommonHeader size="2xl">Admin Login</CommonHeader>
            <CommonHeader className="text-text/60 text-sm">
              Sign in to access the admin dashboard
            </CommonHeader>
          </div>

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
            <div>
              <label className={inputClass.label}>Email</label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-text/60" />
                <input
                  type="email"
                  placeholder="admin@example.com"
                  {...register("email")}
                  className={`${inputClass.input} pl-10`}
                />
              </div>
              {errors.email && (
                <p className={inputClass.error}>{errors.email.message}</p>
              )}
            </div>

            <div>
              <label className={inputClass.label}>Password</label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-text/60" />
                <input
                  type={showPassword ? "text" : "password"}
                  placeholder="••••••••"
                  {...register("password")}
                  className={`${inputClass.input} pl-10 pr-10`}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-text/60 hover:text-text cursor-pointer"
                >
                  {showPassword ? (
                    <EyeOff className="w-5 h-5" />
                  ) : (
                    <Eye className="w-5 h-5" />
                  )}
                </button>
              </div>
              {errors.password && (
                <p className={inputClass.error}>{errors.password.message}</p>
              )}
            </div>

            <div className="flex items-center justify-between text-sm">
              <label className="flex items-center gap-2 text-text/70">
                <input
                  type="checkbox"
                  className="rounded border-border accent-brand"
                />
                Remember me
              </label>

              <button
                type="button"
                className="text-text/50 hover:text-brand hover:underline"
              >
                Forgot password?
              </button>
            </div>

            <CommonButton
              disabled={isSubmitting}
              className="w-full"
              type="submit"
            >
              {isSubmitting ? (
                <ButtonWithLoading title="Logging in..." />
              ) : (
                "Login"
              )}
            </CommonButton>
          </form>

          <p className="text-center text-xs text-text/50 mt-6">
            © 2026 Admin Panel
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
