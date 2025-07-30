// Simple chart components without the complex shadcn chart issues
import React from 'react';

export interface ChartConfig {
  [key: string]: {
    label?: string;
    color?: string;
  };
}

interface ChartContainerProps {
  children: React.ReactNode;
  config: ChartConfig;
  className?: string;
}

export function ChartContainer({ children, config, className }: ChartContainerProps) {
  return (
    <div className={className}>
      {children}
    </div>
  );
}

interface ChartTooltipProps {
  active?: boolean;
  payload?: any[];
  label?: string;
  children?: React.ReactNode;
}

export function ChartTooltip({ children }: ChartTooltipProps) {
  return <>{children}</>;
}

interface ChartTooltipContentProps {
  className?: string;
  children?: React.ReactNode;
}

export function ChartTooltipContent({ className, children }: ChartTooltipContentProps) {
  return (
    <div className={className}>
      {children}
    </div>
  );
}