import * as React from "react";
import { Skeleton } from "../ui/skeleton";

export function ListsLoading() {
  return (
    <div className="flex w-full flex-col gap-y-4 py-3 pl-8 pr-6">
      <Skeleton className="flex h-7 w-full" />
      <Skeleton className="flex h-7 w-full" />
      <Skeleton className="flex h-7 w-full" />
    </div>
  );
}
