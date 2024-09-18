"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";



const transformData = (followers = [], enrolledUser = []) => {
  const monthlyFollowers = {};
  const monthlyIncome = {};

  // Initialize all months with zero values
  const months = [
    "01-Jan", "02-Feb", "03-Mar", "04-Apr", "05-May", "06-Jun",
    "07-Jul", "08-Aug", "09-Sep", "10-Oct", "11-Nov", "12-Dec"
  ];

  // Process followers data
  followers.forEach(follower => {
    const date = new Date(follower.addedAt);
    const monthYear = `${String(date.getMonth() + 1).padStart(2, '0')}-${date.toLocaleString('default', { month: 'short' })}`;
    
    if (!monthlyFollowers[monthYear]) {
      monthlyFollowers[monthYear] = 0;
    }
    monthlyFollowers[monthYear] += 1;
  });

  // Process enrolled users data
  enrolledUser.forEach(enrolled => {
    const date = new Date(enrolled.date);
    const monthYear = `${String(date.getMonth() + 1).padStart(2, '0')}-${date.toLocaleString('default', { month: 'short' })}`;
    
    if (!monthlyIncome[monthYear]) {
      monthlyIncome[monthYear] = 0;
    }
    monthlyIncome[monthYear] += parseFloat(enrolled.price);
  });

  // Create the final data array with month names and zero values
  const result = months.map(month => {
    const monthYear = month;
    return {
      name: new Date(`2024-${monthYear.split('-')[0]}`).toLocaleString('default', { month: 'short' }),
      Follower: monthlyFollowers[monthYear] || 0,
      Income: monthlyIncome[monthYear] || 0
    };
  });

  return result;
};

const FinanceChart = ({ data }) => {
  const [chartData, setChartData] = useState([]);
  const [count, setcount] = useState(data?.followers?.length)

  useEffect(() => {
    if (data) {
      const { followers = [], enrolleduser = [] } = data;
      const transformedData = transformData(followers, enrolleduser);
      setChartData(transformedData);
    }
  }, [data]);
  return (
    <>
    
     
    <div className="bg-white rounded-xl w-full h-full p-4 font-[Poppins]">
      <div className="flex justify-between items-center">
        <h1 className="text-lg font-semibold font-[Poppins] text-gray-600">Finance</h1>
       
      </div>
        <ResponsiveContainer width="100%" height="90%">
        {chartData.length > 0 ?  <LineChart
            width={500}
            height={300}
            data={chartData}
            margin={{
              top: 5,
              right: 30,
              left: 20,
              bottom: 5,
            }}
          >
            <CartesianGrid strokeDasharray="3 3" stroke="#ddd" />
            <XAxis
              dataKey="name"
              axisLine={false}
              tick={{ fill: "#808080" }}
              tickLine={false}
              tickMargin={10}
          
            />
            <YAxis axisLine={false} tick={{ fill: "#808080" }} tickLine={false} tickMargin={20} />
            <Tooltip />
            <Legend
              align="center"
              verticalAlign="top"
              wrapperStyle={{ paddingTop: "10px", paddingBottom: "30px" }}
            />
            <Line
              type="monotone"
              dataKey="Follower"
              stroke="#680793ad"
              strokeWidth={2}
            />
            <Line type="monotone" dataKey="Income" stroke="#d42eeb" strokeWidth={2} />
          </LineChart> : null}
        </ResponsiveContainer>
    </div>
    </>
  );
};

export default FinanceChart;