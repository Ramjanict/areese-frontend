import CommonButton from "@/components/shared/CommonButton";
import CommonHeader from "@/components/shared/CommonHeader";
import CommonSelect from "@/components/shared/CommonSelect";
import DashboardTopSection from "@/components/shared/DashboardTopSection";
import { inputClass } from "@/features/task/CreateDashboardForm";
import TagSearch from "@/features/team/TagSearch";
import { useState } from "react";
import { IoIosArrowBack } from "react-icons/io";
import {
  IoAlertCircleOutline,
  IoCalendarClearOutline,
  IoPricetag,
} from "react-icons/io5";
import { useNavigate } from "react-router-dom";

const TeamArchive = () => {
  const [selectedMonth, setSelectedMonth] = useState("January");
  const [selectedYear, setSelectedYear] = useState("2026");
  const [searchTag, setSearchTag] = useState("");

  const months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  const years = ["2022", "2023", "2024", "2025", "2026"];
  const navigate = useNavigate();
  return (
    <div className=" space-y-6">
      <DashboardTopSection
        title="Team Archive"
        description="Find your archived projects by month & year or by tag."
        buttonText="Back to View Teams"
        icon={IoIosArrowBack}
        action={() => navigate("../project")}
      />

      <div className="bg-today-bg  rounded-lg p-10 w-full ">
        <div className="grid grid-cols-1 xl:grid-cols-5 gap-5 sm:gap-10 xl:h-35 w-full">
          <div className="flex  items-start col-span-2  gap-4 xl:border-r-2 border-text/10 ">
            <span className="text-3xl text-today-accent bg-today-accent/20 rounded-full p-2">
              <IoCalendarClearOutline />
            </span>

            <div>
              <CommonHeader size="lg">Search by Month & Year</CommonHeader>
              <CommonHeader size="sm">
                Select a month and year to view your archived projects.
              </CommonHeader>
            </div>
          </div>
          <div className="col-span-2">
            <div className="  flex flex-col sm:flex-row gap-4">
              <div className=" flex-1">
                <label className={inputClass.label}>Month</label>

                <CommonSelect
                  value={selectedMonth}
                  onValueChange={(e) => setSelectedMonth(e)}
                  item={months.map((month) => ({
                    value: month,
                    label: month,
                  }))}
                  className="!w-full"
                />
              </div>

              <div className="flex-1 w-full">
                <label className={inputClass.label}>Year</label>

                <CommonSelect
                  value={selectedYear}
                  onValueChange={(e) => setSelectedYear(e)}
                  item={years.map((month) => ({
                    value: month,
                    label: month,
                  }))}
                  className="!w-full"
                />
              </div>
            </div>
          </div>
          <div className=" lg:self-end  xl:flex justify-end w-full  ">
            <CommonButton className="w-full! sm:w-auto!">
              View Archived Projects
            </CommonButton>
          </div>
        </div>
      </div>

      <div className="bg-followup-bg   rounded-lg p-10">
        <div className="grid grid-cols-1 xl:grid-cols-5 gap-5 sm:gap-10 xl:h-35 w-full">
          <div className="flex  items-start col-span-2  gap-4 xl:border-r-2 border-text/10 ">
            <span className="text-3xl text-followup-accent bg-followup-accent/20 rounded-full p-2">
              <IoPricetag />
            </span>

            <div>
              <CommonHeader size="lg">Search by Tag</CommonHeader>
              <CommonHeader size="sm">
                Find your project using the tag you assigned to it.
              </CommonHeader>
            </div>
          </div>
          <div className="flex gap-4 flex-1 w-full col-span-2 self-center  ">
            <TagSearch
              className="flex-1"
              value={searchTag}
              onChange={(e) => setSearchTag(e.target.value)}
            />
          </div>
          <div className=" lg:self-end  xl:flex justify-end w-full">
            <CommonButton className="bg-followup-accent! w-full! sm:w-auto!">
              View Archived Projects
            </CommonButton>
          </div>
        </div>
      </div>

      <div className="bg-upcoming-bg  p-4 rounded-lg">
        <div className="flex gap-3">
          <span className="text-xl">
            <IoAlertCircleOutline />
          </span>
          <div>
            <h4 className="font-semibold text-upcoming-accent mb-1">
              Please note
            </h4>
            <p className="text-sm text-text">
              Archived projects are organized by month/year or by the tags you
              assign.
              <br /> Use either option above to quickly find what you're looking
              for.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TeamArchive;
