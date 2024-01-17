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
import { CreateListPayload } from "@/supabase-query";
import { useUserMe } from "@/react-query";

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

  const createList = useCreateList();
  const me = useUserMe({ enabled: true });

  return (
    <Dialog open={open} onOpenChange={(open) => setOpen(open)}>
      <DialogTrigger asChild>
        <Button variant="link">Create list</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[600px]">
        <DialogHeader>
          <DialogTitle>Add new list</DialogTitle>
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
    if (!me.isSuccess || !me.data.data.user) return;

    const payload: CreateListPayload = {
      ...values,
      visibility: "VISIBILITY_PRIVATE",
    };

    try {
      createList.mutateAsync({ payload, userID: me.data.data.user.id });
      setOpen(false);
      toast.success(
        "Successfully created your list, you can now add your first item!",
        {
          duration: 2500,
        }
      );
    } catch (error) {
      toast.error(
        "Something when wrong when creating your list, please try again later",
        {
          duration: 3000,
        }
      );
      return;
    }
  }
}
