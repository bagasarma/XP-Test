import { render, screen } from "@testing-library/react"
import userEvent from "@testing-library/user-event"
import TaskItem from "@/components/task-item"
import type { Task } from "@/types/task"

const mockOnEdit = jest.fn()
const mockOnDelete = jest.fn()

const mockTask: Task = {
  id: "1",
  title: "Test Task",
  description: "Test Description",
  priority: "high",
  status: "todo",
  createdAt: new Date(),
}

const defaultProps = {
  task: mockTask,
  onEdit: mockOnEdit,
  onDelete: mockOnDelete,
}

describe("TaskItem", () => {
  beforeEach(() => {
    jest.clearAllMocks()
  })

  it("renders task information correctly", () => {
    render(<TaskItem {...defaultProps} />)

    expect(screen.getByText("Test Task")).toBeInTheDocument()
    expect(screen.getByText("Test Description")).toBeInTheDocument()
    expect(screen.getByText("High")).toBeInTheDocument()
    expect(screen.getByText("To Do")).toBeInTheDocument()
  })

  it("calls onEdit when edit button is clicked", async () => {
    const user = userEvent.setup()
    render(<TaskItem {...defaultProps} />)

    await user.click(screen.getByRole("button", { name: /edit/i }))

    expect(mockOnEdit).toHaveBeenCalledWith("1")
  })

  it("calls onDelete when delete button is clicked", async () => {
    const user = userEvent.setup()
    render(<TaskItem {...defaultProps} />)

    await user.click(screen.getByRole("button", { name: /delete/i }))

    expect(mockOnDelete).toHaveBeenCalledWith("1")
  })
})
