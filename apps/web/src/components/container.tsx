"use client";

import * as React from "react";
import { cn } from "@/lib/utils";
import { toast } from "sonner";
import { ProcessingURLDrawer } from "./processing-url-drawer";
import { Nullable } from "@/types";

export const Container = ({ children }: { children: React.ReactNode }) => {
  const [isOnEdge, setIsOnEdge] = React.useState(false);
  const [openProcessingURLDrawer, setOpenProcessingURLDrawer] =
    React.useState(false);
  const [url, setUrl] = React.useState<Nullable<URL>>(null);

  return (
    <div
      onMouseOver={(e) => {
        e.stopPropagation();
        setIsOnEdge(true);
      }}
      onMouseOut={(e) => {
        e.stopPropagation();
        setIsOnEdge(false);
      }}
      onPaste={(e) => {
        const pastedString = e.clipboardData.getData("text/plain");
        if (pastedString) {
          try {
            const url = new URL(pastedString);
            setOpenProcessingURLDrawer(true);
            console.log("url", url);
            setUrl(url);
          } catch (err) {
            toast.error("Invalid URL", {
              duration: 1000,
            });
            setUrl(null);
          }
        }
      }}
      className="relative w-full p-[var(--root-padding)]"
    >
      <div
        onMouseOver={(e) => {
          e.stopPropagation();
          setIsOnEdge(false);
        }}
        className={cn(
          "border-border rotate-gradient bg-background z-10 flex h-[calc(100vh-calc(var(--root-padding)*2))] w-[calc(100vw-calc(var(--root-padding)*2))] flex-row rounded-lg border p-[1px] transition-colors duration-500",
          isOnEdge ? "hover" : ""
        )}
        onPaste={(e) => {
          e.preventDefault();
        }}
      >
        {children}
      </div>
    </div>
  );
};
