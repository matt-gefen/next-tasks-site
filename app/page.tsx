'use client';
import { useEffect, useState } from "react";
import TaskForm from "./components/TaskForm";
import styles from "./page.module.css";
import { get, map, sortBy } from "lodash";
// import { get } from "lodash";

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

  // Default session
  const defaultSession: ISession = {
    name: "saved_tasks",
    tasks: []
  }

  // Creating a basic session state
  const [session, setSession] = useState<ISession>(defaultSession)

  useEffect(()=> {
    const localSession = localStorage.getItem("session")
    if(localSession && typeof localSession === "string") {
      const parsedSession = JSON.parse(localSession)
      setSession(parsedSession)
    }
  }, [])

  // Function for updating the session
  const updateSession = (updatedSession: ISession) => {
    localStorage.setItem("session", JSON.stringify(updatedSession))
    setSession(updatedSession)
    console.log(session)
  }

  // Function for adding a new task
  const addTask = (newTask: ITask) => {
    const updatedSession = {name: session.name, tasks: [...session.tasks, newTask]}
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
                <div className={styles.task}>
                  <div>
                    {task.task}
                  </div>
                  <div>
                    {task.due.toLocaleDateString()}
                  </div>
                </div>
              )
            })
          }
        </div>
        <div>
          <TaskForm onSubmit={addTask}/>
        </div>
      </main>
    </div>
  );
}
