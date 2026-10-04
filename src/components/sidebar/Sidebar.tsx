import { FiLogOut } from "react-icons/fi";

import {
  Calendar,
  ClipboardList,
  FileText,
  LayoutDashboard,
  List,
  Mail,
  MessageSquare,
  Package,
  Plus,
  Repeat,
  Settings,
  User,
  Users,
} from "lucide-react";

import { type FC } from "react";
import { FaUsers } from "react-icons/fa";
import { NavLink } from "react-router-dom";

export interface SidebarItem {
  icon: React.ElementType;
  label: string;
  path: string;
  section: string;
  notification?: boolean;
}

interface SidebarProps {
  sidebarOpen: boolean;
  onLinkClick?: () => void;
  items: SidebarItem[];
  userInfo?: {
    email: string;
    role: string;
  };
}

export const sidebarItems: SidebarItem[] = [
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
    path: "/admin/view-teams",
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

export const handleLogout = () => {
  localStorage.removeItem("token");
  localStorage.removeItem("role");
  window.location.href = "/login";
};
const Sidebar: FC<SidebarProps> = ({
  sidebarOpen,
  onLinkClick,
  items,
  userInfo,
}) => {
  const groupedItems = items.reduce(
    (acc, item) => {
      if (!acc[item.section]) acc[item.section] = [];
      acc[item.section].push(item);
      return acc;
    },
    {} as Record<string, SidebarItem[]>,
  );

  return (
    <aside
      className={`${sidebarOpen ? "translate-x-0" : "-translate-x-full"} fixed inset-y-0 left-0 z-40 w-[280px] transition-transform duration-300 ease-in-out md:translate-x-0 md:static bg-brand lg:rounded-[10px] px-5 py-6 flex flex-col h-full sidebar-scroll`}
    >
      <div className="flex items-center gap-3 bg-late-bg  rounded-[5px] px-3 py-2 mb-5">
        <div className="text-left ">
          <div className="text-sm text-text">
            {userInfo?.email || "admin@admin.com"}
          </div>
          <div className="text-base text-text">
            {userInfo?.role || "super-admin"}
          </div>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto">
        {Object.entries(groupedItems).map(([section, items]) => (
          <div key={section} className="mb-2">
            <p className="mb-2 font-semibold">{section}</p>
            <div className="space-y-1">
              {items.map((item) => (
                <NavLink
                  onClick={onLinkClick}
                  key={item.label}
                  to={item.path}
                  end={item.path === "/dashboard"}
                  className={({ isActive }) =>
                    `flex items-center gap-3 w-full h-10 px-2 rounded ${
                      isActive
                        ? "text-white bg-cta  font-semibold"
                        : "hover:bg-bg"
                    }`
                  }
                >
                  <item.icon className={`h-4 w-4 `} />
                  {item.label}
                </NavLink>
              ))}
            </div>
          </div>
        ))}
        <div
          onClick={handleLogout}
          className="flex gap-1 items-center cursor-pointer hover:bg-cta hover:text-white transition-all px-4 py-2 rounded"
        >
          <span>
            <FiLogOut className="h-4 w-4 cursor-pointer" />
          </span>
          Logout
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;
