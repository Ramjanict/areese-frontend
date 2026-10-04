import logo from "@/assets/images/logo.jpg";
import { Link } from "react-router-dom";

const DontForgetHeader = () => {
  return (
    <header className="w-full sticky top-0 z-50 backdrop-blur-md bg-gradient-to-r from-brand via-followup-accent to-late-accent border-white/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 h-20 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <Link
            to="/"
            className="w-16 h-16  flex items-center justify-center shadow-md"
          >
            <img
              src={logo}
              alt="Logo"
              className="w-full h-full object-cover rounded-md"
            />
          </Link>

          <div className="leading-tight">
            <h1 className="text-lg sm:text-xl font-semibold text-white tracking-tight">
              DON'T FORGET
            </h1>
            <p className="text-white/60 text-xs sm:text-sm">
              Organize tasks & workflows
            </p>
          </div>
        </div>

        <nav className=" items-center gap-4 text-sm hidden sm:flex">
          <Link
            to="/privacy"
            className="text-white/70 hover:text-white transition"
          >
            Privacy
          </Link>

          <Link
            to="/terms"
            className="text-white/70 hover:text-white transition"
          >
            Terms
          </Link>

          <Link
            to="/login"
            className="hidden sm:inline-flex px-4 py-1.5 rounded-lg bg-white/90 text-black text-sm font-medium hover:bg-white transition"
          >
            Get Started
          </Link>
        </nav>
      </div>
    </header>
  );
};

export default DontForgetHeader;
