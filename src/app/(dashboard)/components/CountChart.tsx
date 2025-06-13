"use client";

import { RadialBarChart, RadialBar, ResponsiveContainer } from "recharts";
import { Users } from "lucide-react";
import Image from "next/image";

const data = [
  {
    name: "Total Students",
    count: 106,
    fill: "white",
  },
  {
    name: "Boys",
    count: 60,
    fill: "#6BCBFF",
  },

  {
    name: "Girls",
    count: 46,
    fill: "#fff8dd",
  },
];

export default function CountChart() {
  return (
    <div className="w-full h-full rounded-xl bg-white">
      <div className="flex items-center justify-between p-4">
        <p>Students</p>
        <Users className="h-6 w-6 " />
      </div>

      <div className="w-full h-[65%] relative">
        <ResponsiveContainer width="100%" height="100%">
          <RadialBarChart
            cx="50%"
            cy="50%"
            innerRadius="40%"
            outerRadius="100%"
            barSize={32}
            data={data}
          >
            <RadialBar background dataKey="count" />
          </RadialBarChart>
        </ResponsiveContainer>
        <Image
          src="/gender.png"
          alt="gender"
          width={50}
          height={50}
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2  "
        />
      </div>

      <div className="flex justify-around">
        <div className="flex flex-col  justify-between p-4">
          <div className="w-5 h-5 bg-cblue rounded-full" />
          <h1 className="font-bold ">1254</h1>
          <p className="text-gray-400 text-sm">Boy[58%]</p>
        </div>
        <div className="flex flex-col  justify-between p-4">
          <div className="w-5 h-5 bg-cyellow rounded-full" />
          <h1 className="font-bold ">1254</h1>
          <p className="text-gray-400 text-sm">Girls[42%]</p>
        </div>
      </div>
    </div>
  );
}
