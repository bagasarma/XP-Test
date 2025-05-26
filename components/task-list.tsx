import type { Task } from "@/types/task"
import TaskItem from "./task-item"

interface TaskListProps {
  tasks: Task[]
  onEdit: (id: string) => void
  onDelete: (id: string) => void
}

export default function TaskList({ tasks, onEdit, onDelete }: TaskListProps) {
  if (tasks.length === 0) {
    return (
      <div className="task-list">
        <div className="empty-state">
          <p>No tasks found</p>
          <p>Add a new task to get started</p>
        </div>
      </div>
    )
  }

  return (
    <div className="task-list">
      {tasks.map((task) => (
        <TaskItem key={task.id} task={task} onEdit={onEdit} onDelete={onDelete} />
      ))}
    </div>
  )
}
