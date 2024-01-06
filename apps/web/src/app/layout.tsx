import { ClerkProvider } from "@clerk/nextjs";
import { ThemeProvider } from "@/components/theme-provider";
import { Toaster } from "@/components/ui/sonner";

import "./globals.css";
import { ProcessingURLDrawer } from "@/components/processing-url-drawer";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ClerkProvider>
      <html lang="en">
        <body>
          <ThemeProvider
            attribute="class"
            defaultTheme="dark"
            enableSystem
            disableTransitionOnChange
          >
            <div className="bg-background min-w-screen flex min-h-screen overflow-x-hidden overflow-y-scroll">
              {children}
            </div>
          </ThemeProvider>
          <ProcessingURLDrawer />
          <Toaster />
        </body>
      </html>
    </ClerkProvider>
  );
}
