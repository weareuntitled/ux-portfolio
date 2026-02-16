"use client";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { LayoutGrid, List, BarChart3, Maximize2, MoreHorizontal, ChevronLeft, ChevronRight } from "lucide-react";

interface OwnFfp {
  id: string;
  ffpId: string;
  name: string;
  creator: string;
  type: string;
  affectedVehicles: number;
  status: string;
  statusColor: string;
  editor: string;
}

const ffps: OwnFfp[] = [
  {
    id: "1",
    ffpId: "FFP-004",
    name: "Lorem Ipsum dolor",
    creator: "Alexander Grabeloter",
    type: "Failure",
    affectedVehicles: 142,
    status: "Cause defined",
    statusColor: "bg-accent text-accent-foreground",
    editor: "Martin Landberger",
  },
  {
    id: "2",
    ffpId: "DFFP-033",
    name: "Lorem Ipsum dolor",
    creator: "Alexander Grabeloter",
    type: "Failure",
    affectedVehicles: 142,
    status: "In draft",
    statusColor: "bg-primary/20 text-primary",
    editor: "-",
  },
  {
    id: "3",
    ffpId: "DFFP-007",
    name: "Lorem Ipsum dolor",
    creator: "Alexander Grabeloter",
    type: "Failure",
    affectedVehicles: 142,
    status: "In draft",
    statusColor: "bg-primary/20 text-primary",
    editor: "-",
  },
  {
    id: "4",
    ffpId: "FFP-004",
    name: "Lorem Ipsum dolor",
    creator: "Alexander Grabeloter",
    type: "Failure",
    affectedVehicles: 142,
    status: "Effectiveness tested",
    statusColor: "bg-primary text-primary-foreground",
    editor: "Martin Landberger",
  },
];

function SparkDots({ value }: { value: number }) {
  const dots = 5;
  const filled = Math.ceil((value / 200) * dots);
  return (
    <div className="flex items-center gap-2">
      <span className="text-xs font-bold text-foreground">{value}</span>
      <div className="flex items-center gap-0.5">
        {Array.from({ length: dots }).map((_, i) => (
          <span
            key={i}
            className={`h-1.5 w-1.5 rounded-full ${i < filled ? "bg-primary" : "bg-border"}`}
          />
        ))}
      </div>
    </div>
  );
}

export function OwnFfpsTable() {
  return (
    <section>
      <div className="mb-4 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <h2 className="text-base font-bold text-foreground">Own FFPs</h2>
          <span className="flex h-5 items-center rounded-full bg-primary px-2 text-[10px] font-bold text-primary-foreground">
            +3
          </span>
        </div>
        <div className="flex items-center gap-2">
          <button type="button" className="rounded-md bg-secondary p-1.5 text-foreground" aria-label="List view">
            <List className="h-4 w-4" />
          </button>
          <button type="button" className="rounded-md p-1.5 text-muted-foreground hover:bg-secondary" aria-label="Grid view">
            <LayoutGrid className="h-4 w-4" />
          </button>
          <button type="button" className="rounded-md p-1.5 text-muted-foreground hover:bg-secondary" aria-label="Chart view">
            <BarChart3 className="h-4 w-4" />
          </button>
          <button type="button" className="rounded-md p-1.5 text-muted-foreground hover:bg-secondary" aria-label="Expand">
            <Maximize2 className="h-4 w-4" />
          </button>
        </div>
      </div>

      <div className="rounded-xl border border-border bg-background">
        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow className="border-b border-border hover:bg-transparent">
                <TableHead className="text-xs font-semibold text-foreground">FFP-ID</TableHead>
                <TableHead className="text-xs font-semibold text-foreground">Name</TableHead>
                <TableHead className="text-xs font-semibold text-foreground">Creator</TableHead>
                <TableHead className="text-xs font-semibold text-foreground">Type</TableHead>
                <TableHead className="text-xs font-semibold text-foreground">Affected Vehicles</TableHead>
                <TableHead className="text-xs font-semibold text-foreground">Status</TableHead>
                <TableHead className="text-xs font-semibold text-foreground">Editor</TableHead>
                <TableHead className="w-10" />
              </TableRow>
            </TableHeader>
            <TableBody>
              {ffps.map((ffp) => (
                <TableRow
                  key={ffp.id}
                  className="cursor-pointer border-b border-border transition-colors hover:bg-secondary/50"
                >
                  <TableCell className="text-xs text-foreground">{ffp.ffpId}</TableCell>
                  <TableCell className="text-xs text-foreground">{ffp.name}</TableCell>
                  <TableCell className="text-xs text-foreground">{ffp.creator}</TableCell>
                  <TableCell className="text-xs text-foreground">{ffp.type}</TableCell>
                  <TableCell>
                    <SparkDots value={ffp.affectedVehicles} />
                  </TableCell>
                  <TableCell>
                    <span className={`inline-block rounded-full px-2.5 py-0.5 text-[10px] font-semibold ${ffp.statusColor}`}>
                      {ffp.status}
                    </span>
                  </TableCell>
                  <TableCell className="text-xs text-foreground">{ffp.editor}</TableCell>
                  <TableCell>
                    <button type="button" className="text-muted-foreground hover:text-foreground" aria-label="More options">
                      <MoreHorizontal className="h-4 w-4" />
                    </button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>

        <div className="flex items-center justify-between border-t border-border px-4 py-3 text-xs text-muted-foreground">
          <div className="flex items-center gap-2">
            <span>Items per page</span>
            <select className="rounded border border-border bg-background px-2 py-1 text-xs text-foreground" defaultValue={4}>
              <option value={4}>4</option>
              <option value={10}>10</option>
              <option value={25}>25</option>
            </select>
            <span>Show 1-5 items of 65 items</span>
          </div>
          <div className="flex items-center gap-2">
            <span>1 of 16 pages</span>
            <button type="button" className="rounded border border-border p-1 hover:bg-secondary" aria-label="Previous page">
              <ChevronLeft className="h-3 w-3" />
            </button>
            <select className="rounded border border-border bg-background px-2 py-1 text-xs text-foreground" defaultValue={1}>
              <option value={1}>1</option>
              <option value={2}>2</option>
              <option value={3}>3</option>
            </select>
            <button type="button" className="rounded border border-border p-1 hover:bg-secondary" aria-label="Next page">
              <ChevronRight className="h-3 w-3" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
