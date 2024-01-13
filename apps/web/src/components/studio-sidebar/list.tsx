import { Button } from "../ui/button";
import { Skeleton } from "../ui/skeleton";

export function List({ id }: { id: string }) {
  return (
    <Button variant="outline" className="justify-start">
      <p className="typography-p text-primary">{id}</p>
    </Button>
  );
}
List.Skeleton = ListSkeleton;

export function ListSkeleton() {
  return (
    <div className="flex rounded-lg px-4 py-1">
      <Skeleton className="my-auto flex h-7 w-full" />
    </div>
  );
}
