import { Stickers } from "@/components/stickers/stickers";
import { prefetchUserStickers } from "@/react-query/queries/use-user-stickers";
import { getUserQuery } from "@/supabase-query";
import { Database } from "@/types/database.types";
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import {
  HydrationBoundary,
  QueryClient,
  dehydrate,
} from "@tanstack/react-query";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export default async function StickersPage() {
  const supabaseClient = createServerComponentClient<Database>({
    cookies,
  });

  const { data } = await getUserQuery(supabaseClient);

  if (!data.user) {
    redirect("/login");
  }

  const queryClient = new QueryClient();

  await prefetchUserStickers({
    user_uid: data.user.id,
    queryClient,
    supabaseClient,
  });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <Stickers />
    </HydrationBoundary>
  );
}
