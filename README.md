# MySQL

## Dockerizing MySQL with docker

```sh
docker run -d -p 3306:3306 \
  -e MYSQL_ROOT_PASSWORD=linker
  --name mysql \
  mysql:5.7
```

## Database configuration of MySQL

```sh
docker exec -it mysql mysql -uroot -p
```

```sh
create database linker CHARACTER SET utf8;
grant all privileges on linker.* to linker@'%' identified by 'linkerpassword';
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