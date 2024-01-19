import * as React from "react";
import { ItemsDisplayMode } from "@/types";
import { Skeleton } from "../ui/skeleton";

export function ListItemsLoading({ mode }: { mode: ItemsDisplayMode }) {
  return (
    <div className="flex w-full flex-col">
      <div className="mb-8 flex w-full flex-row justify-end gap-x-2">
        <Skeleton className="h-10 w-10" />
        <Skeleton className="h-10 w-10" />
      </div>
      <div className="flex flex-col gap-y-4">
        <ListItemSkeleton mode={mode} />
        <ListItemSkeleton mode={mode} />
        <ListItemSkeleton mode={mode} />
      </div>
    </div>
  );
}

export function ListItemSkeleton({ mode }: { mode: ItemsDisplayMode }) {
  return mode === "rich" ? (
    <Skeleton className="h-[150px] w-full" />
  ) : (
    <Skeleton className="h-8 w-full" />
  );
}
