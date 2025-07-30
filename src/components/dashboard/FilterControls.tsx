'use client';

import { useState } from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Search, X } from 'lucide-react';

interface FilterState {
  campaign: string;
  channel: string;
  city: string;
}

interface FilterControlsProps {
  onFilter: (filters: FilterState) => void;
  onClear: () => void;
}

// Available filter options based on mock data
const channelOptions = [
  'Google Ads',
  'Facebook Ads', 
  'Instagram',
  'YouTube',
  'LinkedIn'
];

const cityOptions = [
  'Mumbai',
  'Delhi',
  'Bangalore',
  'Chennai',
  'Hyderabad',
  'Pune',
  'Kolkata',
  'Ahmedabad'
];

export default function FilterControls({ onFilter, onClear }: FilterControlsProps) {
  const [filters, setFilters] = useState<FilterState>({
    campaign: '',
    channel: 'all',
    city: 'all'
  });

  const handleFilterChange = (key: keyof FilterState, value: string) => {
    const newFilters = { ...filters, [key]: value };
    setFilters(newFilters);
    onFilter(newFilters);
  };

  const handleClear = () => {
    const emptyFilters = { campaign: '', channel: 'all', city: 'all' };
    setFilters(emptyFilters);
    onClear();
  };

  const hasActiveFilters = Object.values(filters).some(value => value.length > 0);

  return (
    <div className="flex flex-col sm:flex-row gap-3 mb-4">
      <div className="relative flex-1">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4 z-10" />
        <Input
          placeholder="Search campaigns..."
          value={filters.campaign}
          onChange={(e) => handleFilterChange('campaign', e.target.value)}
          className="pl-10"
        />
      </div>
      
      <div className="flex-1">
        <Select
          value={filters.channel}
          onValueChange={(value) => handleFilterChange('channel', value)}
        >
          <SelectTrigger className="w-full bg-background border-border">
            <SelectValue placeholder="Filter by channel..." />
          </SelectTrigger>
          <SelectContent className="bg-background border-border z-50">
            <SelectItem value="all" className="text-muted-foreground">All Channels</SelectItem>
            {channelOptions.map((channel) => (
              <SelectItem key={channel} value={channel} className="text-foreground">
                {channel}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
      
      <div className="flex-1">
        <Select
          value={filters.city}
          onValueChange={(value) => handleFilterChange('city', value)}
        >
          <SelectTrigger className="w-full bg-background border-border">
            <SelectValue placeholder="Filter by city..." />
          </SelectTrigger>
          <SelectContent className="bg-background border-border z-50">
            <SelectItem value="all" className="text-muted-foreground">All Cities</SelectItem>
            {cityOptions.map((city) => (
              <SelectItem key={city} value={city} className="text-foreground">
                {city}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
      
      {hasActiveFilters && (
        <Button
          variant="outline"
          onClick={handleClear}
          className="whitespace-nowrap"
        >
          <X className="h-4 w-4 mr-2" />
          Clear
        </Button>
      )}
    </div>
  );
}