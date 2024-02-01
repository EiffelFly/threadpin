import { StudioContainer } from "@/components/studio-container";
import { CreateListDiaglog } from "@/components/studio-sidebar/create-list-dialog";
import { Navigation } from "@/components/studio-sidebar/navigation";
import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "@/components/ui/resizable";
import { Suspense } from "react";
import { SidebarLists } from "./(sidebar)/sidebar-lists";
import { SidebarUserInfo } from "./(sidebar)/sidebar-user-info";
import { UserInfoLoading } from "../../components/studio-sidebar/user-info-loading";
import { ListsLoading } from "@/components/studio-sidebar/lists-loading";

export default function Layout(props: {
  children: React.ReactNode;
  sidebarUserInfo: React.ReactNode;
  sidebarLists: React.ReactNode;
  content: React.ReactNode;
}) {
  return (
    <StudioContainer>
      <ResizablePanelGroup className="rounded-[6px]" direction="horizontal">
        <ResizablePanel defaultSize={40} maxSize={40} minSize={25}>
          <div className="bg-background flex h-full flex-col">
            <Suspense fallback={<UserInfoLoading />}>
              <SidebarUserInfo />
            </Suspense>
            <Navigation />
            <div className="flex flex-1">
              <Suspense fallback={<ListsLoading />}>
                <SidebarLists />
              </Suspense>
            </div>
            <CreateListDiaglog />
          </div>
        </ResizablePanel>
        <ResizableHandle />
        <ResizablePanel defaultSize={60}>{props.children}</ResizablePanel>
      </ResizablePanelGroup>
    </StudioContainer>
  );
}
