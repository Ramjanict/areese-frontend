import CommonSelect from "@/components/shared/CommonSelect";
import SectionHeader from "@/components/shared/SectionHeader";
import { useState } from "react";
import { IoSettingsOutline } from "react-icons/io5";
import AccountPanel from "./AccountPanel";
import AnalyticsPanel from "./AnalyticsPanel";
import BookingCapsPanel from "./BookingCapsPanel";
import BrandingPanel from "./BrandingPanel";
import IntegrationsPanel from "./IntegrationsPanel";
import NotificationsPanel from "./NotificationsPanel";

type Section =
  | "integrations"
  | "notifications"
  | "analytics"
  | "branding"
  | "booking-caps"
  | "account";

const navItems: { id: Section; label: string }[] = [
  { id: "integrations", label: "Integrations" },
  { id: "notifications", label: "Notifications" },
  { id: "analytics", label: "Analytics" },
  { id: "branding", label: "Branding" },
  { id: "booking-caps", label: "Booking Caps" },
  { id: "account", label: "Account" },
];

const panelMap: Record<Section, React.ReactNode> = {
  integrations: <IntegrationsPanel />,
  notifications: <NotificationsPanel />,
  analytics: <AnalyticsPanel />,
  branding: <BrandingPanel />,
  "booking-caps": <BookingCapsPanel />,
  account: <AccountPanel />,
};

const titleMap: Record<Section, string> = {
  integrations: "Integrations",
  notifications: "Notifications",
  analytics: "Analytics",
  branding: "Branding",
  "booking-caps": "Booking Caps",
  account: "Account",
};

const SettingsPage = () => {
  const [active, setActive] = useState<Section>("integrations");

  return (
    <div className="w-full ">
      <div className="flex flex-col md:flex-row items-start gap-6  w-full pb-6 ">
        <nav className="hidden md:block w-52 shrink-0 bg-white border-r border-border  p-3 rounded-2xl">
          {navItems.map((item) => (
            <button
              key={item.id}
              onClick={() => setActive(item.id)}
              className={`w-full text-left px-3 py-2.5 rounded-lg text-sm cursor-pointer transition-colors mb-0.5 text-text ${
                active === item.id
                  ? " font-semibold  pl-2.5 bg-bg"
                  : " hover:bg-bg"
              }`}
            >
              {item.label}
            </button>
          ))}
        </nav>
        <div className="w-full md:hidden pt-4 px-1">
          <CommonSelect<Section>
            value={active}
            item={navItems.map((item) => ({
              label: item.label,
              value: item.id,
            }))}
            w={undefined}
            onValueChange={(val) => setActive(val)}
            className="w-full"
            placeholder="Select section"
          />
        </div>
        <main className="flex-1  w-full">
          <div className="bg-white rounded-2xl border border-border shadow-sm overflow-hidden mb-6 w-full">
            <div className="px-6 py-5 flex items-center gap-2">
              <IoSettingsOutline className="text-2xl" />
              <SectionHeader title={titleMap[active]} className="pb-0!" />
            </div>
            <div className="px-6 pb-4 bg-brand ">
              <p className="text-sm text-white py-3">
                Configure your workspace. Changes are saved automatically.
              </p>
            </div>
          </div>

          {panelMap[active]}
        </main>
      </div>
    </div>
  );
};

export default SettingsPage;
