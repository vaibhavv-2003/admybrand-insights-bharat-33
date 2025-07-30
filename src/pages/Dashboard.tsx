'use client';

import { useEffect, useState, Suspense } from 'react';
import { motion } from 'framer-motion';
import ParticleBackground from '@/components/dashboard/ParticleBackground';
import Header from '@/components/dashboard/Header';
import MetricGrid from '@/components/dashboard/MetricGrid';
import AnimatedLineChart from '@/components/dashboard/AnimatedLineChart';
import RegionalBarChart from '@/components/dashboard/RegionalBarChart';
import ChannelDonutChart from '@/components/dashboard/ChannelDonutChart';
import DataTable from '@/components/dashboard/DataTable';
import LoadingSpinner from '@/components/dashboard/LoadingSpinner';
import ErrorBoundary from '@/components/dashboard/ErrorBoundary';
import {
  metricsData,
  revenueData,
  channelData,
  regionalData,
  campaignData,
  generateRealtimeData,
  MetricData
} from '@/lib/mockData';
import { formatLakhsCrores, formatIndianNumber, formatPercentage } from '@/lib/formatters';

export default function Dashboard() {
  const [realTimeMetrics, setRealTimeMetrics] = useState(metricsData);

  // Real-time data simulation
  useEffect(() => {
    const interval = setInterval(() => {
      const newData = generateRealtimeData();
      setRealTimeMetrics([
        {
          ...metricsData[0],
          value: formatLakhsCrores(newData.revenue),
        },
        {
          ...metricsData[1],
          value: formatIndianNumber(newData.users),
        },
        {
          ...metricsData[2],
          value: newData.conversions.toString(),
        },
        {
          ...metricsData[3],
          value: formatPercentage(newData.growth),
        }
      ]);
    }, 5000); // Update every 5 seconds

    return () => clearInterval(interval);
  }, []);

  return (
    <ErrorBoundary>
      <div className="min-h-screen bg-background relative">
        <Suspense fallback={<LoadingSpinner />}>
          <ParticleBackground />
        </Suspense>
        
        <div className="relative z-10">
          <Header title="ADmyBRAND Insights" withModeToggle />
          
          <div className="p-6 space-y-8">
            {/* Real-time Metrics */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6 }}
            >
              <MetricGrid data={realTimeMetrics} />
            </motion.div>

            {/* Charts Section */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              <motion.div
                initial={{ opacity: 0, x: -50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
              >
                <AnimatedLineChart data={revenueData} />
              </motion.div>

              <motion.div
                initial={{ opacity: 0, x: 50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 0.3 }}
              >
                <RegionalBarChart data={regionalData} />
              </motion.div>
            </div>

            {/* Channel Performance */}
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
            >
              <ChannelDonutChart data={channelData} />
            </motion.div>

            {/* Data Table */}
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.5 }}
            >
              <DataTable data={campaignData} />
            </motion.div>

            {/* Footer */}
            <motion.footer 
              className="text-center py-8 text-foreground/50"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.6 }}
            >
              <div className="flex items-center justify-center space-x-4 mb-4">
                <div className="w-2 h-2 bg-emerald rounded-full animate-pulse"></div>
                <span className="text-sm">Live Dashboard - Updates every 5 seconds</span>
              </div>
              <p className="text-xs">
                © 2024 ADmyBRAND Insights. Empowering Indian Digital Marketing.
              </p>
            </motion.footer>
          </div>
        </div>
      </div>
    </ErrorBoundary>
  );
}