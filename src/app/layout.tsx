import type { Metadata } from "next";
import Header from "@/components/Header";
import "./globals.css";

const siteName = process.env.NEXT_PUBLIC_SITE_NAME || "Media Hub";

export const metadata: Metadata = {
  title: {
    default: siteName,
    template: `%s · ${siteName}`,
  },
  description: "Personal studio / media library — images, videos, PDFs, projects, and more.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className="dark">
      <body className="font-sans antialiased">
        <Header />
        <main className="mx-auto max-w-6xl px-4 py-8 sm:px-6 sm:py-10">{children}</main>
        <footer className="mx-auto max-w-6xl px-4 pb-10 text-center text-xs text-studio-muted sm:px-6">
          Personal media hub · Share links look like{" "}
          <span className="font-mono text-studio-muted/90">/i/your-slug</span>
        </footer>
      </body>
    </html>
  );
}
