FROM openjdk:21-jdk-slim

WORKDIR /app

COPY mvnw pom.xml ./
COPY .mvn .mvn

COPY src ./src

RUN apt-get update && \
    apt-get install -y maven

EXPOSE 8080

CMD ["mvn", "spring-boot:run"]
