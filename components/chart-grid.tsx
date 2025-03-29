"use client";

import * as React from "react";
import { Responsive, WidthProvider, Layout } from "react-grid-layout";
import "react-grid-layout/css/styles.css";
import "react-resizable/css/styles.css";
import { Grip, GripVertical, Maximize2, Info } from "lucide-react";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";

import { VisitorBarChart, VisitorLineChart, VisitorPieChart } from "./chartjs-examples";
import { DataTable } from "./data-table";
import { chartData, chartOptions } from "@/lib/chart-data";
import { Button } from "./ui/button";

const ResponsiveGridLayout = WidthProvider(Responsive);

const LAYOUT_STORAGE_KEY = "dashboard-layout";

type BreakpointKey = "lg" | "md" | "sm";

// Load saved layout from localStorage or use default
const loadSavedLayout = () => {
  try {
    if (typeof window === "undefined") return defaultLayouts;

    const savedLayout = localStorage.getItem(LAYOUT_STORAGE_KEY);
    if (!savedLayout) return defaultLayouts;

    const parsed = JSON.parse(savedLayout) as Layouts;
    // Ensure all layouts have the required properties
    (["lg", "md", "sm"] as BreakpointKey[]).forEach((breakpoint) => {
      if (!parsed[breakpoint]) parsed[breakpoint] = defaultLayouts[breakpoint];
      parsed[breakpoint] = parsed[breakpoint].map((item: Layout) => ({
        ...defaultLayouts[breakpoint].find((def: Layout) => def.i === item.i),
        ...item,
      }));
    });

    return parsed;
  } catch (error) {
    console.error("Error loading layout:", error);
    return defaultLayouts;
  }
};

const defaultLayouts = {
  lg: [
    { i: "bar", x: 0, y: 0, w: 6, h: 20, minW: 4, maxW: 12, minH: 15, maxH: 30 },
    { i: "line", x: 6, y: 0, w: 6, h: 20, minW: 2, maxW: 12, minH: 15, maxH: 30 },
    { i: "impressions", x: 0, y: 20, w: 12, h: 20, minW: 4, maxW: 12, minH: 15, maxH: 30 },
    { i: "pie", x: 0, y: 40, w: 12, h: 20, minW: 4, maxW: 12, minH: 15, maxH: 30 },
    { i: "table", x: 0, y: 60, w: 12, h: 30, minW: 8, maxW: 12, minH: 20, maxH: 50 },
  ],
  md: [
    { i: "bar", x: 0, y: 0, w: 6, h: 20, minW: 4, maxW: 12, minH: 15, maxH: 30 },
    { i: "line", x: 6, y: 0, w: 6, h: 20, minW: 2, maxW: 12, minH: 15, maxH: 30 },
    { i: "impressions", x: 0, y: 20, w: 12, h: 20, minW: 4, maxW: 12, minH: 15, maxH: 30 },
    { i: "pie", x: 0, y: 40, w: 12, h: 20, minW: 4, maxW: 12, minH: 15, maxH: 30 },
    { i: "table", x: 0, y: 60, w: 12, h: 30, minW: 8, maxW: 12, minH: 20, maxH: 50 },
  ],
  sm: [
    { i: "bar", x: 0, y: 0, w: 12, h: 20, minW: 6, maxW: 12, minH: 15, maxH: 30 },
    { i: "line", x: 0, y: 20, w: 12, h: 20, minW: 6, maxW: 12, minH: 15, maxH: 30 },
    { i: "impressions", x: 0, y: 40, w: 12, h: 20, minW: 6, maxW: 12, minH: 15, maxH: 30 },
    { i: "pie", x: 0, y: 60, w: 12, h: 20, minW: 6, maxW: 12, minH: 15, maxH: 30 },
    { i: "table", x: 0, y: 80, w: 12, h: 30, minW: 8, maxW: 12, minH: 20, maxH: 50 },
  ],
};

type Layouts = {
  [key: string]: Layout[];
};

const customGridStyles = `
  .react-grid-placeholder {
    background: rgb(59 130 246) !important; // Tailwind blue-500
    opacity: 0.15 !important;
    border-radius: 0.75rem !important; // matches rounded-xl
  }
`;

