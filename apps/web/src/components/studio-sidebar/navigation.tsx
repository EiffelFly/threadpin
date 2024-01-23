import * as React from "react";
import Link from "next/link";
import { LayersIcon } from "@radix-ui/react-icons";
import { MapIcon } from "../ui/extra-icons/MapIcon";

export function Navigation() {
  return (
    <div className="border-border flex flex-col gap-y-4 border-b px-6 py-3">
      <NavigationItem
        title="World"
        href="/world"
        icon={<MapIcon className="stroke-muted-foreground h-3 w-3" />}
      />
      <NavigationItem title="Stickers" href="/studio/stickers" icon={<></>} />
      <NavigationItem
        title="All items"
        href="/"
        icon={<LayersIcon className="stroke-muted-foreground h-3 w-3" />}
      />
    </div>
  );
}

function NavigationItem({
  title,
  href,
  icon,
}: {
  title: string;
  href: string;
  icon: React.ReactNode;
}) {
  return (
    <Link
      href={href}
      className="hover:bg-accent flex flex-row items-center gap-x-2 rounded px-2"
    >
      <div className="bg-secondary flex h-5 w-5 items-center justify-center rounded">
        {icon}
      </div>
      <p className="typography-p text-primary">{title}</p>
    </Link>
  );
}
