import CommonWrapper from "@/components/shared/CommonWrapper";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { AiOutlineMinus } from "react-icons/ai";
import { FiPlus } from "react-icons/fi";
import { HiMenu } from "react-icons/hi";
import { Link } from "react-router-dom";
import image from "../../assets/images/logo.jpg";

const features = [
  { icon: "📋", label: "Dashboards & Tasks" },
  { icon: "📌", label: "Key Points & Notes" },
  { icon: "🔄", label: "Follow-ups" },
  { icon: "🗓️", label: "Public Booking" },
  { icon: "💳", label: "Stripe & PayPal" },
  { icon: "🎥", label: "Zoom & Meet" },
  { icon: "💬", label: "Message Templates" },
  { icon: "📊", label: "Analytics" },
];

const faqs = [
  {
    q: "What is the Create Task Page?",
    a: "This is where you set up new tasks with meeting links, key points, reminders, and priorities.",
  },
  {
    q: "What is the Dashboard Page?",
    a: "Your central hub showing tasks, bookings and follow-ups.",
  },
  {
    q: "What is the Follow-Up Page?",
    a: "Track and manage client follow-ups tied to your tasks.",
  },
  {
    q: "What is the Public Booking Page?",
    a: "A shareable link clients use to book appointments directly.",
  },
];
const items = [
  "Stay Organized",
  "Never Miss a Task",
  "Public Booking",
  "Smart Follow-ups",
  "Team Access",
  "Analytics Dashboard",
  "Payment Integration",
  "Video Calls Built-in",
];

