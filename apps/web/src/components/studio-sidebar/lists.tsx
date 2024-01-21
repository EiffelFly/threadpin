"use client";

import { useUserLists, useUserMe, useUserProfile } from "@/react-query";
import * as React from "react";
import { List } from "./list/list";
import { ListsLoading } from "./lists-loading";
import { VerticalSortableWrapper } from "../vertical-sortable-wrapper";
import { Database } from "@/types/database.types";
import { ListsOrderRecordSchema } from "@/lib/validator";
import { arrayMove } from "@dnd-kit/sortable";
import { DragEndEvent } from "@dnd-kit/core";
import { useUpdateUserProfile } from "@/react-query/mutations/use-update-user-profile";
import { toastError } from "@/lib/toast-error";

export function Lists() {
  const me = useUserMe({ enabled: true });
  const profile = useUserProfile({
    user_id: me.isSuccess ? me.data.user.id : null,
    enabled: me.isSuccess,
  });
  const lists = useUserLists({
    userID: me.isSuccess ? me.data.user.id : null,
    enabled: me.isSuccess,
  });

  const [listsInOrder, setListsInOrder] = React.useState<
    Database["public"]["Tables"]["lists"]["Row"][]
  >([]);

  React.useEffect(() => {
    if (!profile.isSuccess || !lists.isSuccess) {
      return;
    }

    if (!profile.data.lists_order_record) {
      setListsInOrder(lists.data);
      return;
    }

    const parsed = ListsOrderRecordSchema.safeParse(
      profile.data.lists_order_record
    );

    if (!parsed.success) {
      setListsInOrder(lists.data);
      return;
    }

    const listsRecordInOrder = parsed.data.sort((a, b) => {
      return a.order - b.order;
    });

    const listsInOrder: Database["public"]["Tables"]["lists"]["Row"][] = [];

    for (const record of listsRecordInOrder) {
      const list = lists.data.find((list) => list.uid === record.list_uid);
      if (list) {
        listsInOrder.push(list);
      }
    }

    for (const list of lists.data) {
      if (!listsInOrder.some((listInOrder) => listInOrder.uid === list.uid)) {
        listsInOrder.push(list);
      }
    }

    setListsInOrder(listsInOrder);
  }, [profile.data, profile.isSuccess, lists.isSuccess, lists.data]);

  const updateUserProfile = useUpdateUserProfile();
  const onDragEnd = React.useCallback(
    async (event: DragEndEvent) => {
      if (!me.isSuccess) return;

      const { active, over } = event;

      if (over && active.id !== over.id) {
        const oldIndex = listsInOrder.findIndex((e) => e.uid === active.id);
        const newIndex = listsInOrder.findIndex((e) => e.uid === over.id);

        const newLists = arrayMove(listsInOrder, oldIndex, newIndex);

        const newListsOrderRecord = newLists.map((list, index) => {
          return {
            list_uid: list.uid,
            order: index,
          };
        });

        try {
          setListsInOrder(newLists);
          await updateUserProfile.mutateAsync({
            user_id: me.data.user.id,
            payload: {
              lists_order_record: newListsOrderRecord,
            },
          });
        } catch (error) {
          setListsInOrder(listsInOrder);
          toastError("Failed to update your lists order", 3000);
        }
      }
    },
    [listsInOrder]
  );

  return lists.isSuccess && profile.isSuccess ? (
    <VerticalSortableWrapper
      onDragEnd={onDragEnd}
      items={listsInOrder.map((list) => ({
        key: list.uid,
      }))}
    >
      <div className="flex w-full flex-col gap-y-4 py-3 pl-8 pr-6">
        {listsInOrder.map((list) => {
          return <List key={list.uid} id={list.id} uid={list.uid} />;
        })}
      </div>
    </VerticalSortableWrapper>
  ) : (
    <ListsLoading />
  );
}
