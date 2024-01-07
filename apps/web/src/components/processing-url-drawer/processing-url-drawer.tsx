"use client";

import * as React from "react";
import { Drawer, DrawerContent } from "../ui/drawer";
import { Store } from "@/store/type";
import { usePinStore } from "@/store/usePinStore";
import { useShallow } from "zustand/react/shallow";
import axios from "axios";
import { Nullable } from "@/types";
import { GetURLDataResponse } from "@/app/api/scraping/route";
import { cn } from "@/lib/utils";
import { URLMetadata } from "./url-metadata";
import { URLDomainIcon } from "../ui/url-domain-icon";

const selector = (store: Store) => ({
  processingURLDrawerState: store.processingURLDrawerState,
  updateProcessingURLDrawerState: store.updateProcessingURLDrawerState,
});

export const ProcessingURLDrawer = () => {
  const {
    processingURLDrawerState: { open, url },
    updateProcessingURLDrawerState,
  } = usePinStore(useShallow(selector));

  const [processingURL, setProcessingURL] = React.useState(false);
  const [urlData, setURLData] =
    React.useState<Nullable<GetURLDataResponse>>(null);

  React.useEffect(() => {
    async function getURLData() {
      if (!url) return;

      try {
        setProcessingURL(true);
        const { data } = await axios.get<GetURLDataResponse>(
          "/api/scraping?url=" + url.href
        );
        setURLData(data);
        setProcessingURL(false);
      } catch (error) {}
    }

    getURLData();
  }, [url]);

  return (
    <Drawer
      open={open}
      onOpenChange={(open) => {
        updateProcessingURLDrawerState((prev) => ({
          ...prev,
          open,
        }));
        setURLData(null);
        setProcessingURL(false);
      }}
    >
      <DrawerContent>
        {url ? (
          <div className="mx-auto flex min-h-[600px] w-full max-w-[800px] flex-row p-10">
            <div
              className={cn(
                "mx-auto flex w-[400px] flex-col transition-transform duration-700 ease-in-out",
                urlData ? "-translate-x-1/2" : ""
              )}
            >
              <URLDomainIcon url={url} className="stroke-background h-4 w-4" />
              {urlData ? (
                <URLMetadata url={url} data={urlData} />
              ) : (
                <URLMetadata.Skeleton />
              )}
            </div>
          </div>
        ) : null}
      </DrawerContent>
    </Drawer>
  );
};
