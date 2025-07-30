// Mock data for Indian digital marketing analytics dashboard

export interface MetricData {
  id: string;
  title: string;
  value: string;
  delta: string;
  icon: string;
  trend: 'up' | 'down';
  color: 'saffron' | 'lotus' | 'emerald' | 'primary';
}

export interface ChartDataPoint {
  month: string;
  value: number;
  formatted?: string;
}

export interface ChannelData {
  name: string;
  value: number;
  percentage: number;
  color: string;
}

export interface RegionalData {
  city: string;
  revenue: number;
  users: number;
  conversions: number;
}

export interface CampaignData {
  id: string;
  campaign: string;
  channel: string;
  city: string;
  clicks: number;
  cost: number;
  conversions: number;
  revenue: number;
  roi: number;
  status: 'active' | 'paused' | 'completed';
}

// Metrics data with Indian formatting
export const metricsData: MetricData[] = [
  {
    id: 'revenue',
    title: 'Total Revenue',
    value: '₹42,80,000',
    delta: '+12.3%',
    icon: '₹',
    trend: 'up',
    color: 'saffron'
  },
  {
    id: 'users',
    title: 'Active Users',
    value: '12,890',
    delta: '+8.4%',
    icon: '👥',
    trend: 'up',
    color: 'emerald'
  },
  {
    id: 'conversions',
    title: 'Conversions',
    value: '892',
    delta: '+5.7%',
    icon: '🔄',
    trend: 'up',
    color: 'lotus'
  },
  {
    id: 'growth',
    title: 'Growth Rate',
    value: '18.2%',
    delta: '+3.1%',
    icon: '📈',
    trend: 'up',
    color: 'primary'
  }
];

// Revenue trend data (12 months)
export const revenueData: ChartDataPoint[] = [
  { month: 'Jan', value: 2800000, formatted: '₹28,00,000' },
  { month: 'Feb', value: 3200000, formatted: '₹32,00,000' },
  { month: 'Mar', value: 3600000, formatted: '₹36,00,000' },
  { month: 'Apr', value: 3100000, formatted: '₹31,00,000' },
  { month: 'May', value: 3800000, formatted: '₹38,00,000' },
  { month: 'Jun', value: 4200000, formatted: '₹42,00,000' },
  { month: 'Jul', value: 4500000, formatted: '₹45,00,000' },
  { month: 'Aug', value: 4100000, formatted: '₹41,00,000' },
  { month: 'Sep', value: 4600000, formatted: '₹46,00,000' },
  { month: 'Oct', value: 4900000, formatted: '₹49,00,000' },
  { month: 'Nov', value: 5200000, formatted: '₹52,00,000' },
  { month: 'Dec', value: 4800000, formatted: '₹48,00,000' }
];

// Marketing channel breakdown
export const channelData: ChannelData[] = [
  { name: 'Google Ads', value: 1580000, percentage: 37, color: '#FF9933' },
  { name: 'Facebook Ads', value: 1280000, percentage: 30, color: '#E0115F' },
  { name: 'Instagram', value: 850000, percentage: 20, color: '#046A38' },
  { name: 'YouTube', value: 340000, percentage: 8, color: '#FF6B35' },
  { name: 'LinkedIn', value: 210000, percentage: 5, color: '#4338CA' }
];

// Regional performance data (major Indian cities)
export const regionalData: RegionalData[] = [
  { city: 'Mumbai', revenue: 1200000, users: 3500, conversions: 245 },
  { city: 'Delhi', revenue: 1050000, users: 3200, conversions: 220 },
  { city: 'Bangalore', revenue: 980000, users: 2800, conversions: 195 },
  { city: 'Chennai', revenue: 750000, users: 2200, conversions: 165 },
  { city: 'Hyderabad', revenue: 650000, users: 1900, conversions: 140 },
  { city: 'Pune', revenue: 480000, users: 1400, conversions: 98 },
  { city: 'Kolkata', revenue: 420000, users: 1200, conversions: 85 },
  { city: 'Ahmedabad', revenue: 380000, users: 1100, conversions: 75 }
];

// Campaign performance data
export const campaignData: CampaignData[] = [
  {
    id: 'c1',
    campaign: 'Diwali Festival Sale',
    channel: 'Google Ads',
    city: 'Mumbai',
    clicks: 15400,
    cost: 125000,
    conversions: 310,
    revenue: 780000,
    roi: 524,
    status: 'active'
  },
  {
    id: 'c2',
    campaign: 'Holi Color Collection',
    channel: 'Facebook Ads',
    city: 'Delhi',
    clicks: 12800,
    cost: 98000,
    conversions: 256,
    revenue: 640000,
    roi: 553,
    status: 'completed'
  },
  {
    id: 'c3',
    campaign: 'Monsoon Special Offer',
    channel: 'Instagram',
    city: 'Bangalore',
    clicks: 11200,
    cost: 85000,
    conversions: 189,
    revenue: 475000,
    roi: 459,
    status: 'active'
  },
  {
    id: 'c4',
    campaign: 'Cricket World Cup Promo',
    channel: 'YouTube',
    city: 'Chennai',
    clicks: 9800,
    cost: 72000,
    conversions: 145,
    revenue: 362000,
    roi: 403,
    status: 'paused'
  },
  {
    id: 'c5',
    campaign: 'Independence Day Sale',
    channel: 'Google Ads',
    city: 'Hyderabad',
    clicks: 8600,
    cost: 68000,
    conversions: 132,
    revenue: 330000,
    roi: 385,
    status: 'active'
  },
  {
    id: 'c6',
    campaign: 'Ganesh Chaturthi Special',
    channel: 'Facebook Ads',
    city: 'Pune',
    clicks: 7400,
    cost: 58000,
    conversions: 118,
    revenue: 295000,
    roi: 409,
    status: 'completed'
  },
  {
    id: 'c7',
    campaign: 'Karva Chauth Collection',
    channel: 'Instagram',
    city: 'Kolkata',
    clicks: 6200,
    cost: 45000,
    conversions: 89,
    revenue: 222000,
    roi: 393,
    status: 'active'
  },
  {
    id: 'c8',
    campaign: 'Navratri Fashion Week',
    channel: 'LinkedIn',
    city: 'Ahmedabad',
    clicks: 5800,
    cost: 42000,
    conversions: 76,
    revenue: 190000,
    roi: 352,
    status: 'active'
  },
  {
    id: 'c9',
    campaign: 'Wedding Season Jewelry',
    channel: 'Google Ads',
    city: 'Mumbai',
    clicks: 13200,
    cost: 110000,
    conversions: 287,
    revenue: 715000,
    roi: 550,
    status: 'active'
  },
  {
    id: 'c10',
    campaign: 'Tech Conference B2B',
    channel: 'LinkedIn',
    city: 'Bangalore',
    clicks: 4200,
    cost: 35000,
    conversions: 58,
    revenue: 145000,
    roi: 314,
    status: 'completed'
  }
];

// Real-time simulation data
export const generateRealtimeData = () => {
  const variance = 0.1; // 10% variance
  return {
    revenue: Math.floor(4280000 * (1 + (Math.random() - 0.5) * variance)),
    users: Math.floor(12890 * (1 + (Math.random() - 0.5) * variance)),
    conversions: Math.floor(892 * (1 + (Math.random() - 0.5) * variance)),
    growth: Number((18.2 * (1 + (Math.random() - 0.5) * variance)).toFixed(1))
  };
};