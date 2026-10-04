import DontForgetHeader from "@/components/shared/DontForgetHeader";

const Terms = () => {
  return (
    <div className="min-h-screen bg-brand text-text">
      <DontForgetHeader />

      <div className="max-w-7xl mx-auto px-6 py-20">
        <h1 className="text-3xl sm:text-5xl font-black mb-6">
          Terms & Conditions
        </h1>

        <p className="text-sm text-text/50 mb-10">Last updated: April 2026</p>

        <div className="space-y-8 text-sm leading-relaxed">
          <div>
            <h2 className="font-bold text-lg mb-2">1. Acceptance of Terms</h2>
            <p className="text-text/70">
              By accessing or using Dont Forget, you agree to be bound by these
              Terms & Conditions. If you do not agree, please do not use the
              service.
            </p>
          </div>

          <div>
            <h2 className="font-bold text-lg mb-2">2. Use of the Service</h2>
            <p className="text-text/70">
              You agree to use the service only for lawful purposes and in a way
              that does not harm, disrupt, or misuse the platform or other
              users.
            </p>
          </div>

          <div>
            <h2 className="font-bold text-lg mb-2">3. Accounts</h2>
            <p className="text-text/70">
              You are responsible for maintaining the confidentiality of your
              account and any activity that occurs under it.
            </p>
          </div>

          <div>
            <h2 className="font-bold text-lg mb-2">4. Payments & Billing</h2>
            <p className="text-text/70">
              Paid features may be offered through subscription. Payments are
              processed securely via third-party providers like Stripe and
              PayPal. You can cancel your subscription at any time.
            </p>
          </div>

          <div>
            <h2 className="font-bold text-lg mb-2">5. Early Access</h2>
            <p className="text-text/70">
              Early access users may receive access to features that are still
              in development. These features may change, improve, or be removed
              at any time without notice.
            </p>
          </div>

          <div>
            <h2 className="font-bold text-lg mb-2">6. Data & Privacy</h2>
            <p className="text-text/70">
              Your use of the service is also governed by our Privacy Policy.
            </p>
          </div>

          <div>
            <h2 className="font-bold text-lg mb-2">7. Termination</h2>
            <p className="text-text/70">
              We reserve the right to suspend or terminate your account if you
              violate these terms or misuse the service.
            </p>
          </div>

          <div>
            <h2 className="font-bold text-lg mb-2">
              8. Limitation of Liability
            </h2>
            <p className="text-text/70">
              The service is provided “as is” without warranties of any kind. We
              are not liable for any damages or data loss resulting from your
              use of the platform.
            </p>
          </div>

          <div>
            <h2 className="font-bold text-lg mb-2">9. Changes to Terms</h2>
            <p className="text-text/70">
              We may update these terms at any time. Continued use of the
              service means you accept the updated terms.
            </p>
          </div>

          <div>
            <h2 className="font-bold text-lg mb-2">10. Contact</h2>
            <p className="text-text/70">
              If you have any questions about these Terms, please contact us at:
            </p>
            <p className="mt-2 font-medium">support@dontforget.app</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Terms;
