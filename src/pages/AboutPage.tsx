import CommonButton from "@/components/shared/CommonButton";
import CommonWrapper from "@/components/shared/CommonWrapper";
import DontForgetHeader from "@/components/shared/DontForgetHeader";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";

const AboutPage = () => {
  const navigate = useNavigate();

  return (
    <div className="bg-brand min-h-screen ">
      <DontForgetHeader />

      <CommonWrapper>
        <div className="text-center mb-16 pt-10 md:pt-20">
          <h1 className="text-4xl sm:text-5xl font-black mb-4">About Us</h1>

          <p className="text-text font-medium text-lg">
            Learn more about our mission, vision, and the team behind the
            product.
          </p>
        </div>

        <div className=" grid lg:grid-cols-2 gap-10 pb-24">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            className="bg-white rounded-2xl border p-8 shadow-sm"
          >
            <h2 className="text-2xl font-bold mb-4">Who We Are</h2>

            <p className="text-gray-600 mb-6">
              We are a passionate team dedicated to building simple and
              effective solutions that help people stay organized and
              productive.
            </p>

            <p className="text-gray-600">
              Our platform focuses on task management, dashboards, and seamless
              user experience — making your daily workflow easier and smarter.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            className="bg-white rounded-2xl border shadow-sm p-8"
          >
            <h2 className="text-xl font-bold mb-6">Our Mission</h2>

            <p className="text-gray-600 mb-6">
              Our mission is to simplify productivity tools so that anyone can
              manage their tasks efficiently without complexity.
            </p>

            <h3 className="font-semibold mb-2">What We Offer</h3>

            <ul className="text-gray-600 space-y-2 mb-6">
              <li>• Task & dashboard management</li>
              <li>• Clean and modern UI</li>
              <li>• Fast and responsive experience</li>
            </ul>

            <CommonButton onClick={() => navigate("/contact")}>
              Contact Us
            </CommonButton>
          </motion.div>
        </div>
      </CommonWrapper>
    </div>
  );
};

export default AboutPage;
