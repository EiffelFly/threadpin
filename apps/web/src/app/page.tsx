import { Container } from "@/components/container";
import { Sidebar } from "@/components/sidebar";
import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "@/components/ui/resizable";

export default function Page() {
  return (
    <Container>
      <ResizablePanelGroup className="rounded-[6px]" direction="horizontal">
        <ResizablePanel defaultSize={25} maxSize={40} minSize={25}>
          <div className="bg-background flex h-full flex-col">
            <Sidebar />
          </div>
        </ResizablePanel>
        <ResizableHandle />
        <ResizablePanel defaultSize={75}>
          <div className="bg-background flex h-full flex-col p-4"></div>
        </ResizablePanel>
      </ResizablePanelGroup>
    </Container>
  );
}
