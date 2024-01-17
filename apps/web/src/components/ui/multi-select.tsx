"use client";

import * as React from "react";
import cn from "clsx";
import { Nullable, SelectOption } from "../../types/general";
import { Popover, PopoverContent, PopoverTrigger } from "./popover";
import { Button } from "./button";
import { Badge } from "./badge";
import { CheckIcon, Cross1Icon } from "@radix-ui/react-icons";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
} from "./command";

type ComboboxProps = {
  placeholder: React.ReactElement;
  options: SelectOption[];

  setOptions?: React.Dispatch<React.SetStateAction<SelectOption[]>>;
  selectedOptions: SelectOption[];
  onChange: (selectedOptions: SelectOption[]) => void;
  createOnNotFound?: boolean;
  emptyPlaceholder?: string;
  searchInputPlaceholder?: string;
};

export function MultiSelect({
  placeholder,
  searchInputPlaceholder,
  emptyPlaceholder,
  options,
  setOptions,
  selectedOptions,
  onChange,
  createOnNotFound,
}: ComboboxProps) {
  const [open, setOpen] = React.useState(false);
  const [searchValue, setSearchValue] = React.useState<Nullable<string>>(null);

  const handleUnselect = (item: SelectOption) => {
    onChange(selectedOptions.filter((i) => i.value !== item.value));
  };

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          className={cn(
            "w-full justify-between",
            selectedOptions.length > 0 ? "h-full min-h-10" : "h-10"
          )}
        >
          {selectedOptions.length > 0 ? (
            <div className="flex flex-row flex-wrap gap-1">
              {selectedOptions.map((option) => (
                <Badge
                  key={option.value}
                  variant="default"
                  className="flex flex-row gap-x-1"
                >
                  {option.label}
                  <button
                    onClick={(e) => {
                      e.preventDefault();
                      e.stopPropagation();
                      handleUnselect(option);
                    }}
                  >
                    <Cross1Icon className="stroke-semantic-fg-secondary h-3 w-3" />
                  </button>
                </Badge>
              ))}
            </div>
          ) : (
            placeholder
          )}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[var(--radix-popover-trigger-width)] !rounded-sm !p-0">
        <Command>
          <CommandInput
            value={searchValue ?? ""}
            onValueChange={(search) => {
              setSearchValue(search);
            }}
            placeholder={searchInputPlaceholder ?? "Search..."}
          />
          <CommandEmpty className="!p-2">
            {createOnNotFound ? (
              <Button
                variant="secondary"
                size="sm"
                className="!text-semantic-fg-secondary !product-body-text-3-medium !w-full"
                onClick={() => {
                  if (!setOptions) {
                    throw new Error("setOptions is not defined");
                  }

                  const searchedOption = options.find((option) => {
                    option.label === searchValue;
                  });

                  if (!searchValue || searchedOption) {
                    return;
                  }
                  onChange([
                    ...selectedOptions,
                    {
                      value: searchValue,
                      label: searchValue,
                    },
                  ]);
                  setOptions([
                    ...options,
                    { value: searchValue, label: searchValue },
                  ]);
                  setOpen(true);
                }}
              >{`${emptyPlaceholder} ${searchValue}`}</Button>
            ) : (
              emptyPlaceholder
            )}
          </CommandEmpty>
          <CommandGroup>
            {options.map((option) => (
              <CommandItem
                key={option.value}
                onSelect={() => {
                  const isSelected = !!selectedOptions.find(
                    (e) => e.value === option.value
                  );

                  if (isSelected) {
                    onChange(
                      selectedOptions.filter((e) => e.value !== option.value)
                    );
                  } else {
                    onChange([...selectedOptions, option]);
                  }

                  setOpen(true);
                }}
              >
                <CheckIcon
                  className={cn(
                    "stroke-semantic-fg-secondary h-4 w-4",
                    selectedOptions.some((e) => e.value === option.value)
                      ? "opacity-100"
                      : "opacity-0"
                  )}
                />
                {option.startIcon}
                {option.label}
              </CommandItem>
            ))}
          </CommandGroup>
        </Command>
      </PopoverContent>
    </Popover>
  );
}
