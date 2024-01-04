import { ClerkProvider } from "@clerk/nextjs";

import "./globals.css";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ClerkProvider>
      <html lang="en">
        <body>
          <div className="flex h-[calc(100vh-var(--topbar-height))] w-full flex-1 overflow-x-hidden overflow-y-scroll">
            {children}
          </div>
        </body>
      </html>
    </ClerkProvider>
  );
}
