import React from "react";
import Head from "next/head";
import Typography from "@material-ui/core/Typography";

export default function () {
    return (
        <>
            <Head>
                <title>Ooops...</title>
            </Head>
            <>
                <style jsx>{`
                  .background-container {
                    position: fixed;
                    width: 100%;
                    height: 100vh;
                    overflow-y: scroll;
                    z-index: -1;
                  }

                  .background-image {
                    width: 100%;
                    min-height: 100%;
                    object-fit: cover;
                  }

                  .title {
                    text-align: center;
                    padding-top: 20pt;
                    text-shadow: 2pt 2pt 2pt #000000;
                  }
                `}</style>

                <div className='background-container'>
                    <img src="/404.jpg" className='background-image'/>
                </div>

                <div className="title">
                    <Typography variant="h2">
                        見ないでください!
                        <br/>
                        4&nbsp;0&nbsp;4
                    </Typography>
                </div>
            </>
        </>
    )
}