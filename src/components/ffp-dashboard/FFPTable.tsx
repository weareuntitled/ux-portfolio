"use client";

import { FFP } from "@/lib/ffp-dashboard/types";
import { statusColors } from "@/lib/ffp-dashboard/mock-data";
import { ChevronRight, TrendingUp, TrendingDown } from "lucide-react";
import { cn } from "@/lib/utils";

interface FFPTableProps {
  title: string;
  ffps: FFP[];
  onFFPSelect: (ffp: FFP) => void;
  isLoading?: boolean;
}

export function FFPTable({
  title,
  ffps,
  onFFPSelect,
  isLoading = false,
}: FFPTableProps) {
  return (
    <div className="mb-8">
      <h3 className="text-lg font-semibold text-foreground mb-4 text-muted-foreground">
        {title}
      </h3>
      <div className="bg-card border border-border rounded-lg overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <tbody>
              {isLoading ? (
                <tr>
                  <td
                    colSpan={6}
                    className="p-8 text-center text-muted-foreground"
                  >
                    Loading...
                  </td>
                </tr>
              ) : ffps.length === 0 ? (
                <tr>
                  <td
                    colSpan={6}
                    className="p-8 text-center text-muted-foreground"
                  >
                    No FFPs found
                  </td>
                </tr>
              ) : (
                ffps.map((ffp) => (
                  <tr
                    key={ffp.id}
                    onClick={() => onFFPSelect(ffp)}
                    className="border-t border-border hover:bg-secondary/30 cursor-pointer transition-colors"
                  >
                    <td className="p-4 text-muted-foreground font-mono text-xs w-16">
                      {ffp.id.replace("FFP-", "")}
                    </td>
                    <td className="p-4 text-muted-foreground font-mono text-xs w-20">
                      {ffp.count}
                    </td>
                    <td className="p-4">
                      <div className="flex items-center gap-2">
                        {ffp.percentChange > 0 ? (
                          <TrendingUp className="w-4 h-4 text-destructive" />
                        ) : (
                          <TrendingDown className="w-4 h-4 text-green-500" />
                        )}
                        <span
                          className={cn(
                            "font-mono text-xs",
                            ffp.percentChange > 0
                              ? "text-destructive"
                              : "text-green-500"
                          )}
                        >
                          {ffp.percentChange > 0 ? "+" : ""}
                          {ffp.percentChange}%
                        </span>
                      </div>
                    </td>
                    <td className="p-4 text-muted-foreground font-mono text-xs">
                      {ffp.value}
                    </td>
                    <td className="p-4 text-xs">
                      {ffp.vstCode && (
                        <span className="text-muted-foreground">
                          {ffp.vstCode}
                        </span>
                      )}
                    </td>
                    <td className="p-4">
                      <div className="flex items-center justify-between">
                        <p className="text-foreground line-clamp-1 max-w-xs">
                          {ffp.name}
                        </p>
                        <ChevronRight className="w-4 h-4 text-muted-foreground ml-4 flex-shrink-0" />
                      </div>
                    </td>
                    <td className="p-4 text-right">
                      <span
                        className={cn(
                          "inline-block px-3 py-1 rounded-full text-xs font-medium",
                          statusColors[ffp.status] ||
                            "bg-muted text-muted-foreground"
                        )}
                      >
                        {ffp.status}
                      </span>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
