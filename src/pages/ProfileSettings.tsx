import DashboardTopSection from "@/components/shared/DashboardTopSection";
import ProfileSettingsForm from "@/features/profile/ProfileSettingsForm";

const ProfileSettings = () => {
  return (
    <div>
      <DashboardTopSection
        title="Profile"
        description="View and manage all your profile settings efficiently"
      />
      <ProfileSettingsForm />
    </div>
  );
};

export default ProfileSettings;
