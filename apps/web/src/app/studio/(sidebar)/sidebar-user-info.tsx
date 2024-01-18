import { Database } from "@/types/database.types";
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export async function SidebarUserInfo() {
  const supabase = createServerComponentClient<Database>({ cookies });

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect("/login");
  }

  const profile = await supabase
    .from("profiles")
    .select("*")
    .eq("id", user.id)
    .single();

  return (
    <div className="border-border w-full border-b px-4 py-3">
      <span className="">
        {profile.data?.first_name && profile.data.last_name
          ? `${profile.data?.first_name} ${profile.data?.last_name}`
          : user.email?.split("@")[0]}
      </span>
    </div>
  );
}
