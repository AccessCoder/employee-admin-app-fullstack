FROM openjdk:17

LABEL maintainer="test@neuefische.de"

EXPOSE 8080

ADD target/app.jar app.jar

CMD [ "sh", "-c", "java -jar /app.jar" ]