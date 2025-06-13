import { GraduationCap } from "lucide-react";
import Link from "next/link";
import Menu from "./components/Menu";
import Navbar from "./components/Navbar";

export default function DashboardLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="  flex ">
      <div className=" w-[14%] md:w-[8%] lg:w-[16%] bg-gray-100">
        <Link
          href="/"
          className="flex items-center justify-center lg:justify-start gap-2 py-4   md:px-2 rounded-md hover:bg-lamaSkyLight"
        >
          <GraduationCap />

          <span className="hidden lg:block">School Lama</span>
        </Link>
        <Menu />  
      </div>
      <div className=" w-[86%] md:w-[92%] lg:w-[84%]  flex flex-col bg-gray-300 ">
        <Navbar />
        {children}
      </div>
    </div>
  );
}
