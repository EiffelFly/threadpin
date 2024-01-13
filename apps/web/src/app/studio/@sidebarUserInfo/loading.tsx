import { Skeleton } from "@/components/ui/skeleton";

export default function Loading() {
  return (
    <div className="border-border w-full border-b px-4 py-3">
      <Skeleton className="my-auto flex h-6 w-full" />
    </div>
  );
}
