import { render, screen } from "@testing-library/react"
import TaskList from "@/components/task-list"
import type { Task } from "@/types/task"

const mockOnEdit = jest.fn()
const mockOnDelete = jest.fn()

const mockTasks: Task[] = [
  {
    id: "1",
    title: "Task 1",
    description: "Description 1",
    priority: "high",
    status: "todo",
    createdAt: new Date(),
  },
  {
    id: "2",
    title: "Task 2",
    description: "Description 2",
    priority: "medium",
    status: "inprogress",
    createdAt: new Date(),
  },
]

const defaultProps = {
  tasks: mockTasks,
  onEdit: mockOnEdit,
  onDelete: mockOnDelete,
}

describe("TaskList", () => {
  beforeEach(() => {
    jest.clearAllMocks()
  })

  it("renders all tasks", () => {
    render(<TaskList {...defaultProps} />)

    expect(screen.getByText("Task 1")).toBeInTheDocument()
    expect(screen.getByText("Task 2")).toBeInTheDocument()
  })

  it("shows empty state when no tasks", () => {
    render(<TaskList {...defaultProps} tasks={[]} />)

    expect(screen.getByText("No tasks found")).toBeInTheDocument()
    expect(screen.getByText("Add a new task to get started")).toBeInTheDocument()
  })
})
