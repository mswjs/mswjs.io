import "@/styles/app.css";

import type { AppProps } from "next/app";
import type { ReactElement } from "react";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";

export default function App({
  Component: Page,
  pageProps,
}: AppProps): ReactElement {
  return (
    <>
      <Header />
      <Page {...pageProps} />
      <Footer />
    </>
  );
}
