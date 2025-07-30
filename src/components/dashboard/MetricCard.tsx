'use client';

import { motion } from 'framer-motion';
import { TrendingUp, TrendingDown } from 'lucide-react';
import { MetricData } from '@/lib/mockData';
import { hoverAnimation, tapAnimation, scaleIn } from '@/lib/animations';
import { getGrowthColor } from '@/lib/formatters';

interface MetricCardProps {
  metric: MetricData;
  index: number;
}

export default function MetricCard({ metric, index }: MetricCardProps) {
  const isPositive = metric.delta.startsWith('+');
  
  const colorClasses = {
    saffron: 'from-saffron/20 to-saffron/5',
    lotus: 'from-lotus/20 to-lotus/5',
    emerald: 'from-emerald/20 to-emerald/5',
    primary: 'from-primary/20 to-primary/5'
  };

  const iconClasses = {
    saffron: 'text-saffron',
    lotus: 'text-lotus',
    emerald: 'text-emerald',
    primary: 'text-primary'
  };

  return (
    <motion.div
      className={`
        relative overflow-hidden rounded-xl p-6 
        bg-gradient-to-br ${colorClasses[metric.color]}
        backdrop-blur-lg border border-border
        metric-card group cursor-pointer
      `}
      {...scaleIn}
      {...hoverAnimation}
      {...tapAnimation}
      transition={{ delay: index * 0.1 }}
    >
      {/* Background glow effect */}
      <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-32 h-32 bg-gradient-to-r from-saffron/30 to-lotus/30 rounded-full blur-3xl" />
      </div>

      <div className="relative z-10">
        <div className="flex items-center justify-between mb-4">
          <div className={`text-2xl ${iconClasses[metric.color]}`}>
            {metric.icon}
          </div>
          <div className={`flex items-center space-x-1 ${getGrowthColor(metric.delta)}`}>
            {isPositive ? (
              <TrendingUp className="h-4 w-4" />
            ) : (
              <TrendingDown className="h-4 w-4" />
            )}
            <span className="text-sm font-medium">{metric.delta}</span>
          </div>
        </div>

        <div className="space-y-1">
          <h3 className="text-muted-foreground text-sm font-medium">
            {metric.title}
          </h3>
          <p className="text-foreground text-2xl font-bold tracking-tight">
            {metric.value}
          </p>
        </div>

        {/* Animated border */}
        <motion.div 
          className="absolute inset-0 rounded-xl border-2 border-transparent"
          animate={{
            borderColor: [
              'rgba(255, 153, 51, 0)',
              'rgba(255, 153, 51, 0.5)',
              'rgba(255, 153, 51, 0)'
            ]
          }}
          transition={{
            duration: 3,
            repeat: Infinity,
            ease: 'easeInOut'
          }}
        />
      </div>
    </motion.div>
  );
}