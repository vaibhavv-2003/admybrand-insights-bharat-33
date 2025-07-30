'use client';

import { motion } from 'framer-motion';
import MetricCard from './MetricCard';
import { MetricData } from '@/lib/mockData';
import { staggerContainer } from '@/lib/animations';

interface MetricGridProps {
  data: MetricData[];
}

export default function MetricGrid({ data }: MetricGridProps) {
  return (
    <motion.div
      className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
      variants={staggerContainer}
      initial="initial"
      animate="animate"
    >
      {data.map((metric, index) => (
        <MetricCard key={metric.id} metric={metric} index={index} />
      ))}
    </motion.div>
  );
}