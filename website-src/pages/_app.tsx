import Head from 'next/head';
import React from 'react';
import CssBaseline from '@mui/material/CssBaseline';
import {ThemeProvider} from "@mui/material/styles";
import theme from "../src/theme";

export default function MyApp({Component, pageProps}: any) {
    return (
        <React.Fragment>
            <Head>
                <title>Vsevolod Ganin</title>
                <link rel="icon" href="/favicon.png" />
                <meta name="viewport" content="minimum-scale=1, initial-scale=1, width=device-width"/>
            </Head>
            <ThemeProvider theme={theme}>
                <CssBaseline/>
                <Component {...pageProps} />
            </ThemeProvider>
        </React.Fragment>
    );
}
