import Document, { Html, Head, Main, NextScript } from "next/document";

class MyDocument extends Document {
  static async getInitialProps(ctx) {
    const initialProps = await Document.getInitialProps(ctx);
    return { ...initialProps };
  }

  render() {
    return (
      <Html>
        <Head>
          <script
            src="https://api.memberstack.io/static/memberstack.js?custom"
            data-memberstack-id="8328c6425461a71ebbf25c6e1e1d1f21"
          />
        </Head>
        <body>
          <button href="#/ms/signup/60dec30d454b34000428baf0">sign up</button>
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}

export default MyDocument;
