import { UserInfo } from "@/components/studio-sidebar/user-info";
import { prefetchUserProfile } from "@/react-query";
import { Database } from "@/types/database.types";
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import {
  HydrationBoundary,
  QueryClient,
  dehydrate,
} from "@tanstack/react-query";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export async function SidebarUserInfo() {
  const supabaseClient = createServerComponentClient<Database>({ cookies });

  const {
    data: { user },
  } = await supabaseClient.auth.getUser();

  if (!user) {
    redirect("/login");
  }

  const queryClient = new QueryClient();
  await prefetchUserProfile({
    user_id: user.id,
    queryClient,
    supabaseClient,
  });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <UserInfo />
    </HydrationBoundary>
  );
}
