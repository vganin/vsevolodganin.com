FROM alpine
RUN apk add -u fuse
RUN wget https://github.com/yandex-cloud/geesefs/releases/latest/download/geesefs-linux-amd64
RUN chmod u+x geesefs-linux-amd64
RUN mv geesefs-linux-amd64 /usr/bin/geesefs
COPY run.sh /run.sh
CMD ["/run.sh"]
