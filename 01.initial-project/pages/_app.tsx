import type { AppProps } from "next/app";
import { ChakraProvider } from "@chakra-ui/react";
import { QueryClient, QueryClientProvider, useQuery } from "react-query";
import React from "react";
import { RecoilRoot } from "recoil";

const queryClient = new QueryClient();
function MyApp({ Component, pageProps }: AppProps) {
  return (
    <RecoilRoot>
      <QueryClientProvider client={queryClient}>
        <ChakraProvider>
          <Component {...pageProps} />
        </ChakraProvider>
      </QueryClientProvider>
    </RecoilRoot>
  );
}

export default MyApp;
