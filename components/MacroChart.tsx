import React from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer, Legend, Tooltip } from 'recharts';
import { NutritionData, MacroDataPoint } from '../types';

interface MacroChartProps {
  data: NutritionData;
}

const MacroChart: React.FC<MacroChartProps> = ({ data }) => {
  const chartData: MacroDataPoint[] = [
    { name: 'Protein', value: data.protein, fill: '#3b82f6' }, // Blue
    { name: 'Carbs', value: data.carbs, fill: '#10b981' },   // Green
    { name: 'Fat', value: data.fat, fill: '#f59e0b' },     // Amber
  ];

  // If total is 0 (e.g. water), handle gracefully
  const totalMacros = data.protein + data.carbs + data.fat;

  if (totalMacros === 0) {
    return (
      <div className="h-64 flex items-center justify-center text-gray-400 bg-gray-50 rounded-xl">
        No significant macros
      </div>
    );
  }

  return (
    <div className="h-64 w-full">
      <ResponsiveContainer width="100%" height="100%">
        <PieChart>
          <Pie
            data={chartData}
            cx="50%"
            cy="50%"
            innerRadius={60}
            outerRadius={80}
            paddingAngle={5}
            dataKey="value"
          >
            {chartData.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={entry.fill} strokeWidth={0} />
            ))}
          </Pie>
          <Tooltip 
            formatter={(value: number) => [`${value}g`, '']}
            contentStyle={{ backgroundColor: '#fff', borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
            itemStyle={{ color: '#374151', fontWeight: 600 }}
          />
          <Legend 
            verticalAlign="bottom" 
            height={36} 
            iconType="circle"
          />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
};

export default MacroChart;