"use client"

import { useState, useEffect } from "react"
import TaskForm from "@/components/task-form"
import TaskList from "@/components/task-list"
import ConfirmationDialog from "@/components/confirmation-dialog"
import type { Task } from "@/types/task"

export default function Home() {
  const [tasks, setTasks] = useState<Task[]>([])
  const [currentTask, setCurrentTask] = useState<Task | null>(null)
  const [statusFilter, setStatusFilter] = useState<string>("all")
  const [confirmDialog, setConfirmDialog] = useState({
    isOpen: false,
    taskId: "",
  })

  // Load tasks from localStorage on initial render
  useEffect(() => {
    const storedTasks = localStorage.getItem("tasks")
    if (storedTasks) {
      setTasks(JSON.parse(storedTasks))
    }
  }, [])

  // Save tasks to localStorage whenever tasks change
  useEffect(() => {
    localStorage.setItem("tasks", JSON.stringify(tasks))
  }, [tasks])

  // Add a new task
  const addTask = (task: Omit<Task, "id" | "createdAt">) => {
    const newTask: Task = {
      id: Date.now().toString(),
      title: task.title,
      description: task.description,
      priority: task.priority,
      status: task.status,
      createdAt: new Date(),
    }

    setTasks([...tasks, newTask])
  }

  // Update an existing task
  const updateTask = (updatedTask: Task) => {
    setTasks(tasks.map((task) => (task.id === updatedTask.id ? updatedTask : task)))
    setCurrentTask(null)
  }

  // Open confirmation dialog for deleting a task
  const confirmDeleteTask = (taskId: string) => {
    setConfirmDialog({
      isOpen: true,
      taskId: taskId,
    })
  }

  // Delete a task after confirmation
  const deleteTask = () => {
    setTasks(tasks.filter((task) => task.id !== confirmDialog.taskId))
    setConfirmDialog({ isOpen: false, taskId: "" })
  }

  // Cancel delete confirmation
  const cancelDelete = () => {
    setConfirmDialog({ isOpen: false, taskId: "" })
  }

  // Edit a task (set it as current task)
  const editTask = (taskId: string) => {
    const taskToEdit = tasks.find((task) => task.id === taskId)
    if (taskToEdit) {
      setCurrentTask(taskToEdit)
    }
  }

  // Cancel editing
  const cancelEdit = () => {
    setCurrentTask(null)
  }

  // Filter tasks by status
  const getFilteredTasks = () => {
    let filteredTasks = tasks

    if (statusFilter !== "all") {
      filteredTasks = tasks.filter((task) => task.status === statusFilter)
    }

    // Sort tasks by priority (high > medium > low)
    return filteredTasks.sort((a, b) => {
      const priorityOrder = { high: 0, medium: 1, low: 2 }
      return (
        priorityOrder[a.priority as keyof typeof priorityOrder] -
        priorityOrder[b.priority as keyof typeof priorityOrder]
      )
    })
  }

  return (
    <div className="container">
      <header>
        <h1>TaskEasy</h1>
        <p>Simple Task Management</p>
      </header>

      <main>
        <TaskForm addTask={addTask} updateTask={updateTask} currentTask={currentTask} cancelEdit={cancelEdit} />

        <section className="task-list-container">
          <div className="task-list-header">
            <h2>Task List</h2>
            <div className="filter-container">
              <label htmlFor="statusFilter">Filter by Status:</label>
              <select id="statusFilter" value={statusFilter} onChange={(e) => setStatusFilter(e.target.value)}>
                <option value="all">All</option>
                <option value="todo">To Do</option>
                <option value="inprogress">In Progress</option>
                <option value="completed">Completed</option>
              </select>
            </div>
          </div>

          <TaskList tasks={getFilteredTasks()} onEdit={editTask} onDelete={confirmDeleteTask} />
        </section>
      </main>

      <footer>
        <p>&copy; 2025 TaskEasy. Created with XP practices.</p>
      </footer>

      <ConfirmationDialog
        isOpen={confirmDialog.isOpen}
        title="Confirm Delete"
        message="Are you sure you want to delete this task? This action cannot be undone."
        onConfirm={deleteTask}
        onCancel={cancelDelete}
      />
    </div>
  )
}
