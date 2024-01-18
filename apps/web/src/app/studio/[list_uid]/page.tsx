import * as React from "react";

import { getUserQuery } from "@/supabase-query";
import { Database } from "@/types/database.types";
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { prefetchUserListItems } from "@/react-query/queries/use-user-list-items/server";
import {
  HydrationBoundary,
  QueryClient,
  dehydrate,
} from "@tanstack/react-query";
import { ListItems } from "@/components/studio-content/list-items";

export default async function Page({
  params,
}: {
  params: { list_uid: string };
}) {
  const supabaseClient = createServerComponentClient<Database>({
    cookies,
  });

  const { data } = await getUserQuery(supabaseClient);

  if (!data.user) {
    redirect("/login");
  }

  const queryClient = new QueryClient();
  await prefetchUserListItems({
    supabaseClient,
    queryClient,
    listID: params.list_uid,
    userID: data.user.id,
  });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <ListItems list_uid={params.list_uid} />
    </HydrationBoundary>
  );
}
