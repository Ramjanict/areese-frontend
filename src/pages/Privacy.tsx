import DontForgetHeader from "@/components/shared/DontForgetHeader";

const Privacy = () => {
  return (
    <div className="min-h-screen bg-brand text-text">
      <DontForgetHeader />

      <div className="max-w-7xl mx-auto px-6 py-20">
        <h1 className="text-3xl sm:text-5xl font-black mb-6">Privacy Policy</h1>

        <p className="text-sm text-text/50 mb-10">Last updated: April 2026</p>

        <div className="space-y-8 text-sm leading-relaxed">
          {/* Section */}
          <div>
            <h2 className="font-bold text-lg mb-2">
              1. Information We Collect
            </h2>
            <p className="text-text/70">
              We collect information you provide directly, such as your name,
              email address, and any data you enter while using the app (tasks,
              notes, bookings, etc.).
            </p>
          </div>

          {/* Section */}
          <div>
            <h2 className="font-bold text-lg mb-2">
              2. How We Use Your Information
            </h2>
            <p className="text-text/70">
              We use your information to provide and improve our services,
              manage your account, communicate with you, and ensure a smooth
              user experience.
            </p>
          </div>

          {/* Section */}
          <div>
            <h2 className="font-bold text-lg mb-2">3. Payments</h2>
            <p className="text-text/70">
              Payments are securely processed through third-party providers like
              Stripe and PayPal. We do not store your payment details.
            </p>
          </div>

          {/* Section */}
          <div>
            <h2 className="font-bold text-lg mb-2">4. Data Sharing</h2>
            <p className="text-text/70">
              We do not sell your data. We only share information with trusted
              services required to operate the platform (such as hosting,
              analytics, and payment providers).
            </p>
          </div>

          {/* Section */}
          <div>
            <h2 className="font-bold text-lg mb-2">5. Data Security</h2>
            <p className="text-text/70">
              We take reasonable measures to protect your data, but no system is
              completely secure. Use the service at your own risk.
            </p>
          </div>

          {/* Section */}
          <div>
            <h2 className="font-bold text-lg mb-2">6. Your Rights</h2>
            <p className="text-text/70">
              You can request access, updates, or deletion of your data at any
              time by contacting us.
            </p>
          </div>

          {/* Section */}
          <div>
            <h2 className="font-bold text-lg mb-2">7. Changes</h2>
            <p className="text-text/70">
              We may update this policy from time to time. Continued use of the
              service means you accept those changes.
            </p>
          </div>

          {/* Section */}
          <div>
            <h2 className="font-bold text-lg mb-2">8. Contact</h2>
            <p className="text-text/70">
              If you have any questions, contact us at:
            </p>
            <p className="mt-2 font-medium">support@dontforget.app</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Privacy;
