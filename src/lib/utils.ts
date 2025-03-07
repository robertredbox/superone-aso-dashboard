import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

// Helper function to determine status color class based on value
export function getStatusColorClass(
  value: number, 
  thresholds: { good: number; average: number; }, 
  type: 'text' | 'bg' = 'text',
  inverse: boolean = false
): string {
  const prefix = type === 'text' ? 'text-status-' : 'bg-status-';
  
  if (!inverse) {
    if (value >= thresholds.good) return `${prefix}good`;
    if (value >= thresholds.average) return `${prefix}average`;
    return `${prefix}bad`;
  } else {
    // Inverse logic (lower is better)
    if (value <= thresholds.good) return `${prefix}good`;
    if (value <= thresholds.average) return `${prefix}average`;
    return `${prefix}bad`;
  }
}

// Format date to a readable string
export function formatDate(date: Date | string, format: string = 'MM/dd/yyyy'): string {
  const d = typeof date === 'string' ? new Date(date) : date;
  
  // Return empty string for invalid dates
  if (isNaN(d.getTime())) return '';
  
  const month = d.getMonth() + 1;
  const day = d.getDate();
  const year = d.getFullYear();
  
  // Replace format tokens
  return format
    .replace('MM', month.toString().padStart(2, '0'))
    .replace('dd', day.toString().padStart(2, '0'))
    .replace('yyyy', year.toString())
    .replace('MMMM', d.toLocaleString('default', { month: 'long' }))
    .replace('MMM', d.toLocaleString('default', { month: 'short' }))
    .replace('M', month.toString())
    .replace('d', day.toString());
}

// Format number with commas
export function formatNumber(num: number): string {
  return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

// Format percentage
export function formatPercentage(num: number): string {
  return `${num.toFixed(2)}%`;
}

// Get the YTD date range
export function getYTDDateRange() {
  const now = new Date();
  const startOfYear = new Date(now.getFullYear(), 0, 1); // January 1st of current year
  
  return {
    start: startOfYear,
    end: now,
    formattedStart: `${startOfYear.getMonth()+1}/${startOfYear.getDate()}/${startOfYear.getFullYear()}`,
    formattedEnd: `${now.getMonth()+1}/${now.getDate()}/${now.getFullYear()}`
  };
}

// Generate random date data for charts
export function getRandomDateData(days: number) {
  const result = [];
  const today = new Date();
  
  for (let i = days - 1; i >= 0; i--) {
    const date = new Date(today);
    date.setDate(date.getDate() - i);
    
    const formattedDate = `${date.getMonth() + 1}/${date.getDate()}`;
    
    result.push({
      date: formattedDate,
      value: Math.floor(Math.random() * 100)
    });
  }
  
  return result;
}