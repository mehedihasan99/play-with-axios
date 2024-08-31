import axios from 'axios'
import React, { useEffect, useState } from 'react'
import AddTask from './AddTask'
import Task from './Task'

export default function TaskApp() {
  const [tasks, setTasks] = useState([])
  const [error, setError] = useState(null)

  async function handleAddTask(task) {
    //& here we post a data to the tasks using axios.post method and it will return a response that we will set in the state.
    try {
      const response = await axios.post(`http://localhost:8000/items`, {
        id: crypto.randomUUID(),
        name: task,
      })
      if (response && response.data) {
        setTasks([...tasks, response.data])
      }
    } catch (error) {
      setError(error)
    }
  }
  async function handleEditTask(task) {
    //* here we update the task using axios.put method and it will return a response that we will set in the state.
    try {
      const response = await axios.put(
        `http://localhost:8000/items/${task.id}`,
        task
      )
      if (response && response.data) {
        setTasks(
          tasks.map((t) => {
            if (t.id === task.id) {
              return response.data
            }
            return t
          })
        )
      }
    } catch (error) {
      setError(error)
    }
  }
  async function handleDeleteTask(taskId) {
    // * here we delete the task using axios.delete method and it will delete from server and ui part updates manually
    if (confirm('Are you sure you want to delete this task?')) {
      try {
        await axios.delete(`http://localhost:8000/items/${taskId}`)
        setTasks(tasks.filter((task) => task.id !== taskId))
      } catch (error) {
        setError(error)
      }
    }
  }
  useEffect(() => {
    setError(null)
    async function fetchItems() {
      //* get data from server using axios.get method and it will return a list of tasks that we will set in the state.

      try {
        const response = await axios.get(`http://localhost:8000/items`)
        if (response && response.data) {
          setTasks(response.data)
        }
      } catch (error) {
        setError(error)
        console.log(error)
        setTasks([])
      }
    }
    fetchItems()
  }, [])
  return (
    <div>
      <h2 className="text-blue-500 text-2xl font-semibold text-center mt-8">
        This is Task App
      </h2>
      <div className="grid mt-4 sm:grid-cols-2 lg:grid-cols-3 justify-items-center">
        {tasks.map((task) => (
          <Task
            key={task.id}
            task={task}
            onEditTask={handleEditTask}
            onDelete={handleDeleteTask}
          />
        ))}
      </div>

      <AddTask onAddTask={handleAddTask} />
      <hr />
      {error && (
        <div className="text-center font-semibold text-red-500">
          {error.message || error}
        </div>
      )}
    </div>
  )
}
