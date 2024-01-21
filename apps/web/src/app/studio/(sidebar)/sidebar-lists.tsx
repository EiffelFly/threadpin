import { Lists } from "@/components/studio-sidebar/lists";
import { prefetchUserLists, prefetchUserProfile } from "@/react-query";
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
  const supabaseClient = createServerComponentClient<Database>({ cookies });

  const {
    data: { user },
  } = await supabaseClient.auth.getUser();

  if (!user) {
    redirect("/login");
  }

  const queryClient = new QueryClient();
  await prefetchUserLists({
    queryClient,
    supabaseClient,
    userID: user.id,
  });

  await prefetchUserProfile({
    queryClient,
    supabaseClient,
    user_id: user.id,
  });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <Lists />
    </HydrationBoundary>
  );
}
