"use client";

import { useUserLists, useUserMe } from "@/react-query";
import * as React from "react";
import { List } from "./list";
import { ListsLoading } from "./lists-loading";

export function Lists() {
  const me = useUserMe({ enabled: true });
  const lists = useUserLists({
    userID: me.data?.user?.id ?? null,
    enabled: me.isSuccess,
  });

  return lists.isSuccess ? (
    <div className="flex w-full flex-col gap-y-4 py-3 pl-8 pr-6">
      {lists.data.map((list) => {
        return <List id={list.id} uid={list.uid} />;
      })}
    </div>
  ) : (
    <ListsLoading />
  );
}
