import { createSignal, type Component, For } from 'solid-js'
import { Todo } from './components/todo'
import { v4 as uuid } from 'uuid'
import { NewTodo } from './components/new-todo'
import { io, type Socket } from 'socket.io-client'
import type {
  ClientEvents,
  ServerEvents,
  Todo as TodoType,
} from '@todos/events'

const App: Component = () => {
  const [todos, setTodos] = createSignal<TodoType[]>([])

  const socket: Socket<ServerEvents, ClientEvents> = io()

  socket.on('todos', (newTodos: TodoType[]) => setTodos(newTodos))

  const handleTodoAdd = (text: string) =>
    socket.emit('addTodo', { id: uuid(), text, isDone: false })

  const handleTodoChange = (todo: TodoType) => socket.emit('updateTodo', todo)

  const handleTodoDelete = (todo: TodoType) => socket.emit('removeTodo', todo)

  return (
    <div class="ustify-center flex  justify-center">
      <div class="flex w-full max-w-xl flex-col gap-2 p-2">
        <NewTodo onAdd={handleTodoAdd} />
        <For each={todos()}>
          {(todo) => (
            <Todo
              todo={todo}
              onChange={handleTodoChange}
              onDelete={handleTodoDelete}
            />
          )}
        </For>
      </div>
    </div>
  )
}

export default App
