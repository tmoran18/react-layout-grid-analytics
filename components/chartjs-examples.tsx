"use client";

import { Line, Bar, Pie } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  ArcElement,
  Title,
  Tooltip,
  Legend,
  ChartData,
  ChartOptions,
} from "chart.js";

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, BarElement, ArcElement, Title, Tooltip, Legend);

interface LineChartProps {
  data: ChartData<"line">;
  options?: ChartOptions<"line">;
}

interface BarChartProps {
  data: ChartData<"bar">;
  options?: ChartOptions<"bar">;
}

interface PieChartProps {
  data: ChartData<"pie">;
  options?: ChartOptions<"pie">;
}

export function VisitorLineChart({ data, options }: LineChartProps) {
  return <Line data={data} options={options} />;
}

export function VisitorBarChart({ data, options }: BarChartProps) {
  return <Bar data={data} options={options} />;
}

export function VisitorPieChart({ data, options }: PieChartProps) {
  return <Pie data={data} options={options} />;
}
