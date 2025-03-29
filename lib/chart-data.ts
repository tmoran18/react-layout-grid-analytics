import type { Scale, CoreScaleOptions } from "chart.js";

// Helper function to generate dates for last 30 days
export const generateLast30DaysDates = () => {
  return Array.from({ length: 30 }, (_, i) =>
    new Date(Date.now() - (29 - i) * 24 * 60 * 60 * 1000).toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
    })
  );
};

// Helper function to generate random data within a range
export const generateRandomData = (min: number, max: number, length: number) => {
  return Array.from({ length }, () => Math.floor(Math.random() * (max - min) + min));
};

// Chart Data
export const chartData = {
  activeUsers: {
    labels: generateLast30DaysDates(),
    datasets: [
      {
        label: "Tims Motor Group",
        data: generateRandomData(2000, 5000, 30),
        borderColor: "#387cff",
        backgroundColor: "rgba(56, 124, 255, 0.1)",
        fill: false,
        tension: 0.4,
        borderWidth: 2,
        pointRadius: 4,
        pointBackgroundColor: "#387cff",
        pointBorderColor: "#fff",
        pointBorderWidth: 2,
        pointHoverRadius: 8,
        pointHoverBackgroundColor: "#387cff",
        pointHoverBorderColor: "#fff",
        pointHoverBorderWidth: 2,
      },
      {
        label: "Tims Used Cars",
        data: generateRandomData(1500, 4000, 30),
        borderColor: "rgba(56, 124, 255, 0.8)",
        backgroundColor: "transparent",
        fill: false,
        tension: 0.4,
        borderWidth: 2,
        pointRadius: 4,
        pointBackgroundColor: "rgba(56, 124, 255, 0.8)",
        pointBorderColor: "#fff",
        pointBorderWidth: 2,
        pointHoverRadius: 8,
        pointHoverBackgroundColor: "rgba(56, 124, 255, 0.8)",
        pointHoverBorderColor: "#fff",
        pointHoverBorderWidth: 2,
      },
      {
        label: "Chery Tims",
        data: generateRandomData(1000, 3000, 30),
        borderColor: "rgba(56, 124, 255, 0.6)",
        backgroundColor: "transparent",
        fill: false,
        tension: 0.4,
        borderWidth: 2,
        pointRadius: 4,
        pointBackgroundColor: "rgba(56, 124, 255, 0.6)",
        pointBorderColor: "#fff",
        pointBorderWidth: 2,
        pointHoverRadius: 8,
        pointHoverBackgroundColor: "rgba(56, 124, 255, 0.6)",
        pointHoverBorderColor: "#fff",
        pointHoverBorderWidth: 2,
      },
      {
        label: "Omoda Jaecoo Tims Victoria Point",
        data: generateRandomData(500, 2000, 30),
        borderColor: "rgba(56, 124, 255, 0.4)",
        backgroundColor: "transparent",
        fill: false,
        tension: 0.4,
        borderWidth: 2,
        pointRadius: 4,
        pointBackgroundColor: "rgba(56, 124, 255, 0.4)",
        pointBorderColor: "#fff",
        pointBorderWidth: 2,
        pointHoverRadius: 8,
        pointHoverBackgroundColor: "rgba(56, 124, 255, 0.4)",
        pointHoverBorderColor: "#fff",
        pointHoverBorderWidth: 2,
      },
    ],
  },
  impressions: {
    labels: generateLast30DaysDates(),
    datasets: [
      {
        label: "Daily Impressions",
        data: generateRandomData(10000, 30000, 30),
        borderColor: "#387cff",
        backgroundColor: "transparent",
        fill: false,
        tension: 0.4,
        borderWidth: 2,
        pointRadius: 4,
        pointBackgroundColor: "#387cff",
        pointBorderColor: "#fff",
        pointBorderWidth: 2,
        pointHoverRadius: 8,
        pointHoverBackgroundColor: "#387cff",
        pointHoverBorderColor: "#fff",
        pointHoverBorderWidth: 2,
      },
    ],
  },
  salesLeads: {
    labels: generateLast30DaysDates(),
    datasets: [
      {
        label: "Sales Leads",
        data: generateRandomData(20, 100, 30),
        backgroundColor: "#387cff",
        borderColor: "transparent",
        borderWidth: 1,
        borderRadius: 4,
      },
    ],
  },
  categoryDistribution: {
    labels: [
      "Service Booking",
      "Sell My Car",
      "Trade-in",
      "Used Vehicle",
      "Survey",
      "General",
      "New Vehicle",
      "Finance",
      "Service",
      "Parts",
    ],
    datasets: [
      {
        data: [15, 12, 11, 10, 8, 10, 13, 9, 7, 5],
        backgroundColor: [
          "#387cff",
          "rgba(56, 124, 255, 0.9)",
          "rgba(56, 124, 255, 0.8)",
          "rgba(56, 124, 255, 0.7)",
          "rgba(56, 124, 255, 0.6)",
          "rgba(56, 124, 255, 0.5)",
          "rgba(56, 124, 255, 0.4)",
          "rgba(56, 124, 255, 0.3)",
          "rgba(56, 124, 255, 0.2)",
          "rgba(56, 124, 255, 0.1)",
        ],
        borderWidth: 0,
      },
    ],
  },
};

