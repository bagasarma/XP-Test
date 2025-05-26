"use client"

interface ConfirmationDialogProps {
  isOpen: boolean
  title: string
  message: string
  onConfirm: () => void
  onCancel: () => void
}

export default function ConfirmationDialog({ isOpen, title, message, onConfirm, onCancel }: ConfirmationDialogProps) {
  if (!isOpen) return null

  return (
    <div className="confirmation-overlay">
      <div className="confirmation-dialog">
        <div className="confirmation-header">
          <h3>{title}</h3>
        </div>
        <div className="confirmation-body">
          <p>{message}</p>
        </div>
        <div className="confirmation-footer">
          <button className="btn btn-secondary" onClick={onCancel}>
            Cancel
          </button>
          <button className="btn btn-danger" onClick={onConfirm}>
            Delete
          </button>
        </div>
      </div>
    </div>
  )
}
