import React from 'react';
import { NutritionData } from '../types';
import { 
  FlameIcon, 
  ProteinIcon, 
  CarbsIcon, 
  FatIcon, 
  FiberIcon, 
  SugarIcon, 
  InfoIcon 
} from './Icons';
import MacroChart from './MacroChart';

interface NutritionCardProps {
  data: NutritionData;
}

const NutritionCard: React.FC<NutritionCardProps> = ({ data }) => {
  return (
    <div className="w-full max-w-4xl mx-auto animate-fade-in-up">
      {/* Header Section */}
      <div className="bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden mb-6">
        <div className="bg-gradient-to-r from-emerald-500 to-teal-600 p-6 text-white">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <div>
              <h2 className="text-3xl font-bold capitalize">{data.foodName}</h2>
              <p className="opacity-90 mt-1 text-sm font-medium">Serving Size: {data.servingSize}</p>
            </div>
            <div className="flex items-center gap-2 bg-white/20 px-4 py-2 rounded-lg backdrop-blur-sm">
              <FlameIcon className="w-6 h-6 text-white" />
              <span className="text-2xl font-bold">{data.calories}</span>
              <span className="text-sm font-medium opacity-90">kcal</span>
            </div>
          </div>
        </div>

        {/* Content Section */}
        <div className="p-6">
            
            {/* Health Tip */}
            <div className="mb-8 bg-blue-50 border border-blue-100 rounded-xl p-4 flex items-start gap-3">
                <InfoIcon className="w-5 h-5 text-blue-500 flex-shrink-0 mt-0.5" />
                <p className="text-blue-800 text-sm leading-relaxed">{data.healthTip}</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
                {/* Chart Column */}
                <div className="flex flex-col items-center justify-center p-4 bg-gray-50 rounded-xl border border-gray-100">
                    <h3 className="text-gray-500 font-semibold mb-2 text-sm uppercase tracking-wide">Macro Distribution</h3>
                    <MacroChart data={data} />
                </div>

                {/* Grid Stats Column */}
                <div className="grid grid-cols-2 gap-4">
                    <StatItem 
                        icon={<ProteinIcon className="w-5 h-5 text-blue-500" />}
                        label="Protein"
                        value={data.protein}
                        unit="g"
                        colorClass="bg-blue-50 text-blue-700"
                    />
                    <StatItem 
                        icon={<CarbsIcon className="w-5 h-5 text-emerald-500" />}
                        label="Carbs"
                        value={data.carbs}
                        unit="g"
                        colorClass="bg-emerald-50 text-emerald-700"
                    />
                    <StatItem 
                        icon={<FatIcon className="w-5 h-5 text-amber-500" />}
                        label="Fat"
                        value={data.fat}
                        unit="g"
                        colorClass="bg-amber-50 text-amber-700"
                    />
                    <StatItem 
                        icon={<FiberIcon className="w-5 h-5 text-green-600" />}
                        label="Fiber"
                        value={data.fiber}
                        unit="g"
                        colorClass="bg-green-50 text-green-800"
                    />
                    <StatItem 
                        icon={<SugarIcon className="w-5 h-5 text-rose-500" />}
                        label="Sugar"
                        value={data.sugar}
                        unit="g"
                        colorClass="bg-rose-50 text-rose-700"
                    />
                     <div className="flex flex-col p-4 rounded-xl bg-gray-50 text-gray-600">
                        <span className="text-xs font-semibold uppercase tracking-wider mb-1 opacity-70">Ratio</span>
                        <span className="text-xl font-bold">
                            {data.protein + data.carbs + data.fat > 0 
                             ? `${Math.round((data.protein / (data.protein + data.carbs + data.fat)) * 100)}% P`
                             : '-'}
                        </span>
                        <span className="text-xs text-gray-400">Protein Density</span>
                    </div>
                </div>
            </div>
        </div>
      </div>
    </div>
  );
};

const StatItem = ({ 
    icon, 
    label, 
    value, 
    unit, 
    colorClass 
}: { 
    icon: React.ReactNode; 
    label: string; 
    value: number; 
    unit: string; 
    colorClass: string; 
}) => (
    <div className={`flex flex-col p-4 rounded-xl ${colorClass} transition-all duration-200 hover:scale-[1.02]`}>
        <div className="flex items-center gap-2 mb-2">
            {icon}
            <span className="text-xs font-semibold uppercase tracking-wider opacity-70">{label}</span>
        </div>
        <div className="flex items-baseline gap-1">
            <span className="text-2xl font-bold">{value}</span>
            <span className="text-sm font-medium opacity-80">{unit}</span>
        </div>
    </div>
);

export default NutritionCard;