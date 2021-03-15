import React from "react";
import Head from 'next/Head';
import Typography from "@material-ui/core/Typography";
import GitHubIcon from '@material-ui/icons/GitHub';
import InstagramIcon from '@material-ui/icons/Instagram';
import TwitterIcon from '@material-ui/icons/Twitter';
import FacebookIcon from '@material-ui/icons/Facebook';
import LinkedinIcon from '@material-ui/icons/Linkedin';
import EmailIcon from '@material-ui/icons/Email';
import {Box, IconButton, Link} from "@material-ui/core";
import {red} from "@material-ui/core/colors";

export default function () {
    const SocialLinkButton = (props: React.PropsWithChildren<{ href: string; }>) => (
        <a target="_blank" href={props.href} rel="noopener noreferrer">
            <IconButton>{props.children}</IconButton>
        </a>
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
                gridGap="16pt"
                margin="16pt"
            >
                <style jsx>{`
                  .profile {
                    margin-left: auto;
                    margin-right: auto;
                    width: 150pt;
                  }

                  .hi {
                    text-align: center;
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

                <div className="hi">
                    <Typography variant="h6">
                        Hi, I'm Vsevolod, an Android developer currently working
                        at <Link style={{color: red[500]}} href="https://yandex.com/dev/" rel="noopener noreferrer">Yandex</Link>
                    </Typography>
                </div>

                <div className="social">
                    <SocialLinkButton href="https://github.com/vganin"><GitHubIcon fontSize="large"/></SocialLinkButton>
                    <SocialLinkButton href="https://instagram.com/vsevolod.ganin"><InstagramIcon fontSize="large"/></SocialLinkButton>
                    <SocialLinkButton href="https://twitter.com/vsevolod_ganin"><TwitterIcon fontSize="large"/></SocialLinkButton>
                    <SocialLinkButton href="https://facebook.com/vsevolod.ganin"><FacebookIcon fontSize="large"/></SocialLinkButton>
                    <SocialLinkButton href="https://linkedin.com/in/vganin/"><LinkedinIcon fontSize="large"/></SocialLinkButton>
                    <SocialLinkButton href="mailto:vsevolod.ganin@gmail.com"><EmailIcon fontSize="large"/></SocialLinkButton>
                </div>

                <Typography variant="h6">
                    <hr/>
                    Personal projects
                    <br/>
                </Typography>

                <Box
                    display="flex"
                    flexDirection="row"
                    flexWrap="wrap"
                    gridGap="16pt"
                    alignItems="center"
                    justifyContent="space-around"
                >
                    <Box display="flex" flexDirection="row" alignItems="center" gridGap="16pt" flexWrap="no-wrap">
                        <Typography variant="h4" align="center" style={{color: "#A53030", textShadow: "1px 1px 2pt #000000", fontWeight: 600}}>
                            Click Track
                        </Typography>
                        <img
                            src="/click-track-icon.svg"
                            alt="Click Track"
                            height="80pt"
                        />
                    </Box>

                    <a href='https://play.google.com/store/apps/details?id=com.vsevolodganin.clicktrack'>
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
