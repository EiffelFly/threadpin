"use client";

import * as React from "react";
import { toast } from "sonner";
import { usePinStore } from "@/store/usePinStore";
import { cn } from "@/lib/utils";

export const OnPasteContainer = ({
  children,
  className,
  ...passThrough
}: {
  children: React.ReactNode;
  className?: string;
} & React.HtmlHTMLAttributes<HTMLDivElement>) => {
  const updateProcessingURLDrawerState = usePinStore(
    (store) => store.updateProcessingURLDrawerState
  );

  return (
    <div
      {...passThrough}
      onPaste={(e) => {
        // Check nopaste class
        if (
          !(e.target as Element).className.includes("no-activate-paste-drawer")
        ) {
          const pastedString = e.clipboardData.getData("text/plain");
          if (pastedString) {
            try {
              const url = new URL(pastedString);
              updateProcessingURLDrawerState(() => ({
                open: true,
                url: url,
              }));
            } catch (err) {
              toast.error("Invalid URL", {
                duration: 1000,
              });
            }
          }
        }
      }}
      className={cn("h-full w-full", className)}
    >
      {children}
    </div>
  );
};
