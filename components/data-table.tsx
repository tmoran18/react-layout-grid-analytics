"use client";

import * as React from "react";

import {
  ColumnDef,
  ColumnFiltersState,
  SortingState,
  VisibilityState,
  flexRender,
  getCoreRowModel,
  getFacetedRowModel,
  getFacetedUniqueValues,
  getFilteredRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table";
import { z } from "zod";

import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";

export const schema = z.object({
  id: z.number(),
  campaignName: z.string(),
  clicks: z.number(),
  clicksChange: z.number(),
  impressions: z.number(),
  impressionsChange: z.number(),
  phoneCalls: z.number(),
  phoneCallsChange: z.number(),
  totalLeads: z.number(),
  totalLeadsChange: z.number(),
  costPerLead: z.number(),
  costPerLeadChange: z.number(),
  amountSpent: z.number(),
  amountSpentChange: z.number(),
});

const columns: ColumnDef<z.infer<typeof schema>>[] = [
  {
    accessorKey: "campaignName",
    header: () => <div className="text-left">Campaign Name</div>,
    cell: ({ row }) => {
      const campaignName = row.getValue("campaignName") as string;
      const truncated = campaignName.length > 40 ? campaignName.slice(0, 40) + "..." : campaignName;

      return campaignName.length > 40 ? (
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger className="text-left">{truncated}</TooltipTrigger>
            <TooltipContent>
              <p>{campaignName}</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      ) : (
        truncated || "-"
      );
    },
  },
  {
    accessorKey: "clicks",
    header: () => <div className="text-right">Clicks</div>,
    cell: ({ row }) => {
      const change = row.original.clicksChange;
      const isPositive = change > 0;
      return (
        <div className="flex flex-col items-end">
          <div>{row.getValue("clicks")?.toLocaleString()}</div>
          <div className={isPositive ? "text-green-700!" : "text-red-500"}>{isPositive ? `+${change}` : change}</div>
        </div>
      );
    },
  },
  {
    accessorKey: "impressions",
    header: () => <div className="text-right">Impressions</div>,
    cell: ({ row }) => (
      <div className="flex flex-col items-end">
        <div>{(row.getValue("impressions") as number)?.toLocaleString() || "-"}</div>
        <div className={row.original.impressionsChange > 0 ? "text-green-700!" : "text-red-500"}>
          {row.original.impressionsChange > 0 ? "+" : ""}
          {row.original.impressionsChange.toLocaleString()}
        </div>
      </div>
    ),
  },
  {
    accessorKey: "phoneCalls",
    header: () => <div className="text-right">Phone Calls</div>,
    cell: ({ row }) => (
      <div className="flex flex-col items-end">
        <div>{(row.getValue("phoneCalls") as number)?.toLocaleString() || "-"}</div>
        <div className={row.original.phoneCallsChange > 0 ? "text-green-700!" : "text-red-500"}>
          {row.original.phoneCallsChange > 0 ? "+" : ""}
          {row.original.phoneCallsChange.toLocaleString()}
        </div>
      </div>
    ),
  },
  {
    accessorKey: "totalLeads",
    header: () => <div className="text-right">Total Leads</div>,
    cell: ({ row }) => (
      <div className="flex flex-col items-end">
        <div>{(row.getValue("totalLeads") as number)?.toLocaleString() || "-"}</div>
        <div className={row.original.totalLeadsChange > 0 ? "text-green-700!" : "text-red-500"}>
          {row.original.totalLeadsChange > 0 ? "+" : ""}
          {row.original.totalLeadsChange.toLocaleString()}
        </div>
      </div>
    ),
  },
  {
    accessorKey: "costPerLead",
    header: () => <div className="text-right">Cost Per Lead</div>,
    cell: ({ row }) => (
      <div className="flex flex-col items-end">
        <div>${(row.getValue("costPerLead") as number)?.toFixed(2) || "-"}</div>
        <div className={row.original.costPerLeadChange > 0 ? "text-green-700!" : "text-red-500"}>
          {row.original.costPerLeadChange > 0 ? "+$" : "-$"}
          {Math.abs(row.original.costPerLeadChange).toFixed(2)}
        </div>
      </div>
    ),
  },
  {
    accessorKey: "amountSpent",
    header: () => <div className="text-right">Amount Spent</div>,
    cell: ({ row }) => (
      <div className="flex flex-col items-end">
        <div>${(row.getValue("amountSpent") as number)?.toLocaleString() || "-"}</div>
        <div className={row.original.amountSpentChange > 0 ? "text-green-700!" : "text-red-500"}>
          {row.original.amountSpentChange > 0 ? "+$" : "-$"}
          {Math.abs(row.original.amountSpentChange).toFixed(2)}
        </div>
      </div>
    ),
  },
];

const initialData = [
  {
    id: 1,
    campaignName: "John Hughes Volkswagen | AIA",
    clicks: 713,
    clicksChange: -81,
    impressions: 59225,
    impressionsChange: -29908,
    phoneCalls: 18,
    phoneCallsChange: 1,
    totalLeads: 8,
    totalLeadsChange: -23,
    costPerLead: 62.25,
    costPerLeadChange: 46.77,
    amountSpent: 497.99,
    amountSpentChange: 18.2,
  },
  {
    id: 2,
    campaignName: "John Hughes Mitsubishi | AIA",
    clicks: 4083,
    clicksChange: 373,
    impressions: 70513,
    impressionsChange: -22788,
    phoneCalls: 16,
    phoneCallsChange: 0,
    totalLeads: 27,
    totalLeadsChange: -16,
    costPerLead: 35.93,
    costPerLeadChange: 13.81,
    amountSpent: 970.06,
    amountSpentChange: 18.98,
  },
  {
    id: 3,
    campaignName: "John Hughes Kia | AIA",
    clicks: 2390,
    clicksChange: -72,
    impressions: 91927,
    impressionsChange: -31170,
    phoneCalls: 16,
    phoneCallsChange: 1,
    totalLeads: 34,
    totalLeadsChange: -38,
    costPerLead: 29.13,
    costPerLeadChange: 15.86,
    amountSpent: 990.56,
    amountSpentChange: 34.79,
  },
  {
    id: 4,
    campaignName: "John Hughes Hyundai | AIA",
    clicks: 1867,
    clicksChange: 137,
    impressions: 53176,
    impressionsChange: -14488,
    phoneCalls: 8,
    phoneCallsChange: -2,
    totalLeads: 20,
    totalLeadsChange: -14,
    costPerLead: 24.2,
    costPerLeadChange: 10.64,
    amountSpent: 484.06,
    amountSpentChange: 22.9,
  },
  {
    id: 5,
    campaignName: "John Hughes Chery | AIA",
    clicks: 2277,
    clicksChange: 503,
    impressions: 58732,
    impressionsChange: -12639,
    phoneCalls: 2,
    phoneCallsChange: 2,
    totalLeads: 16,
    totalLeadsChange: 9,
    costPerLead: 61.39,
    costPerLeadChange: -74.31,
    amountSpent: 982.17,
    amountSpentChange: 32.29,
  },
  {
    id: 6,
    campaignName: "Mitsubishi // Good To Go // Pajero Sport, Outlander & Eclipse - November",
    clicks: 1111,
    clicksChange: 0,
    impressions: 129491,
    impressionsChange: 0,
    phoneCalls: 6,
    phoneCallsChange: 0,
    totalLeads: 13,
    totalLeadsChange: 0,
    costPerLead: 76.92,
    costPerLeadChange: 0,
    amountSpent: 1000.0,
    amountSpentChange: 0,
  },
  {
    id: 7,
    campaignName: "John Hughes | Sell Your Car",
    clicks: 328,
    clicksChange: 23,
    impressions: 66241,
    impressionsChange: 5019,
    phoneCalls: 9,
    phoneCallsChange: -6,
    totalLeads: 27,
    totalLeadsChange: -103,
    costPerLead: 47.75,
    costPerLeadChange: 40.45,
    amountSpent: 1289.19,
    amountSpentChange: 339.85,
  },
  {
    id: 8,
    campaignName: "John Hughes | AIA",
    clicks: 21947,
    clicksChange: 5248,
    impressions: 182475,
    impressionsChange: -11642,
    phoneCalls: 56,
    phoneCallsChange: 13,
    totalLeads: 122,
    totalLeadsChange: -10,
    costPerLead: 16.16,
    costPerLeadChange: 1.73,
    amountSpent: 1971.0,
    amountSpentChange: 66.24,
  },
];

export function DataTable() {
  const [columnVisibility, setColumnVisibility] = React.useState<VisibilityState>({});
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>([]);
  const [sorting, setSorting] = React.useState<SortingState>([]);

  const table = useReactTable({
    data: initialData,
    columns,
    state: {
      sorting,
      columnVisibility,
      columnFilters,
    },
    getRowId: (row) => row.id.toString(),
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    onColumnVisibilityChange: setColumnVisibility,
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFacetedRowModel: getFacetedRowModel(),
    getFacetedUniqueValues: getFacetedUniqueValues(),
  });

  return (
    <div className="relative flex flex-col gap-4 overflow-auto px-4 lg:px-6">
      <div className="overflow-hidden rounded-lg border">
        <Table className="[&_tr:nth-child(even)]:bg-muted/50">
          <TableHeader className="bg-muted sticky top-0 z-10 [&_tr]:border-b">
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => (
                  <TableHead key={header.id} colSpan={header.colSpan} className="border-r last:border-r-0">
                    {header.isPlaceholder ? null : flexRender(header.column.columnDef.header, header.getContext())}
                  </TableHead>
                ))}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow key={row.id} className="border-b last:border-b-0">
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id} className="border-r last:border-r-0">
                      {flexRender(cell.column.columnDef.cell, cell.getContext())}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={columns.length} className="h-24 text-center">
                  No results.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
