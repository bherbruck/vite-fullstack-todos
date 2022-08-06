import { createSignal, type Component } from 'solid-js'
import { Icon } from '@amoutonbrady/solid-heroicons'
import { trash } from '@amoutonbrady/solid-heroicons/outline'
import type { Todo as TodoType } from '@todos/events'

export type TodoProps = {
  todo: TodoType
  onChange?: (todo: TodoType) => void
  onDelete?: (todo: TodoType) => void
}

export const Todo: Component<TodoProps> = ({
  todo,
  onChange = () => {},
  onDelete = () => {},
}) => (
  <div class="bg-base-200 flex h-16 flex-row items-center gap-4 rounded-lg p-2">
    <input
      class="checkbox h-8 w-8"
      type="checkbox"
      checked={todo.isDone}
      onChange={() => onChange({ ...todo, isDone: !todo.isDone })}
    />
    <input
      class="flex-1 text-lg input input-ghost"
      value={todo.text}
      disabled={todo.isDone}
      onChange={(e) => onChange({ ...todo, text: e.currentTarget.value })}
    />
    <button class=" btn btn-ghost btn-square" onClick={() => onDelete(todo)}>
      <Icon class="h-8 w-8" path={trash} />
    </button>
  </div>
)
