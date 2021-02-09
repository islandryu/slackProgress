FROM mysql:8.0

ENV MYSQL_ROOT_PASSWORD=pass \
    MYSQL_DATABASE=laravel \
    MYSQL_USER=laravel \
    MYSQL_PASSWORD=pass\
    TZ=Asia/Tokyo

COPY ./my.cnf /etc/mysql/conf.d/my.cnf
COPY ./init.sql /docker-entrypoint-initdb.d/init.sql
RUN chmod 644 /etc/mysql/conf.d/my.cnf