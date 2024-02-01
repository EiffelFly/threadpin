"use client";

import * as React from "react";
import * as z from "zod";
import { Drawer, DrawerContent } from "../ui/drawer";
import { usePinStore } from "@/store/usePinStore";
import { useShallow } from "zustand/react/shallow";
import axios from "axios";
import { Nullable } from "@/types";
import { GetURLDataResponse } from "@/app/api/scraping/route";
import { cn } from "@/lib/utils";
import { URLMetadata } from "./url-metadata";
import { URLDomainIcon } from "../ui/url-domain-icon";
import { Form } from "../ui/form";
import { useForm } from "react-hook-form";
import { CreateItemFields, CreateItemFormSchema } from "./create-item-fields";
import { zodResolver } from "@hookform/resolvers/zod";
import { useCreateItem, useUserMe } from "@/react-query";
import { Button } from "../ui/button";
import { CreateItemPayload, CreateListItemPayload } from "@/supabase-query";
import { toast } from "sonner";
import { useCreateListItem } from "@/react-query/mutations/use-create-list-item";
import { LoadingSpin } from "../ui/loading-spin";
import { PinStore } from "@/store/type";

const selector = (store: PinStore) => ({
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
  const [animateOpening, setAnimateOpening] = React.useState(false);

  React.useEffect(() => {
    let timer: NodeJS.Timeout | undefined;

    if (open) {
      timer = setTimeout(() => {
        setAnimateOpening(true);
      }, 100);
    } else {
      setAnimateOpening(false);
    }

    return () => {
      clearTimeout(timer);
    };
  }, [open]);

  const createItemForm = useForm<z.infer<typeof CreateItemFormSchema>>({
    resolver: zodResolver(CreateItemFormSchema),
  });

  const me = useUserMe({ enabled: true });
  const createItem = useCreateItem();
  const createListItem = useCreateListItem();
  async function onCreateItemSubmit(
    formData: z.infer<typeof CreateItemFormSchema>
  ) {
    if (!url || !urlData || !me.isSuccess) return;

    const payload: CreateItemPayload = {
      name: formData.title,
      url: url.href,
      og_image: urlData.ogImage ?? undefined,
      description: formData.description ?? undefined,
    };

    try {
      const { data } = await createItem.mutateAsync({
        payload,
        userID: me.data.user.id,
      });

      if (formData.lists.length > 0) {
        for (const list of formData.lists) {
          const createListItemPayload: CreateListItemPayload = {
            list_uid: list,
            item_uid: data.uid,
          };

          await createListItem.mutateAsync({
            payload: createListItemPayload,
            userID: me.data.user.id,
          });
        }
      }
    } catch (error) {
      toast.error(
        "Something when wrong when creating your item, please try again later",
        {
          duration: 3000,
        }
      );
    }
  }

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

  React.useEffect(() => {
    if (!urlData || processingURL) return;

    createItemForm.reset({
      title: urlData.title ?? "",
      description: urlData.description ?? "",
    });
  }, [urlData, processingURL]);

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
            <div className="flex w-[400px] flex-col">
              <div
                className={cn(
                  "flex w-[380px] transition-transform duration-700 ease-in-out",
                  animateOpening ? "-translate-x-5" : ""
                )}
              >
                <URLDomainIcon
                  url={url}
                  className="stroke-background h-4 w-4"
                />
                {!processingURL && urlData ? (
                  <URLMetadata url={url} data={urlData} />
                ) : (
                  <URLMetadata.Skeleton />
                )}
              </div>
            </div>
            <div className="flex w-[400px] flex-col">
              <div
                className={cn(
                  "flex w-[380px] -translate-y-4 translate-x-5 opacity-0 transition duration-700 ease-in-out",
                  animateOpening ? "translate-y-0 opacity-100" : ""
                )}
              >
                {urlData ? (
                  <Form {...createItemForm}>
                    <form
                      className="w-full"
                      onSubmit={createItemForm.handleSubmit(onCreateItemSubmit)}
                    >
                      <div className="flex flex-col gap-y-3">
                        <CreateItemFields form={createItemForm} />
                      </div>
                      <div className="flex flex-row-reverse">
                        <Button
                          className="flex flex-row gap-x-2"
                          type="submit"
                          variant="default"
                        >
                          Save
                          {createItem.isPending || createListItem.isPending ? (
                            <LoadingSpin />
                          ) : null}
                        </Button>
                      </div>
                    </form>
                  </Form>
                ) : (
                  <div className="flex w-full flex-col gap-y-3">
                    <CreateItemFields.Skeleton />
                  </div>
                )}
              </div>
            </div>
          </div>
        ) : null}
      </DrawerContent>
    </Drawer>
  );
};
