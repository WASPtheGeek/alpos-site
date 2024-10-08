This project consists of 3 docker images: - web - api - db

# Web

Web is a Next.js project bootstrapped with `create-next-app`

# Api

Api is a Node.js project. It utilizes Express and Prisma

# DB

Postgres

# Usage

Make sure to install docker first https://www.docker.com/products/docker-desktop.

After you installed docker configure - .env (/alpos-site-api & /alpos-site/web) - compose.yaml - configure db user connections in compose.yaml - configure ports in Dockerfile

Then run these commands:

configure /

```
docker-compose up
```

Then after the images are pulled and are running open a new terminal tab and run

```
sudo docker exec -it api npx prisma migrate dev --name init
```

The API is ready to be consumed on `http://localhost:8000`
