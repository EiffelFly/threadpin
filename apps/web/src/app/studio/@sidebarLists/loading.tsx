import { List } from "@/components/studio-sidebar/list";

export default function Loading() {
  return (
    <div className="flex w-full flex-col gap-y-4 px-4 py-3">
      {Array.from({ length: 3 }).map((_, i) => (
        <List.Skeleton key={i} />
      ))}
    </div>
  );
}
