import { useState } from "react";
import { IoCloseSharp } from "react-icons/io5";
import { inputClass } from "../task/CreateDashboardForm";
export type IntegrationName = "Zoom" | "Google Meet" | "Stripe" | "PayPal";

interface ModalField {
  label: string;
  placeholder: string;
  key: string;
}

const modalConfig: Record<
  IntegrationName,
  { steps: string[]; fields: ModalField[] }
> = {
  Zoom: {
    steps: [
      "Go to Zoom App Marketplace: https://marketplace.zoom.us/",
      'Click "Develop" → "Build App".',
      'Choose "Server-to-Server OAuth" app type.',
      "Fill in app details and get your credentials.",
      "Copy Account ID, Client ID (API Key), and Client Secret (API Secret).",
      "Paste them below to connect.",
    ],
    fields: [
      {
        label: "Client ID",
        placeholder: "Enter Zoom Client ID",
        key: "clientId",
      },
      {
        label: "Client Secret",
        placeholder: "Enter Zoom Client Secret",
        key: "clientSecret",
      },
      {
        label: "Account Id",
        placeholder: "Enter Zoom Account Id",
        key: "accountId",
      },
    ],
  },
  "Google Meet": {
    steps: [
      "Go to Google Cloud Console: https://console.cloud.google.com/",
      "Create a new project or select existing",
      "Enable Google Calendar API",
      "Create credentials (OAuth 2.0 Client ID)",
      "Add authorized redirect URIs",
      "Copy Client ID and Client Secret",
    ],
    fields: [
      {
        label: "Client ID",
        placeholder: "Enter Google Client ID",
        key: "clientId",
      },
      {
        label: "Client Secret",
        placeholder: "Enter Google Client Secret",
        key: "clientSecret",
      },
    ],
  },
  Stripe: {
    steps: [
      "Go to Stripe Dashboard: https://dashboard.stripe.com/",
      "Sign in or create an account",
      "Navigate to Developers → API Keys",
      "Copy your Publishable Key and Secret Key",
      "For webhooks: Create webhook endpoint",
      "Copy Webhook Secret",
    ],
    fields: [
      {
        label: "Publishable Key",
        placeholder: "Enter Stripe Client ID",
        key: "publishableKey",
      },
      {
        label: "Secret Key",
        placeholder: "Enter Stripe Client Secret",
        key: "secretKey",
      },
      {
        label: "Webhook Secret",
        placeholder: "Enter Stripe Webhook Secret",
        key: "webhookSecret",
      },
    ],
  },
  PayPal: {
    steps: [
      "Go to PayPal Developer: https://developer.paypal.com/",
      "Sign in with your PayPal account",
      "Go to Dashboard → My Apps & Credentials",
      "Create a new app or select existing",
      "Copy Client ID and Secret",
      "Paste them below",
    ],
    fields: [
      {
        label: "Client ID",
        placeholder: "Enter PayPal Client ID",
        key: "clientId",
      },
      {
        label: "Secret Key",
        placeholder: "Enter PayPal Client Secret",
        key: "secretKey",
      },
    ],
  },
};
interface IntegrationNameProps {
  name: IntegrationName;
  onClose: () => void;
  onSave: (data: Record<string, string>) => void;
}
const IntegrationModal: React.FC<IntegrationNameProps> = ({
  name,
  onClose,
  onSave,
}) => {
  const config = modalConfig[name];
  const [fields, setFields] = useState<Record<string, string>>(
    Object.fromEntries(config.fields.map((f) => [f.key, ""])),
  );

  const handleSave = () => {
    onSave(fields);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-lg mx-4 overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between px-6 pt-5 pb-4 border-b border-border">
          <h2 className="text-lg font-bold text-gray-800">
            {name} Integration Setup
          </h2>
          <button
            onClick={onClose}
            className="text-text hover:text-gray-600 transition-colors p-1 rounded-lg hover:bg-gray-100 cursor-pointer"
          >
            <IoCloseSharp />
          </button>
        </div>

        {/* Body */}
        <div className="px-6 py-5 max-h-[70vh] overflow-y-auto">
          <h3 className="text-xl font-bold text-gray-900 mb-4">
            How to Get Your API Credentials
          </h3>
          <ol className="space-y-2 mb-6">
            {config.steps.map((step, i) => (
              <li key={i} className="text-sm text-gray-700">
                {i + 1}. {step}
              </li>
            ))}
          </ol>

          <div className="space-y-4">
            {config.fields.map((field) => (
              <div key={field.key}>
                <label className={inputClass.label}>{field.label}</label>
                <input
                  type="text"
                  placeholder={field.placeholder}
                  value={fields[field.key]}
                  onChange={(e) =>
                    setFields((prev) => ({
                      ...prev,
                      [field.key]: e.target.value,
                    }))
                  }
                  className={inputClass.input}
                />
              </div>
            ))}
          </div>
        </div>

        {/* Footer */}
        <div className="flex items-center justify-between px-6 py-4 border-t border-border bg-gray-50">
          <button
            onClick={onClose}
            className="px-5 py-2 border border-gray-300 rounded-lg text-sm text-gray-700 font-medium hover:bg-gray-100 transition-colors"
          >
            Close
          </button>
          <button
            onClick={handleSave}
            className="px-5 py-2 bg-orange-500 hover:bg-orange-600 text-white text-sm font-semibold rounded-lg transition-colors active:scale-95"
          >
            Save changes
          </button>
        </div>
      </div>
    </div>
  );
};

export default IntegrationModal;
