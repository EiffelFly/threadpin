import * as React from "react";
import {
  DndContext,
  DragEndEvent,
  DragOverEvent,
  DragStartEvent,
  PointerSensor,
  closestCenter,
  useSensor,
  useSensors,
} from "@dnd-kit/core";
import { restrictToVerticalAxis } from "@dnd-kit/modifiers";
import {
  SortableContext,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import { GeneralRecord } from "@/types";

type SortableItem = {
  key: string;
} & GeneralRecord;

export const VerticalSortableWrapper = ({
  onDragEnd,
  children,
  items,
  onDragOver,
  onDragStart,
}: {
  onDragEnd: (event: DragEndEvent) => void;
  onDragStart?: (event: DragStartEvent) => void;
  onDragOver?: (event: DragOverEvent) => void;
  children: React.ReactNode;
  items: SortableItem[];
}) => {
  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        // Require pointer to move by 5 pixels before activating draggable
        // Allows nested onClicks/buttons/interactions to be accessed
        distance: 5,
      },
    })
  );

  return (
    <DndContext
      sensors={sensors}
      collisionDetection={closestCenter}
      onDragEnd={onDragEnd}
      onDragStart={onDragStart}
      onDragOver={onDragOver}
      modifiers={[restrictToVerticalAxis]}
      autoScroll={false}
    >
      <SortableContext
        strategy={verticalListSortingStrategy}
        items={items.map((item) => ({ id: item.key }))}
      >
        {children}
      </SortableContext>
    </DndContext>
  );
};
