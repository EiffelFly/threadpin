import { Container } from "@/components/container";
import { CreateListDiaglog } from "@/components/studio-sidebar/create-list-dialog";
import { Navigation } from "@/components/studio-sidebar/navigation";
import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "@/components/ui/resizable";

export default function Layout(props: {
  children: React.ReactNode;
  sidebarUserInfo: React.ReactNode;
  sidebarLists: React.ReactNode;
  content: React.ReactNode;
}) {
  return (
    <Container>
      <ResizablePanelGroup className="rounded-[6px]" direction="horizontal">
        <ResizablePanel defaultSize={40} maxSize={40} minSize={25}>
          <div className="bg-background flex h-full flex-col">
            {props.sidebarUserInfo}
            <Navigation />
            <div className="flex flex-1">{props.sidebarLists}</div>
            <CreateListDiaglog />
          </div>
        </ResizablePanel>
        <ResizableHandle />
        <ResizablePanel defaultSize={60}>{props.children}</ResizablePanel>
      </ResizablePanelGroup>
    </Container>
  );
}
