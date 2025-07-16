#!/bin/sh

# Need edge/testing repo for mp3val
if ! grep -q 'edge/testing' /etc/apk/repositories; then
    echo "https://dl-cdn.alpinelinux.org/alpine/edge/testing" >> /etc/apk/repositories
fi

apk update
apk add \
    flac \
    mp3val
