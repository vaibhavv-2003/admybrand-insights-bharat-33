'use client';

import { motion } from 'framer-motion';
import {
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
  Tooltip,
  Legend
} from 'recharts';
import { ChannelData } from '@/lib/mockData';
import { cardAnimation } from '@/lib/animations';
import { formatLakhsCrores } from '@/lib/formatters';

interface ChannelDonutChartProps {
  data: ChannelData[];
  title?: string;
}

const CustomTooltip = ({ active, payload }: any) => {
  if (active && payload && payload.length) {
    const data = payload[0].payload;
    return (
      <div className="bg-card/80 backdrop-blur-lg border border-border rounded-lg p-3">
        <p className="text-foreground font-semibold mb-1">{data.name}</p>
        <p className="text-saffron text-sm">
          {formatLakhsCrores(data.value)} ({data.percentage}%)
        </p>
      </div>
    );
  }
  return null;
};

const CustomLegend = ({ payload }: any) => {
  return (
    <div className="grid grid-cols-2 gap-2 mt-4">
      {payload?.map((entry: any, index: number) => (
        <motion.div
          key={index}
          className="flex items-center space-x-2 p-2 rounded-lg bg-muted/20 hover:bg-muted/40 transition-colors"
          whileHover={{ scale: 1.02 }}
        >
          <div 
            className="w-3 h-3 rounded-full"
            style={{ backgroundColor: entry.color }}
          />
          <div className="flex-1 min-w-0">
            <p className="text-foreground text-xs font-medium truncate">
              {entry.value}
            </p>
            <p className="text-muted-foreground text-xs">
              {entry.payload?.percentage}%
            </p>
          </div>
        </motion.div>
      ))}
    </div>
  );
};

export default function ChannelDonutChart({ data, title = "Marketing Channels" }: ChannelDonutChartProps) {
  return (
    <motion.div
      className="card-glass rounded-xl p-6 backdrop-blur-lg border border-border col-span-full lg:col-span-1"
      initial={cardAnimation.initial}
      animate={cardAnimation.animate}
      transition={cardAnimation.transition}
    >
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg font-semibold text-foreground">{title}</h3>
        <div className="flex items-center space-x-2">
          <div className="w-3 h-3 bg-lotus rounded-full"></div>
          <span className="text-muted-foreground text-sm">Revenue Split</span>
        </div>
      </div>

      <div className="h-64 relative">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={data}
              cx="50%"
              cy="50%"
              innerRadius={60}
              outerRadius={90}
              paddingAngle={5}
              dataKey="value"
            >
              {data.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={entry.color} />
              ))}
            </Pie>
            <Tooltip content={<CustomTooltip />} />
          </PieChart>
        </ResponsiveContainer>
        
        {/* Center Statistics */}
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
          <div className="text-center">
            <p className="text-muted-foreground text-xs">Total</p>
            <p className="text-foreground text-lg font-bold">
              {formatLakhsCrores(data.reduce((sum, item) => sum + item.value, 0))}
            </p>
          </div>
        </div>
      </div>


      <CustomLegend payload={data.map((item, index) => ({
        value: item.name,
        color: item.color,
        payload: item
      }))} />

      <div className="mt-4 text-center">
        <p className="text-muted-foreground text-xs">
          Top Channel: <span className="text-saffron font-semibold">{data[0]?.name}</span>
        </p>
      </div>
    </motion.div>
  );
}