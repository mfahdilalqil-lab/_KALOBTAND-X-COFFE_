'use client';

import { FaUsers, FaCoffee, FaChartLine } from 'react-icons/fa';

export function StatsCards() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
      <StatCard
        icon={<FaUsers className="text-blue-400" />}
        title="Total Customers"
        value="1,287"
        change="+12% from last month"
        bg="bg-gray-800/50"
      />
      <StatCard
        icon={<FaCoffee className="text-amber-400" />}
        title="Orders This Week"
        value="243"
        change="+8% from last week"
        bg="bg-gray-800/50"
      />
      <StatCard
        icon={<FaChartLine className="text-emerald-400" />}
        title="Avg. Rating"
        value="4.9"
        change="⭐️ 4.9/5 (217 reviews)"
        bg="bg-gray-800/50"
      />
    </div>
  );
}

function StatCard({
  icon,
  title,
  value,
  change,
  bg,
}: {
  icon: React.ReactNode;
  title: string;
  value: string;
  change: string;
  bg: string;
}) {
  return (
    <div className={`${bg} rounded-xl p-6 border border-gray-700 transition-all hover:border-[#C76B4C]`}>
      <div className="flex items-center justify-between">
        <div>
          <p className="text-gray-400 text-sm">{title}</p>
          <p className="text-2xl font-bold mt-1">{value}</p>
          <p className="text-green-400 text-sm mt-1">{change}</p>
        </div>
        <div className="p-3 bg-gray-900 rounded-lg">
          {icon}
        </div>
      </div>
    </div>
  );
                }
