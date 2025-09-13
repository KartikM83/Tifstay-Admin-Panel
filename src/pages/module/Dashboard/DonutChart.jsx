// DonutChart.jsx
import React from "react";
import { IoEllipseSharp } from "react-icons/io5";
import { PieChart, Pie, Cell, Tooltip, Legend } from "recharts";

const COLORS = ["#7987FF", "#A155B9", "#FF6B6B", "#FFA94D"];


const renderCustomLabel = ({ cx, cy, midAngle, innerRadius, outerRadius, value }) => {
  const RADIAN = Math.PI / 180;
  const radius = innerRadius + (outerRadius - innerRadius) / 2;
  const x = cx + radius * Math.cos(-midAngle * RADIAN);
  const y = cy + radius * Math.sin(-midAngle * RADIAN);

  return (
    <text
      x={x}
      y={y}
      fill="white"
      textAnchor="middle"
      dominantBaseline="central"
      fontSize={12}
    >
      {value}
    </text>
  );
};

const DonutChart = ({ data, title, total }) => {
  return (
    <div className="flex flex-col h-full w-full">
      <div className="text-left">
        <h3 className="text-[16px] font-medium text-black">{title}</h3>
        <p className="text-[14px] text-gray-600">{total} Orders</p>
      </div>

    <div className="flex items-center  gap-10 ">
     <PieChart width={150} height={200}>
        <Pie
          data={data}
          cx="50%"
          cy="50%"
          innerRadius={50}
          outerRadius={75}
          dataKey="value"
          label={renderCustomLabel}
          labelLine={false}   
        >
          {data.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
          ))}
        </Pie>
        <Tooltip />
      </PieChart>

<div className="flex flex-col">

  {
    data.map((entry,index)=>(
      <span className="flex items-center gap-2 text-[12px]"><IoEllipseSharp style={{ color: COLORS[index % COLORS.length] }}/> {entry.name}</span>

    ))
  }

  
      </div>
      
          


    </div>
      
 

      <div className="w-full flex justify-center">
        <Legend />
      </div>

    </div>
  );
};

export default DonutChart;
