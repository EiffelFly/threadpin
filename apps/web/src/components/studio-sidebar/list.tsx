"use client";

import Link from "next/link";
import { buttonVariants } from "../ui/button";
import { Skeleton } from "../ui/skeleton";
import { cn } from "@/lib/utils";

export function ListSkeleton() {
  return (
    <div className="flex rounded-lg py-1">
      <Skeleton className="my-auto flex h-7 w-full" />
    </div>
  );
}

export function List({ id, uid }: { id: string; uid: string }) {
  return (
    <Link
      href={`/studio/${uid}`}
      className={cn(buttonVariants({ variant: "outline" }), "justify-start")}
    >
      <p className="typography-p text-primary">{id}</p>
    </Link>
  );
}
