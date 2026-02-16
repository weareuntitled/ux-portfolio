"use client";

import { DashboardShell } from "@/components/ffp-prototype/dashboard-shell";
import { MentioningsPanel } from "@/components/ffp-prototype/mentionings-panel";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Plus, Search, Copy } from "lucide-react";

interface DissTag {
  label: string;
  auto?: boolean;
}

interface DissEntry {
  id: string;
  name: string;
  subId: string;
  description: string;
  vin: string;
  my: number;
  l: string;
  market: string;
  cf: string;
  ffp: string;
  tags: DissTag[];
}

const dissEntries: DissEntry[] = [
  {
    id: "1",
    name: "Name of DISS Entry maybe very long",
    subId: "ID 0120",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam eu turpis elet molestie, dictum est a, mattis tellus. Sed dignissim, metus nec",
    vin: "7a4d57ac28a8167d4",
    my: 2007,
    l: "y",
    market: "DEU",
    cf: "FG-F",
    ffp: "FFP003",
    tags: [
      { label: "Schwarzer Bildschirm" },
      { label: "Lorem Ipsum" },
      { label: "Tag bei maximal 30-35 Zeichen", auto: true },
      { label: "Dolor est" },
      { label: "Dolor est" },
    ],
  },
  {
    id: "2",
    name: "Name of DISS Entry maybe very long",
    subId: "ID 0074",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam eu turpis elet molestie, dictum est a, mattis tellus. Sed dignissim, metus nec",
    vin: "7a4d57ac28a8167d4",
    my: 2016,
    l: "n",
    market: "DNK",
    cf: "FG-MOD",
    ffp: "",
    tags: [
      { label: "Schwarzer Bildschirm" },
      { label: "Dolor est" },
    ],
  },
  {
    id: "3",
    name: "Name of DISS Entry maybe very long",
    subId: "ID 0075",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam eu turpis elet molestie, dictum est a, mattis tellus. Sed dignissim, metus nec",
    vin: "7a4d57ac28a8167d4",
    my: 2009,
    l: "n",
    market: "FRA",
    cf: "FG-F",
    ffp: "FFP027",
    tags: [{ label: "Schwarzer Bildschirm", auto: true }],
  },
];

function DissTagBadge({ tag }: { tag: DissTag }) {
  return (
    <span className="inline-flex items-center gap-1.5 rounded-md bg-primary px-2.5 py-1 text-[11px] text-primary-foreground">
      <span className="grid grid-cols-2 gap-0.5">
        <span className="h-1 w-1 rounded-sm bg-primary-foreground/60" />
        <span className="h-1 w-1 rounded-sm bg-primary-foreground/60" />
        <span className="h-1 w-1 rounded-sm bg-primary-foreground/60" />
        <span className="h-1 w-1 rounded-sm bg-primary-foreground/60" />
      </span>
      {tag.label}
      {tag.auto && (
        <span className="text-primary-foreground/60">| auto</span>
      )}
    </span>
  );
}

