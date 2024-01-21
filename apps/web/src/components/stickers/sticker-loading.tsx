"use client";

import { Skeleton } from "../ui/skeleton";

export function StickerLoading() {
  return (
    <div className="flex w-full flex-col">
      <div className="mb-8 flex w-full flex-row justify-end gap-x-2">
        <Skeleton className="h-10 w-20" />
      </div>
      <div className="flex flex-row flex-wrap gap-4">
        <StickerSkeleton />
        <StickerSkeleton />
        <StickerSkeleton />
        <StickerSkeleton />
        <StickerSkeleton />
        <StickerSkeleton />
      </div>
    </div>
  );
}

export function StickerSkeleton() {
  return (
    <div className="flex flex-col gap-y-4">
      <Skeleton className="flex h-[200px] w-[200px] shrink-0 grow-0 rounded-lg" />
      <Skeleton className="flex h-7 w-full rounded-lg" />
    </div>
  );
}
