import Markdown from "markdown-to-jsx";

export const MarkdownViewer = (markdown: string) => {
  <div className="markdown-body px-1.5 py-1">
    <Markdown>{markdown}</Markdown>;
  </div>;
};
