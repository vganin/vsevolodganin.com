#!/bin/sh

if [ -z "${AWS_ACCESS_KEY_ID}" ]; then
    echo "Specify AWS_ACCESS_KEY_ID" ; exit 1
fi
if [ -z "${AWS_SECRET_ACCESS_KEY}" ]; then
    echo "Specify AWS_SECRET_ACCESS_KEY" ; exit 1
fi
if [ -z "${S3_URL}" ]; then
    echo "Specify S3_URL" ; exit 1
fi
if [ -z "${S3_BUCKET}" ]; then
    echo "Specify S3_BUCKET" ; exit 1
fi

mkdir -p /root/.aws/ $MNT_POINT
chmod 700 /root/.aws
cat - > /root/.aws/credentials <<CREDENTIALS
[default]
aws_access_key_id = ${AWS_ACCESS_KEY_ID}
aws_secret_access_key = ${AWS_SECRET_ACCESS_KEY}
CREDENTIALS

geesefs -o allow_other -f --endpoint=${S3_URL} ${OPTION} ${S3_BUCKET} $MNT_POINT