export function ChartGrid() {
  const [mounted, setMounted] = React.useState(false);
  const [layouts, setLayouts] = React.useState<Layouts>(defaultLayouts);

  // Load layout after mount to avoid hydration mismatch
  React.useEffect(() => {
    setMounted(true);
    const savedLayout = loadSavedLayout();
    setLayouts(savedLayout);
  }, []);

  const onLayoutChange = (currentLayout: Layout[], allLayouts: Layouts) => {
    if (!mounted) return;
    setLayouts(allLayouts);
    localStorage.setItem(LAYOUT_STORAGE_KEY, JSON.stringify(allLayouts));
  };

  // Prevent layout from rendering until after mount
  if (!mounted) return null;

  return (
    <div className="relative">
      <div className="flex justify-between gap-4">
        <Button className="text-md ml-4 mb-5 bg-blue-500 hover:bg-blue-600">Tim&apos;s Marketing</Button>
      </div>
      <style>{customGridStyles}</style>
      <ResponsiveGridLayout
        className="layout"
        layouts={layouts}
        breakpoints={{ lg: 1200, md: 996, sm: 768 }}
        cols={{ lg: 12, md: 12, sm: 12 }}
        margin={[10, 10]}
        containerPadding={[10, 10]}
        isDraggable={true}
        draggableHandle=".drag-handle"
        rowHeight={10}
        isResizable
        resizeHandle={
          <div className="absolute bottom-2 right-2 rounded hover:bg-gray-100 cursor-se-resize">
            <Maximize2 className="h-4 w-4 text-gray-400 rotate-90" />
          </div>
        }
        useCSSTransforms
        preventCollision={false}
        compactType="vertical"
        autoSize={true}
        onLayoutChange={onLayoutChange}
      >
        <div key="bar" className="w-full h-full overflow-hidden shadow-md rounded-xl">
          <div className="h-full w-full p-4 bg-white rounded-xl border border-gray-200 shadow-[0_2px_10px_-3px_rgba(0,0,0,0.07)] flex flex-col relative">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2">
                <div className="drag-handle p-1 rounded hover:bg-gray-100 cursor-move">
                  <Grip className="h-5 w-5 text-gray-400" />
                </div>
                <h3 className="text-lg font-semibold">Total Sales Leads</h3>
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <Info className="h-4 w-4 text-gray-400 hover:text-gray-600 cursor-help" />
                    </TooltipTrigger>
                    <TooltipContent>
                      <p>Total number of qualified sales leads per day</p>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
              </div>
              <span className="text-sm text-gray-500">Last 30 Days</span>
            </div>
            <div className="flex-1 min-h-0 mb-6">
              {/* @ts-expect-error - Chart.js types are not updated */}
              <VisitorBarChart data={chartData.salesLeads} options={chartOptions.bar} />
            </div>
            <span className="text-xs text-gray-400 absolute bottom-3 left-4">
              *Excludes leads marked as &quot;spam&quot;
            </span>
          </div>
        </div>
        <div key="line" className="w-full h-full overflow-hidden shadow-md rounded-xl">
          <div className="h-full w-full p-4 bg-white rounded-xl border border-gray-200 shadow-[0_2px_10px_-3px_rgba(0,0,0,0.07)] flex flex-col relative">
            <div className="flex items-center gap-2 mb-4">
              <div className="drag-handle rounded hover:bg-gray-100 cursor-move">
                <GripVertical className="h-5 w-5 text-gray-400" />
              </div>
              <h3 className="text-lg font-semibold">Active Users</h3>
            </div>
            <div className="flex-1 min-h-0 pb-5">
              {/* @ts-expect-error - Chart.js types are not updated */}
              <VisitorLineChart data={chartData.activeUsers} options={chartOptions.lineWithLegend} />
            </div>
          </div>
        </div>
        <div key="impressions" className="w-full h-full overflow-hidden shadow-md rounded-xl">
          <div className="h-full w-full p-4 bg-white rounded-xl border border-gray-200 shadow-[0_2px_10px_-3px_rgba(0,0,0,0.07)] flex flex-col relative">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2">
                <div className="drag-handle p-1 rounded hover:bg-gray-100 cursor-move">
                  <GripVertical className="h-5 w-5 text-gray-400" />
                </div>
                <h3 className="text-lg font-semibold">Impressions</h3>
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <Info className="h-4 w-4 text-gray-400 hover:text-gray-600 cursor-help" />
                    </TooltipTrigger>
                    <TooltipContent>
                      <p>Total number of impressions per day</p>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
              </div>
              <span className="text-sm text-gray-500">Last 30 Days</span>
            </div>
            <div className="flex-1 min-h-0 pb-5">
              {/* @ts-expect-error - Chart.js types are not updated   */}
              <VisitorLineChart data={chartData.impressions} options={chartOptions.line} />
            </div>
          </div>
        </div>
        <div key="pie" className="w-full h-full overflow-hidden shadow-md rounded-xl">
          <div className="h-full w-full p-4 bg-white rounded-xl border border-gray-200 shadow-[0_2px_10px_-3px_rgba(0,0,0,0.07)] flex flex-col relative">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2">
                <div className="drag-handle p-1 rounded hover:bg-gray-100 cursor-move">
                  <Grip className="h-5 w-5 text-gray-400" />
                </div>
                <h3 className="text-lg font-semibold">Leads Per Category</h3>
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <Info className="h-4 w-4 text-gray-400 hover:text-gray-600 cursor-help" />
                    </TooltipTrigger>
                    <TooltipContent>
                      <p>Distribution of leads across different categories</p>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
              </div>
              <span className="text-sm text-gray-500">Last 30 Days</span>
            </div>
            <div className="flex-1 min-h-0 mb-6">
              <VisitorPieChart data={chartData.categoryDistribution} options={chartOptions.pie} />
            </div>
            <span className="text-xs text-gray-400 absolute bottom-3 left-4">
              *Excludes leads marked as &quot;spam&quot;
            </span>
          </div>
        </div>
        <div key="table" className="w-full h-full overflow-hidden shadow-md rounded-xl">
          <div className="h-full w-full p-4 bg-white rounded-xl border border-gray-200 shadow-[0_2px_10px_-3px_rgba(0,0,0,0.07)] flex flex-col relative">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2">
                <div className="drag-handle p-1 rounded hover:bg-gray-100 cursor-move">
                  <Grip className="h-5 w-5 text-gray-400" />
                </div>
                <h3 className="text-lg font-semibold">Engagement By Campaign</h3>
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <Info className="h-4 w-4 text-gray-400 hover:text-gray-600 cursor-help" />
                    </TooltipTrigger>
                    <TooltipContent>
                      <p>Detailed breakdown of all sales leads</p>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
              </div>
            </div>
            <div className="flex-1 min-h-0 overflow-hidden">
              <DataTable />
            </div>
          </div>
        </div>
      </ResponsiveGridLayout>
    </div>
  );
}
