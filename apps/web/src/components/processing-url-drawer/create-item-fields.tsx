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
import { MultiSelect } from "../ui/multi-select";
import { useUserLists, useUserMe } from "@/react-query";
import { SelectOption } from "@/types";

export const CreateItemFormSchema = z.object({
  title: z.string(),
  description: z.string().optional().nullable(),
  lists: z.array(z.string()),
});

export function CreateItemFields({
  form,
}: {
  form: UseFormReturn<z.infer<typeof CreateItemFormSchema>, any, undefined>;
}) {
  const me = useUserMe({ enabled: true });

  const lists = useUserLists({
    enabled: me.isSuccess,
    userID: me.isSuccess ? me.data.data.user?.id ?? null : null,
  });

  const [options, setOptions] = React.useState<SelectOption[]>([]);
  const [selectedOptions, setSelectedOptions] = React.useState<SelectOption[]>(
    []
  );

  React.useEffect(() => {
    if (!lists.isSuccess) return;

    const options = lists.data.data?.map((list) => ({
      label: list.id,
      value: list.uid,
    }));

    setOptions(options ?? []);
  }, [lists.isSuccess, lists.data]);

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
      <FormField
        control={form.control}
        name="lists"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Lists</FormLabel>
            <FormControl>
              <FormControl>
                <MultiSelect
                  options={options}
                  setOptions={setOptions}
                  searchInputPlaceholder="Search List"
                  selectedOptions={selectedOptions}
                  onChange={(options) => {
                    console.log(options);
                    setSelectedOptions(options);

                    field.onChange(options.map((e) => e.value));
                  }}
                  createOnNotFound={false}
                  placeholder={<></>}
                />
              </FormControl>
            </FormControl>
            <FormDescription>The list of your item</FormDescription>
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
