import Attendence from "../components/Attendence";
import CountChart from "../components/CountChart";
import FinanceChart from "../components/FinanceChart";
import { StatsCards } from "../components/StatCard";
import EventCalender from "../components/EventCalender";
import Announcements from "../components/AnnouncementsList";

export default function adminPage() {
  return (
    <div className="flex p-4 flex-col md:flex-row  ">
      {/* left */}
      <div className="w-full  lg:w-2/3   gap-2 ">
        <div className="flex flex-wrap gap-2">
          <StatsCards type="students" />
          <StatsCards type="teachers" />
          <StatsCards type="parents" />
          <StatsCards type="staff" />
        </div>

        {/* middle */}
        <div className="flex gap-2 flex-col lg:flex-row mt-4">
          {/* countChart */}
          <div className="w-full lg:w-1/3 h-[450px]">
            <CountChart />
          </div>
          {/* attendanceChart */}
          <div className="w-full  lg:w-2/3 h-[450px]">
            <Attendence />
          </div>
        </div>
        {/* bottomCHart */}
        <div className="w-full  h-[450px] mt-4">
          <FinanceChart />
        </div>
      </div>

      {/* right */}
      <div className="w-full lg:w-1/3 flex flex-col pl-4 gap-4   ">
        <div className=" bg-white rounded-lg ">
          <EventCalender />
        </div>

        <div className="flex flex-col gap-2">
          <Announcements />
        </div>
      </div>
    </div>
  );
}
