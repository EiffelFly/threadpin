"use client";

import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import * as React from "react";

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
import { useCreateList } from "@/react-query/mutations/use-create-list";
import { CreateListPayload, UpdateUserProfilePayload } from "@/supabase-query";
import { useUserMe, useUserProfile } from "@/react-query";
import { useUpdateUserProfile } from "@/react-query/mutations/use-update-user-profile";
import { toastError } from "@/lib/toast-error";
import { ListsOrderRecordSchema } from "@/lib/validator";

const formSchema = z.object({
  id: z.string().min(2).max(63),
  description: z.string().optional(),
});

export function CreateListDiaglog() {
  const [open, setOpen] = React.useState(false);
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      id: "",
      description: "",
    },
  });

  const me = useUserMe({ enabled: true });
  const profile = useUserProfile({
    user_uid: me.isSuccess ? me.data.user.id : null,
    enabled: me.isSuccess,
  });
  const createList = useCreateList();
  const updateUserProfile = useUpdateUserProfile();

  return (
    <Dialog open={open} onOpenChange={(open) => setOpen(open)}>
      <DialogTrigger asChild>
        <Button variant="link">Create list</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[600px]">
        <DialogHeader>
          <DialogTitle>Create new list</DialogTitle>
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
                    <Input {...field} placeholder="Your list name" />
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
                    The description of your list
                  </FormDescription>
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
            {createList.isPending ? (
              <LoadingSpin className="text-black" />
            ) : null}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );

  async function onSubmit(values: z.infer<typeof formSchema>) {
    if (!me.isSuccess || !profile.isSuccess) return;

    const payload: CreateListPayload = {
      ...values,
      visibility: "VISIBILITY_PRIVATE",
    };

    const { lists_order_record } = profile.data;

    let updateUserProfilePayload: UpdateUserProfilePayload;

    if (!lists_order_record) {
      updateUserProfilePayload = {
        lists_order_record: [
          {
            list_uid: payload.id,
            order: 0,
          },
        ],
      };
    } else {
      const parsed = ListsOrderRecordSchema.safeParse(lists_order_record);

      if (parsed.success) {
        updateUserProfilePayload = {
          lists_order_record: [
            ...parsed.data,
            {
              list_uid: payload.id,
              order: parsed.data.length,
            },
          ],
        };
      } else {
        updateUserProfilePayload = {
          lists_order_record: [
            {
              list_uid: payload.id,
              order: 0,
            },
          ],
        };
      }
    }

    try {
      await createList.mutateAsync({ payload, userID: me.data.user.id });
      await updateUserProfile.mutateAsync({
        user_uid: me.data.user.id,
        payload: updateUserProfilePayload,
      });
      setOpen(false);
      toast.success(
        "Successfully created your list, you can now add your first item!",
        {
          duration: 2500,
        }
      );
    } catch (error) {
      toastError("Failed to create list");
    }
  }
}
