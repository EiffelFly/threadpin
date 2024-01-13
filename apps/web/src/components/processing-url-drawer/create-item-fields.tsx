import * as z from "zod";
import * as React from "react";
import {
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormItemSkeleton,
  FormLabel,
  FormMessage,
} from "../ui/form";
import { UseFormReturn } from "react-hook-form";
import { Input } from "../ui/input";
import { Textarea } from "../ui/textarea";
import { Skeleton } from "../ui/skeleton";

export const CreateItemFormSchema = z.object({
  title: z.string(),
  description: z.string().optional().nullable(),
  list: z.string().optional().nullable(),
});

export function CreateItemFields({
  form,
}: {
  form: UseFormReturn<z.infer<typeof CreateItemFormSchema>, any, undefined>;
}) {
  return (
    <React.Fragment>
      <FormField
        control={form.control}
        name="title"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Name</FormLabel>
            <FormControl>
              <Input {...field} placeholder="Your list name" />
            </FormControl>
            <FormDescription>The title of this URL item</FormDescription>
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
                className="min-h-[160px]"
                {...field}
                placeholder=""
                value={field.value ?? ""}
              />
            </FormControl>
            <FormDescription>The description of your item</FormDescription>
            <FormMessage />
          </FormItem>
        )}
      />
    </React.Fragment>
  );
}
CreateItemFields.Skeleton = CreateItemFieldSkeleton;

function CreateItemFieldSkeleton() {
  return (
    <React.Fragment>
      <FormItemSkeleton>
        <Skeleton className="h-9 w-1/3" />
        <Skeleton className="h-9 w-full" />
        <Skeleton className="h-6 w-2/3" />
      </FormItemSkeleton>
      <FormItemSkeleton>
        <Skeleton className="h-9 w-1/3" />
        <Skeleton className="h-9 w-full" />
        <Skeleton className="h-6 w-2/3" />
      </FormItemSkeleton>
    </React.Fragment>
  );
}
