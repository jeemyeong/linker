FROM java:8

USER root

WORKDIR /linker/backend

ADD . ./

RUN ./gradlew build
RUN mkdir -p /linker/apps && cp build/libs/* /linker/apps/ && rm -rf /linker/backend

EXPOSE 8080

CMD ["java", "-jar", "/linker/apps/linker-0.0.1-SNAPSHOT.jar", "-Xms512m"]