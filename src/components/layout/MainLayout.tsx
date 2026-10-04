import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import {
  Calendar,
  ClipboardList,
  FileText,
  LayoutDashboard,
  List,
  Mail,
  Menu,
  MessageSquare,
  Package,
  Plus,
  Repeat,
  Settings,
  User,
  Users,
} from "lucide-react";
import { useState } from "react";
import { FaBoxArchive } from "react-icons/fa6";
import { Outlet } from "react-router-dom";
import DashboardHeader from "../shared/DashboardHeader";
import SubscribeModal from "../shared/SubscribeModal";
import AdminSidebar, { type SidebarItem } from "../sidebar/Sidebar";

import { FaUsers } from "react-icons/fa";
const sidebarItems: SidebarItem[] = [
  {
    icon: LayoutDashboard,
    label: "View Dashboard",
    path: "/admin/dashboard",
    section: "Dashboard",
  },
  {
    icon: Plus,
    label: "Create Dashboard",
    path: "/admin/create-dashboard",
    section: "Dashboard",
  },
  {
    icon: Repeat,
    label: "Follow-Ups",
    path: "/admin/follow-ups",
    section: "Dashboard",
  },
  {
    icon: Package,
    label: "Booking Package",
    path: "/admin/booking-packages",
    section: "Packages & Booking",
  },
  {
    icon: Calendar,
    label: "Public Booking",
    path: "/admin/public-booking",
    section: "Packages & Booking",
  },
  {
    icon: ClipboardList,
    label: "View Appointments",
    path: "/admin/appointments",
    section: "Packages & Booking",
  },
  {
    icon: Settings,
    label: "Settings",
    path: "/admin/settings",
    section: "Settings",
  },
  {
    icon: MessageSquare,
    label: "Message Template",
    path: "/admin/message-template",
    section: "Settings",
  },
  {
    icon: Users,
    label: "Team Access",
    path: "/admin/team-access",
    section: "Settings",
  },
  {
    icon: FaUsers,
    label: "View Teams",
    path: "/admin/project",
    section: "Settings",
  },
  {
    icon: FaBoxArchive,
    label: "Team Archive",
    path: "/admin/team-archive",
    section: "Settings",
  },
  {
    icon: Mail,
    label: "Contacts us",
    path: "/admin/contacts-us",
    section: "User Management",
  },
  {
    icon: User,
    label: "Users",
    path: "/admin/users",
    section: "User Management",
  },
  {
    icon: List,
    label: "Blog Categories",
    path: "/admin/blog-categories",
    section: "Content & Resources",
  },
  {
    icon: FileText,
    label: "Blogs",
    path: "/admin/blogs",
    section: "Content & Resources",
  },
  // Profile
  {
    icon: User,
    label: "Profile",
    path: "/admin/profile",
    section: "Profile",
  },
];
const MainLayout: React.FC = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(true);

  return (
    <>
      <div className="w-full h-screen! bg-bg pt-2 overflow-hidden">
        <div className="w-full flex items-center justify-between bg-brand">
          <DashboardHeader sidebarOpen={sidebarOpen} />
          <div className="lg:hidden pr-4">
            <Sheet open={sidebarOpen} onOpenChange={setSidebarOpen}>
              <SheetTrigger className="cursor-pointer" asChild>
                <button className="p-2 rounded-md border border-border">
                  <Menu className="h-6 w-6 cursor-pointer text-white " />
                </button>
              </SheetTrigger>
              <SheetContent side="left" className="p-0 w-70">
                <AdminSidebar
                  items={sidebarItems}
                  sidebarOpen={true}
                  onLinkClick={() => setSidebarOpen(false)}
                />
              </SheetContent>
            </Sheet>
          </div>
        </div>

        <div className=" flex items-start px-4.5 pt-2 md:pt-6  gap-6  h-[calc(100vh-80px)]  ">
          <div className="hidden lg:block h-full ">
            <AdminSidebar sidebarOpen={true} items={sidebarItems} />
          </div>

          <div className="flex-1 w-full h-full pb-6 overflow-y-auto ">
            <Outlet />
          </div>
        </div>
      </div>
      <SubscribeModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />
    </>
  );
};

export default MainLayout;
