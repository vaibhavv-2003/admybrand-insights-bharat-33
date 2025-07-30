'use client';

import { motion } from 'framer-motion';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Cell
} from 'recharts';
import { RegionalData } from '@/lib/mockData';
import { cardAnimation } from '@/lib/animations';
import { formatLakhsCrores } from '@/lib/formatters';

interface RegionalBarChartProps {
  data: RegionalData[];
  title?: string;
}

const CustomTooltip = ({ active, payload, label }: any) => {
  if (active && payload && payload.length) {
    const data = payload[0].payload;
    return (
      <div className="bg-card/80 backdrop-blur-lg border border-border rounded-lg p-3">
        <p className="text-foreground font-semibold mb-2">{label}</p>
        <div className="space-y-1">
          <p className="text-saffron text-sm">
            Revenue: {formatLakhsCrores(data.revenue)}
          </p>
          <p className="text-emerald text-sm">
            Users: {data.users.toLocaleString('en-IN')}
          </p>
          <p className="text-lotus text-sm">
            Conversions: {data.conversions}
          </p>
        </div>
      </div>
    );
  }
  return null;
};

const colors = ['#FF9933', '#E0115F', '#046A38', '#FF6B35', '#4338CA', '#7C3AED', '#DC2626', '#059669'];

export default function RegionalBarChart({ data, title = "Regional Performance" }: RegionalBarChartProps) {
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
          <div className="w-3 h-3 bg-emerald rounded-full"></div>
          <span className="text-muted-foreground text-sm">City Revenue</span>
        </div>
      </div>

      <div className="h-80">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart 
            data={data} 
            margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
          >
            <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
            <XAxis 
              dataKey="city" 
              stroke="hsl(var(--foreground))"
              fontSize={12}
              angle={-45}
              textAnchor="end"
              height={80}
            />
            <YAxis 
              stroke="hsl(var(--foreground))"
              fontSize={12}
              tickFormatter={(value) => formatLakhsCrores(value)}
            />
            <Tooltip content={<CustomTooltip />} />
            <Bar 
              dataKey="revenue" 
              radius={[4, 4, 0, 0]}
              opacity={0.8}
            >
              {data.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={colors[index % colors.length]} />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>

      <div className="mt-4 grid grid-cols-3 gap-4 text-center">
        <div>
          <p className="text-muted-foreground text-xs">Top City</p>
          <p className="text-foreground font-semibold">Mumbai</p>
        </div>
        <div>
          <p className="text-muted-foreground text-xs">Total Cities</p>
          <p className="text-foreground font-semibold">{data.length}</p>
        </div>
        <div>
          <p className="text-muted-foreground text-xs">Combined Revenue</p>
          <p className="text-emerald font-semibold">
            {formatLakhsCrores(data.reduce((sum, item) => sum + item.revenue, 0))}
          </p>
        </div>
      </div>
    </motion.div>
  );
}