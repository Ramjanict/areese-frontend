import { FiLogOut } from "react-icons/fi";

import { LayoutDashboard } from "lucide-react";

import { type FC } from "react";
import { FaUsers } from "react-icons/fa";
import { NavLink } from "react-router-dom";
import { handleLogout } from "../sidebar/Sidebar";

interface SidebarItem {
  icon: React.ElementType;
  label: string;
  path: string;
  section: string;
  notification?: boolean;
}

interface SidebarProps {
  sidebarOpen: boolean;
  onLinkClick?: () => void;
}

export const sidebarItems: SidebarItem[] = [
  {
    icon: LayoutDashboard,
    label: "View Dashboard",
    path: "/collaborator/dashboard",
    section: "Main",
  },
  {
    icon: FaUsers,
    label: "View Team",
    path: "/collaborator/team",
    section: "Main",
  },
];

const CollaboratorSidebar: FC<SidebarProps> = ({
  sidebarOpen,
  onLinkClick,
}) => {
  const groupedItems = sidebarItems.reduce(
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
          <div className="text-sm text-text">collaborator@gmail.com</div>
          <div className="text-base text-text">Collaborator</div>
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
                  <item.icon className="h-4 w-4 " />
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

export default CollaboratorSidebar;
