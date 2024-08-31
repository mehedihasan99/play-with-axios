import React, { useState } from 'react'

export default function Task({ task, onEditTask, onDelete }) {
  const [isEditing, setIsEditing] = useState(false)
  const [editTaskName, setEditTaskName] = useState(task.name)
  function handleSave() {
    onEditTask({ ...task, name: editTaskName })
    setIsEditing(false)
  }
  return (
    <div className="bg-gray-200 w-96 shadow-md p-5 m-3 ">
      {isEditing ? (
        <input
          className="border-2 py-1 px-2 mb-2"
          type="text"
          value={editTaskName}
          onChange={(e) => setEditTaskName(e.target.value)}
        />
      ) : (
        <h3 className="text-lg font-semibold text-blue-500">{task.name}</h3>
      )}

      <div className="mt-3">
        <button
          onClick={() => onDelete(task.id)}
          className="px-3 me-3 py-1 rounded text-gray-600 bg-red-300"
        >
          Delete
        </button>
        {isEditing ? (
          <button
            onClick={handleSave}
            className="px-3 py-1 rounded text-gray-600 bg-green-300"
          >
            Save
          </button>
        ) : (
          <button
            onClick={() => setIsEditing(true)}
            className="px-3 py-1 rounded text-gray-600 bg-green-300"
          >
            Edit
          </button>
        )}
      </div>
    </div>
  )
}
