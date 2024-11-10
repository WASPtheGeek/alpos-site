import { AppNav } from "@/components/nav";
import { Providers } from "@/components/providers";
import { roboto } from "@/styles/fonts";
import type { Metadata } from "next";

import "@fortawesome/fontawesome-free/css/all.css";
import "@WASPtheGeek/base-components/dist/style.scss";
import "../styles/app.scss";
import "../styles/global.css";

export const metadata: Metadata = {
  title: "Alpos",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${roboto.variable}`}>
        <Providers>
          <div className="flex flex-col h-full">
            <AppNav />
            <div className="overflow-hidden h-full">{children}</div>
          </div>
        </Providers>
      </body>
    </html>
  );
}
