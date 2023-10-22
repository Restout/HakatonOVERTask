FROM maven:3.8.4-openjdk-17 as builder
LABEL name=HackhatonSovCom
LABEL autor=IT_LEGENDS
WORKDIR /app
COPY . /app/.
RUN cd /app
RUN mvn clean package -Dmaven.test.skip=true

FROM eclipse-temurin:17-jre-alpine
WORKDIR /app
COPY --from=builder /app/target/*.war /app/*.war
EXPOSE 8097
ENTRYPOINT ["java", "-jar", "/app/*.war"]
#ENTRYPOINT ["java", "-Dspring.profiles.active=dev", "-jar", "app.war"]
