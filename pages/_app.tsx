import { ErrorBoundary, SaasProvider } from "@saas-ui/react";
import { QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import type { AppProps } from "next/app";
import Head from "next/head";
import Link from "next/link";

import { DefaultLayout } from "@/layouts/default";
import { queryClient } from "@/lib/react-query";
import { theme } from "@/theme";
import { toastOptions } from "@/theme/toast";
import { ModalsProvider } from "@/ui/modals";
import { AppSeo } from "@/ui/seo";

const App = ({ Component, pageProps }: AppProps) => {
  return (
    <>
      <Head>
        <meta content="minimum-scale=1, initial-scale=1, width=device-width" name="viewport" />
      </Head>
      <AppSeo />
      <QueryClientProvider client={queryClient}>
        <ReactQueryDevtools />
        <SaasProvider linkComponent={Link} resetCSS theme={theme} toastOptions={toastOptions}>
          <ErrorBoundary>
            <ModalsProvider>
              <DefaultLayout>
                <Component {...pageProps} />
              </DefaultLayout>
            </ModalsProvider>
          </ErrorBoundary>
        </SaasProvider>
      </QueryClientProvider>
    </>
  );
};

export default App;
