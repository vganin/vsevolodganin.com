import Head from 'next/Head';
import React from 'react';
import CssBaseline from '@material-ui/core/CssBaseline';
import {ThemeProvider} from "@material-ui/core";
import theme from "../src/theme";

export default function MyApp({Component, pageProps}: any) {
    return (
        <React.Fragment>
            <Head>
                <title>Vsevolod Ganin</title>
                <meta name="viewport" content="minimum-scale=1, initial-scale=1, width=device-width"/>
            </Head>
            <ThemeProvider theme={theme}>
                <CssBaseline/>
                <Component {...pageProps} />
            </ThemeProvider>
        </React.Fragment>
    );
}
