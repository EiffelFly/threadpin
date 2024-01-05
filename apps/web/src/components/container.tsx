"use client";

import * as React from "react";
import { cn } from "@/lib/utils";

export const Container = ({ children }: { children: React.ReactNode }) => {
  const [isOnEdge, setIsOnEdge] = React.useState(false);
  const [showRotateGradient, setShowRotateGradient] = React.useState(false);

  // React.useEffect(() => {
  //   let timer: NodeJS.Timeout;

  //   if (!isOnEdge) {
  //     setShowRotateGradient(false);
  //     return;
  //   }

  //   timer = setTimeout(() => {
  //     setShowRotateGradient(true);
  //   }, 1000);
  // }, [isOnEdge]);

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
      >
        {children}
      </div>
    </div>
  );
};
