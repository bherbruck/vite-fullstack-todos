import { createEffect, createSignal, type Component } from 'solid-js'
import { Icon } from '@amoutonbrady/solid-heroicons'
import { plus } from '@amoutonbrady/solid-heroicons/outline'

export type NewTodoProps = {
  onAdd?: (text: string) => void
}

export const NewTodo: Component<NewTodoProps> = ({ onAdd = () => {} }) => {
  const [text, setText] = createSignal('')

  return (
    <div class="input-group">
      <input
        placeholder="New Todo"
        class="input bg-base-200 input-lg h-16 min-w-0 flex-1 px-2"
        value={text()}
        onInput={(e) => setText(e.currentTarget.value)}
      />

      <button
        class="btn btn-square btn-ghost bg-base-300 h-16"
        onClick={() => onAdd(text())}
      >
        <Icon class="h-8 w-8" path={plus} />
      </button>
    </div>
  )
}
