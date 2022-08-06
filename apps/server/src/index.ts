import * as express from 'express'
import { createServer } from 'node:http'
import { Server } from 'socket.io'
import { NODE_ENV, PORT, STATIC_PATH } from './config'
import type { ClientEvents, ServerEvents, Todo } from '@todos/events'

const app = express()
const server = createServer(app)
const io = new Server<ClientEvents, ServerEvents>(server, {
  cors: {
    origin: '*',
  },
})

let db: Todo[] = []

io.on('connection', (socket) => {
  socket.emit('todos', db)

  socket.on('todos', (todos) => {
    db = todos
    io.emit('todos', db)
  })

  socket.on('addTodo', (todo) => {
    db.push(todo)
    io.emit('todos', db)
  })

  socket.on('removeTodo', (todo) => {
    db = db.filter((t) => t.id !== todo.id)
    io.emit('todos', db)
  })

  socket.on('updateTodo', (todo) => {
    db = db.map((t) => (t.id === todo.id ? todo : t))
    io.emit('todos', db)
  })

  socket.on('disconnect', () => {
    console.log(`${socket.id} disconnected`)
  })
})

if (NODE_ENV === 'production') app.use(express.static(STATIC_PATH))

server.listen(PORT, () => {
  console.log(`Server listening on http://127.0.0.1:${PORT}`)
})
