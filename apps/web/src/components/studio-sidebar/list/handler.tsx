import * as React from "react";
import { Button } from "@/components/ui/button";
import { SyntheticListenerMap } from "@dnd-kit/core/dist/hooks/utilities";
import { DragHandleDots2Icon, TrashIcon } from "@radix-ui/react-icons";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { useDeleteList } from "@/react-query/mutations/use-delete-list";
import { useUpdateUserProfile } from "@/react-query/mutations/use-update-user-profile";
import { useUserMe, useUserProfile } from "@/react-query";
import { ListsOrderRecordSchema } from "@/lib/validator";
import { toastError } from "@/lib/toast-error";

export function ListHandler({
  list_uid,
  listeners,
  setActivatorNodeRef,
}: {
  list_uid: string;
  listeners?: SyntheticListenerMap;
  setActivatorNodeRef: (element: HTMLElement | null) => void;
}) {
  const me = useUserMe({ enabled: true });
  const profile = useUserProfile({
    enabled: me.isSuccess,
    user_id: me.isSuccess ? me.data.user.id : null,
  });

  const deleteList = useDeleteList();
  const updateUserProfile = useUpdateUserProfile();
  const handleDeleteList = React.useCallback(async () => {
    if (!profile.isSuccess || !me.isSuccess) {
      return;
    }

    try {
      await deleteList.mutateAsync({ list_uid, user_id: me.data.user.id });
    } catch (error) {
      toastError("Failed to delete list");
    }

    const { lists_order_record } = profile.data;

    if (!lists_order_record) {
      return;
    }

    const parsed = ListsOrderRecordSchema.safeParse(lists_order_record);

    if (!parsed.success) {
      return;
    }

    const listsInOrder = parsed.data.filter(
      (record) => record.list_uid !== list_uid
    );

    try {
      await updateUserProfile.mutateAsync({
        user_id: me.data.user.id,
        payload: {
          lists_order_record: listsInOrder,
        },
      });
    } catch (error) {
      toastError("Failed to update user profile");
    }
  }, [
    deleteList,
    list_uid,
    me.data,
    me.isSuccess,
    profile.data,
    profile.isSuccess,
    updateUserProfile,
  ]);

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          {...listeners}
          ref={setActivatorNodeRef}
          variant="ghost"
          className="my-auto rounded px-0.5"
        >
          <DragHandleDots2Icon className="h-4 w-4" />
        </Button>
      </PopoverTrigger>
      <PopoverContent
        side="right"
        sideOffset={20}
        className="bg-muted z-30 w-[280px] rounded-lg p-2"
      >
        <div className="flex h-full w-full flex-col gap-y-4">
          <button
            onClick={() => handleDeleteList()}
            className="hover:bg-primary/10 flex w-full cursor-pointer flex-row justify-start gap-x-4 rounded px-2 py-1"
          >
            <TrashIcon className="stroke-muted-foreground my-auto h-4 w-4" />
            <span className="text-muted-foreground my-auto">Delete</span>
          </button>
        </div>
      </PopoverContent>
    </Popover>
  );
}
