"use client";

export function Sticker({ asset_url, id }: { asset_url: string; id: string }) {
  return (
    <div className="flex flex-col gap-y-4 rounded-lg px-4">
      <div className="flex h-[200px] w-[200px] shrink-0 grow-0">
        {/* <Image className="object-contain" fill src={ogImage} alt={title} /> */}
        <img className="object-contain" src={asset_url} alt={id} />
      </div>
      <p className="typography-p text-muted">{id}</p>
    </div>
  );
}
