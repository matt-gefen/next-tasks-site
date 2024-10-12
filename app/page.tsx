'use client';
import { useEffect, useState } from "react";
import TaskForm from "./components/TaskForm";
import styles from "./page.module.css";
import { filter, map, sortBy } from "lodash";

// requirements
// Add new task - create a form input that allows the user to add a new task
// The task should be displayed in the task list upon submission
// Mark each task as completed using a checkbox
// When the checkbox is clicked add a strikethrough effect to the task
// Remove tasks using a delete button
// Task list should persist between page reloads (use browser localStorage)

//  TypeScript interface for what is handling super basic data management. 

// Interface for a task
export interface ITask {
  id: string,
  task: string,
  completed: boolean,
  due: Date,
}

// Session probably is not the correct term but is closest to what I'm going for
export interface ISession {
  name: string,
  tasks: ITask[]
}

export default function Home() {

  const [session, setSession] = useState<ISession>({
    name: "saved_tasks",
    tasks: []
  })
  const [addingTask, setAddingTask] = useState(false)

  useEffect(()=> {
    const localSession = localStorage.getItem("session")
    if(localSession && typeof localSession === "string") {
      const parsedSession = JSON.parse(localSession)
      setSession(parsedSession)
    }
  }, [])

  const updateSession = (updatedSession: ISession) => {
    localStorage.setItem("session", JSON.stringify(updatedSession))
    setSession(updatedSession)
  }

  const addTask = (newTask: ITask) => {
    const updatedSession = {name: session.name, tasks: [...session.tasks, newTask]}
    updateSession(updatedSession) 
    setAddingTask(false)
  }

  const deleteTask = (taskId: string) => {
    const filteredTasks = filter(session.tasks, (sessionTask) => {
      return sessionTask.id !== taskId
    })
    const updatedSession = {name: session.name, tasks: filteredTasks}
    updateSession(updatedSession)   
  }

  const updateTask = (task: ITask) => {
    const updatedTasks = map(session.tasks, (sessionTask) => {
      if (sessionTask.id === task.id) {
        return task
      } else {
        return sessionTask
      }
    })
    const updatedSession = {name: session.name, tasks: updatedTasks}
    updateSession(updatedSession)   
  }

  return (
    <div className={styles.page}>
      <main className={styles.main}>
        <div className={styles.tasks}>
          <h1>Tasks</h1>
          {
            map(sortBy(session.tasks, ["due"]), (task) => {
              return (
                <div 
                  className={`${styles.task} ${task.completed ? styles.checked_task: ""}`} 
                  id={`${task.id}`}
                >
                  <button
                    className={styles.delete_task}
                    onClick={()=>{deleteTask(task.id)}}
                  >
                    x
                  </button>
                  <div className={styles.task_left}>
                    <div>
                      {task.task}
                    </div>
                    <div>
                      {task.due.toString().substring(0, 10)}
                    </div>
                  </div>
                  <div className={styles.task_right}>
                    <label htmlFor="">Complete</label>
                    <input
                      type="checkbox"
                      name="complete"
                      checked={task.completed}
                      onChange={(e)=>{
                        updateTask(
                          {...task, completed: Boolean(e.target.checked)}
                        )
                      }}
                    />
                  </div>
                </div>
              )
            })
          }
        </div>
        {
          addingTask && (
            <TaskForm onSubmit={addTask}/>
          )
        }
        {
          !addingTask && (
            <button onClick={()=>{setAddingTask(true)}}>
              Add New Task
            </button>
          )
        }
      </main>
    </div>
  );
}
