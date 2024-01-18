import * as React from "react";
import { ListSkeleton } from "@/components/studio-sidebar/list";

export function ListsLoading() {
  return (
    <React.Fragment>
      {Array.from({ length: 3 }).map((_, i) => (
        <ListSkeleton key={i} />
      ))}
    </React.Fragment>
  );
}
