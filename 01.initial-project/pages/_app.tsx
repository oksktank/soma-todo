import type { AppProps } from "next/app";
import { ChakraProvider, extendTheme } from "@chakra-ui/react";
import { QueryClient, QueryClientProvider, useQuery } from "react-query";
import React from "react";
import { RecoilRoot } from "recoil";
import { ReactQueryDevtools } from "react-query/devtools";
const queryClient = new QueryClient();

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <RecoilRoot>
      <QueryClientProvider client={queryClient}>
        <ThemeManager>
          <Component {...pageProps} />
        </ThemeManager>
        <ReactQueryDevtools initialIsOpen={false} />
      </QueryClientProvider>
    </RecoilRoot>
  );
}

const ThemeManager = (props: { children: React.ReactNode }) => {
  const theme = extendTheme({ config: {} });
  return <ChakraProvider theme={theme}>{props.children}</ChakraProvider>;
};

export default MyApp;
