# vite-fullstack-todos

An example of a fullstack, realtime todos app using the following technologies:

- [vite](https://vitejs.dev/)
- [solidjs](https://www.solidjs.com/)
- [socket.io](https://socket.io/)
- [express](https://expressjs.com/)

Check out the [demo](https://vite-fullstack-todos.onrender.com/).

## Running in development

```bash
npm run dev
```

## Running in production

```bash
docker build -t todos .
docker run -p 3000:3000 todos
```

## How it works

In development, the client and server run separately. The `vite` dev server proxies `socket.io` requests to the server (can also be done with `http` requests).

In production (`docker`), the client and server are built separately. The `dist/` directory is then copied from each builder container into a runner (to server static files). You could set it up to build with npm scripts and run it with node but `docker` is more fun.

## Todos

- [] use a database (redis, maybe persisted to postgres with prisma)
- [] optimize the client updating/rendering from socket.io
- [] add some validation to the client
