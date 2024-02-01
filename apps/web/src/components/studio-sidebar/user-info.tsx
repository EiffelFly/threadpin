"use client";

import { useUserMe, useUserProfile } from "@/react-query";
import { UserInfoLoading } from "./user-info-loading";

export function UserInfo() {
  const me = useUserMe({ enabled: true });
  const profile = useUserProfile({
    user_uid: me.isSuccess ? me.data.user.id : null,
    enabled: me.isSuccess,
  });

  return me.isSuccess && profile.isSuccess ? (
    <div className="border-border w-full border-b px-4 py-3">
      <span className="">
        {profile.data.first_name && profile.data.last_name
          ? `${profile.data?.first_name} ${profile.data.last_name}`
          : me.data.user.email?.split("@")[0]}
      </span>
    </div>
  ) : (
    <UserInfoLoading />
  );
}
