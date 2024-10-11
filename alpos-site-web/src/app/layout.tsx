import type { Metadata } from "next";
import "../styles/global.css";
import "@WASPtheGeek/base-components/dist/style.scss";
import { roboto } from "@/styles/fonts";
import { Container } from "@WASPtheGeek/base-components";

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
        {/* <Providers>
          <AppNav /> */}
        <Container>{children}</Container>
        {/* </Providers> */}
      </body>
    </html>
  );
}
