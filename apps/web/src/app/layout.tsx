import { ThemeProvider } from "@/components/theme-provider";
import { Toaster } from "@/components/ui/sonner";

import "./globals.css";
import "./github-markdown.css";

import { ProcessingURLDrawer } from "@/components/processing-url-drawer/processing-url-drawer";
import { SupabaseProvider } from "./supabase-provider";
import { ReactQueryProvider } from "./react-query-client-provider";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <ReactQueryProvider>
          <SupabaseProvider>
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
          </SupabaseProvider>
        </ReactQueryProvider>
      </body>
    </html>
  );
}
