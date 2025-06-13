"use client";

import {
  BarChart,
  Bar,
  Rectangle,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import Image from "next/image";

const data = [
  {
    name: "Mon",
    present: 4000,
    absent: 2400,
  },
  {
    name: "Tue",
    present: 3000,
    absent: 1398,
  },
  {
    name: "Wed",
    present: 2000,
    absent: 5000,
  },
  {
    name: "Thur",
    present: 2780,
    absent: 3908,
  },
  {
    name: "Fri",
    present: 1890,
    absent: 4800,
  },
];

export default function Attendence() {
  return (
    <div className="w-full h-full rounded-xl bg-white">
      <div className="flex items-center justify-between p-4">
        <p>Attendance</p>
        <Image src="/moreDark.png" alt="more" width={20} height={20} />
      </div>

      <ResponsiveContainer width="100%" height="85%">
        <BarChart width={500} height={300} data={data} barSize={20}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Bar
            dataKey="present"
            fill="#6BCBFF"
            activeBar={<Rectangle  />}
          />
          <Bar
            dataKey="absent"
            fill="#FF6B6B"
            activeBar={<Rectangle  />}
          />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
