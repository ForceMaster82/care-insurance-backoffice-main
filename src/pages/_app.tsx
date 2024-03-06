import React, {useState} from 'react'
import {AppProps} from 'next/app'
import Head from 'next/head'
import {DefaultSeo} from 'next-seo'
import {GlobalStyle, ThemeProvider} from '@caredoc/ui-web'
import {QueryClient, QueryClientProvider} from '@tanstack/react-query'
import {ReactQueryDevtools} from '@tanstack/react-query-devtools'
import useQueryClientConfig from '../config/query-client'
import SEO from '~config/seo'

const Meta = (): JSX.Element => (
  <Head>
    <meta
      content="user-scalable=no,initial-scale=1,maximum-scale=1,minimum-scale=1,width=device-width"
      name="viewport"
    />
    <meta content="IE=edge" httpEquiv="X-UA-Compatible" />
    <meta content="yes" name="mobile-web-app-capable" />
  </Head>
)

const CareInsuranceBackofficeWebApp = ({
  Component,
  pageProps,
}: AppProps): JSX.Element => {
  const queryClientConfig = useQueryClientConfig()
  const [queryClient] = useState(() => new QueryClient(queryClientConfig))

  return (
    <>
      <Meta />
      <DefaultSeo {...SEO} />
      <GlobalStyle />
      <QueryClientProvider client={queryClient}>
        <ThemeProvider>
          <Component {...pageProps} />
          <ReactQueryDevtools />
        </ThemeProvider>
      </QueryClientProvider>
    </>
  )
}

export default CareInsuranceBackofficeWebApp
