import CommonButton from "@/components/shared/CommonButton";
import DontForgetHeader from "@/components/shared/DontForgetHeader";
import React from "react";
import { FiCheckCircle } from "react-icons/fi";
import { Link } from "react-router-dom";

const PricingHero: React.FC = () => {
  return (
    <div className="min-h-screen  flex flex-col bg-brand">
      <DontForgetHeader />
      <div className="flex-1 max-w-7xl mx-auto px-4  w-full ">
        <section className="w-full flex flex-col lg:flex-row items-center justify-between  py-12 gap-10  ">
          <div className="">
            <h1 className="text-[clamp(40px,5vw,70px)] font-black leading-tight mb-6">
              Stay organized and <br />{" "}
              <span className="text-today-accent">never forget</span> a thing
            </h1>
            <p className="mt-4 text-text text-sm">
              Effortlessly manage your tasks and reminders
            </p>

            <button className="px-8 py-4 bg-today-accent text-white rounded-full font-bold cursor-pointer mt-4">
              <Link to="/signup"> Get Started →</Link>
            </button>
          </div>

          <div className="relative bg-bg rounded-2xl border border-white/[0.07] p-7 overflow-hidden ">
            <div className="absolute top-0 left-0 right-0 h-[4px] bg-gradient-to-r from-cta via-late-accent to-brand " />

            <div className="absolute top-0 right-0 bg-cta text-text text-[10px] font-bold tracking-widest uppercase px-4 py-1 rounded-tr-md rounded-bl-md">
              Dont Forget
            </div>

            <div className="flex flex-col gap-8 items-start justify-between">
              <div className="flex-1 min-w-[220px]">
                <h2 className="text-xl sm:text-3xl font-extrabold text-text mb-1 mt-1">
                  Core Plan
                </h2>
                <p className="text-[13px] text-bg/50 mb-5">
                  Everything you need to stay organized and in control
                </p>
                <ul className="space-y-2.5">
                  {[
                    "Create dashboards & tasks",
                    "Key points per dashboard",
                    "Follow-ups tied to your work",
                    "Public booking & appointment view",
                    "Payment integration (Stripe & PayPal)",
                    "Video call links (Zoom & Google Meet)",
                    "Client message templates",
                    "Team Access (1 Admin with up to 10 team members)",
                    "Analytics (daily, weekly, monthly, yearly)",
                    "Exports & archives",
                    "... and more!",
                  ].map((f, i) => (
                    <li
                      key={i}
                      className="flex items-center gap-2 text-sm text-text font-medium"
                    >
                      <FiCheckCircle size={16} className="text-cta" />

                      {f}
                    </li>
                  ))}
                </ul>
              </div>

              <div className="flex flex-col items-center justify-center gap-3    w-full">
                <div className="text-[54px] font-extrabold text-cta leading-none">
                  $30
                  <span className="text-lg font-medium text-text">/ mo</span>
                </div>
                <CommonButton className="w-full! rounded-full!">
                  <Link to="/signup">Sign Up</Link>
                </CommonButton>

                <p className="text-[11.5px] text-text text-center">
                  No hidden fees. Cancel anytime.
                </p>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default PricingHero;
