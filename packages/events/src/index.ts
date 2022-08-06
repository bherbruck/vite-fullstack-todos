import { EventsMap } from 'socket.io/dist/typed-events'

export type Todo = {
  id: string | number
  text: string
  isDone: boolean
}

export type ServerEvents = {
  todos: (todos: Todo[]) => void
}

export type ClientEvents = {
  todos: (todos: Todo[]) => void
  addTodo: (todo: Todo) => void
  removeTodo: (todo: Todo) => void
  updateTodo: (todo: Todo) => void
}
