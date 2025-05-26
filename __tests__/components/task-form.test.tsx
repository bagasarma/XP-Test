import { render, screen } from "@testing-library/react"
import userEvent from "@testing-library/user-event"
import TaskForm from "@/components/task-form"
import type { Task } from "@/types/task"

const mockAddTask = jest.fn()
const mockUpdateTask = jest.fn()
const mockCancelEdit = jest.fn()

const defaultProps = {
  addTask: mockAddTask,
  updateTask: mockUpdateTask,
  currentTask: null,
  cancelEdit: mockCancelEdit,
}

describe("TaskForm", () => {
  beforeEach(() => {
    jest.clearAllMocks()
  })

  it("renders add task form by default", () => {
    render(<TaskForm {...defaultProps} />)

    expect(screen.getByText("Add New Task")).toBeInTheDocument()
    expect(screen.getByLabelText(/title/i)).toBeInTheDocument()
    expect(screen.getByLabelText(/description/i)).toBeInTheDocument()
    expect(screen.getByLabelText(/priority/i)).toBeInTheDocument()
    expect(screen.getByLabelText(/status/i)).toBeInTheDocument()
    expect(screen.getByRole("button", { name: /add task/i })).toBeInTheDocument()
  })

  it("calls addTask when form is submitted with valid data", async () => {
    const user = userEvent.setup()
    render(<TaskForm {...defaultProps} />)

    await user.type(screen.getByLabelText(/title/i), "Test Task")
    await user.type(screen.getByLabelText(/description/i), "Test Description")
    await user.selectOptions(screen.getByLabelText(/priority/i), "high")
    await user.selectOptions(screen.getByLabelText(/status/i), "inprogress")

    await user.click(screen.getByRole("button", { name: /add task/i }))

    expect(mockAddTask).toHaveBeenCalledWith({
      title: "Test Task",
      description: "Test Description",
      priority: "high",
      status: "inprogress",
    })
  })

  it("shows validation error when title is empty", async () => {
    const user = userEvent.setup()
    const alertSpy = jest.spyOn(window, "alert").mockImplementation(() => {})

    render(<TaskForm {...defaultProps} />)

    await user.click(screen.getByRole("button", { name: /add task/i }))

    expect(alertSpy).toHaveBeenCalledWith("Please enter a task title")
    expect(mockAddTask).not.toHaveBeenCalled()

    alertSpy.mockRestore()
  })

  it("renders edit form when currentTask is provided", () => {
    const currentTask: Task = {
      id: "1",
      title: "Edit Task",
      description: "Edit Description",
      priority: "medium",
      status: "todo",
      createdAt: new Date(),
    }

    render(<TaskForm {...defaultProps} currentTask={currentTask} />)

    expect(screen.getByText("Edit Task")).toBeInTheDocument()
    expect(screen.getByDisplayValue("Edit Task")).toBeInTheDocument()
    expect(screen.getByDisplayValue("Edit Description")).toBeInTheDocument()
    expect(screen.getByRole("button", { name: /update task/i })).toBeInTheDocument()
    expect(screen.getByRole("button", { name: /cancel/i })).toBeInTheDocument()
  })
})
