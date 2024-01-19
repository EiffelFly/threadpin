"use client";

import Link from "next/link";
import { Button, buttonVariants } from "../ui/button";
import { Skeleton } from "../ui/skeleton";
import { cn } from "@/lib/utils";
import { DragHandleDots2Icon } from "@radix-ui/react-icons";
import { Popover } from "../ui/popover";
import { PopoverContent, PopoverTrigger } from "@radix-ui/react-popover";

export function List({ id, uid }: { id: string; uid: string }) {
  return (
    <div className="group relative flex w-full">
      <div className="absolute left-0 top-0 flex -translate-x-[calc(100%+6px)] flex-row opacity-0 transition-opacity duration-300 group-hover:opacity-100">
        <Popover>
          <PopoverTrigger asChild>
            <Button variant="ghost" className="rounded p-0.5">
              <DragHandleDots2Icon className="h-4 w-4" />
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-60">Hello</PopoverContent>
        </Popover>
      </div>
      <Link
        href={`/studio/${uid}`}
        className={cn(
          buttonVariants({ variant: "outline" }),
          "w-full justify-start"
        )}
      >
        <p className="typography-p text-primary">{id}</p>
      </Link>
    </div>
  );
}
