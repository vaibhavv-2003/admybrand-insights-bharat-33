// Export utilities for CSV and PDF generation

import { CampaignData } from './mockData';
import { formatIndianCurrency, formatIndianNumber } from './formatters';

export const exportToCSV = (data: CampaignData[]) => {
  const headers = [
    'Campaign',
    'Channel',
    'City',
    'Clicks',
    'Cost (INR)',
    'Conversions',
    'Revenue (INR)',
    'ROI %',
    'Status'
  ];

  const csvContent = [
    headers.join(','),
    ...data.map(row => [
      `"${row.campaign}"`,
      `"${row.channel}"`,
      `"${row.city}"`,
      row.clicks,
      row.cost,
      row.conversions,
      row.revenue,
      row.roi,
      `"${row.status}"`
    ].join(','))
  ].join('\n');

  const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
  const link = document.createElement('a');
  
  if (link.download !== undefined) {
    const url = URL.createObjectURL(blob);
    link.setAttribute('href', url);
    link.setAttribute('download', `campaign-data-${new Date().toISOString().split('T')[0]}.csv`);
    link.style.visibility = 'hidden';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  }
};

export const exportToPDF = async (data: CampaignData[]) => {
  try {
    // Dynamic import to reduce bundle size
    const jsPDF = (await import('jspdf')).default;
    
    const doc = new jsPDF();
    
    // Add title
    doc.setFontSize(20);
    doc.setTextColor(255, 153, 51); // Saffron color
    doc.text('ADmyBRAND Insights - Campaign Report', 20, 30);
    
    // Add date
    doc.setFontSize(12);
    doc.setTextColor(0, 0, 0);
    doc.text(`Generated on: ${new Date().toLocaleDateString('en-IN')}`, 20, 45);
    
    // Add table headers
    const headers = ['Campaign', 'Channel', 'City', 'Clicks', 'Cost', 'Conversions', 'Revenue', 'ROI%'];
    let yPosition = 65;
    
    doc.setFontSize(10);
    doc.setTextColor(255, 153, 51);
    headers.forEach((header, index) => {
      doc.text(header, 20 + (index * 22), yPosition);
    });
    
    // Add data rows
    doc.setTextColor(0, 0, 0);
    data.forEach((row, rowIndex) => {
      yPosition += 10;
      
      if (yPosition > 280) { // Add new page if needed
        doc.addPage();
        yPosition = 20;
      }
      
      const rowData = [
        row.campaign.substring(0, 12) + (row.campaign.length > 12 ? '...' : ''),
        row.channel,
        row.city,
        formatIndianNumber(row.clicks),
        formatIndianCurrency(row.cost).replace('₹', ''),
        row.conversions.toString(),
        formatIndianCurrency(row.revenue).replace('₹', ''),
        `${row.roi}%`
      ];
      
      rowData.forEach((cell, cellIndex) => {
        doc.text(cell, 20 + (cellIndex * 22), yPosition);
      });
    });
    
    // Add footer
    const totalRevenue = data.reduce((sum, row) => sum + row.revenue, 0);
    const totalCost = data.reduce((sum, row) => sum + row.cost, 0);
    const totalConversions = data.reduce((sum, row) => sum + row.conversions, 0);
    
    yPosition += 20;
    doc.setFontSize(12);
    doc.setTextColor(255, 153, 51);
    doc.text('Summary:', 20, yPosition);
    
    yPosition += 10;
    doc.setFontSize(10);
    doc.setTextColor(0, 0, 0);
    doc.text(`Total Revenue: ${formatIndianCurrency(totalRevenue)}`, 20, yPosition);
    doc.text(`Total Cost: ${formatIndianCurrency(totalCost)}`, 20, yPosition + 8);
    doc.text(`Total Conversions: ${totalConversions}`, 20, yPosition + 16);
    doc.text(`Overall ROI: ${Math.round(((totalRevenue - totalCost) / totalCost) * 100)}%`, 20, yPosition + 24);
    
    // Save the PDF
    doc.save(`campaign-report-${new Date().toISOString().split('T')[0]}.pdf`);
    
  } catch (error) {
    console.error('Error generating PDF:', error);
    alert('Error generating PDF. Please try again.');
  }
};