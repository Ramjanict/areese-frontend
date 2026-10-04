import logo from "@/assets/images/logo.jpg";
import { useState } from "react";
import { Link } from "react-router-dom";
import CommonWrapper from "./CommonWrapper";
import DashboardSearch from "./DashboardSearch";

interface DashboardHeaderProps {
  sidebarOpen: boolean;
}

const DashboardHeader = ({ sidebarOpen }: DashboardHeaderProps) => {
  const [search, setSearch] = useState("");
  const headerContent = (
    <header className=" w-full h-20 bg-brand px-4.5 ">
      <div className="flex justify-between items-center h-full">
        <div className="flex items-center gap-6">
          <div className="flex items-center gap-1">
            <Link to="/admin/dashboard" className="flex items-center h-18 w-20">
              <img
                className="  object-cover w-full h-full rounded-2xl "
                src={logo || "/logo.svg"}
                alt="logo"
              />
            </Link>

            <p className="text-xl font-bold whitespace-nowrap">Dont forget</p>
          </div>

          <div className="hidden md:block">
            <DashboardSearch
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>
        </div>
      </div>
    </header>
  );

  return !sidebarOpen ? (
    headerContent
  ) : (
    <CommonWrapper className="!w-full">{headerContent}</CommonWrapper>
  );
};

export default DashboardHeader;
