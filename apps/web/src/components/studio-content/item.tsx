import { ItemsDisplayMode, Nullable } from "@/types";
import Image from "next/image";

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
    <div className="flex flex-col gap-y-1">
      <p className="typography-large text-foreground">{title}</p>
      <p className="typography-muted text-muted-foreground">{url}</p>
    </div>
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
    <div className="border-border flex flex-row gap-x-4 rounded border p-4">
      {ogImage ? (
        <div className="relative h-full min-w-[200px]">
          <Image className="object-contain" fill src={ogImage} alt={title} />
        </div>
      ) : null}
      <div className="flex flex-col gap-y-2">
        <p className="typography-large text-foreground">{title}</p>
        <p className="typography-muted text-muted-foreground">{description}</p>
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
