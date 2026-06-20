import type { Metadata } from "next";
import Link from "next/link";
import { appNavigation } from "@/config/navigation";
import { siteConfig } from "@/config/site";
import "./globals.css";

export const metadata: Metadata = {
  title: siteConfig.name,
  description: siteConfig.description,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fr">
      <body>
        <div className="shell">
          <header className="topbar">
            <Link className="brand" href="/">
              {siteConfig.name}
            </Link>
            <nav className="nav" aria-label="Navigation principale">
              {appNavigation.map((item) => (
                <Link href={item.href} key={item.href}>
                  {item.label}
                </Link>
              ))}
            </nav>
          </header>
          {children}
        </div>
      </body>
    </html>
  );
}
