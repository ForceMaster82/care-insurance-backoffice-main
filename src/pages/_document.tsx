import React, {ReactElement} from 'react'
import Document, {
  DocumentContext,
  DocumentInitialProps,
  DocumentProps,
  Head,
  Html,
  Main,
  NextScript,
} from 'next/document'
import {ServerStyleSheet} from 'styled-components'
import {colors} from '@caredoc/ui-master'

class CustomDocument extends Document<DocumentProps> {
  /**
   * custom getInitialProps for server middleware and styled-components server rendering
   * @param context
   */
  static async getInitialProps(
    context: DocumentContext,
  ): Promise<DocumentInitialProps> {
    const sheet = new ServerStyleSheet()
    const originalRenderPage = context.renderPage

    try {
      context.renderPage = () =>
        originalRenderPage({
          enhanceApp: (App) => (props) =>
            sheet.collectStyles(<App {...props} />),
          enhanceComponent: (Component) => (props) =>
            sheet.collectStyles(<Component {...props} />),
        })
      const initialProps = await Document.getInitialProps(context)
      const styles = [
        <>
          {initialProps.styles}
          {sheet.getStyleElement()}
        </>,
      ]

      return {
        ...initialProps,
        styles,
      }
    } finally {
      sheet.seal()
    }
  }

  render(): ReactElement {
    const globalCSS = `
      body {
        background-color: ${colors.bgSecondary};
      }
    `

    return (
      <Html lang="ko">
        <Head>
          <link
            as="font"
            crossOrigin=""
            href="https://static.prd.caredoc.kr/font/SpoqaHanSansNeo/SpoqaHanSansNeo-Bold.woff2"
            rel="preload"
            type="font/woff2"
          />
          <link
            as="font"
            crossOrigin=""
            href="https://static.prd.caredoc.kr/font/SpoqaHanSansNeo/SpoqaHanSansNeo-Regular.woff2"
            rel="preload"
            type="font/woff2"
          />
          <link
            href="https://static.prd.caredoc.kr/font/SpoqaHanSansNeo/SpoqaHanSansNeo.css"
            rel="stylesheet"
          />
          <link href="/favicons/favicon.png" rel="icon" />
          <style>{globalCSS}</style>
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    )
  }
}

export default CustomDocument
