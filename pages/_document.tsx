import { Html, Head, Main, NextScript } from 'next/document';
import Script from 'next/script';

const mapJsSDK = `https://maps.googleapis.com/maps/api/js?key=${'test'}&libraries=places`;
export default function Document() {
  return (
    <Html>
      <Head>
        <link
          href='https://fonts.googleapis.com/css2?family=Waterfall&display=swap'
          rel='stylesheet'
        ></link>
      </Head>
      <body>
        <Main />
        <NextScript />
        <Script strategy='beforeInteractive' defer src={mapJsSDK} />
      </body>
    </Html>
  );
}
