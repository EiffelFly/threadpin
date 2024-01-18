import * as React from "react";
import { ListItemSkeleton } from "./list-items";
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
        {Array.from({ length: 3 }).map((_, i) => (
          <ListItemSkeleton mode={mode} key={i} />
        ))}
      </div>
    </div>
  );
}
