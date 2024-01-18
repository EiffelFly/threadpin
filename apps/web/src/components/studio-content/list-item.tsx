"use client";

import { ItemsDisplayMode, Nullable } from "@/types";

export function Item({
  url,
  title,
  mode,
  ogImage,
  description,
}: {
  url: string;
  title: string;
  ogImage: Nullable<string>;
  description: Nullable<string>;
  mode: ItemsDisplayMode;
}) {
  return mode === "simple" ? (
    <ListItem url={url} title={title} />
  ) : (
    <RichListItem
      url={url}
      title={title}
      ogImage={ogImage}
      description={description}
    />
  );
}

function ListItem({ url, title }: { url: string; title: string }) {
  return (
    <a
      href={url}
      className="typography-large text-foreground break-all hover:cursor-pointer hover:!underline"
    >
      {title}
    </a>
  );
}

function RichListItem({
  url,
  title,
  ogImage,
  description,
}: {
  url: string;
  title: string;
  ogImage: Nullable<string>;
  description: Nullable<string>;
}) {
  return (
    <div className="border-border flex h-[150px] flex-row gap-x-4 rounded border p-4">
      {ogImage ? (
        <div className="flex h-full w-[200px] shrink-0 grow-0">
          {/* <Image className="object-contain" fill src={ogImage} alt={title} /> */}
          <img className="object-contain" src={ogImage} alt={title} />
        </div>
      ) : null}
      <div className="flex flex-col gap-y-2">
        <p className="typography-large text-foreground">{title}</p>
        <p className="typography-muted text-muted-foreground">
          <span className="line-clamp-2">{description}</span>
        </p>
        <a
          href={url}
          className="typography-muted !text-muted-foreground/60 hover:!text-muted-foreground break-all hover:cursor-pointer hover:underline"
        >
          {url}
        </a>
      </div>
    </div>
  );
}
