import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "./index";

export function ResizablePanelHorizontal() {
  return (
    <ResizablePanelGroup
      orientation="horizontal"
      className="h-40 w-full max-w-lg rounded-md border"
    >
      <ResizablePanel defaultSize="35%">
        <div className="flex size-full items-center justify-center p-4 text-sm">
          Sidebar
        </div>
      </ResizablePanel>
      <ResizableHandle />
      <ResizablePanel defaultSize="65%">
        <div className="flex size-full items-center justify-center bg-muted/20 p-4 text-sm">
          Content
        </div>
      </ResizablePanel>
    </ResizablePanelGroup>
  );
}

export function ResizablePanelVertical() {
  return (
    <ResizablePanelGroup
      orientation="vertical"
      className="h-52 w-full max-w-lg rounded-md border"
    >
      <ResizablePanel defaultSize="50%">
        <div className="flex size-full items-center justify-center p-4 text-sm">
          Top
        </div>
      </ResizablePanel>
      <ResizableHandle />
      <ResizablePanel defaultSize="50%">
        <div className="flex size-full items-center justify-center bg-muted/20 p-4 text-sm">
          Bottom
        </div>
      </ResizablePanel>
    </ResizablePanelGroup>
  );
}

export function ResizablePanelWithHandle() {
  return (
    <ResizablePanelGroup
      orientation="horizontal"
      className="h-40 w-full max-w-lg rounded-md border"
    >
      <ResizablePanel defaultSize="50%" minSize="20%">
        <div className="flex size-full items-center justify-center p-4 text-sm">
          Panel A
        </div>
      </ResizablePanel>
      <ResizableHandle withHandle />
      <ResizablePanel defaultSize="50%" minSize="20%">
        <div className="flex size-full items-center justify-center bg-muted/20 p-4 text-sm">
          Panel B
        </div>
      </ResizablePanel>
    </ResizablePanelGroup>
  );
}
