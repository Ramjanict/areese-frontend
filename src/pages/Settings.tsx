import DashboardTopSection from "@/components/shared/DashboardTopSection";
import SettingsPage from "@/features/settings/SettingsPage";

const Settings = () => {
  return (
    <div>
      <DashboardTopSection
        title="Settings"
        description="Manage your account preferences, and configure your app settings."
      />
      <SettingsPage />
    </div>
  );
};

export default Settings;
