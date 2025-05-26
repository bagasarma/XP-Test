"use client"

import type { Task } from "@/types/task"

interface TaskItemProps {
  task: Task
  onEdit: (id: string) => void
  onDelete: (id: string) => void
}

export default function TaskItem({ task, onEdit, onDelete }: TaskItemProps) {
  // Helper function to get status display text
  const getStatusText = (status: string) => {
    switch (status) {
      case "todo":
        return "To Do"
      case "inprogress":
        return "In Progress"
      case "completed":
        return "Completed"
      default:
        return status
    }
  }

  // Capitalize first letter of priority
  const capitalizeFirstLetter = (string: string) => {
    return string.charAt(0).toUpperCase() + string.slice(1)
  }

  return (
    <div className="task-item">
      <div className="task-header">
        <h3 className="task-title">{task.title}</h3>
        <div className={`task-priority priority-${task.priority}`}>{capitalizeFirstLetter(task.priority)}</div>
      </div>

      {task.description && <p className="task-description">{task.description}</p>}

      <div className="task-footer">
        <div className={`task-status status-${task.status}`}>{getStatusText(task.status)}</div>
        <div className="task-actions">
          <button className="btn-edit" onClick={() => onEdit(task.id)}>
            Edit
          </button>
          <button className="btn-delete" onClick={() => onDelete(task.id)}>
            Delete
          </button>
        </div>
      </div>
    </div>
  )
}
