export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="bg-background flex h-full flex-col p-4">{children}</div>
  );
}
