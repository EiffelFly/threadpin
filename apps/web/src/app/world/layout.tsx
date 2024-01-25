import "reactflow/dist/style.css";

export default function Layout({ children }: { children: React.ReactNode }) {
  return <div className="bg-background flex h-screen w-full">{children}</div>;
}
