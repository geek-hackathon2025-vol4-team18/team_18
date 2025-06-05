FROM postgress:15-alpine

ENV POSTGRES_USER=myuser
ENV POSTGRES_PASSWORD=mypassword
ENV POSTGRES_DB=dialect_sns

COPY init.sql /docker-entrypoint-initdb.d/

EXPOSE 5432