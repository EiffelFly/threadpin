import { Sidebar } from "@/components/sidebar";
import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "@/components/ui/resizable";

export default function Page() {
  return (
    <div className="border-border bg-background rotate-gradient flex h-[calc(100vh-calc(var(--root-padding)*2))] w-full flex-row rounded-lg border p-[1px]">
      <ResizablePanelGroup className="rounded-lg" direction="horizontal">
        <ResizablePanel defaultSize={25} maxSize={40} minSize={25}>
          <div className="bg-background flex h-full flex-col">
            <Sidebar />
          </div>
        </ResizablePanel>
        <ResizableHandle />
        <ResizablePanel defaultSize={75}>
          <div className="bg-background flex h-full flex-col"></div>
        </ResizablePanel>
      </ResizablePanelGroup>
    </div>
  );
}
