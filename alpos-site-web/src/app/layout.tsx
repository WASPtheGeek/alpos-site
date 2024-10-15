import type { Metadata } from "next";
import { roboto } from "@/styles/fonts";
import { Container } from "@WASPtheGeek/base-components";
import { Providers } from "@/components/providers";
import { AppNav } from "@/components/nav";

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
          <AppNav />
          {/* TODO: set containerL */}
          <Container>{children}</Container>
        </Providers>
      </body>
    </html>
  );
}
