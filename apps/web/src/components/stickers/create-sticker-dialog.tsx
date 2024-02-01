"use client";

import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as React from "react";
import { v4 as uuidv4 } from "uuid";

import { Button } from "../ui/button";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../ui/dialog";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
import { Input } from "../ui/input";
import { Textarea } from "../ui/textarea";
import { LoadingSpin } from "../ui/loading-spin";
import { useUserMe } from "@/react-query";
import { ZodSingleImageValidator } from "@/lib/validator";
import { Nullable } from "@/types";
import { toastError } from "@/lib/toast-error";
import { useCreateSticker } from "@/react-query/mutations/use-create-sticker";

const formSchema = z.object({
  id: z.string().min(2).max(63),
  description: z.string().optional(),
  asset: ZodSingleImageValidator,
});

export function CreateStickerDiaglog() {
  const [open, setOpen] = React.useState(false);
  const [creating, setCreating] = React.useState(false);
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      id: "",
      description: "",
      asset: "",
    },
  });

  const me = useUserMe({ enabled: true });
  const createSticker = useCreateSticker();
  async function onSubmit(formValue: z.infer<typeof formSchema>) {
    if (!me.isSuccess) {
      return;
    }
    setCreating(true);

    const formData = new FormData();

    const stickerUID = uuidv4();
    formData.set("file", formValue.asset);
    formData.set("key", stickerUID);
    formData.set("type", formValue.asset.type);

    let asset_url: Nullable<string> = null;

    try {
      const res = await fetch("/api/r2", {
        method: "POST",
        body: formData,
      });
      const data = await res.json();
      asset_url = data.data.asset_url;
    } catch (error) {
      console.log(error);
      toastError("Failed to upload sticker image");
      setCreating(false);
      return;
    }

    if (!asset_url) {
      setCreating(false);
      return;
    }

    try {
      await createSticker.mutateAsync({
        user_uid: me.data.user.id,
        payload: {
          uid: stickerUID,
          id: formValue.id,
          description: formValue.description,
          asset_url,
          visibility: "VISIBILITY_PRIVATE",
        },
      });
      setCreating(false);
    } catch (error) {
      toastError("Failed to upload sticker image");
      setCreating(false);
      return;
    }
  }

  return (
    <Dialog open={open} onOpenChange={(open) => setOpen(open)}>
      <DialogTrigger asChild>
        <Button variant="outline">Create Sticker</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[600px]">
        <DialogHeader>
          <DialogTitle>Create new sticker</DialogTitle>
        </DialogHeader>
        <Form {...form}>
          <form
            className="flex flex-col gap-y-4"
            onSubmit={form.handleSubmit(onSubmit)}
            id="create-list-form"
          >
            <FormField
              control={form.control}
              name="id"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Name</FormLabel>
                  <FormControl>
                    <Input {...field} placeholder="Your sticker name" />
                  </FormControl>
                  <FormDescription></FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Description</FormLabel>
                  <FormControl>
                    <Textarea
                      {...field}
                      placeholder=""
                      value={field.value ?? ""}
                    />
                  </FormControl>
                  <FormDescription>
                    The description of your sticker
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="asset"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Image</FormLabel>
                  <FormControl>
                    <Input
                      type="file"
                      accept="image/png, image/jpeg, image/webp, image/png"
                      onChange={(e) => {
                        field.onChange(e.target.files?.[0]);
                      }}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </form>
        </Form>
        <div></div>
        <DialogFooter>
          <Button form="create-list-form" className="gap-x-2" type="submit">
            Save changes
            {creating ? <LoadingSpin className="text-black" /> : null}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
