"use client"

import type React from "react"

import { useState, useEffect } from "react"
import type { Task } from "@/types/task"

interface TaskFormProps {
  addTask: (task: Omit<Task, "id" | "createdAt">) => void
  updateTask: (task: Task) => void
  currentTask: Task | null
  cancelEdit: () => void
}

export default function TaskForm({ addTask, updateTask, currentTask, cancelEdit }: TaskFormProps) {
  const [title, setTitle] = useState("")
  const [description, setDescription] = useState("")
  const [priority, setPriority] = useState("low")
  const [status, setStatus] = useState("todo")

  // Update form when currentTask changes (for editing)
  useEffect(() => {
    if (currentTask) {
      setTitle(currentTask.title)
      setDescription(currentTask.description || "")
      setPriority(currentTask.priority)
      setStatus(currentTask.status)
    }
  }, [currentTask])

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    if (!title.trim()) {
      alert("Please enter a task title")
      return
    }

    if (currentTask) {
      // Update existing task
      updateTask({
        ...currentTask,
        title: title.trim(),
        description: description.trim(),
        priority,
        status,
      })
    } else {
      // Add new task
      addTask({
        title: title.trim(),
        description: description.trim(),
        priority,
        status,
      })
    }

    // Reset form
    resetForm()
  }

  const resetForm = () => {
    setTitle("")
    setDescription("")
    setPriority("low")
    setStatus("todo")
  }

  return (
    <section className="task-form-container">
      <h2>{currentTask ? "Edit Task" : "Add New Task"}</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="taskTitle">Title</label>
          <input type="text" id="taskTitle" value={title} onChange={(e) => setTitle(e.target.value)} required />
        </div>

        <div className="form-group">
          <label htmlFor="taskDescription">Description</label>
          <textarea
            id="taskDescription"
            rows={3}
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          ></textarea>
        </div>

        <div className="form-group">
          <label htmlFor="taskPriority">Priority</label>
          <select id="taskPriority" value={priority} onChange={(e) => setPriority(e.target.value)}>
            <option value="low">Low</option>
            <option value="medium">Medium</option>
            <option value="high">High</option>
          </select>
        </div>

        <div className="form-group">
          <label htmlFor="taskStatus">Status</label>
          <select id="taskStatus" value={status} onChange={(e) => setStatus(e.target.value)}>
            <option value="todo">To Do</option>
            <option value="inprogress">In Progress</option>
            <option value="completed">Completed</option>
          </select>
        </div>

        <div className="form-actions">
          {currentTask ? (
            <>
              <button type="submit" className="btn btn-success">
                Update Task
              </button>
              <button type="button" className="btn btn-secondary" onClick={cancelEdit}>
                Cancel
              </button>
            </>
          ) : (
            <button type="submit" className="btn btn-primary">
              Add Task
            </button>
          )}
        </div>
      </form>
    </section>
  )
}
