// Task Management Application

// DOM Elements
const taskForm = document.getElementById("taskForm")
const taskList = document.getElementById("taskList")
const taskTitle = document.getElementById("taskTitle")
const taskDescription = document.getElementById("taskDescription")
const taskPriority = document.getElementById("taskPriority")
const taskStatus = document.getElementById("taskStatus")
const updateTaskBtn = document.getElementById("updateTaskBtn")
const cancelEditBtn = document.getElementById("cancelEditBtn")
const statusFilter = document.getElementById("statusFilter")
const taskTemplate = document.getElementById("taskTemplate")

// Global variables
let tasks = []
let currentTaskId = null

// Task class
class Task {
  constructor(title, description, priority, status) {
    this.id = Date.now().toString()
    this.title = title
    this.description = description
    this.priority = priority
    this.status = status
    this.createdAt = new Date()
  }
}

// Initialize the application
function init() {
  loadTasksFromLocalStorage()
  renderTasks()
  setupEventListeners()
}

// Load tasks from localStorage
function loadTasksFromLocalStorage() {
  const storedTasks = localStorage.getItem("tasks")
  if (storedTasks) {
    tasks = JSON.parse(storedTasks)
  }
}

// Save tasks to localStorage
function saveTasksToLocalStorage() {
  localStorage.setItem("tasks", JSON.stringify(tasks))
}

// Setup event listeners
function setupEventListeners() {
  // Form submission for adding a new task
  taskForm.addEventListener("submit", handleFormSubmit)

  // Update task button
  updateTaskBtn.addEventListener("click", handleUpdateTask)

  // Cancel edit button
  cancelEditBtn.addEventListener("click", cancelEdit)

  // Status filter change
  statusFilter.addEventListener("change", renderTasks)
}

// Handle form submission
function handleFormSubmit(e) {
  e.preventDefault()

  // Validate form
  if (!taskTitle.value.trim()) {
    alert("Please enter a task title")
    return
  }

  // Create new task
  const newTask = new Task(taskTitle.value.trim(), taskDescription.value.trim(), taskPriority.value, taskStatus.value)

  // Add task to array
  tasks.push(newTask)

  // Save to localStorage
  saveTasksToLocalStorage()

  // Clear form
  resetForm()

  // Render tasks
  renderTasks()
}

// Handle updating a task
function handleUpdateTask() {
  // Find task by ID
  const taskIndex = tasks.findIndex((task) => task.id === currentTaskId)

  if (taskIndex !== -1) {
    // Update task properties
    tasks[taskIndex].title = taskTitle.value.trim()
    tasks[taskIndex].description = taskDescription.value.trim()
    tasks[taskIndex].priority = taskPriority.value
    tasks[taskIndex].status = taskStatus.value

    // Save to localStorage
    saveTasksToLocalStorage()

    // Reset form and UI
    resetForm()

    // Render tasks
    renderTasks()
  }
}

// Reset form
function resetForm() {
  taskForm.reset()
  currentTaskId = null
  updateTaskBtn.style.display = "none"
  cancelEditBtn.style.display = "none"
  taskForm.querySelector('button[type="submit"]').style.display = "block"
}

// Cancel edit mode
function cancelEdit() {
  resetForm()
}

// Edit task
function editTask(taskId) {
  // Find task by ID
  const task = tasks.find((task) => task.id === taskId)

  if (task) {
    // Populate form
    taskTitle.value = task.title
    taskDescription.value = task.description
    taskPriority.value = task.priority
    taskStatus.value = task.status

    // Set current task ID
    currentTaskId = taskId

    // Show update and cancel buttons, hide submit button
    updateTaskBtn.style.display = "block"
    cancelEditBtn.style.display = "block"
    taskForm.querySelector('button[type="submit"]').style.display = "none"

    // Scroll to form
    taskForm.scrollIntoView({ behavior: "smooth" })
  }
}

// Delete task
function deleteTask(taskId) {
  if (confirm("Are you sure you want to delete this task?")) {
    // Remove task from array
    tasks = tasks.filter((task) => task.id !== taskId)

    // Save to localStorage
    saveTasksToLocalStorage()

    // Render tasks
    renderTasks()
  }
}

// Render tasks
function renderTasks() {
  // Clear task list
  taskList.innerHTML = ""

  // Get current filter value
  const filterValue = statusFilter.value

  // Filter tasks
  let filteredTasks = tasks
  if (filterValue !== "all") {
    filteredTasks = tasks.filter((task) => task.status === filterValue)
  }

  // Sort tasks by priority (high > medium > low)
  filteredTasks.sort((a, b) => {
    const priorityOrder = { high: 0, medium: 1, low: 2 }
    return priorityOrder[a.priority] - priorityOrder[b.priority]
  })

  // Check if there are no tasks
  if (filteredTasks.length === 0) {
    const emptyState = document.createElement("div")
    emptyState.className = "empty-state"
    emptyState.innerHTML = `
            <p>No tasks found</p>
            <p>Add a new task to get started</p>
        `
    taskList.appendChild(emptyState)
    return
  }

  // Render each task
  filteredTasks.forEach((task) => {
    // Clone template
    const taskNode = document.importNode(taskTemplate.content, true)

    // Set task data
    taskNode.querySelector(".task-title").textContent = task.title

    // Set description (if any)
    const descriptionElement = taskNode.querySelector(".task-description")
    if (task.description) {
      descriptionElement.textContent = task.description
    } else {
      descriptionElement.remove()
    }

    // Set priority with appropriate class
    const priorityElement = taskNode.querySelector(".task-priority")
    priorityElement.textContent = capitalizeFirstLetter(task.priority)
    priorityElement.classList.add(`priority-${task.priority}`)

    // Set status with appropriate class
    const statusElement = taskNode.querySelector(".task-status")
    let statusText = ""
    switch (task.status) {
      case "todo":
        statusText = "To Do"
        break
      case "inprogress":
        statusText = "In Progress"
        break
      case "completed":
        statusText = "Completed"
        break
    }
    statusElement.textContent = statusText
    statusElement.classList.add(`status-${task.status}`)

    // Set up edit button
    const editButton = taskNode.querySelector(".btn-edit")
    editButton.addEventListener("click", () => editTask(task.id))

    // Set up delete button
    const deleteButton = taskNode.querySelector(".btn-delete")
    deleteButton.addEventListener("click", () => deleteTask(task.id))

    // Add task item to list
    taskList.appendChild(taskNode)
  })
}

// Helper function to capitalize first letter
function capitalizeFirstLetter(string) {
  return string.charAt(0).toUpperCase() + string.slice(1)
}

// Initialize the app when DOM is loaded
document.addEventListener("DOMContentLoaded", init)
