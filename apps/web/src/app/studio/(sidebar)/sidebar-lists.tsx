import { Lists } from "@/components/studio-sidebar/lists";
import { prefetchUserLists } from "@/react-query";
import { Database } from "@/types/database.types";
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import {
  HydrationBoundary,
  QueryClient,
  dehydrate,
} from "@tanstack/react-query";
import { redirect } from "next/navigation";
import { cookies } from "next/headers";

export async function SidebarLists() {
  const client = createServerComponentClient<Database>({ cookies });

  const {
    data: { user },
  } = await client.auth.getUser();

  if (!user) {
    redirect("/login");
  }

  const queryClient = new QueryClient();
  await prefetchUserLists({
    queryClient,
    supabaseClient: client,
    userID: user.id,
  });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <Lists />
    </HydrationBoundary>
  );
}
