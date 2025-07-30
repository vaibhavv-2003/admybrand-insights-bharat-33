// Indian number formatting utilities

export const formatIndianCurrency = (amount: number): string => {
  const formatter = new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  });
  
  return formatter.format(amount);
};

export const formatIndianNumber = (num: number): string => {
  return new Intl.NumberFormat('en-IN').format(num);
};

export const formatLakhsCrores = (amount: number): string => {
  if (amount >= 10000000) {
    const crores = amount / 10000000;
    return `₹${crores.toFixed(1)} Cr`;
  } else if (amount >= 100000) {
    const lakhs = amount / 100000;
    return `₹${lakhs.toFixed(1)} L`;
  } else if (amount >= 1000) {
    const thousands = amount / 1000;
    return `₹${thousands.toFixed(1)} K`;
  }
  return `₹${amount.toLocaleString('en-IN')}`;
};

export const formatPercentage = (value: number): string => {
  return `${value.toFixed(1)}%`;
};

export const formatCompactNumber = (num: number): string => {
  if (num >= 1000000) {
    return `${(num / 1000000).toFixed(1)}M`;
  } else if (num >= 1000) {
    return `${(num / 1000).toFixed(1)}K`;
  }
  return num.toString();
};

export const calculateROI = (revenue: number, cost: number): number => {
  return Math.round(((revenue - cost) / cost) * 100);
};

export const getGrowthColor = (delta: string): string => {
  const isPositive = delta.startsWith('+');
  return isPositive ? 'text-emerald' : 'text-red-500';
};

export const getStatusColor = (status: string): string => {
  switch (status) {
    case 'active':
      return 'bg-emerald text-white';
    case 'paused':
      return 'bg-orange-500 text-white';
    case 'completed':
      return 'bg-gray-500 text-white';
    default:
      return 'bg-gray-300 text-gray-800';
  }
};