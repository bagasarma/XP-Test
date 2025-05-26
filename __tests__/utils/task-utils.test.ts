import { sortTasksByPriority, filterTasksByStatus, validateTask, formatTaskDate } from "@/utils/task-utils"
import type { Task } from "@/types/task"

const mockTasks: Task[] = [
  {
    id: "1",
    title: "Low Priority Task",
    description: "Description 1",
    priority: "low",
    status: "todo",
    createdAt: new Date("2024-01-01"),
  },
  {
    id: "2",
    title: "High Priority Task",
    description: "Description 2",
    priority: "high",
    status: "inprogress",
    createdAt: new Date("2024-01-02"),
  },
  {
    id: "3",
    title: "Medium Priority Task",
    description: "Description 3",
    priority: "medium",
    status: "completed",
    createdAt: new Date("2024-01-03"),
  },
]

describe("Task Utils", () => {
  describe("sortTasksByPriority", () => {
    it("sorts tasks by priority (high > medium > low)", () => {
      const sorted = sortTasksByPriority([...mockTasks])

      expect(sorted[0].priority).toBe("high")
      expect(sorted[1].priority).toBe("medium")
      expect(sorted[2].priority).toBe("low")
    })

    it("returns empty array when given empty array", () => {
      const sorted = sortTasksByPriority([])
      expect(sorted).toEqual([])
    })
  })

  describe("filterTasksByStatus", () => {
    it("filters tasks by status", () => {
      const todoTasks = filterTasksByStatus(mockTasks, "todo")
      expect(todoTasks).toHaveLength(1)
      expect(todoTasks[0].status).toBe("todo")
    })

    it('returns all tasks when filter is "all"', () => {
      const allTasks = filterTasksByStatus(mockTasks, "all")
      expect(allTasks).toHaveLength(3)
    })
  })

  describe("validateTask", () => {
    it("returns true for valid task", () => {
      const validTask = { title: "Valid Task" }
      expect(validateTask(validTask)).toBe(true)
    })

    it("returns false for task without title", () => {
      const invalidTask = { description: "No title" }
      expect(validateTask(invalidTask)).toBe(false)
    })

    it("returns false for task with empty title", () => {
      const invalidTask = { title: "   " }
      expect(validateTask(invalidTask)).toBe(false)
    })
  })

  describe("formatTaskDate", () => {
    it("formats date correctly", () => {
      const date = new Date("2024-01-15")
      const formatted = formatTaskDate(date)
      expect(formatted).toBe("Jan 15, 2024")
    })
  })
})
