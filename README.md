# Web

Next.js project bootstrapped with `create-next-app`

# Api

Node.js project, utilizes Express and Prisma

# DB

Postgres

# Usage

Make sure to install docker first https://www.docker.com/products/docker-desktop.

After you installed docker, configure

- `.env` (in both `/alpos-site-api` & `/alpos-site-web`)
- `compose.yaml` (make sure you configured db user connections)
- ports in `Dockerfile`

Then run:

```
docker-compose up
```

After the images are pulled and are running, open a new terminal tab and run

```
sudo docker exec -it api npx prisma migrate dev --name init
```

Default ports:

- web: localhost:3000
- api: localhost:4000
