'use client';

import { motion } from 'framer-motion';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Area,
  AreaChart
} from 'recharts';
import { ChartDataPoint } from '@/lib/mockData';
import { cardAnimation } from '@/lib/animations';
import { formatLakhsCrores } from '@/lib/formatters';

interface AnimatedLineChartProps {
  data: ChartDataPoint[];
  title?: string;
}

const CustomTooltip = ({ active, payload, label }: any) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-card/80 backdrop-blur-lg border border-border rounded-lg p-3">
        <p className="text-muted-foreground text-sm">{label}</p>
        <p className="text-saffron font-bold">
          {formatLakhsCrores(payload[0].value)}
        </p>
      </div>
    );
  }
  return null;
};

export default function AnimatedLineChart({ data, title = "Revenue Trend" }: AnimatedLineChartProps) {
  return (
    <motion.div
      className="card-glass rounded-xl p-6 backdrop-blur-lg border border-border"
      initial={cardAnimation.initial}
      animate={cardAnimation.animate}
      transition={cardAnimation.transition}
    >
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg font-semibold text-foreground">{title}</h3>
        <div className="flex items-center space-x-2">
          <div className="w-3 h-3 bg-saffron rounded-full"></div>
          <span className="text-muted-foreground text-sm">Monthly Revenue</span>
        </div>
      </div>

      <div className="h-80">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={data} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
            <defs>
              <linearGradient id="revenueGradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#FF9933" stopOpacity={0.8}/>
                <stop offset="95%" stopColor="#FF9933" stopOpacity={0.1}/>
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
            <XAxis 
              dataKey="month" 
              stroke="hsl(var(--foreground))"
              fontSize={12}
            />
            <YAxis 
              stroke="hsl(var(--foreground))"
              fontSize={12}
              tickFormatter={(value) => formatLakhsCrores(value)}
            />
            <Tooltip content={<CustomTooltip />} />
            <Area
              type="monotone"
              dataKey="value"
              stroke="#FF9933"
              strokeWidth={3}
              fill="url(#revenueGradient)"
              dot={{ fill: '#FF9933', strokeWidth: 2, r: 4 }}
              activeDot={{ r: 6, stroke: '#FF9933', strokeWidth: 2 }}
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>

      <div className="mt-4 grid grid-cols-3 gap-4 text-center">
        <div>
          <p className="text-muted-foreground text-xs">Peak Month</p>
          <p className="text-foreground font-semibold">Nov</p>
        </div>
        <div>
          <p className="text-muted-foreground text-xs">Average</p>
          <p className="text-foreground font-semibold">₹41.2L</p>
        </div>
        <div>
          <p className="text-muted-foreground text-xs">Growth</p>
          <p className="text-emerald font-semibold">+18.2%</p>
        </div>
      </div>
    </motion.div>
  );
}