# MySQL

## Dockerizing MySQL with docker

```
docker run -d -p 3306:3306 \
  -e MYSQL_ROOT_PASSWORD=linker
  --name mysql \
  mysql:5.7
```

## Database configuration of MySQL

```
docker exec -it mysql mysql -uroot -p
```

```
create database linker CHARACTER SET utf8;
grant all privileges on linker.* to linker@'%' identified by 'linkerpassword';
flush privileges;
quit
```

# Backend

```
cd linker-backend
```

## Dockerizing Backend

```
docker build -t linker/backend:0.1 .
```

## Serving Backend

```
docker run -d --name linker-backend -p 8080:8080 --net=host linker/backend:0.1
```

# Frontend

```
cd linker-backend
```

## Dockerizing Frontend

```
docker build -t linker/frontend:0.1 .
```

## Serving Frontend

```
docker run -d --name linker-frontend -p 80:8000 linker/frontend:0.1
```