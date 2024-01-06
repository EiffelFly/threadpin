"use client";

import * as React from "react";
import { Drawer, DrawerContent } from "./ui/drawer";
import { getURLDomainIcon } from "@/lib/url";
import { Store } from "@/store/type";
import { usePinStore } from "@/store/usePinStore";
import { useShallow } from "zustand/react/shallow";
import axios from "axios";

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

  React.useEffect(() => {
    async function getURLData() {
      if (!url) return;

      try {
        setProcessingURL(true);
        const data = await axios.get("/api/scraping?url=" + url.href);
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
      }}
    >
      <DrawerContent>
        {url ? (
          <div className="mx-auto flex min-h-[360px] w-full max-w-2xl flex-col">
            <div className="mx-auto flex h-6 w-6 rounded-lg">
              {getURLDomainIcon(url, "w-4 h-4 m-auto")}
            </div>
          </div>
        ) : null}
      </DrawerContent>
    </Drawer>
  );
};
