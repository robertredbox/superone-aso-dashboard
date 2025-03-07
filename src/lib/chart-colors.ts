// Redbox Mobile brand colors for charts
export const CHART_COLORS = {
  // Primary brand colors
  primary: '#261041', // Deep Indigo
  secondary: '#8400ff', // Purple
  accent: '#ff2f00', // Red/Orange
  
  // Status colors
  good: '#009933', // Green
  average: '#FF8800', // Orange
  bad: '#FF0000', // Red
  
  // Additional chart colors
  indigo: {
    100: '#e7e4ee',
    200: '#d0c9dd',
    300: '#b8aecb',
    400: '#a193ba',
    500: '#8978a9',
    600: '#706097',
    700: '#574786',
    800: '#3e2f74',
    900: '#261041', // Base indigo
  },
  purple: {
    100: '#f2e6ff',
    200: '#e5ccff',
    300: '#d9b3ff',
    400: '#cc99ff',
    500: '#bf80ff',
    600: '#b266ff',
    700: '#a64dff',
    800: '#9933ff',
    900: '#8400ff', // Base purple
  },
  red: {
    100: '#ffe6df',
    200: '#ffccbe',
    300: '#ffb39e',
    400: '#ff997d',
    500: '#ff805d',
    600: '#ff663c',
    700: '#ff4d1c',
    800: '#ff3300',
    900: '#ff2f00', // Base red/orange
  }
};

// Chart color sets for different chart types
export const LINE_CHART_COLORS = [
  CHART_COLORS.indigo[900],
  CHART_COLORS.purple[700],
  CHART_COLORS.red[700],
  CHART_COLORS.indigo[600],
  CHART_COLORS.purple[500],
];

export const BAR_CHART_COLORS = [
  CHART_COLORS.indigo[700],
  CHART_COLORS.purple[600],
  CHART_COLORS.red[600],
  CHART_COLORS.indigo[500],
  CHART_COLORS.purple[400],
];

export const PIE_CHART_COLORS = [
  CHART_COLORS.indigo[900],
  CHART_COLORS.purple[700],
  CHART_COLORS.red[700],
  CHART_COLORS.indigo[600],
  CHART_COLORS.purple[500],
];

// Status color function to map values to colors
export function getStatusColor(
  value: number, 
  thresholds: { good: number; average: number }, 
  inverse: boolean = false
): string {
  if (!inverse) {
    if (value >= thresholds.good) return CHART_COLORS.good;
    if (value >= thresholds.average) return CHART_COLORS.average;
    return CHART_COLORS.bad;
  } else {
    // Inverse logic (lower is better)
    if (value <= thresholds.good) return CHART_COLORS.good;
    if (value <= thresholds.average) return CHART_COLORS.average;
    return CHART_COLORS.bad;
  }
}
