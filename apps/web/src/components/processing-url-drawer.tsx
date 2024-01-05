import { Nullable } from "@/types";
import {
  Drawer,
  DrawerContent,
  DrawerDescription,
  DrawerHeader,
  DrawerTitle,
} from "./ui/drawer";

export const ProcessingURLDrawer = ({
  url,
  open,
  onOpenChange,
}: {
  url: Nullable<string>;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}) => {
  return (
    <Drawer open={open} onOpenChange={onOpenChange}>
      <DrawerContent>
        <div className="mx-auto min-h-[360px] w-full max-w-sm">
          <DrawerHeader>
            <DrawerTitle>Your pasted URL</DrawerTitle>
            <DrawerDescription>{url}</DrawerDescription>
          </DrawerHeader>
        </div>
      </DrawerContent>
    </Drawer>
  );
};