// Common legend style for multi-dataset charts
const legendStyle = {
  display: true,
  position: "bottom" as const,
  align: "start" as const,
  labels: {
    boxWidth: 12,
    boxHeight: 12,
    padding: 15,
    usePointStyle: false,
  },
} as const;

// Common axis configuration for better label spacing
const commonAxisConfig = {
  x: {
    type: "category" as const,
    ticks: {
      color: "rgb(156, 163, 175)", // Tailwind gray-400
      maxRotation: 0,
      autoSkip: true,
      maxTicksLimit: 6,
      padding: 10,
    },
    grid: {
      display: true,
      color: "rgb(229, 231, 235)", // Tailwind gray-200
      lineWidth: 1,
    },
    border: {
      color: "rgb(229, 231, 235)", // Tailwind gray-200
      width: 1,
    },
  },
  y: {
    type: "linear" as const,
    beginAtZero: true,
    ticks: {
      color: "rgb(156, 163, 175)", // Tailwind gray-400
      padding: 10,
      callback: function (this: Scale<CoreScaleOptions>, tickValue: number) {
        if (tickValue >= 1000) {
          return (tickValue / 1000).toString() + "k";
        }
        return tickValue;
      },
    },
    grid: {
      color: "rgb(229, 231, 235)", // Tailwind gray-200
      lineWidth: 1,
    },
    border: {
      color: "rgb(229, 231, 235)", // Tailwind gray-200
      width: 1,
    },
  },
} as const;

// Chart Options
export const chartOptions = {
  line: {
    responsive: true,
    maintainAspectRatio: false,
    scales: {
      ...commonAxisConfig,
      y: {
        ...commonAxisConfig.y,
        ticks: {
          ...commonAxisConfig.y.ticks,
          stepSize: 5000,
        },
      },
    },
    plugins: {
      legend: {
        display: false,
      },
    },
  },
  lineWithLegend: {
    responsive: true,
    maintainAspectRatio: false,
    scales: {
      ...commonAxisConfig,
      y: {
        ...commonAxisConfig.y,
        max: 5000,
        ticks: {
          ...commonAxisConfig.y.ticks,
          stepSize: 1000,
        },
      },
    },
    plugins: {
      legend: legendStyle,
    },
  },
  bar: {
    responsive: true,
    maintainAspectRatio: false,
    scales: {
      ...commonAxisConfig,
      y: {
        ...commonAxisConfig.y,
        ticks: {
          ...commonAxisConfig.y.ticks,
          stepSize: 20,
        },
      },
    },
    plugins: {
      legend: {
        display: false,
      },
    },
  },
  pie: {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: legendStyle,
    },
  },
} as const;