export default function DissPage() {
  return (
    <DashboardShell>
      <main className="px-6 py-8 lg:px-10">
        {/* Header */}
        <div className="mb-8 flex items-start justify-between">
          <h1 className="text-2xl font-bold text-foreground md:text-3xl">
            DISS-Overview
          </h1>
          <Button className="gap-2 rounded-full bg-primary text-primary-foreground hover:bg-primary/90">
            <Plus className="h-4 w-4" />
            DISS TAGGING
          </Button>
        </div>

        <div className="flex gap-6">
          {/* Main content */}
          <div className="flex-1 overflow-hidden">
            <div className="rounded-xl border border-border bg-background p-6">
              {/* Section header */}
              <div className="mb-6 flex items-center justify-between">
                <h2 className="text-lg font-bold text-foreground">
                  Newest DISS Entries (Overview)
                </h2>
                <div className="relative flex w-48 items-center">
                  <Search className="absolute left-3 h-4 w-4 text-muted-foreground" />
                  <Input
                    type="search"
                    placeholder="Search"
                    className="h-9 pl-9 focus-visible:ring-0 focus-visible:ring-offset-0"
                  />
                </div>
              </div>

              {/* Table */}
              <div className="overflow-x-auto">
                <Table>
                  <TableHeader>
                    <TableRow className="border-b border-border hover:bg-transparent">
                      <TableHead className="w-[26%] text-xs font-semibold text-muted-foreground">
                        DISS Entries
                      </TableHead>
                      <TableHead className="text-xs font-semibold text-muted-foreground">
                        VIN
                      </TableHead>
                      <TableHead className="text-xs font-semibold text-muted-foreground">
                        MY
                      </TableHead>
                      <TableHead className="w-8 text-xs font-semibold text-muted-foreground">
                        L
                      </TableHead>
                      <TableHead className="text-xs font-semibold text-muted-foreground">
                        Market
                      </TableHead>
                      <TableHead className="text-xs font-semibold text-muted-foreground">
                        CF
                      </TableHead>
                      <TableHead className="text-xs font-semibold text-muted-foreground">
                        FFP
                      </TableHead>
                      <TableHead className="text-xs font-semibold text-muted-foreground">
                        Assigned DISS tags
                      </TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {dissEntries.map((entry) => (
                      <TableRow
                        key={entry.id}
                        className="cursor-pointer border-b border-border align-top transition-colors hover:bg-secondary/50"
                      >
                        {/* Entry info */}
                        <TableCell className="py-4">
                          <p className="font-semibold text-foreground">
                            {entry.name}
                          </p>
                          <p className="text-xs text-primary">- {entry.subId}</p>
                          <p className="mt-2 text-xs leading-relaxed text-muted-foreground">
                            {entry.description}
                          </p>
                        </TableCell>
                        {/* VIN */}
                        <TableCell className="py-4">
                          <div className="flex items-center gap-1 text-xs text-foreground">
                            <span className="font-mono">{entry.vin}</span>
                            <button type="button" aria-label="Copy VIN">
                              <Copy className="h-3 w-3 text-muted-foreground" />
                            </button>
                          </div>
                          <p className="mt-0.5 font-mono text-xs text-foreground">
                            29f3785834ef24b
                          </p>
                        </TableCell>
                        {/* MY */}
                        <TableCell className="py-4 text-xs text-foreground">
                          {entry.my}
                        </TableCell>
                        {/* L */}
                        <TableCell className="py-4 text-xs text-foreground">
                          {entry.l}
                        </TableCell>
                        {/* Market */}
                        <TableCell className="py-4 text-xs text-foreground">
                          {entry.market}
                        </TableCell>
                        {/* CF */}
                        <TableCell className="py-4 text-xs text-foreground">
                          {entry.cf}
                        </TableCell>
                        {/* FFP */}
                        <TableCell className="py-4">
                          {entry.ffp ? (
                            <span className="text-xs font-medium text-foreground underline">
                              {entry.ffp}
                            </span>
                          ) : (
                            <div className="text-center">
                              <p className="text-xs text-muted-foreground">
                                Not added
                              </p>
                              <p className="text-xs text-muted-foreground">
                                to FFP yet
                              </p>
                              <button
                                type="button"
                                className="mt-1 text-muted-foreground hover:text-primary"
                                aria-label="Add to FFP"
                              >
                                +
                              </button>
                            </div>
                          )}
                        </TableCell>
                        {/* Tags */}
                        <TableCell className="py-4">
                          <div className="flex flex-wrap gap-1.5">
                            {entry.tags.map((tag, i) => (
                              <DissTagBadge key={`${entry.id}-tag-${i}`} tag={tag} />
                            ))}
                            {entry.tags.length > 3 && (
                              <span className="flex items-center text-xs text-muted-foreground">
                                +{entry.tags.length - 3}
                              </span>
                            )}
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>

              {/* Copy icon at bottom */}
              <div className="mt-4 flex justify-center">
                <Copy className="h-4 w-4 text-muted-foreground" />
              </div>
            </div>
          </div>

          {/* Mentionings */}
          <div className="hidden xl:block">
            <MentioningsPanel />
          </div>
        </div>
      </main>
    </DashboardShell>
  );
}
