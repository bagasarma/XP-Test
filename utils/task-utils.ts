import type { Task } from "@/types/task"

export function sortTasksByPriority(tasks: Task[]): Task[] {
  const priorityOrder = { high: 0, medium: 1, low: 2 }

  return [...tasks].sort((a, b) => {
    return (
      priorityOrder[a.priority as keyof typeof priorityOrder] - priorityOrder[b.priority as keyof typeof priorityOrder]
    )
  })
}

export function filterTasksByStatus(tasks: Task[], status: string): Task[] {
  if (status === "all") {
    return tasks
  }

  return tasks.filter((task) => task.status === status)
}

export function generateTaskId(): string {
  return Date.now().toString()
}

export function validateTask(task: Partial<Task>): boolean {
  return !!(task.title && task.title.trim().length > 0)
}

export function formatTaskDate(date: Date): string {
  return new Intl.DateTimeFormat("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  }).format(date)
}
