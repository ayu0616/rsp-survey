import type { AppProps } from "next/app";
import Head from "next/head";
import "styles/globals.scss";

export default function App({ Component, pageProps }: AppProps) {
    return (
        <div>
            <Head>
                <meta
                    name="viewport"
                    content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no"
                />
                <link rel="preconnect" href="https://fonts.googleapis.com" />
                <link
                    rel="preconnect"
                    href="https://fonts.gstatic.com"
                    crossOrigin="crossorigin"
                />
                <link
                    href="https://fonts.googleapis.com/css2?family=Zen+Kaku+Gothic+New:wght@300;400;500;700;900&display=swap"
                    rel="stylesheet"
                />
            </Head>
            <Component {...pageProps} />
        </div>
    );
}
