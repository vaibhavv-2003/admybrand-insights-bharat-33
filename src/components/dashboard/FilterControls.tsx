'use client';

import { useState } from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Search, Filter, X } from 'lucide-react';

interface FilterState {
  campaign: string;
  channel: string;
  city: string;
}

interface FilterControlsProps {
  onFilter: (filters: FilterState) => void;
  onClear: () => void;
}

export default function FilterControls({ onFilter, onClear }: FilterControlsProps) {
  const [filters, setFilters] = useState<FilterState>({
    campaign: '',
    channel: '',
    city: ''
  });

  const handleFilterChange = (key: keyof FilterState, value: string) => {
    const newFilters = { ...filters, [key]: value };
    setFilters(newFilters);
    onFilter(newFilters);
  };

  const handleClear = () => {
    const emptyFilters = { campaign: '', channel: '', city: '' };
    setFilters(emptyFilters);
    onClear();
  };

  const hasActiveFilters = Object.values(filters).some(value => value.length > 0);

  return (
    <div className="flex flex-col sm:flex-row gap-3 mb-4">
      <div className="relative flex-1">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
        <Input
          placeholder="Search campaigns..."
          value={filters.campaign}
          onChange={(e) => handleFilterChange('campaign', e.target.value)}
          className="pl-10"
        />
      </div>
      
      <div className="relative flex-1">
        <Filter className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
        <Input
          placeholder="Filter by channel..."
          value={filters.channel}
          onChange={(e) => handleFilterChange('channel', e.target.value)}
          className="pl-10"
        />
      </div>
      
      <div className="relative flex-1">
        <Filter className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
        <Input
          placeholder="Filter by city..."
          value={filters.city}
          onChange={(e) => handleFilterChange('city', e.target.value)}
          className="pl-10"
        />
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