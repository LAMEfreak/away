import type { Metadata } from "next";
import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider";

export const metadata: Metadata = {
  title: "Away - Mystery Destinations Await",
  description: "Mystery Adventures Tailored For You",
  icons: {
    icon: [
      { url: "/Logo.svg", sizes: "any" },
      { url: "/Logo.svg", sizes: "32x32" },
      { url: "/Logo.svg", sizes: "48x48" },
      { url: "/Logo.svg", sizes: "96x96" },
    ],
    apple: [{ url: "/Logo.svg", sizes: "180x180" }],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`antialiased`}>
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem={false}
          disableTransitionOnChange
        >
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
