import { OnPasteContainer } from "@/components/on-paste-container";
import { World } from "@/components/world/world";
import { prefetchUserStickers } from "@/react-query/queries/use-user-stickers";
import { Database } from "@/types/database.types";
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import {
  HydrationBoundary,
  QueryClient,
  dehydrate,
} from "@tanstack/react-query";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export default async function WorldPage() {
  const supabaseClient = createServerComponentClient<Database>({ cookies });

  const {
    data: { user },
  } = await supabaseClient.auth.getUser();

  if (!user) {
    redirect("/login");
  }

  const queryClient = new QueryClient();

  await prefetchUserStickers({
    user_uid: user.id,
    queryClient,
    supabaseClient,
  });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <OnPasteContainer>
        <div className="h-full w-full">
          <World />
        </div>
      </OnPasteContainer>
    </HydrationBoundary>
  );
}
