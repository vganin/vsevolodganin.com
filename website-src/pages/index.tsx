import React from "react";
import Head from 'next/head';
import Typography from "@mui/material/Typography";
import GitHubIcon from '@mui/icons-material/GitHub';
import TwitterIcon from '@mui/icons-material/Twitter';
import LinkedinIcon from '@mui/icons-material/LinkedIn';
import EmailIcon from '@mui/icons-material/Email';
import {Box, IconButton, Link, Tooltip} from "@mui/material";

export default function () {
    const SocialLinkButton = (props: React.PropsWithChildren<{ href: string; tooltip: string }>) => (
        <Tooltip title={props.tooltip}>
            <a target="_blank" href={props.href} rel="noopener noreferrer">
                <IconButton>{props.children}</IconButton>
            </a>
        </Tooltip>
    )

    return (
        <>
            <Head>
                <title>Vsevolod Ganin</title>
            </Head>

            <Box
                display="flex"
                flexDirection="column"
                alignItems="center"
                gap="16pt"
                margin="16pt"
            >
                <style jsx>{`
                  .profile {
                    margin-left: auto;
                    margin-right: auto;
                    width: 150pt;
                  }

                  .social {
                    display: flex;
                    flex-direction: row;
                    flex-wrap: wrap;
                    justify-content: center;
                  }
                `}</style>

                <img
                    src="/profile.png"
                    alt="Me"
                    className="profile"
                />

                <div className="social">
                    <SocialLinkButton tooltip="GitHub" href="https://github.com/vganin"><GitHubIcon fontSize="large"/></SocialLinkButton>
                    <SocialLinkButton tooltip="Twitter" href="https://twitter.com/vsga_dev"><TwitterIcon fontSize="large"/></SocialLinkButton>
                    <SocialLinkButton tooltip="Linkedin" href="https://linkedin.com/in/vganin/"><LinkedinIcon fontSize="large"/></SocialLinkButton>
                    <SocialLinkButton tooltip="E-mail me!" href="mailto:contact@vsevolodganin.com"><EmailIcon fontSize="large"/></SocialLinkButton>
                </div>

                <Box
                    display="flex"
                    flexDirection="row"
                    flexWrap="wrap"
                    gap="16pt"
                    alignItems="center"
                    justifyContent="space-around"
                >
                    <Box display="flex" flexDirection="row" alignItems="center" gap="16pt" flexWrap="nowrap">
                        <Typography variant="h4" align="center" style={{color: "#A53030", textShadow: "1px 1px 2pt #000000", fontWeight: 600}}>
                            Click Track
                        </Typography>
                        <img
                            src="/click-track-icon.svg"
                            alt="Click Track"
                            height="80pt"
                        />
                    </Box>
                    <a href='https://play.google.com/store/apps/details?id=com.vsevolodganin.clicktrack&utm_source=vsevolodganin.com'>
                        <img
                            alt='Get it on Google Play'
                            src='/google-play.png'
                            style={{
                                minWidth: "100pt",
                                maxWidth: "130pt"
                            }}
                        />
                    </a>
                </Box>
            </Box>
        </>
    );
}
