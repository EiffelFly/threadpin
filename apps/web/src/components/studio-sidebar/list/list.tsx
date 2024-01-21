"use client";

import Link from "next/link";
import { buttonVariants } from "../../ui/button";
import { cn } from "@/lib/utils";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { ListHandler } from "./handler";

export function List({ id, uid }: { id: string; uid: string }) {
  const {
    attributes,
    listeners,
    setNodeRef,
    setActivatorNodeRef,
    transform,
    transition,
  } = useSortable({
    id: uid,
  });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  return (
    <div
      ref={setNodeRef}
      style={style}
      {...attributes}
      className="group relative flex w-full"
    >
      <div className="absolute left-0 top-0 flex -translate-x-[calc(100%+6px)] flex-row opacity-0 transition-opacity duration-300 group-hover:opacity-100">
        <ListHandler
          list_uid={uid}
          listeners={listeners}
          setActivatorNodeRef={setActivatorNodeRef}
        />
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
