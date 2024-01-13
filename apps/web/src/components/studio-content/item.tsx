import { ItemsDisplayMode } from "@/types";

export function Item({
  url,
  title,
  mode,
  ogImage,
  description,
}: {
  url: string;
  title: string;
  ogImage?: string;
  description?: string;
  mode: ItemsDisplayMode;
}) {
  return mode === "list" ? (
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
  ogImage?: string;
  description?: string;
}) {
  return (
    <div className="flex flex-row gap-x-4">
      <div className="flex flex-col gap-y-1">
        <p className="typography-large text-foreground">{title}</p>
        <p className="typography-muted text-muted-foreground">{description}</p>
        <p className="typography-muted text-muted-foreground">{url}</p>
      </div>
    </div>
  );
}
