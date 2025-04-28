# Usar a imagem base do OpenJDK
FROM openjdk:17-jdk-slim

# Definir o diretório de trabalho no contêiner
WORKDIR /app

# Copiar o arquivo JAR do seu projeto para dentro do contêiner
COPY target/projetoclientes-0.0.1-SNAPSHOT.jar app.jar

# Expôr a porta que o Spring Boot usará (por padrão é 8080)
EXPOSE 8080

# Comando para rodar o aplicativo
ENTRYPOINT ["java", "-jar", "app.jar"]
