import { useState } from 'react'
import { ITask } from '../page'
import styles from './TaskForm.module.css'

interface Props {
  onSubmit: (session: ITask) => void
}

export default function TaskForm({onSubmit}:Props) {
  const [task, setTask] = useState("")
  const [due, setDue] = useState<Date>(new Date())

  const handleSubmit = (event: { preventDefault: () => void }) => {
    event.preventDefault()
    const dueDate = new Date(due)
    const newTask: ITask = {
      task: task,
      completed: false,
      due: dueDate
    }
    onSubmit(newTask)
    setTask("")
    setDue(new Date())
  }

  return (
    <div>
      <form className={styles.task_form} onSubmit={handleSubmit}>
        <div className={styles.task_form_item}>
          <label>Task</label>
          <input
            type="text"
            id="task"
            name="task"
            placeholder='Add new task'
            value={task}
            onChange={(e) => {setTask(e.target.value)}}
            required
          />
        </div>
        <div className={styles.task_form_item}>
          <label>Due Date</label>
          <input
            type="date"
            id="due"
            name="due"
            value={due.toISOString().substring(0, 10)}
            placeholder={new Date().toISOString().substring(0, 10)}
            onChange={(e) => {setDue(new Date(e.target.value))}}
          />
        </div>
        <button type="submit">Add Task</button>
      </form>
    </div>
  )
}