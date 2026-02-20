"use client";

import { FFP } from "@/lib/ffp-dashboard/types";
import { X, ChevronDown, MessageCircle, Paperclip, Copy, Share2 } from "lucide-react";
import { useState } from "react";
import { cn } from "@/lib/utils";

interface FFPDetailPanelProps {
  ffp: FFP | null;
  isOpen: boolean;
  onClose: () => void;
}

export function FFPDetailPanel({ ffp, isOpen, onClose }: FFPDetailPanelProps) {
  const [expandedSections, setExpandedSections] = useState<Set<string>>(
    new Set()
  );

  const toggleSection = (title: string) => {
    const newExpanded = new Set(expandedSections);
    if (newExpanded.has(title)) {
      newExpanded.delete(title);
    } else {
      newExpanded.add(title);
    }
    setExpandedSections(newExpanded);
  };

  if (!ffp) return null;

  return (
    <>
      {/* Overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-30 lg:hidden"
          onClick={onClose}
        />
      )}

      {/* Detail Panel */}
      <div
        className={cn(
          "fixed lg:static right-0 top-0 h-screen w-full lg:w-96 bg-card border-l border-border overflow-y-auto transition-transform duration-300 z-[35]",
          isOpen ? "translate-x-0" : "translate-x-full lg:translate-x-0",
          "lg:flex lg:flex-col"
        )}
      >
        {/* Header */}
        <div className="sticky top-0 bg-card border-b border-border p-4 flex items-start justify-between">
          <div className="flex-1">
            <div className="flex items-center gap-2 mb-2">
              <span className="text-xs font-mono text-muted-foreground">
                {ffp.id}
              </span>
              <span className="text-xs px-2 py-1 bg-green-900/30 text-green-300 rounded">
                {ffp.status}
              </span>
            </div>
            <h2 className="text-sm font-semibold text-foreground line-clamp-2">
              {ffp.name}
            </h2>
          </div>
          <button
            onClick={onClose}
            className="lg:hidden p-2 hover:bg-secondary rounded-lg transition-colors"
            aria-label="Close panel"
          >
            <X className="w-5 h-5 text-muted-foreground" />
          </button>
        </div>

        {/* Action buttons */}
        <div className="flex gap-2 px-4 py-3 border-b border-border">
          <button
            title="Copy"
            className="p-2 hover:bg-secondary rounded-lg transition-colors"
          >
            <Copy className="w-4 h-4 text-muted-foreground" />
          </button>
          <button
            title="Share"
            className="p-2 hover:bg-secondary rounded-lg transition-colors"
          >
            <Share2 className="w-4 h-4 text-muted-foreground" />
          </button>
        </div>

        {/* Description section */}
        {ffp.description && (
          <div className="px-4 py-4 border-b border-border">
            <p className="text-xs leading-relaxed text-muted-foreground">
              {ffp.description}
            </p>
          </div>
        )}

        {/* Info grid */}
        {(ffp.kpmId ||
          ffp.tpiId ||
          ffp.pccId ||
          ffp.lastUpdate ||
          ffp.opened) && (
          <div className="px-4 py-4 border-b border-border grid grid-cols-2 gap-4 text-xs">
            {ffp.kpmId && (
              <div>
                <p className="text-muted-foreground font-medium mb-1">
                  KPM ID
                </p>
                <p className="text-foreground font-mono">{ffp.kpmId}</p>
              </div>
            )}
            {ffp.tpiId && (
              <div>
                <p className="text-muted-foreground font-medium mb-1">
                  TPI ID
                </p>
                <p className="text-foreground font-mono">{ffp.tpiId}</p>
              </div>
            )}
            {ffp.pccId && (
              <div>
                <p className="text-muted-foreground font-medium mb-1">PCCs</p>
                <p className="text-foreground font-mono">{ffp.pccId}</p>
              </div>
            )}
            {ffp.lastUpdate && (
              <div>
                <p className="text-muted-foreground font-medium mb-1">
                  Last Update
                </p>
                <p className="text-foreground font-mono">{ffp.lastUpdate}</p>
              </div>
            )}
            {ffp.opened && (
              <div>
                <p className="text-muted-foreground font-medium mb-1">
                  Opened
                </p>
                <p className="text-foreground font-mono">{ffp.opened}</p>
              </div>
            )}
          </div>
        )}

        {/* Comments section */}
        {ffp.comments && ffp.comments.length > 0 && (
          <div className="px-4 py-4 border-b border-border">
            <div className="flex items-center gap-2 mb-4">
              <MessageCircle className="w-4 h-4 text-muted-foreground" />
              <h3 className="text-sm font-semibold text-foreground">
                Comments
              </h3>
            </div>
            <div className="space-y-3 max-h-40 overflow-y-auto">
              {ffp.comments.map((comment) => (
                <div key={comment.id} className="text-xs">
                  <div className="flex items-center gap-2 mb-1">
                    <span className="w-6 h-6 rounded-full bg-secondary flex items-center justify-center flex-shrink-0">
                      {comment.avatar}
                    </span>
                    <span className="font-medium text-foreground">
                      {comment.author}
                    </span>
                    <span className="text-muted-foreground">
                      {comment.timestamp}
                    </span>
                  </div>
                  <p className="text-muted-foreground ml-8">{comment.text}</p>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Expandable sections */}
        {ffp.sections && ffp.sections.length > 0 && (
          <div className="px-4 py-4 space-y-2 border-b border-border">
            {ffp.sections.map((section, index) => (
              <div key={index} className="border border-border rounded-lg">
                <button
                  onClick={() => toggleSection(section.title)}
                  className="w-full flex items-center justify-between p-4 hover:bg-secondary/30 transition-colors"
                >
                  <h3 className="text-sm font-semibold text-foreground">
                    {section.title}
                  </h3>
                  <ChevronDown
                    className={cn(
                      "w-4 h-4 text-muted-foreground transition-transform",
                      expandedSections.has(section.title) && "rotate-180"
                    )}
                  />
                </button>

                {expandedSections.has(section.title) && (
                  <div className="px-4 py-3 bg-secondary/20 border-t border-border space-y-3">
                    {section.content.map((item, itemIndex) => (
                      <div key={itemIndex}>
                        {item.name && (
                          <p className="text-xs font-semibold text-foreground mb-2">
                            {item.name}
                          </p>
                        )}
                        <div className="flex flex-wrap gap-2">
                          {item.attributes.map((attr, attrIndex) => (
                            <span
                              key={attrIndex}
                              className="inline-block bg-secondary/50 text-foreground text-xs px-2 py-1 rounded font-mono"
                            >
                              {attr.key}:{" "}
                              <span className="font-normal">{attr.value}</span>
                            </span>
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>
        )}

        {/* Attachments section */}
        {ffp.attachments && ffp.attachments.length > 0 && (
          <div className="px-4 py-4 border-b border-border">
            <div className="flex items-center gap-2 mb-4">
              <Paperclip className="w-4 h-4 text-muted-foreground" />
              <h3 className="text-sm font-semibold text-foreground">
                Attachments
              </h3>
            </div>
            <div className="grid grid-cols-3 gap-3">
              {ffp.attachments.map((attachment) => (
                <div
                  key={attachment.id}
                  className="aspect-square border border-border rounded-lg flex items-center justify-center hover:bg-secondary/30 cursor-pointer transition-colors"
                >
                  {attachment.type === "image" && (
                    <div className="text-center text-xs text-muted-foreground">
                      <div className="w-8 h-8 mx-auto mb-1 border border-border rounded flex items-center justify-center">
                        🖼️
                      </div>
                      <p>Image</p>
                    </div>
                  )}
                  {attachment.type === "video" && (
                    <div className="text-center text-xs text-muted-foreground">
                      <div className="w-8 h-8 mx-auto mb-1 border border-border rounded flex items-center justify-center">
                        ▶️
                      </div>
                      <p>Video</p>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </>
  );
}
