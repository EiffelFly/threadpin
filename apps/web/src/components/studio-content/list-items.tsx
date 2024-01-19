"use client";

import * as React from "react";
import { useUserMe } from "@/react-query";
import { useUserListItems } from "@/react-query/";
import { Item } from "./list-item";
import { Button } from "../ui/button";
import { ViewGridIcon, ViewHorizontalIcon } from "@radix-ui/react-icons";
import { ItemsDisplayMode } from "@/types";
import { Skeleton } from "../ui/skeleton";
import { ListItemsLoading } from "./list-items-loading";

export function ListItems({ list_uid }: { list_uid: string }) {
  const me = useUserMe({ enabled: true });
  const listItems = useUserListItems({
    userID: me.isSuccess ? me.data.user.id : null,
    listID: list_uid,
    enabled: me.isSuccess,
  });

  const [mode, setMode] = React.useState<ItemsDisplayMode>("rich");

  return listItems.isSuccess ? (
    <div className="flex w-full flex-col">
      <div className="mb-8 flex w-full flex-row justify-end gap-x-2">
        <Button
          onClick={() => setMode("simple")}
          className="h-10 w-10 p-0"
          variant="outline"
        >
          <ViewHorizontalIcon className="h-3 w-3" />
        </Button>
        <Button
          onClick={() => setMode("rich")}
          className="h-10 w-10 p-0"
          variant="outline"
        >
          <ViewGridIcon className="h-3 w-3" />
        </Button>
      </div>
      <div className="flex flex-1 flex-col gap-y-4">
        {listItems.data.length > 0 ? (
          listItems.data.map((item) => {
            if (!item.items) {
              return null;
            }

            return (
              <Item
                mode={mode}
                url={item.items.url}
                title={item.items.name}
                description={item.items.description}
                ogImage={item.items.og_image}
              />
            );
          })
        ) : (
          <div className=" flex h-full w-full flex-1 items-center justify-center rounded-sm">
            Copy and paste url to add items in this list
          </div>
        )}
      </div>
    </div>
  ) : (
    <ListItemsLoading mode="rich" />
  );
}
