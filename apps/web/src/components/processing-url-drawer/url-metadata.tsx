import { GetURLDataResponse } from "@/app/api/scraping/route";
import { ImageWithFallback } from "../ui/image-with-fallback";
import { Skeleton } from "../ui/skeleton";

const URLMetadataSkeleton = () => {
  return (
    <div className="border-border flex w-full flex-col rounded-md border">
      <Skeleton className="h-[209px] w-full rounded-b-none" />
      <div className="flex flex-col gap-y-3 p-4">
        <Skeleton className="h-10 w-full" />
        <Skeleton className="h-5 w-2/3" />
        <Skeleton className="h-3 w-2/3" />
      </div>
    </div>
  );
};

export const URLMetadata = ({
  url,
  data,
}: {
  url: URL;
  data: GetURLDataResponse;
}) => {
  return (
    <div className="border-border flex w-full flex-col rounded-md border">
      <div className="relative h-[209px] w-full">
        <ImageWithFallback
          src={data.ogImage}
          alt={data.title ?? null}
          fallbackImg={<div className="bg-muted h-[209px] w-full" />}
        />
      </div>
      <div className="flex flex-col p-4">
        <h3 className="typography-h3">{data.title}</h3>
        {data.description ? (
          <p className="typography-p mb-0.5">{data.description}</p>
        ) : null}
        <p className="typography-muted break-words">{url.href}</p>
      </div>
    </div>
  );
};
URLMetadata.Skeleton = URLMetadataSkeleton;
