ARG BUILD_FROM

FROM $BUILD_FROM

COPY run.sh /
COPY src/* /
RUN chmod a+x /run.sh

CMD [ "/run.sh" ]
