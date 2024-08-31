import React, { useState } from 'react'

export default function AddTask({ onAddTask }) {
  const [task, setTask] = useState('')

  return (
    <div className="flex flex-col justify-center items-center mb-4">
      <h2 className="text-blue-500 text-2xl font-semibold  mt-10">Add Task</h2>
      <label htmlFor="task">
        <input
          className="border-2 outline-0 py-2 px-2 mt-4 w-60"
          type="text"
          name=""
          id="task"
          value={task}
          onChange={(e) => setTask(e.target.value)}
        />
        <button
          className="ms-2 px-4 py-2 bg-green-300 rounded"
          onClick={() => {
            onAddTask(task)
            setTask('')
          }}
        >
          Add Task
        </button>
      </label>
    </div>
  )
}
