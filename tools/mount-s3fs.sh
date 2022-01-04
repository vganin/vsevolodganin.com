set -e

mkdir -p s3fs-mount
s3fs www.vsevolodganin.com s3fs-mount/ -o passwd_file=$HOME/.passwd-s3fs -o url=http://storage.yandexcloud.net -o use_path_request_style
