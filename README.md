# MySQL

## Dockerizing MySQL with docker

```sh
docker run -d -p 3306:3306 \
  -e MYSQL_ROOT_PASSWORD={MYSQL_ROOT_PASSWORD} \
  --name mysql \
  mysql:5.7
```

## Database configuration of MySQL

```sh
docker exec -it mysql mysql -uroot -p
```

```sh
create database {database} CHARACTER SET utf8;
grant all privileges on {database}.* to {host}@'%' identified by '{password}';
flush privileges;
quit
```

# Backend

```sh
cd linker-backend
```

## Dockerizing Backend

```sh
docker build -t linker/backend:0.1 .
```

## Send docker image to remote server

```sh
# bzip2 should be installed before this command
docker save linker/backend:0.1 | bzip2 | \
     ssh root@{remote.server.ip} 'bunzip2 | docker load'
```

## Serving Backend

```sh
docker run -d --name linker-backend --net=host linker/backend:0.1
```

# Frontend

```sh
cd linker-frontend
```

## Dockerizing Frontend

```sh
docker build -t linker/frontend:0.1 .
```

## Send docker image to remote server

```sh
# bzip2 should be installed before this command
docker save linker/frontend:0.1 | bzip2 | \
     ssh root@{remote.server.ip} 'bunzip2 | docker load'
```

## Serving Frontend

```sh
docker run --rm -d --name linker-frontend --net=host linker/frontend:0.1
```

# iptables
```sh
iptables -I INPUT 5 -p tcp -m tcp --dport 80 -j ACCEPT
iptables -I INPUT 5 -p tcp -m tcp --dport 8080 -j ACCEPT
iptables -I INPUT 5 -p tcp -m tcp --dport 3306 -j ACCEPT
```

# Remove docker cache
```sh
docker system prune -a
```