export default function HomePage() {
  const [openFaq, setOpenFaq] = useState<number | null>(0);
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    const scroll = () => setScrollY(window.scrollY);
    window.addEventListener("scroll", scroll);
    return () => window.removeEventListener("scroll", scroll);
  }, []);
  const brandColors = [
    "bg-today-bg",
    "bg-followup-bg",
    "bg-upcoming-bg",
    "bg-late-bg",
  ];
  return (
    <div className="bg-brand text-text overflow-x-hidden">
      <nav
        className={`fixed w-full z-50 flex justify-between items-center px-10 py-4 transition
  ${scrollY > 20 ? "bg-brand/80 backdrop-blur border-b border-info/20" : ""}`}
      >
        <Link to="/" className="flex items-center gap-2 font-bold text-lg">
          <div className="w-20 h-18">
            <img
              className="w-full h-full object-cover rounded-2xl"
              src={image}
              alt="logo"
            />
          </div>
          <span className="hidden sm:block">Dont forget</span>
        </Link>

        <div className="hidden lg:flex gap-10 text-sm font-medium text-text">
          <a href="#faq" className="hover:text-info cursor-pointer">
            FAQs
          </a>
          <Link to="/price" className="hover:text-info cursor-pointer">
            Pricing
          </Link>
          <Link to="/about" className="hover:text-info cursor-pointer">
            About Us
          </Link>
          <Link to="/contact" className="hover:text-info cursor-pointer">
            Contact
          </Link>
        </div>

        <div className="flex items-center gap-3">
          <div className="hidden lg:flex gap-3">
            <Link
              to="/login"
              className="px-5 py-2 rounded-full border border-today-accent text-today-accent text-sm font-semibold"
            >
              Login
            </Link>
            <Link
              to="/signup"
              className="px-5 py-2 rounded-full bg-today-accent text-white text-sm font-semibold"
            >
              Sign Up
            </Link>
          </div>

          <Sheet>
            <SheetTrigger asChild>
              <button className="lg:hidden text-3xl cursor-pointer ">
                <HiMenu />
              </button>
            </SheetTrigger>

            <SheetContent
              side="right"
              className="w-72 flex flex-col gap-6 p-4 bg-brand border border-0"
            >
              <a
                href="#faq"
                className="text-sm font-medium hover:text-info  cursor-pointer"
              >
                FAQs
              </a>

              <Link
                to="/price"
                className="text-sm font-medium hover:text-info  cursor-pointer"
              >
                Pricing
              </Link>
              <Link to="/about" className="hover:text-info cursor-pointer">
                About Us
              </Link>
              <Link
                to="/contact"
                className="text-sm font-medium hover:text-info cursor-pointer"
              >
                Contact
              </Link>

              <div className="mt-6 flex flex-col gap-3">
                <Link
                  to="/login"
                  className="px-4 py-2 border  border-text hover:border-today-accent hover:bg-today-accent hover:text-white transition-all rounded-xl text-center"
                >
                  Login
                </Link>

                <Link
                  to="/signup"
                  className="px-4 py-2 bg-today-accent text-white rounded-xl text-center"
                >
                  Sign Up
                </Link>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </nav>
      <CommonWrapper>
        <section className="min-h-screen flex items-center pt-28 ">
          <div className="w-full grid lg:grid-cols-2 gap-20 items-center">
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <div className="inline-flex items-center gap-2 bg-bg text-info px-4 py-2 rounded-full text-sm font-semibold mb-6">
                <span className="w-2 h-2 bg-info rounded-full"></span>
                Now live — lock in $30/month
              </div>

              <h1 className="text-[clamp(40px,5vw,70px)] font-black leading-tight mb-6">
                Stay organized
                <br />
                <span className="text-today-accent">& never forget</span>
                <br />a thing.
              </h1>

              <p className="text-lg text-text max-w-md mb-10">
                Effortlessly manage your tasks, bookings and reminders all from
                one beautiful dashboard.
              </p>

              <div className="flex flex-col sm:flex-row gap-4 ">
                <Link
                  to="/signup"
                  className="px-8 py-4 bg-today-accent text-white rounded-full font-bold cursor-pointer"
                >
                  Get Started →
                </Link>
              </div>

              <p className="text-sm text-text mt-5">
                No setup fees · Cancel anytime · $30/month
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="relative"
            >
              <div className="bg-white rounded-3xl p-7 shadow-xl border">
                <div className="flex justify-between mb-6">
                  <span className="font-bold">My Dashboard</span>
                  <span className="text-sm text-text/50">Today</span>
                </div>

                {[
                  {
                    label: "Client call – Sarah",
                    tag: "Today",
                    color: "bg-orange-100 text-orange-500",
                  },
                  {
                    label: "Send invoice – James",
                    tag: "Follow-up",
                    color: "bg-indigo-100 text-indigo-500",
                  },
                  {
                    label: "Proposal review",
                    tag: "Upcoming",
                    color: "bg-purple-100 text-purple-500",
                  },
                ].map((item, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.1 }}
                    className="flex justify-between items-center bg-bg rounded-lg px-4 py-3 mb-3"
                  >
                    <span>{item.label}</span>
                    <span
                      className={`text-xs font-semibold px-2 py-1 rounded ${item.color}`}
                    >
                      {item.tag}
                    </span>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </div>
        </section>
      </CommonWrapper>

      <div className="bg-black p-4.5 overflow-hidden hidden lg:block ">
        <div className="w-full overflow-hidden">
          <motion.div
            className="flex whitespace-nowrap"
            animate={{ x: ["0%", "-50%"] }}
            transition={{
              repeat: Infinity,
              duration: 28,
              ease: "linear",
            }}
          >
            {[...items, ...items].map((text, i) => (
              <span
                key={i}
                className="text-white text-[15px] font-semibold opacity-85 mr-[60px]"
              >
                ✦ {text}
              </span>
            ))}
          </motion.div>
        </div>
      </div>

      <CommonWrapper>
        <section className="py-24 ">
          <div className="text-center mb-16">
            <p className="text-info uppercase text-sm font-bold mb-3">
              Everything you need
            </p>
            <h2 className="text-2xl sm:text-4xl font-black">
              One app. Zero excuses.
            </h2>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map((f, i) => {
              const bgColor = brandColors[i % brandColors.length];

              return (
                <motion.div
                  key={i}
                  whileHover={{ y: -5, scale: 1.02 }}
                  className={`${bgColor} p-6 rounded-xl shadow-sm border`}
                >
                  <div className="text-3xl mb-4">{f.icon}</div>
                  <p className="font-semibold">{f.label}</p>
                </motion.div>
              );
            })}
          </div>
        </section>
      </CommonWrapper>

      <section id="signup" className="py-24 bg-bg px-10">
        <div className="max-w-[1400px] mx-auto grid md:grid-cols-2 gap-16 items-center">
          <div>
            <p className="text-info font-bold uppercase text-sm mb-3">
              Pricing
            </p>

            <h2 className="text-3xl sm:text-5xl font-black mb-4">
              One plan.
              <br />
              All features.
            </h2>

            <p className="text-text/50 mb-6">
              Everything you need to manage bookings, clients, and your business
              — in one simple plan.
            </p>

            <div className="flex items-end gap-2">
              <span className="text-6xl font-black text-today-accent">$30</span>
              <span className="text-text/50 mb-2">/month</span>
            </div>
          </div>

          <div className="bg-white p-8 rounded-2xl shadow-xl">
            <Link
              to="/price"
              className="w-full  flex justify-center cursor-pointer bg-today-accent text-white py-4 rounded-lg font-bold"
            >
              Pricing
            </Link>

            <p className="text-xs text-text/50 text-center mt-2">
              Cancel anytime · No setup fees
            </p>
          </div>
        </div>
      </section>

      <CommonWrapper>
        <section id="faq" className="py-24 ">
          <div className="text-center mb-16">
            <h2 className="text-2xl sm:text-4xl font-black">
              Don't Forget to read our FAQ
            </h2>
          </div>

          <div className="space-y-4">
            {faqs.map((faq, i) => (
              <div
                key={i}
                onClick={() => setOpenFaq(openFaq === i ? null : i)}
                className="border border-info rounded-xl cursor-pointer bg-bg"
              >
                <div className="flex justify-between p-5 font-semibold">
                  {faq.q}
                  <span className="text-xl">
                    {openFaq === i ? <AiOutlineMinus /> : <FiPlus />}
                  </span>
                </div>

                {openFaq === i && (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="px-5 pb-5 text-text/50 text-sm"
                  >
                    {faq.a}
                  </motion.div>
                )}
              </div>
            ))}
          </div>
        </section>
      </CommonWrapper>
      <section className="py-24 bg-bg text-center text-text">
        <h2 className=" text-2xl sm:text-4xl font-black mb-6">
          Ready to never forget again?
        </h2>

        <div className="flex justify-center gap-3 flex-wrap">
          <input
            className={
              "px-4 py-3 border outline-none border-today-accent rounded-lg text-today-accent placeholder:text-today-accent"
            }
            placeholder="Email"
          />

          <Link
            to="/signup"
            className="px-8 py-3 bg-today-accent rounded-lg font-bold cursor-pointer text-white"
          >
            Get Started →
          </Link>
        </div>
      </section>

      <footer className="bg-brand text-text text-sm py-6   text-center">
        © 2026 Don't Forget — All rights reserved.
      </footer>
    </div>
  );
}
