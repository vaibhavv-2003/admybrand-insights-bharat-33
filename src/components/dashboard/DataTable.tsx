'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { CampaignData } from '@/lib/mockData';
import { formatIndianCurrency, formatIndianNumber, getStatusColor } from '@/lib/formatters';
import { Download, ChevronUp, ChevronDown } from 'lucide-react';
import { exportToCSV, exportToPDF } from '@/lib/exportUtils';
import FilterControls from './FilterControls';

interface DataTableProps {
  data: CampaignData[];
}

export default function DataTable({ data }: DataTableProps) {
  const [filteredData, setFilteredData] = useState(data);
  const [sortConfig, setSortConfig] = useState<{
    key: keyof CampaignData | null;
    direction: 'asc' | 'desc';
  }>({ key: null, direction: 'asc' });
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  const handleFilter = (filters: { campaign: string; channel: string; city: string }) => {
    const filtered = data.filter(item =>
      item.campaign.toLowerCase().includes(filters.campaign.toLowerCase()) &&
      (filters.channel === 'all' || item.channel.toLowerCase().includes(filters.channel.toLowerCase())) &&
      (filters.city === 'all' || item.city.toLowerCase().includes(filters.city.toLowerCase()))
    );
    setFilteredData(filtered);
    setCurrentPage(1);
  };

  const handleClearFilters = () => {
    setFilteredData(data);
    setCurrentPage(1);
  };

  const handleSort = (key: keyof CampaignData) => {
    let direction: 'asc' | 'desc' = 'asc';
    if (sortConfig.key === key && sortConfig.direction === 'asc') {
      direction = 'desc';
    }
    setSortConfig({ key, direction });

    const sorted = [...filteredData].sort((a, b) => {
      if (a[key] < b[key]) return direction === 'asc' ? -1 : 1;
      if (a[key] > b[key]) return direction === 'asc' ? 1 : -1;
      return 0;
    });
    setFilteredData(sorted);
  };

  const getSortIcon = (key: keyof CampaignData) => {
    if (sortConfig.key !== key) return null;
    return sortConfig.direction === 'asc' ? 
      <ChevronUp className="h-4 w-4" /> : 
      <ChevronDown className="h-4 w-4" />;
  };

  const paginatedData = filteredData.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const totalPages = Math.ceil(filteredData.length / itemsPerPage);

  return (
    <motion.div
      className="card-glass rounded-xl p-6 backdrop-blur-lg border border-white/10"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
    >
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-4">
        <h3 className="text-lg font-semibold text-foreground">Campaign Performance</h3>
        
        <div className="flex gap-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => exportToCSV(filteredData)}
            className="text-foreground bg-background border-border hover:bg-muted"
          >
            <Download className="h-4 w-4 mr-2" />
            CSV
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={() => exportToPDF(filteredData)}
            className="text-foreground bg-background border-border hover:bg-muted"
          >
            <Download className="h-4 w-4 mr-2" />
            PDF
          </Button>
        </div>
      </div>

      <FilterControls onFilter={handleFilter} onClear={handleClearFilters} />

      <div className="overflow-x-auto">
        <Table className="border border-border">
          <TableHeader className="bg-muted">
            <TableRow>
              {[
                { key: 'campaign', label: 'Campaign' },
                { key: 'channel', label: 'Channel' },
                { key: 'city', label: 'City' },
                { key: 'clicks', label: 'Clicks' },
                { key: 'cost', label: 'Cost' },
                { key: 'conversions', label: 'Conversions' },
                { key: 'revenue', label: 'Revenue' },
                { key: 'roi', label: 'ROI %' },
                { key: 'status', label: 'Status' }
              ].map(({ key, label }) => (
                <TableHead
                  key={key}
                  className="text-foreground font-medium cursor-pointer hover:bg-muted/80 transition-colors"
                  onClick={() => handleSort(key as keyof CampaignData)}
                >
                  <div className="flex items-center space-x-1">
                    <span>{label}</span>
                    {getSortIcon(key as keyof CampaignData)}
                  </div>
                </TableHead>
              ))}
            </TableRow>
          </TableHeader>
          <TableBody>
            {paginatedData.map((item, index) => (
              <motion.tr
                key={item.id}
                className="border-b border-border hover:bg-muted/50 transition-colors"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.3, delay: index * 0.1 }}
              >
                <TableCell className="font-medium text-foreground">{item.campaign}</TableCell>
                <TableCell className="text-muted-foreground">{item.channel}</TableCell>
                <TableCell className="text-muted-foreground">{item.city}</TableCell>
                <TableCell className="text-muted-foreground">{formatIndianNumber(item.clicks)}</TableCell>
                <TableCell className="text-muted-foreground">{formatIndianCurrency(item.cost)}</TableCell>
                <TableCell className="text-muted-foreground">{item.conversions}</TableCell>
                <TableCell className="text-emerald font-semibold">{formatIndianCurrency(item.revenue)}</TableCell>
                <TableCell className="text-saffron font-semibold">{item.roi}%</TableCell>
                <TableCell>
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(item.status)}`}>
                    {item.status}
                  </span>
                </TableCell>
              </motion.tr>
            ))}
          </TableBody>
        </Table>
      </div>

      {/* Pagination */}
      <div className="flex justify-between items-center mt-6">
        <p className="text-muted-foreground text-sm">
          Showing {(currentPage - 1) * itemsPerPage + 1} to {Math.min(currentPage * itemsPerPage, filteredData.length)} of {filteredData.length} results
        </p>
        
        <div className="flex space-x-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
            disabled={currentPage === 1}
            className="disabled:opacity-50"
          >
            Previous
          </Button>
          
          {Array.from({ length: totalPages }, (_, i) => i + 1).map(page => (
            <Button
              key={page}
              variant={page === currentPage ? "default" : "outline"}
              size="sm"
              onClick={() => setCurrentPage(page)}
              className={page === currentPage ? "bg-saffron text-white hover:bg-saffron/90" : ""}
            >
              {page}
            </Button>
          ))}
          
          <Button
            variant="outline"
            size="sm"
            onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
            disabled={currentPage === totalPages}
            className="disabled:opacity-50"
          >
            Next
          </Button>
        </div>
      </div>
    </motion.div>
  );
}